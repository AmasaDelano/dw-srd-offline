// Author: Alex Leone

"use script";

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
    .register("/dw-srd-offline/sw.js", {scope: "/dw-srd-offline/"})
    .then(() => { console.log("Service Worker Registered"); });
}

const Vue = require("vue/dist/vue.esm-bundler.js");
const rootComponent = require("./vue/rootComponent").get();
const bookmarkComponent = require("./vue/bookmarkComponent").get();

Vue.createApp(rootComponent).component("dw-bookmark", bookmarkComponent).mount("#root");
