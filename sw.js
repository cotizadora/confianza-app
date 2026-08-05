/* Service worker mínimo: instala la app y permite abrirla offline.
   IMPORTANTE: el inventario (data/export.csv) SIEMPRE se pide a la red,
   nunca desde caché, para no mostrar datos viejos. */
const CACHE = "confianza-v1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // Datos del inventario: siempre frescos desde la red.
  if (url.pathname.endsWith("/data/export.csv")) {
    e.respondWith(fetch(e.request));
    return;
  }
  // Resto (la app): red primero, con caché de respaldo si no hay conexión.
  e.respondWith(
    fetch(e.request)
      .then((r) => {
        const copy = r.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(() => {});
        return r;
      })
      .catch(() => caches.match(e.request))
  );
});
