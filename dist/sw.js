self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open("dw-store").then((cache) => cache.addAll([
            "/",
            "/index.html",
            "/bundle.js",
            "/style.css",
            "/logo.png",
            ])),
        );
    });

    self.addEventListener("fetch", (e) => {
    console.log(e.request.url);

    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});