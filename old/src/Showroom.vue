<template>
    <div class="bg-white dark:bg-surface-dark">
        <List/>
        <Contact/>
        <Footer/>
    </div>
</template>

<script setup>
    import { defineAsyncComponent } from 'vue';

    const List = defineAsyncComponent(() => import('@/components/layout/List.vue'));
    const Contact = defineAsyncComponent(() => import('@/components/layout/Contact.vue'));
    const Footer = defineAsyncComponent(() => import('@/components/layout/Footer.vue'));
</script>
