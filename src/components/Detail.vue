<template>
    <div class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                
            </div>
        </div>
    </div>
</template>
<script>
import { Data } from "../js/data.js";
import { Event } from "../js/event.js";
import $ from "jquery";
import page from "page";

export default {
    data: function() {
        return {
            currentTabId: "",
            actress: {},
            charas: []
        };
    },
    created: function() {
        var $vm = this;
        $vm.$nextTick(function() {
            $($vm.$el).on("hide.bs.modal", function(e) {
                page.show("/"); //todo
            });
        });
    },
    methods: {
        miniIconAlt: function(event) {
            var $vm = this;
            var newSrc = "../img/chara/" + $vm.actress.miniIcon + ".png";
            event.target.src = newSrc;
        }
    },
    components: {
    }
};
</script>
<style scoped>
.modal-content {
    background: rgba(255, 255, 255, 0.75);
}

</style>

