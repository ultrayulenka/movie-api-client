const CACHE_NAME = "image-cache-v1";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 1 day in milliseconds

self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.destination === "image") {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
          const cachedDate = new Date(cachedResponse.headers.get("date"));
          const now = new Date();

          if (now - cachedDate < CACHE_DURATION) {
            return cachedResponse;
          }
        }
        const response = await fetch(request);
        if (response.status === 200) {
          const clonedResponse = response.clone();
          cache.put(request, clonedResponse);
        }

        return response;
      })
    );
  }
});
