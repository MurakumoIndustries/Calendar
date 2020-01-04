<template>
    <div>
        <Nav />
        <Calendar />
    </div>
</template>

<script>
import Nav from "./components/Nav.vue";
import Calendar from "./components/Calendar.vue";

export default {
    components: {
        Nav,
        Calendar
    }
};
</script>