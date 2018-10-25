const register = () => {
  // Check for browser support of service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
             .then(function(registration) {
               console.log('[Service Worker] registering service worker', registration);
             }).catch(function(err) {
               console.error('[Service Worker ERROR] registering service worker failed', err);
             });
  } else {
    console.log('[Service Worker] not supported');
  }
}

const unregister = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations()
             .then((registrations) => {
               for(let registration of registrations) {
                 registration.unregister()
               }}).catch(function(err) {
                 console.log('[Service Worker] registrations failed: ', err);
               });

  }
}

export { unregister }
export default register;
