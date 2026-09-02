<template>
  <section class="relative isolate flex min-h-[calc(100dvh-3.5rem)] flex-col justify-center px-6 pt-14 lg:px-8">
    <PastelWash />
    <div class="mx-auto max-w-3xl py-16 text-center">
      <p class="text-lg font-medium text-gray-500 dark:text-gray-400">
        Hi, I'm Rand.
      </p>
      <h1 class="mt-4 text-balance text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
        I build programs that rank on Google and AI.
      </h1>
      <p class="mx-auto mt-8 max-w-2xl text-pretty text-lg font-medium text-gray-500 dark:text-gray-300 sm:text-xl/8">
        Software engineer and SEO specialist in Sydney. I do full-stack web work with a
        specialty in SEO/GEO for the AI-search era. I ship real projects for real clients.
      </p>
      <div class="mt-10 flex items-center justify-center gap-x-4">
        <router-link
          to="/showroom"
          class="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary dark:bg-white dark:text-gray-900 dark:hover:bg-primary dark:hover:text-white"
        >
          View my work
        </router-link>
        <a
          href="#contact"
          class="rounded-full px-5 py-2.5 text-sm font-semibold text-gray-900 ring-1 ring-gray-900/15 transition-colors hover:bg-gray-100 dark:text-white dark:ring-white/20 dark:hover:bg-white/10"
        >
          Get in touch <span aria-hidden="true">→</span>
        </a>
      </div>
      <p class="mt-6 text-sm text-gray-500 dark:text-gray-400">
        Currently taking on freelance web &amp; SEO projects.
      </p>
    </div>
  </section>
</template>

<script setup>
import PastelWash from '@/components/layout/PastelWash.vue'
</script>
