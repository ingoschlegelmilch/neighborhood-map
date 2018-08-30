// const staticCacheName = 'neighborhood-assets'
// const dynamicCacheName = 'api-assets'
// const urlsToCache = [
//     '/static/js/bundle.js',
//     '/static/js/bundle.js.map'
// ]

// self.addEventListener('install', event => {
//     console.log('static-v1 installing...', caches.open);
//     event.waitUntil(
//         caches.open(staticCacheName).then(cache => cache.addAll(urlsToCache))
//             .then(self.skipWaiting())
//     );
// });

// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//       caches.open(dynamicCacheName).then(function(cache) {
//         return cache.match(event.request).then(function (response) {
//           return response || fetch(event.request).then(function(response) {
//             cache.put(event.request, response.clone());
//             return response;
//           });
//         });
//       })
//     );
//   });
