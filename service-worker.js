const CACHE_NAME = "UnitedPWA-v4.555";
var urlsToCache = [
  "/",
  "/manifest.json",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/sejarah.html",
  "/pages/squad.html",
  "/pages/legenda.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/logo.png",
  "/mini-logo.png",
  "/assets/images/logo-tim.png",
  "/assets/images/ron-atkintson.png",
  "/assets/images/Sejarah-club.png",
  "/assets/images/sejarah-club2.png",
  "/assets/images/sir-alex.png",
  "/assets/images/sir-matt-busby.png",
  "/assets/images/tim-utama.png",
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
  });

  self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });