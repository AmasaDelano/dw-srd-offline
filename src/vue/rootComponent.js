// Author: Alex Leone

"use strict";

const introduction = require("../markdown/01_Introduction.md").default;
const playingTheGame = require("../markdown/02_Playing_the_Game.md").default;
const example = require("../markdown/03_Example.md").default;
const characterCreation = require("../markdown/04_Character_Creation.md").default;
const moves = require("../markdown/05_Moves_Discussion.md").default;
const gm = require("../markdown/07_GM.md").default;
const firstSession = require("../markdown/08_First_Session.md").default;
const fronts = require("../markdown/09_Fronts.md").default;

(function (part) {

    const markdowns = [introduction, playingTheGame, example, characterCreation, moves, gm, firstSession, fronts];

    const headingRegex = new RegExp("<h([1234]) id=\"(.+?)\">(.+?)<\/h[1234]>", "g");

    const parents = [];
    const bookmarks = [];
    
    markdowns.forEach(function (markdown) {
        const headings = [...markdown.matchAll(headingRegex)];
    
        headings.forEach(function (heading) {
            // console.log("Heading: " + JSON.stringify(heading));
    
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

    part.get = function get() {
        return {
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
    };

}(module.exports));