"use script";

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/dw-srd-offline/sw.js", {scope: "/dw-srd-offline/"})
        .then(() => { console.log("Service Worker Registered"); });
}