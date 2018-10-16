const static = [
  '/',
  '/src/App.js',
  '/src/index.js',
  '/src/App.css',
  '/src/lib/offlinePlaces.js',
  '/static/js/bundle.js'
];

this.addEventListener('install', event => {
  console.log('[Service Worker] installing service worker', event);
  event.waitUntil(
    caches.open('static')
      .then(cache => {
        console.log('[Service Worker] Precaching App Shell');
        cache.addAll(static);
      })
  )
});

this.addEventListener('activate', event => {
  console.log('[Service Worker] activating service worker', event);
  return this.clients.claim();
});

this.addEventListener('fetch', event => {
  console.log('[Service Worker] fetching', event);
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(res => {
            caches.open('dynamic')
              .then(cache => {
                cache.put(event.request.url, res.clone());
                return res;
              })
          })
      })
      .catch(err => {
        console.log('[ERR]', err);
      })
  )
});
