<template>
    <div class="flex flex-col flex-1 min-h-0">
      <Header/>
      <Footer/>
    </div>
  </template>
  
  <script setup>
  import { defineAsyncComponent } from 'vue';
  const Header = defineAsyncComponent(() => import('@/components/layout/Header.vue'));
  const Footer = defineAsyncComponent(() => import('@/components/layout/Footer.vue'));
  </script>