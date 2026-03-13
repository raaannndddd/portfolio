<template>
    <div class="bg-white">
        <Navbar/>
        <List/>
        <Footer/>
    </div>
</template>

<script setup>
    import { defineAsyncComponent } from 'vue';

    const Navbar = defineAsyncComponent(() => import('@/components/layout/Navbar.vue'));
    const List = defineAsyncComponent(() => import('@/components/layout/List.vue'));
    const Footer = defineAsyncComponent(() => import('@/components/layout/Footer.vue'));
</script>