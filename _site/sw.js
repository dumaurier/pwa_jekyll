const cacheName = 'sw-1517677211';
const dataCacheName = 'sw-1517677211';
const RUNTIME = 'runtime';

var getPageURL = location;

var filesToCache = [
 '/manifest.json',
 '/static-assets/js/home.js',
 '/static-assets/css/new-base.css',
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



self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin) && !event.request.url.endsWith('.js') && !event.request.url.endsWith('.netlify/**')) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});
