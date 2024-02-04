
const cacheName = "cacheFiles-version1"

/**
 * On install event
 * Triggered when the service worker is installed
 */

self.addEventListener('install', (event) => {
    // console.log('SW install', event);

    // Activate itself when it enters the waiting phase.
    self.skipWaiting();

    event.waitUntil(
        //Create the static cache. 
        caches.open(cacheName)
            .then((cache) => {
                cache.addAll([
                    '/',
                    '/index.html',
                    '/js/songs.js',
                    '/manifest.json',
                    '/css/main.css',
                    'images/musiclogo.jpeg',
                    '/icons/favicon-196.png',
                    '/icons/manifest-icon-192.maskable.png',
                ]);
            })
            .catch((errors) => {
                console.log('Catch failed: ', errors);
            })
    )

});

/**
 * On activate event
 * Triggered when the service worker is activated
 */

self.addEventListener('activate', (event) => {

    console.log('Service Worker activated', event);

    // Immediately get control over the open pages
    event.waitUntil(clients.claim());

    //Removes caches that are no longer necessary.
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                cacheNames.forEach((item) => {
                    if (item != cacheName) {
                        caches.delete(item);
                    }
                });
            })
    );

});


self.addEventListener('fetch', (event) => {

    /**
    * Cache Strategy: Network with cache Fallback
    */

    // event.respondWith(
    //     fetch(event.request)
    //     .catch(() => {
    //         return caches.open(cacheName)
    //         .then((cache) => {
    //             return cache.match(event.request);
    //         })
    //     })
    // );


    /**
     * Cache strategy: Cache with Network Fallback
     */



    //   event.respondWith(
    //     caches.open(cacheName)
    //         .then(async (cache) => {
    //             const response = await cache.match(event.request);
    //             return response || fetch(event.request);
    //         })
    // );

    // Cache strategy: Stale while revalidate 

    event.respondWith(
        caches.open(cacheName)
            .then((cache) => {
                return cache.match(event.request)
                    .then((cacheResponse) => {
                        const fetchedResponse = fetch(event.request)
                            .then((networkResponse) => {
                                cache.put(event.request, networkResponse.clone());
                                return networkResponse;
                            });
                        return cacheResponse || fetchedResponse;
                    })
            })
    );
});


