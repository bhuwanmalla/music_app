
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



