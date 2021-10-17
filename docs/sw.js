self.addEventListener("install", (e) => {
    e.waitUntil(
        caches.open("dw-store").then((cache) => cache.addAll([
            "/dw-srd-offline/",
            "/dw-srd-offline/index.html",
            "/dw-srd-offline/bundle.js",
            "/dw-srd-offline/style.css",
            "/dw-srd-offline/logo.png",
            ])),
        );
    });

    self.addEventListener("fetch", (e) => {
    console.log(e.request.url);

    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});