// service-worker.js
const CACHE_NAME = 'butterfly-checklist-cache';
const urlsToCache = [
    '/',
    '/build/assets/app-7a30ea22.css',
    '/build/assets/app-4ed993c7.js',
    '/build/manifest.json',
    // Include other important assets
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log(11, urlsToCache);
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith('chrome-extension://')) {
    return; // Bypass caching for extension requests
  }
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // If cached, return the cached response
        }

        // If not cached, fetch from the network
        return fetch(event.request)
          .then((networkResponse) => {
            // Cache the fetched response for future use
            return caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
              });
          });
      })
  );
});
