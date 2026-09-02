<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b border-gray-900/5 bg-white/60 backdrop-blur-md dark:border-white/5 dark:bg-surface-dark/60">
    <nav class="flex items-center justify-between px-6 py-3 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <router-link to="/" class="-m-1.5 p-1.5">
          <img class="h-12 w-auto" src="/img/logo.png" alt="logo" />
        </router-link>
      </div>
      <div class="flex items-center gap-x-4 lg:hidden">
        <button
          type="button"
          class="rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10"
          @click="toggleTheme"
        >
          <span class="sr-only">Toggle theme</span>
          <SunIcon v-if="isDark" class="size-5" aria-hidden="true" />
          <MoonIcon v-else class="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
          @click="mobileMenuOpen = true"
        >
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="size-6" aria-hidden="true" />
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="text-sm/6 font-semibold text-gray-900 transition-colors duration-200 hover:text-primary dark:text-gray-100 dark:hover:text-primary"
        >{{ item.name }}</router-link>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <button
          type="button"
          class="rounded-full p-2 text-gray-700 ring-1 ring-gray-900/10 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:ring-white/15 dark:hover:bg-white/10"
          @click="toggleTheme"
        >
          <span class="sr-only">Toggle theme</span>
          <SunIcon v-if="isDark" class="size-5" aria-hidden="true" />
          <MoonIcon v-else class="size-5" aria-hidden="true" />
        </button>
      </div>
    </nav>
    <Dialog class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-50" />
      <DialogPanel class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 dark:bg-surface-dark sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:sm:ring-white/10">
        <div class="flex items-center justify-between">
          <router-link to="/" class="-m-1.5 p-1.5" @click="mobileMenuOpen = false">
            <span class="sr-only">Home</span>
            <img class="h-8 w-auto" src="/img/logo.png" alt="logo" />
          </router-link>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="size-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
            <div class="space-y-2 py-6">
              <router-link
                v-for="item in navigation"
                :key="item.name"
                :to="item.href"
                class="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-white/5"
                @click="mobileMenuOpen = false"
              >{{ item.name }}</router-link>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/vue/24/outline'
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
const mobileMenuOpen = ref(false)
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Work', href: '/showroom' },
]
</script>
