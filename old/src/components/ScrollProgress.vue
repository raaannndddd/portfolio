<template>
  <div class="fixed top-0 left-0 right-0 z-40 h-1 bg-gradient-to-r from-primary via-secondary to-primary will-change-[width]" :style="{ width: scrollProgress + '%' }" />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const scrollProgress = ref(0)
let scrollTimeout

const handleScroll = () => {
  if (scrollTimeout) clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    if (windowHeight > 0) {
      scrollProgress.value = (window.scrollY / windowHeight) * 100
    }
  }, 16)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  if (scrollTimeout) clearTimeout(scrollTimeout)
})
</script>
