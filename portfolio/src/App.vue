<template>
  <div class="bg-[#FFF7D1] dark:bg-[#563A9C]">
    <Navbar/>
    <Hero/>
  </div>
</template>

<script setup>
  import { defineAsyncComponent } from 'vue';
  const Navbar =defineAsyncComponent(() => import('@/components/layout/Navbar.vue'));
  const Hero =defineAsyncComponent(() => import('@/components/layout/Hero.vue'));
</script>