<script setup>
import { ref, watchEffect } from 'vue';
import { useStore } from './js/store'

import Nav from './components/Nav.vue'
import Calendar from './components/Calendar.vue';

const store = useStore();

watchEffect(() => document.getElementsByTagName('body')[0].setAttribute('lang', store.language));
</script>

<template>
  <div class="h-100">
    <Nav />
    <Calendar />
  </div>
</template>