// sw.js - basic service worker
const CACHE_NAME = "site-cache-v1";
const urlsToCache = [
  "/",            // cache homepage
  "./index.html",  // your entry page
  "./styles/styles.css",  // add your CSS
  "./scripts/script.js",   // add your JS
  ".favicons/icons/icon-192.png",
  ".favicons/icons/icon-512.png",
   "./favicons/manifest.json" // manifest
];

// Install: cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Caching files...");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate: clean old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log("Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );
});

// Fetch: serve cached content when offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
