<template>
  <div class="flex min-h-dvh flex-col">
    <Header />
    <FeaturedWork />
    <Contact />
    <Footer />
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
const Header = defineAsyncComponent(() => import('@/components/layout/Header.vue'));
const FeaturedWork = defineAsyncComponent(() => import('@/components/layout/FeaturedWork.vue'));
const Contact = defineAsyncComponent(() => import('@/components/layout/Contact.vue'));
const Footer = defineAsyncComponent(() => import('@/components/layout/Footer.vue'));
</script>
