<template>
  <div class="bg-white h-screen flex flex-col overflow-hidden">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
const Navbar = defineAsyncComponent(() => import('@/components/layout/Navbar.vue'));
</script>