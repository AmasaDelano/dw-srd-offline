// Author: Alex Leone

"use strict";

const license = require("../markdown/00_License.md").default;
const introduction = require("../markdown/01_Introduction.md").default;
const playingTheGame = require("../markdown/02_Playing_the_Game.md").default;
const example = require("../markdown/03_Example.md").default;
const characterCreation = require("../markdown/04_Character_Creation.md").default;
const moves = require("../markdown/05_Moves_Discussion.md").default;
const bard = require("../markdown/06_01_Bard.md").default;
const cleric = require("../markdown/06_02_Cleric.md").default;
const druid = require("../markdown/06_03_Druid.md").default;
const fighter = require("../markdown/06_04_Fighter.md").default;
const paladin = require("../markdown/06_05_Paladin.md").default;
const ranger = require("../markdown/06_06_Ranger.md").default;
const thief = require("../markdown/06_07_Thief.md").default;
const wizard = require("../markdown/06_08_Wizard.md").default;
const gm = require("../markdown/07_GM.md").default;
const firstSession = require("../markdown/08_First_Session.md").default;
const fronts = require("../markdown/09_Fronts.md").default;
const world = require("../markdown/10_The_World.md").default;
const monsters = require("../markdown/11_Monsters.md").default;
const equipment = require("../markdown/13_Equipment.md").default;
const advancedDelving = require("../markdown/14_Advanced_Delving.md").default;

(function (part) {

    const markdowns = [license, introduction, playingTheGame, example, characterCreation, moves, bard, cleric, druid, fighter, paladin, ranger, thief, wizard, gm, firstSession, fronts, world, monsters, equipment, advancedDelving];

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

    const licenseAndAttribution = bookmarks.splice(0, 1)[0];
    licenseAndAttribution.name = "License and Attribution";
    licenseAndAttribution.subsections.length = 0;
    bookmarks.push(licenseAndAttribution);

    let selectedNode = undefined;

    function addSelectOnTap() {
        window.getSelection().empty();

        document.querySelectorAll(".main-content p, .main-content li, h1, h2, h3, h4").forEach(function (element) {
            element.addEventListener("click", function () {
                const selection = window.getSelection();
                if (element === selectedNode) {
                    selection.empty();
                    selectedNode = undefined;
                } else {
                    selection.setBaseAndExtent(element, 0, element, element.childNodes.length);
                    selectedNode = element;
                }
            })
        });
    }

    part.get = function get() {
        return {
            template: "#main",
            data: function () {
                return {
                    sections: bookmarks,
                    markdown: license,
                    sidebar: false
                };
            },
            mounted: function () {
                addSelectOnTap();
            },
            methods: {
                toggleSidebar: function () {
                    this.sidebar = !this.sidebar;
                    console.log("Toggling: " + this.sidebar);
                },
                select: function (markdown, id) {
                    console.log("Selected: " + id);

                    const changing = markdown !== this.markdown;
        
                    this.markdown = markdown;
                    this.sidebar = false;
                    
                    const hashLink = document.createElement("a");
                    hashLink.setAttribute("href", "#" + id);
                    setTimeout(function () {
                        hashLink.click();

                        if (changing) {
                            addSelectOnTap();
                        }
                    }, 1);
                }
            }
        };
    };

}(module.exports));