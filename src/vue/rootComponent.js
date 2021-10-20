// Author: Alex Leone

"use strict";

const bookmarks = require("../markdownBookmarks").bookmarks;

(function (part) {

    let selectedNode = undefined;

    function addSelectOnTap() {
        window.getSelection().empty();

        document.querySelectorAll(".main-content p, .main-content li, h1, h2, h3, h4").forEach(function (element) {
            element.addEventListener("click", function () {
                const selection = window.getSelection();
                selection.removeAllRanges();

                if (element === selectedNode) {
                    selectedNode = undefined;
                } else {
                    const range = document.createRange();
                    range.selectNodeContents(element);
                    selection.addRange(range); 

                    selectedNode = element;
                }
                return true;
            });
        });
    }

    window.oncontextmenu = function(event) {
        console.log("Context menu");
        alert("Context menu");
    };

    part.get = function get() {
        return {
            template: "#main",
            data: function () {
                return {
                    sections: bookmarks,
                    markdown: bookmarks[bookmarks.length - 1].markdown,
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