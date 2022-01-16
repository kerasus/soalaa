var cacheName = "sw-v1";
var filesToCache = [
    "./",
    "./index.html",
    "./styles.css",
    "./app.js",
    "./images/dog1.jpg",
    "./images/dog2.jpg",
    "./images/dog3.jpg",
    "./images/dog4.jpg"
];
// Detailed logging is very useful during development
workbox.setConfig({debug: false})
// Updating SW lifecycle to update the app after user triggered refresh
workbox.core.skipWaiting()
workbox.core.clientsClaim()

workbox.core.setCacheNameDetails({prefix: "vue-pwa-3a"});

// We inject manifest here using "workbox-build" in workbox-build-inject.js
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener("install", function (e) {
    // console.log("<ServiceWorker> ---- Install v1");
    // e.waitUntil(
    //     caches.open(cacheName).then(function (cache) {
    //         console.log("<ServiceWorker> --- Caching app shell");
    //         // return cache.addAll(filesToCache);
    //     })
    // );
});

self.addEventListener("activate", (event) => {
    // console.log("<ServiceWorker> ---- activate");
    event.waitUntil(self.clients.claim());
});

// self.addEventListener("fetch", function (event) {
//     event.respondWith(
//         caches.match(event.request).then(function (response) {
//             if (response) {
//                 return response;
//             }
//             return fetch(event.request);
//         })
//     );
// });

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting()
    }
})

