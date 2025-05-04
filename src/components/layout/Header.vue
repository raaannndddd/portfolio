<template>
  <!-- <div class="bg-white"> -->
    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>
      <div class="flex justify-evenly">
        <div class="ml-auto max-w-2xl py-32 sm:py-48 lg:pt-70 lg:pb-20">
          <div class="text-center">
            <h1 class="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">👋 Hi, I'm Rand. <br> A Developer.</h1>
            <p class="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">A full stack developer passionate about artificial intelligence and natural language processing.</p>
          </div>
        </div>
        <div class="hidden md:block mx-auto max-w-4xl py-32 sm:py-48 lg:pt-40 lg:pb-20">
          <component is="script" src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs" type="module"></component>
          <dotlottie-player src="https://lottie.host/f837f061-1132-4d98-8bac-6a528faace49/Ek6BjUty8w.lottie" background="transparent" speed="1" style="width: 450px; height: 450px" loop autoplay></dotlottie-player>
        </div>
      </div>
    </div>
  <!-- </div> -->
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
</script>

<style>
  body {
    background-color: white;
  }
</style>