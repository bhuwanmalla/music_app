
/**
 * On install event
 * Triggered when the service worker is installed
 */

self.addEventListener('install', (event) => {
    console.log('SW install', event);
    
    // Activate itself when it enters the waiting phase.
    self.skipWaiting();
});

/**
 * On activate event
 * Triggered when the service worker is activated
 */

self.addEventListener('activate', (event) => {

    // Immediately get control over the open pages
    event.waitUntil(clients.claim());
    
});

    // Removes caches that are no longer necessary
    // event.waitUntil(
    //     caches.keys()
    //         .then((cacheName) => {
    //             cacheName.forEach((item) => {
    //                 if (item != cacheName) {
    //                     caches.delete(item);
    //                 }
    //             });
    //         }
    //         )
    // );

// self.addEventListener('fetch', () => {
//     return;
// });

