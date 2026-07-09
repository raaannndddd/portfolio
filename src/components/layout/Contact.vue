<template>
  <section id="contact" class="relative isolate scroll-mt-20 px-6 py-24 sm:py-32 lg:px-8">
    <PastelWash />
    <div class="mx-auto max-w-2xl text-center">
      <h2 class="text-balance text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
        Let's build something that gets found.
      </h2>
      <p class="mx-auto mt-6 max-w-xl text-lg/8 text-gray-600 dark:text-gray-300">
        I'm currently taking on freelance web &amp; SEO projects, and I'm open to software and SEO roles.
        The fastest way to reach me is email.
      </p>

      <a
        href="mailto:randhalasa@outlook.com"
        class="mt-8 inline-block text-xl font-semibold text-gray-900 underline decoration-primary decoration-2 underline-offset-4 transition-colors hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl"
      >
        randhalasa@outlook.com
      </a>

      <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a
          href="/Rand_Halasa_CV.pdf"
          class="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary dark:bg-white dark:text-gray-900 dark:hover:bg-primary dark:hover:text-white"
        >
          Download CV
        </a>
        <a
          href="https://linkedin.com/in/randhalasa"
          target="_blank"
          rel="noopener"
          class="rounded-full px-5 py-2.5 text-sm font-semibold text-gray-900 ring-1 ring-gray-900/15 transition-colors hover:bg-gray-100 dark:text-white dark:ring-white/20 dark:hover:bg-white/10"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/raaannndddd"
          target="_blank"
          rel="noopener"
          class="rounded-full px-5 py-2.5 text-sm font-semibold text-gray-900 ring-1 ring-gray-900/15 transition-colors hover:bg-gray-100 dark:text-white dark:ring-white/20 dark:hover:bg-white/10"
        >
          GitHub
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import PastelWash from '@/components/layout/PastelWash.vue'
</script>
