<template>
    <div class="h-screen overflow-hidden flex flex-col">
      <Header/>
      <Footer/>
    </div>
  </template>
  
  <script setup>
  import { defineAsyncComponent } from 'vue';
  const Header = defineAsyncComponent(() => import('@/components/layout/Header.vue'));
  const Footer = defineAsyncComponent(() => import('@/components/layout/Footer.vue'));
  </script>