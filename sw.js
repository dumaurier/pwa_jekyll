var cacheName = 'proto1.2';
var dataCacheName = 'proto1.2';

var getPageURL = location;

var filesToCache = [
 '/manifest.json',
 '/static-assets/js/home.js',
 '/static-assets/css/new-base.css',
 '/index.html',
 '/',
 '404.html'
];


self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            //console.log('adding to cache');
            return cache.addAll(filesToCache);
        }).then(function(){
         return self.skipWaiting();
         //console.log('here i am');
        })
    );
});

self.addEventListener('activate', function(e) {
    //console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName || key !== dataCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        }).then(function(){
            caches.open(cacheName).then(function(cache) {
                //console.log('adding to cache');
                return cache.addAll(filesToCache);
            })
        })
    );
    return self.clients.claim();
});



self.addEventListener('fetch', function(e) {
    //console.log('[Service Worker] Fetch', e.request.url);
    var dataUrl = '/old/en/';
    if (e.request.url.indexOf(dataUrl) > -1) {
        e.respondWith(
            caches.open(dataCacheName).then(function(cache) {
                return fetch(e.request).then(function(response){
                    cache.put(e.request.url, response.clone());
                    return response;
                });
            })
        );
    } else {
        //console.log('what happened');
        e.respondWith(
            caches.match(e.request).then(function(response) {
                return response || fetch(e.request);
            })
        );
    }
});
