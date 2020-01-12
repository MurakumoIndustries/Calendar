<template>
    <div class="main-container container-fluid background h-100">
        <CalendarYear v-if="calendarType==1" />
        <CalendarMonth v-if="calendarType==2" />
        <Detail />
    </div>
</template>

<script>
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

import CalendarYear from "./CalendarYear.vue";
import CalendarMonth from "./CalendarMonth.vue";
import Detail from "./Detail.vue";

import { Event } from "../js/event.js";

export default {
    data: function() {
        return {};
    },
    mounted: function() {
        var $vm = this;

        Event.$on("export-image", function(width, height) {
            html2canvas($vm.$el, {
                width: width,
                height: height,
                windowWidth: width,
                windowHeight: height,
                onclone: function(node) {
                    node.documentElement.classList.remove("h-100");
                    node.documentElement.style.width = width + "px";
                    node.documentElement.style.height = height + "px";
                },
                ignoreElements: function(node) {
                    if (node.classList && node.classList.contains("modal")) {
                        return true;
                    }
                    if (node.classList && node.classList.contains("btn")) {
                        return true;
                    }
                    return false;
                }
            }).then(function(canvas) {
                canvas.toBlob(function(blob) {
                    saveAs(blob, "calendar.png");
                });
            });
        });
    },
    computed: {
        calendarType: function() {
            return this.$store.state.type;
        }
    },
    components: {
        CalendarYear,
        CalendarMonth,
        Detail
    }
};
</script>
<style scoped>
.main-container {
    padding-top: 56px;
    overflow: hidden;
}
</style>


