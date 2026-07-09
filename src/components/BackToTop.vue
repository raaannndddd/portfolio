<template>
  <Teleport to="body">
    <Transition name="back-to-top">
      <button
        v-if="isVisible"
        @click="scrollToTop"
        class="fixed bottom-8 right-8 z-40 flex size-10 items-center justify-center rounded-full bg-gray-900/90 text-white shadow-lg ring-1 ring-gray-900/10 backdrop-blur transition-colors hover:bg-primary dark:bg-white/10 dark:ring-white/20 dark:hover:bg-primary/20"
        aria-label="Back to top"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="size-5" aria-hidden="true">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isVisible = ref(false)
let scrollTimeout

const handleScroll = () => {
  if (scrollTimeout) clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    isVisible.value = window.scrollY > 300
  }, 16)
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  if (scrollTimeout) clearTimeout(scrollTimeout)
})
</script>

<style scoped>
.back-to-top-enter-active,
.back-to-top-leave-active {
  transition: opacity 150ms ease;
}

.back-to-top-enter-from,
.back-to-top-leave-to {
  opacity: 0;
}
</style>
