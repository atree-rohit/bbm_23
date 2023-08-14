// service-worker.js
const CACHE_NAME = 'butterfly-checklist-cache';
const urlsToCache = [
    new Request('/'),
    new Request('/app.css'),
    new Request('/app.js'),
    './build/manifest.json',
  // Include other important assets
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log(1, urlsToCache)
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
