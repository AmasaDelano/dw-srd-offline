// Author: Alex Leone

"use script";

if ("serviceWorker" in navigator) {
    navigator.serviceWorker
    .register("/dw-srd-offline/sw.js", {scope: "/dw-srd-offline/"})
    .then(() => { console.log("Service Worker Registered"); });
}

const Vue = require("vue/dist/vue.esm-bundler.js");

const bookmarkComponent = require("./vue/bookmarkComponent").get();

import introduction from "./markdown/01_Introduction.md";
import playingTheGame from "./markdown/02_Playing_the_Game.md";
import example from "./markdown/03_Example.md";
import characterCreation from "./markdown/04_Character_Creation.md";
import moves from "./markdown/05_Moves_Discussion.md";
import gm from "./markdown/07_GM.md";

const markdowns = [introduction, playingTheGame, example, characterCreation, moves, gm];

const headingRegex = new RegExp("<h([1234]) id=\"(.+?)\">(.+?)<\/h[1234]>", "g");
const parents = [];
const bookmarks = [];

markdowns.forEach(function (markdown) {
    const headings = [...markdown.matchAll(headingRegex)];

    headings.forEach(function (heading) {
        console.log("Heading: " + JSON.stringify(heading));

        const level = parseInt(heading[1]) - 1;
        const id = heading[2];
        const name = heading[3];

        const bookmark = {
            name: name,
            id: id,
            markdown: markdown,
            subsections: [],
            expanded: false
        };

        parents.length = level;
        parents[level] = bookmark;

        const immediateParent = parents[level - 1];
        if (immediateParent !== undefined) {
            immediateParent.subsections.push(bookmark);
        } else {
            bookmarks.push(bookmark);
        }

    });
});

const rootComponent = {
    template: "#main",
    data: function () {
        return {
            sections: bookmarks,
            markdown: introduction,
            sidebar: false
        };
    },
    methods: {
        toggleSidebar: function () {
            this.sidebar = !this.sidebar;
            console.log("Toggling: " + this.sidebar);
        },
        select: function (markdown, id) {
            console.log("Selected: " + id);

            this.markdown = markdown;
            
            const hashLink = document.createElement("a");
            hashLink.setAttribute("href", "#" + id);
            hashLink.click();

            this.sidebar = false;
        }
    }
};

Vue.createApp(rootComponent).component("dw-bookmark", bookmarkComponent).mount("#root");
