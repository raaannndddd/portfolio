<template>
    <div class="bg-white">
        <Navbar/>
        <Header/>
        <Gallery/>
        <Footer/>
    </div>
</template>

<script setup>
    import { defineAsyncComponent } from 'vue';

    const Navbar = defineAsyncComponent(() => import('@/components/layout/Navbar.vue'));
    const Header = defineAsyncComponent(() => import('@/components/layout/HeaderAbout.vue'));
    const Footer = defineAsyncComponent(() => import('@/components/layout/Footer.vue'));
    const Gallery = defineAsyncComponent(() => import('@/components/layout/PhotoGallery.vue'));
</script>