self.addEventListener('install', event => {
    console.log('static-v1 installing...', caches.open);
    event.waitUntil(
        caches.open("staticCacheName").then(cache => cache.addAll(urlsToCache))
            .then(self.skipWaiting())
    );
});