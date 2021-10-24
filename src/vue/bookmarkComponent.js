// Author: Alex Leone

/*jslint this*/
/*property
    $emit, computed, emits, expand, expanded, exports, get, hasSubsections,
    length, methods, props, section, select, subsections, template
*/

(function (part) {
    "use strict";

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
                    // console.log("Selected: " + section.id);
                    this.$emit("selected", section);
                },
                expand: function (section) {
                    section.expanded = !section.expanded;
                }
            }
        };
    };

}(module.exports));