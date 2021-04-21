let CACHE_NAME = "admin panel";
let urlsToCache = ["/", "/completed"];

// Install/set a service worker
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll([
        "/static/js/bundle.js",
        "static/js/main.d0151abe.chunk.js",
        "/static/js/main.chunk.js",
        "/static/js/0.chunk.js",
        "/static/js/1.chunk.js",
        "/index.html",
        "/",
        "/product",
        "/account",
      ]);
    })
  );
});

// Cache get requests if offline
this.addEventListener("fetch", (event) => {
  console.warn("fetch" + event.request.url);
  if (event.request.url === "https://kit.fontawesome.com/e3ae4b32cf.js") {
    this.registration.showNotification("Connection Notification", {
      body: "internet not working",
      tag: "Notification",
      icon:
        "https://cdn4.iconfinder.com/data/icons/network-technology-12/32/network_global_fail_error_connection_internet_www-512.png",
    });
    event.waitUntil();
  }
  if (!navigator.onLine) {
    console.log(!navigator.onLine);

    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
        let requestUrl = event.request.clone();
        fetch(requestUrl);
      })
    );
  }
});

// // Update a service worker
// self.addEventListener("activate", (event) => {
//   let cacheWhitelist = ["your-app-name"];
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });
