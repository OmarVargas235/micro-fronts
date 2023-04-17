/* eslint-disable no-restricted-globals */
import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

clientsClaim();

// Puedes desactivar el precaching reemplazand esta línea
precacheAndRoute(self.__WB_MANIFEST);
// por esta otra:
// const desactivarPrecache = self.__WB_MANIFEST;
// para más info: https://cra.link/PWA

const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(
  // Return false to exempt requests from being fulfilled by index.html.
  ({ request, url }) => {
    // If this isn't a navigation, skip.
    if (request.mode !== "navigate") {
      return false;
    } // If this is a URL that starts with /\_, skip.
    if (url.pathname.startsWith("/_")) {
      return false;
    } // If this looks like a URL for a resource, because it contains // a file extension, skip.
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    } // Return true to signal that we want to use the handler.
    return true;
  },
  createHandlerBoundToURL("https://roxfarma.lilab.pe" + "/index.html")
);

registerRoute(
    // Add in any other file extensions or routing criteria as needed.
    ({ url }) =>
      url.origin === self.location.origin && url.pathname.endsWith(".png"), // Customize this strategy as needed, e.g., by changing to CacheFirst.
    new StaleWhileRevalidate({
      cacheName: "images",
      plugins: [
        // Ensure that once this runtime cache reaches a maximum size the
        // least-recently used images are removed.
        new ExpirationPlugin({ maxEntries: 50 }),
      ],
    })
  );

  
  const cacheName = "roxfarma-v1";
  const contentToCache = [
      '/index.html',
      '/*.svg',
      '/manifest.json',
      '/micro-roxfarma.json',
      '/*.ts',
      '/*.js',
  ];
    
self.addEventListener('install', function(event) {
    
    // The promise that skipWaiting() returns can be safely ignored.
    self.skipWaiting();
      
    // Perform any other actions required for your
    // service worker to install, potentially inside
    // of event.waitUntil();
  
    event.waitUntil(
        caches.open(cacheName).then((cache) => {

            return cache.addAll(contentToCache);
        })
    );
});
  
self.addEventListener("fetch", (e) => {

    console.log("[Servicio Worker] Recurso obtenido " + e.request.url);
});