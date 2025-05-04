<template>
  <div class="bg-white">
    <div class="relative isolate px-6 pt-10 lg:px-8">
      <div
        class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style="
            clip-path: polygon(
              74.1% 44.1%,
              100% 61.6%,
              97.5% 26.9%,
              85.5% 0.1%,
              80.7% 2%,
              72.5% 32.5%,
              60.2% 62.4%,
              52.4% 68.1%,
              47.5% 58.3%,
              45.2% 34.5%,
              27.5% 76.7%,
              0.1% 64.9%,
              17.9% 100%,
              27.6% 76.8%,
              76.1% 97.7%,
              74.1% 44.1%
            );
          "
        />
      </div>
      <div class="mx-auto max-w-2xl py-10 sm:py-10 lg:pt-30">
        <div class="text-center">
          <h1
            class="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl"
          >
            Hi, I'm Rand
          </h1>
        </div>
      </div>
    </div>
<!-- Here -->
<div class="px-6 mb-20 lg:px-8 flex flex-col-reverse lg:flex-row justify-evenly items-center lg:items-start">
  <div class="max-w-2xl lg:text-left">
    <p class="mt-8 text-center align-center text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
      I am a software engineering student at the University of Sydney in my penultimate year. I’m obsessed with artificial intelligence and natural language processors, especially large language models. 
      Similarly, I love building websites and digital experiences for various products. Go to my showroom to see examples of my work!
      <br>
      Outside this website, you’ll find me at the beach, listening to music, surrounding myself in nature, or trying new foods and recipes! 
      I love learning new languages and am currently focused on improving my French (oui oui 😎). 
      I also enjoy exploring unique fashion styles, often evolving my wardrobe through thrifting and one-of-a-kind pieces :)
    </p>
  </div>
  <div class="max-w-4xl pt-10 lg:pt-0">
    <img src="../../assets/img/face.png" class="h-90 rounded-full" alt="face pic">
  </div>
</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
// const Header = defineAsyncComponent(() => import('./Header.vue'));

const mobileMenuOpen = ref(false);
</script>
