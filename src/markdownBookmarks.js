// Author: Alex Leone

"use strict";

(function (part) {

    const markdowns = [
        require("./markdown/00_License.md").default,
        require("./markdown/01_Introduction.md").default,
        require("./markdown/02_Playing_the_Game.md").default,
        require("./markdown/03_Example.md").default,
        require("./markdown/04_Character_Creation.md").default,
        require("./markdown/05_Moves_Discussion.md").default,
        
        require("./markdown/06_00_Barbarian.md").default,
        require("./markdown/06_01_Bard.md").default,
        require("./markdown/06_02_Cleric.md").default,
        require("./markdown/06_03_Druid.md").default,
        require("./markdown/06_04_Fighter.md").default,
        require("./markdown/06_05_Paladin.md").default,
        require("./markdown/06_06_Ranger.md").default,
        require("./markdown/06_07_Thief.md").default,
        require("./markdown/06_08_Wizard.md").default,
        
        require("./markdown/07_GM.md").default,
        require("./markdown/08_First_Session.md").default,
        require("./markdown/09_Fronts.md").default,
        require("./markdown/10_The_World.md").default,
        require("./markdown/11_Monsters.md").default,
        
        require("./markdown/monster_settings/12_01_Caverns.md").default,
        require("./markdown/monster_settings/12_02_Swamp.md").default,
        require("./markdown/monster_settings/12_03_Undead.md").default,
        require("./markdown/monster_settings/12_04_Woods.md").default,
        require("./markdown/monster_settings/12_05_Hordes.md").default,
        require("./markdown/monster_settings/12_06_Experiments.md").default,
        require("./markdown/monster_settings/12_07_Depths.md").default,
        require("./markdown/monster_settings/12_08_Planes.md").default,
        require("./markdown/monster_settings/12_09_Folk.md").default,
        
        require("./markdown/13_Equipment.md").default,
        require("./markdown/14_Advanced_Delving.md").default,
        
        require("./markdown/appendices/15_Teaching.md").default,
        require("./markdown/appendices/16_Conversion.md").default,
        require("./markdown/appendices/17_NPCs.md").default
    ];

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

    part.bookmarks = bookmarks;

}(module.exports));