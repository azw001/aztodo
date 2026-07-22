const CACHE_NAME = 'jinri-jinbi-v1';
const urlsToCache = [
  './',
  './jinri-jinbi.html',
  './og-image.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      if (response) return response;
      return fetch(e.request).catch(() => {
        if (e.request.mode === 'navigate') {
          return caches.match('./jinri-jinbi.html');
        }
      });
    })
  );
});
