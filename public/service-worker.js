const CACHE_NAME = "pwa-cache-v2";
const OFFLINE_URL = "/offline.html";

const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/src/css/styles.css",
  "/src/js/main.js",
  OFFLINE_URL,
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Use cache first for CSS, JS
  if (request.destination === "style" || request.destination === "script") {
    event.respondWith(
      caches.match(request).then((cached) => {
        return (
          cached ||
          fetch(request).then((response) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, response.clone());
              return response;
            });
          })
        );
      })
    );
    return;
  }

  // Use network first for everything else (e.g., HTML)
  event.respondWith(fetch(request).catch(() => caches.match(request)));
});
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-messages") {
    event.waitUntil(sendQueuedMessagesToServer());
  }
});

function sendQueuedMessagesToServer() {
  // example: POST messages stored in IndexedDB
  return fetch("/api/sync", {
    method: "POST",
    body: JSON.stringify({ message: "Hello from Background Sync!" }),
    headers: { "Content-Type": "application/json" },
  });
}
