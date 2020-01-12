<template>
    <div class="main-container container-fluid background h-100">
        <CalendarMonth v-if="calendarType==2" />
        <Detail />
    </div>
</template>

<script>
import CalendarMonth from "./CalendarMonth.vue";
import Detail from "./Detail.vue";

export default {
    data: function() {
        return {};
    },
    created: function() {
        var $vm = this;
    },
    computed: {
        calendarType: function() {
            return this.$store.state.type;
        }
    },
    components: {
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


