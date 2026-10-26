/* Entrenador Gon: guarda la app para que funcione sin conexión.
   Al publicar una versión nueva, cambia VERSION para que los móviles la descarguen. */
const VERSION = 'entrenador-gon-v1.0';
const APP_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];
const FONTS = 'entrenador-gon-fonts';

self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(c => c.addAll(APP_FILES)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== VERSION && k !== FONTS).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

/* La página pide activar la versión nueva cuando pulsas «Actualizar» */
self.addEventListener('message', event => {
  if (event.data === 'activar') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  /* Tipografías de Google: se guardan la primera vez y después se sirven sin conexión */
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONTS).then(async cache => {
        const hit = await cache.match(req);
        if (hit) return hit;
        try {
          const res = await fetch(req);
          if (res.ok || res.type === 'opaque') cache.put(req, res.clone());
          return res;
        } catch (e) {
          return new Response('', { status: 504 });
        }
      })
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  /* Archivos de la app: primero la copia guardada; si no está, la red */
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).catch(() =>
      req.mode === 'navigate' ? caches.match('./index.html') : new Response('', { status: 504 })
    ))
  );
});
