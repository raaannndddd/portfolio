<template>
  <div class="bg-[#FFF7D1] dark:bg-[#563A9C]">
  <div class="h-screen flex flex-col">
    <Navbar/>
    <Hero/>
    <!-- Choose if you want it all on one page or you want to scroll -->
    <Footer/>
  </div>
    <About/>
  </div>
</template>

<script setup>
  import { defineAsyncComponent } from 'vue';
  const Navbar =defineAsyncComponent(() => import('@/components/layout/Navbar.vue'));
  const Hero =defineAsyncComponent(() => import('@/components/layout/Hero.vue'));
  const Footer =defineAsyncComponent(() => import('@/components/layout/Footer.vue'));
  const About =defineAsyncComponent(() => import('@/components/layout/About.vue'));
</script>