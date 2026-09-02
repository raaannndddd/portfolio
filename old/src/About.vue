<template>
    <div class="bg-white dark:bg-surface-dark">
        <Header/>
        <Gallery/>
        <Contact/>
        <Footer/>
    </div>
</template>

<script setup>
    import { defineAsyncComponent } from 'vue';

    const Header = defineAsyncComponent(() => import('@/components/layout/HeaderAbout.vue'));
    const Footer = defineAsyncComponent(() => import('@/components/layout/Footer.vue'));
    const Gallery = defineAsyncComponent(() => import('@/components/layout/PhotoGallery.vue'));
    const Contact = defineAsyncComponent(() => import('@/components/layout/Contact.vue'));
</script>
