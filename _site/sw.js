var cacheName = 'proto1.1';
var dataCacheName = 'proto1.1';

var getPageURL = location;

var filesToCache = [
 '/manifest.json',
 '/static-assets/js/home.js',
 '/static-assets/css/new-base.css',
 '/static-assets/js/modernizr_grid.js',
 '/index.html',
 '404.html'
];


self.addEventListener('install', function(e) {
    // console.log('[ServiceWorker] Install');
    // debugger;
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            // console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        }).then(function(){
         return self.skipWaiting();
        })
    );
});

self.addEventListener('activate', function(e) {
    // console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName && key !== dataCacheName) {
                    // console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});



self.addEventListener('fetch', function(e) {
    // console.log('[Service Worker] Fetch', e.request.url);
    var dataUrl = '/old/en/';
    if (e.request.url.indexOf(dataUrl) > -1) {
        /*
        * When the request URL contains dataUrl, the app is asking for fresh
        * weather data. In this case, the service worker always goes to the
        * network and then caches the response. This is called the "Cache then
        * network" strategy:
        * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
        */
        e.respondWith(
            caches.open(dataCacheName).then(function(cache) {
                return fetch(e.request).then(function(response){
                    cache.put(e.request.url, response.clone());
                    return response;
                });
            })
        );
    } else {
        /*
        * The app is asking for app shell files. In this scenario the app uses the
        * "Cache, falling back to the network" offline strategy:
        * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
        */
        e.respondWith(
            caches.match(e.request).then(function(response) {
                return response || fetch(e.request);
            })
        );
    }
});
