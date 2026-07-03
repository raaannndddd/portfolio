<template>
  <div class="py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-balance text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">Previous Works</h2>
        <p class="mt-2 text-lg/8 text-gray-600 dark:text-gray-300">
          Check my
          <a href="https://github.com/raaannndddd" class="font-medium text-primary hover:underline">GitHub</a>
          for my latest projects!
        </p>
      </div>
      <div class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <article
          v-for="project in projects"
          :key="project.id"
          class="group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 ring-1 ring-gray-900/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 hover:ring-primary/40 dark:ring-white/10 sm:pt-48 lg:pt-80"
        >
          <img
            v-if="project.image"
            :src="project.image"
            :alt="project.title"
            loading="lazy"
            decoding="async"
            class="absolute inset-0 -z-10 size-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div v-else class="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-[#b48ad6] to-secondary transition-transform duration-300 group-hover:scale-110">
            <span class="absolute inset-0 flex items-center justify-center pb-24 text-8xl font-bold text-white/40" aria-hidden="true">
              {{ project.title.charAt(0) }}
            </span>
          </div>
          <div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />

          <div class="flex flex-wrap items-center gap-2 text-sm/6">
            <span
              v-if="project.language"
              class="rounded-full bg-white/10 px-3 py-0.5 text-xs font-medium text-gray-200 ring-1 ring-white/20 backdrop-blur-sm"
            >{{ project.language }}</span>
            <span
              v-for="topic in project.topics"
              :key="topic"
              class="rounded-full bg-primary/20 px-3 py-0.5 text-xs font-medium text-gray-200 ring-1 ring-primary/40 backdrop-blur-sm"
            >{{ topic }}</span>
          </div>
          <h3 class="mt-3 text-lg/6 font-semibold text-white">
            <component :is="project.href ? 'a' : 'span'" :href="project.href || undefined">
              <span class="absolute inset-0" />
              {{ project.title }}
            </component>
          </h3>
          <p class="mt-2 line-clamp-3 text-sm/6 text-gray-300">{{ project.description }}</p>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import data from '@/data/projects.json'

const projects = data.projects
</script>
