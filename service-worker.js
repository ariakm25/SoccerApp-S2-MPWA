importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);
if (workbox) console.log(`Workbox berhasil dimuat`);
else console.log(`Workbox gagal dimuat`);

const revVer = "1";
const CACHE_NAME = "soccer-app-v1";

workbox.precaching.precacheAndRoute([
  { url: "/", revision: revVer },
  { url: "/nav.html", revision: revVer },
  { url: "/index.html", revision: revVer },
  { url: "/detail.html", revision: revVer },
  { url: "/favorit.html", revision: revVer },
  { url: "/manifest.json", revision: revVer },
  { url: "/css/materialize.min.css", revision: revVer },
  { url: "/css/custom.csss", revision: revVer },
  { url: "/js/materialize.min.js", revision: revVer },
  { url: "/js/sw-register.js", revision: revVer },
  { url: "/js/api.js", revision: revVer },
  { url: "/js/script.js", revision: revVer },
  { url: "/js/favourite.js", revision: revVer },
  { url: "/js/idb.js", revision: revVer },
  { url: "/js/db-controller.js", revision: revVer },
  { url: "/img/Icon-144.png", revision: revVer },
  { url: "/img/Icon-192.png", revision: revVer },
  { url: "/img/Icon-96.png", revision: revVer },
  { url: "/img/na.png", revision: revVer }
]);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg|css|js)$/,
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  new RegExp('/detail.html'),
  workbox.strategies.cacheFirst({
    cacheName: 'detail',
  })
);

workbox.routing.registerRoute(
  /^https:\/\/api\.football-data\.org\/v2/,
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'api',
  })
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
      cacheName: 'fonts',
  })
);

self.addEventListener("push", function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "img/Icon-144.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
