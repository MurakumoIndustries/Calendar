<template>
    <div class="main-container container-fluid background h-100">
        <CalendarYear v-if="calendarType == 1" />
        <CalendarMonth v-if="calendarType == 2" />
        <Detail :actressId="actressId" />
    </div>
</template>

<script>
import { mapState } from "pinia";
import { useStore } from '../js/store';

import CalendarYear from "./CalendarYear.vue";
import CalendarMonth from "./CalendarMonth.vue";
import Detail from "./Detail.vue";

export default {
    data: function () {
        return {};
    },
    computed: {
        ...mapState(useStore, ["calendarType", "year"]),
        ...mapState(useStore, {
            actressId: store => store.currentActressId
        }),
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


