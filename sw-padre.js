const CACHE_NAME = "mi-ruta-segura-padres-v3";
const ASSETS = ["padre.html", "manifest-padres.webmanifest", "icon-padre.svg", "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css", "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"];
self.addEventListener("install", event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener("activate", event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))); self.clients.claim(); });
self.addEventListener("fetch", event => { event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request))); });
self.addEventListener("push", event => {
  const data = event.data ? event.data.json() : { title: "Mi Ruta Segura", body: "Nuevo aviso del transporte" };
  event.waitUntil(self.registration.showNotification(data.title || "Mi Ruta Segura", { body: data.body || "Nuevo aviso", icon: "icon-padre.svg", tag: "mi-ruta-segura" }));
});
