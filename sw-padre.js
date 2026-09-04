const CACHE_NAME = "mi-ruta-padres-v10";
const APP_SHELL = ["./padres.html", "./manifest-padres.webmanifest", "./icon-padres.svg"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).catch(() => null));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.mode === "navigate" || req.destination === "document") {
    event.respondWith(fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
      return res;
    }).catch(() => caches.match(req).then(cached => cached || caches.match("./padres.html"))));
    return;
  }
  event.respondWith(caches.match(req).then(cached => cached || fetch(req)));
});
