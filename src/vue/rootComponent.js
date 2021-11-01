// Author: Alex Leone

/*jslint this*/
/*global window, document, localForage*/

const localForage = require("localforage");

(function (part) {
    "use strict";

    const bookmarks = require("../markdownBookmarks").bookmarks;

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

    function scrollToId(id, changingMarkdown) {
        const hashLink = document.createElement("a");
        hashLink.setAttribute("href", "#" + id);
        setTimeout(function () {
            hashLink.click();

            if (changingMarkdown) {
                addSelectOnTap();
            }
        }, 1);
    }

    part.get = function get() {
        return {
            template: "#main",
            data: function () {
                return {
                    sections: bookmarks,
                    markdown: null,
                    sidebar: false
                };
            },
            mounted: function () {
                const that = this;

                const defaultMarkdown = bookmarks[bookmarks.length - 1].markdown;
                localForage.getItem("markdown").then(function (item) {
                    that.markdown = item || defaultMarkdown;
                }).catch(function () {
                    that.markdown = defaultMarkdown;
                });

                localForage.getItem("id").then(function (item) {
                    scrollToId(item);
                });

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
                    localForage.setItem("markdown", markdown);
                    localForage.setItem("id", id);

                    scrollToId(id, changing);
                }
            }
        };
    };

}(module.exports));
