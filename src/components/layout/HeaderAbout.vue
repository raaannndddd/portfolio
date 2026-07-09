<template>
  <div class="bg-white dark:bg-surface-dark">
    <div class="relative isolate px-6 pt-10 lg:px-8">
      <PastelWash />
      <div class="mx-auto max-w-2xl py-10 sm:py-10 lg:pt-30">
        <div class="text-center">
          <h1
            class="text-balance text-5xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-7xl"
          >
            Hi, I'm Rand
          </h1>
        </div>
      </div>
    </div>

    <div class="px-6 mb-20 lg:px-8 flex flex-col-reverse lg:flex-row justify-evenly items-center lg:items-start">
      <div class="max-w-2xl lg:text-left">
        <p class="mt-8 text-pretty text-lg font-medium text-gray-500 dark:text-gray-300 sm:text-xl/8">
          I'm a software engineering graduate from the University of Sydney, now working as an SEO specialist.
          I build full-stack websites and tune them to rank on Google, and AI assistants. Recently that's meant a client site for a language academy in Jordan
          and an honours thesis measuring bias in medical AI chatbots.
        </p>
        <p class="mt-6 text-pretty text-lg font-medium text-gray-500 dark:text-gray-300 sm:text-xl/8">
          Outside of work you'll find me running, listening to music, at the beach, or trying new foods and recipes.
          I love learning languages and am currently focused on my French (oui oui 😎). I also enjoy exploring unique
          fashion, often evolving my wardrobe through thrifting and one-of-a-kind pieces. Looking forward to connect!
        </p>
      </div>
      <div class="max-w-4xl pt-10 lg:pt-0">
        <img src="../../assets/img/face.webp" fetchpriority="high" decoding="async" class="h-90 rounded-full shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl" alt="Portrait of Rand">
      </div>
    </div>
  </div>
</template>

<script setup>
import PastelWash from '@/components/layout/PastelWash.vue';
</script>
