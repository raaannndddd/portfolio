<template>
    <div class="bg-white dark:bg-surface-dark">
        <List/>
        <Footer/>
    </div>
</template>

<script setup>
    import { defineAsyncComponent } from 'vue';

    const List = defineAsyncComponent(() => import('@/components/layout/List.vue'));
    const Footer = defineAsyncComponent(() => import('@/components/layout/Footer.vue'));
</script>
