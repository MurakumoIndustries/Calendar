<template>
    <div class="main-container container-fluid background">
        
        <Detail />
    </div>
</template>

<script>
import { Data } from "../js/data.js";
import { Event } from "../js/event.js";
import { Ui } from "../js/ui.js";

import Detail from "./Detail.vue";

export default {
    data: function() {
        return {
        };
    },
    created: function() {
        var $vm = this;
    },
    components: {
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


