const version = '1';

const static = [
  '',
  '/',
  '/static/js/bundle.js',
  '/static/js/bundle.js.map'
];

const allCaches = [`dynamic-${version}`, `static-${version}`];

const isImage = url => url.endsWith('png');

this.addEventListener('install', event => {
  console.log('[Service Worker] installing service worker', event);
  event.waitUntil(
    caches.open(`static-${version}`)
      .then(cache => {
        cache.addAll(static);
      })
  )
});

self.addEventListener("activate", event => {
  console.log('[Service Worker] activating service worker', event);
  event.waitUntil(
    caches.keys().then(cacheNames => {
      console.log('Clearing Old Caches', cacheNames);
      Promise.all(
        cacheNames.map(cacheName => {
          if (!allCaches.includes(cacheName)) {
            console.log(`Deleting: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return this.clients.claim();
});

this.addEventListener('fetch', event => {
  console.log('[Service Worker Static] fetching', event.request);
  event.respondWith(
    caches.open(`static-${version}`).then(staticCache => {
      return staticCache.match(event.request).then(response => {
        if (response) {
          console.log('[Service Worker Static] static hit:', response);
          return response;
        };

        return caches.open(`dynamic-${version}`).then(dynamicCache => {
          const url = new URL(event.request.url);
          if (!isImage(event.request.url)) {
            url.search = '';
            url.fragment = '';
          }
          console.log('URL', url);

          return dynamicCache.match(url).then(response => {
            if (response) {
              console.log('[Service Worker Dynamic] dynamic hit:', response);
              return response;
            };
            return fetch(event.request).then(response => {
              console.log('[Service Worker Dynamic] storing:', event.request);
              dynamicCache.put(url, response.clone());
              return response;
            });
          });
        })
      });
    })
  );
});

//        console.log('[ERR]', err);
