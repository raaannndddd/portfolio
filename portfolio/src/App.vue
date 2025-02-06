<template>
  <div class="bg-[#D4EBF8] dark:bg-[#080326] h-screen w-screen">
    <Navbar/>
  </div>
</template>

<script setup>
  import { defineAsyncComponent } from 'vue';
  const Navbar =defineAsyncComponent(() => import('@/components/layout/Navbar.vue'))
</script>