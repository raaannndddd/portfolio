<template>
  <div class="bg-white text-gray-900 dark:bg-surface-dark dark:text-gray-100">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
const Navbar = defineAsyncComponent(() => import('@/components/layout/Navbar.vue'));
</script>