<template>
  <div class="relative isolate flex flex-1 flex-col px-6 pt-14 lg:px-8">
    <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
      <div
        class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-40 dark:opacity-25 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
      />
    </div>
    <div class="flex flex-1 items-center justify-evenly">
      <div class="ml-auto max-w-2xl">
        <div class="text-center">
          <p class="mb-4 inline-flex items-center gap-x-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-gray-700 ring-1 ring-primary/30 dark:bg-primary/15 dark:text-gray-200">
            <span class="relative flex size-2">
              <span class="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span class="relative inline-flex size-2 rounded-full bg-primary"></span>
            </span>
            Software Engineer · Sydney
          </p>
          <h1 class="text-balance text-5xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-7xl">
            👋 Hi, I'm <span class="bg-gradient-to-r from-primary via-[#e7b9e8] to-secondary bg-clip-text text-transparent">Rand</span>.
            <br />
            A Developer.
          </h1>
          <p class="mt-8 text-pretty text-lg font-medium text-gray-500 dark:text-gray-300 sm:text-xl/8">
            A full stack developer passionate about all things SEO and AI.
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-4">
            <router-link
              to="/showroom"
              class="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary dark:bg-white dark:text-gray-900 dark:hover:bg-primary dark:hover:text-white"
            >
              View my work
            </router-link>
            <router-link
              to="/about"
              class="rounded-full px-5 py-2.5 text-sm font-semibold text-gray-900 ring-1 ring-gray-900/15 transition-colors hover:bg-gray-100 dark:text-white dark:ring-white/20 dark:hover:bg-white/10"
            >
              About me <span aria-hidden="true">→</span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="mx-auto hidden max-w-4xl md:block">
        <component is="script" src="https://unpkg.com/@dotlottie/player-component@2.7.12/dist/dotlottie-player.mjs" type="module"></component>
        <dotlottie-player src="https://lottie.host/f837f061-1132-4d98-8bac-6a528faace49/Ek6BjUty8w.lottie" background="transparent" speed="1" style="width: 450px; height: 450px" loop autoplay></dotlottie-player>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
