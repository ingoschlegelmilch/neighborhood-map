this.addEventListener('install', event => {
  console.log('[Service Worker] installing service worker', event);
});

this.addEventListener('activate', event => {
  console.log('[Service Worker] activating service worker', event);
  return this.clients.claim();
});

this.addEventListener('fetch', event => {
  console.log('[Service Worker] fetching', event);
  event.respondWith(fetch(event.request))
});
