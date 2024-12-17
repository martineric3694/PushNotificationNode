// public/sw.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.3/workbox-sw.js');

const CACHE_NAME = 'my-cache-v1'; // Define your cache name

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            // Cache specific files if necessary
        })
    );
});

self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME]; // List of caches to keep

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName); // Delete old caches
                    }
                })
            );
        })
    );
});

// Handle push notifications
self.addEventListener('push', (event) => {
    const data = event.data.json(); // Parse the incoming data
    
    const options = {
        body: data.body,
        icon: 'icon.png' // Optional: path to an icon
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options) // Show the notification
    );
    
});
