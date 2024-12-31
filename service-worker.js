// Cache files during the install phase
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('marble-calculator-cache').then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/style.css',
        '/app.js',
        '/smartmarble.png'
      ]);
    })
  );
});

// Intercept network requests and serve cached files if available
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
