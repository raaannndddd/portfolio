<template>
  <div class="bg-white">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
const Navbar = defineAsyncComponent(() => import('@/components/layout/Navbar.vue'));
</script>