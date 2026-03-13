<template>
  <div class="bg-white py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Previous Works</h2>
        <p class="mt-2 text-lg/8 text-gray-600">
        Check my 
        <a href="https://github.com/raaannndddd" class="text-blue-500 hover:underline">GitHub</a>
        for my latest projects!
      </p>
      </div>
      <div class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <article v-for="post in previous" :key="post.id" class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 transition-transform duration-300 hover:scale-105 hover:shadow-xl group">
          <img :src="post.imageUrl" :alt="post.title" loading="lazy" decoding="async" class="absolute inset-0 -z-10 size-full object-cover transition-transform duration-300 group-hover:scale-110" />
          <div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
          <div class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

          <div class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300">
            <div class="-ml-4 flex items-center gap-x-4">
              <svg viewBox="0 0 2 2" class="-ml-0.5 size-0.5 flex-none fill-white/50">
                <circle cx="1" cy="1" r="1" />
              </svg>
            </div>
          </div>
          <h3 class="mt-3 text-lg/6 font-semibold text-white">
            <a :href="post.href">
              <span class="absolute inset-0" />
              {{ post.title }}
              <br/>
              {{ post.description }}
            </a>
          </h3>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
const previous = [
  {
    id: 1,
    title: 'Volume Control:',
    href: 'https://github.com/raaannndddd/VolumeControl',
    description:
      'Program that uses hand gestures to control the volume',
    imageUrl:
      '/img/vol_control.webp',
  },
  {
    id: 2,
    title: 'Advertising Effectiveness Analysis:',
    href: 'https://bitbucket.org/m10_04/soft3888_m10_04/src/main/',
    description:
      'AI system to study effectiveness of advertising in shopping centres with real-time analysis and feedback',
    imageUrl:
      '/img/advertise.webp',
  },
  {
    id: 3,
    title: 'Portfolio Website:',
    href: 'https://github.com/raaannndddd/portfolio',
    description:
      'A website to introduce myself and showcase my work',
    imageUrl:
      '/img/website.webp',
  },
  {
    id: 4,
    title: 'Jordan Language Academy Website:',
    href: 'https://jla-website-green.vercel.app',
    description:
      'SEO/ GEO Friendly website for a language academy based in Jordan',
    imageUrl:
      '/img/jla.webp',
  },
  {
    id: 5,
    title: 'Chronic Kidney Disease Predictor:',
    href: 'https://github.com/raaannndddd/CKD',
    description:
      'Machine learning algorithms to predict the likelihood of a person developing CKD',
    imageUrl:
      '/img/matrix.webp',
  },
  {
    id: 6,
    title: 'Space Invaders Game:',
    href: '#https://github.com/raaannndddd/SpaceInvaders',
    description:
      'Implemented the space invaders game with extra features',
    imageUrl:
      '/img/space_invaders.webp',
  },
  {
    id: 7,
    title: 'Multi-type Linked List:',
    href: 'https://github.com/raaannndddd/LinkedList',
    description:
      'Multi-type linked list and a program to use it.',
    imageUrl:
      '/img/linked_list.webp',
  },
  {
    id: 8,
    title: 'P2P File-Transfer program:',
    href: 'https://github.com/raaannndddd/P2P-File-Transfer-System',
    description:
      'P2P File-Transfer program that will allow sending, receiving and detection of anomalous data chunks',
    imageUrl:
      '/img/bytetide.webp',
  },
  {
    id: 9,
    title: 'Scroll Manager:',
    href: '#',
    description:
      'Program to manage and update binary digital scrolls.',
    imageUrl:
      '/img/scrolls.webp',
  },
  {
    id: 10,
    title: 'Sleep Aponea Website:',
    href: 'https://github.com/raaannndddd/SleepApnoeaWebsite',
    description:
      'Implemented for a startup pitch that aims to improve the diagnosis of sleep aponea',
    imageUrl:
      '/img/swillow.webp',
  },
]
</script>