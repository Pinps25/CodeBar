// Service worker — Etiqueta / Gerador de Código de Barras
// Cacheia o "app shell" para funcionar offline após a primeira visita.

const CACHE_NAME = 'etiqueta-barcode-v7';
const APP_SHELL = [
    './',
    './index.html',
    './manifest.json',
    './icons/icon-192.png',
    './icons/icon-512.png',
    'https://cdn.jsdelivr.net/npm/jsbarcode@3.11.5/dist/JsBarcode.all.min.js',
    'https://unpkg.com/qrcode@1.4.1/build/qrcode.min.js',
    'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) =>
            // cada recurso é adicionado individualmente: se a fonte externa
            // falhar (ex: sem internet na instalação), o resto do app shell
            // ainda é cacheado normalmente.
            Promise.all(
                APP_SHELL.map((url) => cache.add(url).catch(() => {}))
            )
        )
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            )
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cached) => {
            return (
                cached ||
                fetch(event.request)
                    .then((response) => {
                        const clone = response.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                        return response;
                    })
                    .catch(() => cached)
            );
        })
    );
});
