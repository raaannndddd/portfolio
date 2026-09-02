<template>
  <TransitionRoot :show="isOpen" as="template">
    <Dialog @close="isOpen = false" class="relative z-50">
      <TransitionChild as="template" enter="ease-out duration-200" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-150" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/75 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild as="template" enter="ease-out duration-200" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="ease-in duration-150" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
            <DialogPanel class="relative w-full max-w-4xl">
              <button
                @click="isOpen = false"
                class="absolute -top-10 right-0 text-white transition-colors hover:text-primary"
                aria-label="Close lightbox"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="size-6" aria-hidden="true">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
              <img :src="imageSrc" :alt="imageAlt" class="w-full rounded-lg" />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, TransitionRoot, TransitionChild } from '@headlessui/vue'

const isOpen = ref(false)
const imageSrc = ref('')
const imageAlt = ref('')

const openLightbox = (src, alt) => {
  imageSrc.value = src
  imageAlt.value = alt
  isOpen.value = true
}

defineExpose({ openLightbox })
</script>
