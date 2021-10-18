// Author: Alex Leone

"use strict";

(function (part) {

    part.get = function get() {
        return {
            template: "#dw-bookmark",
            props: ["section"],
            emits: ["selected"],
            computed: {
                hasSubsections: function () {
                    return this.section.subsections.length > 0;
                }
            },
            methods: {
                select: function (section) {
                    console.log("Selected: " + section.id);
                    this.$emit("selected", section);
                }
            }
        };
    };

}(module.exports));