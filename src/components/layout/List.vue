<template>
  <div class="py-24 sm:py-32">
    <div class="mx-auto max-w-5xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-balance text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">Selected Work</h2>
        <p class="mt-4 text-lg/8 text-gray-600 dark:text-gray-300">
          Client work, research and things I've built to learn. The first few are the ones I'm proudest of.
        </p>
      </div>

      <!-- Featured — one project per row, alternating sides -->
      <div class="mt-16 flex flex-col gap-16 sm:mt-20 sm:gap-24">
        <article
          v-for="(project, i) in featured"
          :key="project.id"
          class="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
        >
          <!-- Visual -->
          <div :class="i % 2 === 1 ? 'lg:order-2' : ''">
            <div class="group relative aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-gray-900/10 dark:ring-white/10">
              <img
                v-if="project.image"
                :src="project.image"
                :alt="`Screenshot of ${project.title}`"
                loading="lazy"
                decoding="async"
                class="size-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div v-else class="flex size-full items-center justify-center bg-gradient-to-br from-primary via-[#b48ad6] to-secondary">
                <span class="text-8xl font-bold text-white/40" aria-hidden="true">{{ project.title.charAt(0) }}</span>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div :class="i % 2 === 1 ? 'lg:order-1' : ''">
            <p class="text-sm font-semibold uppercase tracking-wide text-primary">Featured project</p>
            <h3 class="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">{{ project.title }}</h3>
            <p v-if="project.caseStudy?.role" class="mt-1 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">{{ project.caseStudy.role }}</p>
            <p class="mt-4 text-pretty text-base/7 text-gray-600 dark:text-gray-300">{{ project.description }}</p>

            <!-- Case-study proof (renders only when data is supplied) -->
            <div v-if="project.caseStudy?.metric || project.caseStudy?.testimonial" class="mt-5 flex flex-col gap-3">
              <div v-if="project.caseStudy?.metric" class="flex items-baseline gap-2">
                <span class="text-2xl font-bold text-gray-900 dark:text-white">{{ project.caseStudy.metric }}</span>
                <span class="text-xs text-gray-500 dark:text-gray-400">{{ project.caseStudy.metricLabel }}</span>
              </div>
              <blockquote v-if="project.caseStudy?.testimonial" class="border-l-2 border-primary pl-3 text-sm italic text-gray-600 dark:text-gray-300">
                "{{ project.caseStudy.testimonial }}"
                <cite v-if="project.caseStudy?.testimonialAuthor" class="mt-1 block text-xs not-italic text-gray-500 dark:text-gray-400">— {{ project.caseStudy.testimonialAuthor }}</cite>
              </blockquote>
            </div>

            <ul class="mt-5 flex flex-wrap gap-2">
              <li
                v-for="tag in builtWith(project)"
                :key="tag"
                class="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-medium text-gray-700 ring-1 ring-primary/30 dark:bg-primary/15 dark:text-gray-200"
              >{{ tag }}</li>
            </ul>

            <div class="mt-6 flex flex-wrap gap-3">
              <a
                v-if="project.href"
                :href="project.href"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-1.5 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary dark:bg-white dark:text-gray-900 dark:hover:bg-primary dark:hover:text-white"
              >
                {{ linkLabel(project.href) }} <span aria-hidden="true">→</span>
              </a>
              <a
                v-if="project.reportHref"
                :href="project.reportHref"
                target="_blank"
                rel="noopener"
                class="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-gray-900 ring-1 ring-gray-900/15 transition-colors hover:bg-gray-100 dark:text-white dark:ring-white/20 dark:hover:bg-white/10"
              >
                View report <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </article>
      </div>

      <!-- Archive — everything else -->
      <div class="relative mt-24 flex flex-col items-center gap-4 sm:mt-32 sm:flex-row sm:justify-center">
        <h3 class="text-center text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Archive</h3>
        <Popover class="sm:absolute sm:right-0">
          <PopoverButton
            class="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-gray-600 ring-1 ring-gray-900/10 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:ring-white/15 dark:hover:bg-white/10"
          >
            <FunnelIcon class="size-3.5" aria-hidden="true" />
            Filter
            <span
              v-if="selectedFilters.length"
              class="ml-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white"
            >{{ selectedFilters.length }}</span>
          </PopoverButton>

          <transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 translate-y-1"
          >
            <PopoverPanel class="absolute right-0 z-10 mt-2 w-72 origin-top-right rounded-2xl bg-white p-4 shadow-lg ring-1 ring-gray-900/10 dark:bg-surface-dark dark:ring-white/10">
              <div class="flex items-center justify-between">
                <p class="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Filter by</p>
                <button
                  v-if="selectedFilters.length"
                  type="button"
                  class="text-xs font-medium text-primary hover:underline"
                  @click="selectedFilters = []"
                >Clear all</button>
              </div>
              <div class="mt-3 flex max-h-72 flex-wrap gap-1.5 overflow-y-auto pr-1">
                <button
                  v-for="tag in allTags"
                  :key="tag"
                  type="button"
                  :aria-pressed="selectedFilters.includes(tag)"
                  class="rounded-full px-2.5 py-1 text-xs font-medium transition-colors"
                  :class="selectedFilters.includes(tag)
                    ? 'bg-primary text-white'
                    : 'bg-gray-900/5 text-gray-600 hover:bg-gray-900/10 dark:bg-white/10 dark:text-gray-300 dark:hover:bg-white/20'"
                  @click="toggleFilter(tag)"
                >{{ tag }}</button>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>
      </div>

      <p v-if="selectedFilters.length && filteredArchive.length === 0" class="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        No projects match the selected filters.
      </p>

      <div v-else class="mt-8 overflow-x-auto">
        <table class="w-full border-collapse text-left">
          <thead>
            <tr class="border-b border-gray-900/10 text-xs uppercase tracking-wide text-gray-500 dark:border-white/10 dark:text-gray-400">
              <th class="py-4 pr-4 font-medium">Date</th>
              <th class="py-4 pr-4 font-medium">Project</th>
              <th class="hidden py-4 pr-4 font-medium sm:table-cell">Type</th>
              <th class="hidden py-4 pl-4 font-medium md:table-cell">Built with</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="project in filteredArchive"
              :key="project.id"
              class="group border-b border-gray-900/5 transition-colors hover:bg-primary/5 dark:border-white/5"
            >
              <td class="whitespace-nowrap py-4 pr-4 align-top text-sm text-gray-500 dark:text-gray-400">{{ formatDate(project.date) }}</td>
              <td class="py-4 pr-4 align-top">
                <p class="font-semibold text-gray-900 transition-colors group-hover:text-primary dark:text-white">{{ project.title }}</p>
                <p class="mt-1 max-w-md text-sm text-gray-500 dark:text-gray-400">{{ project.description }}</p>
              </td>
              <td class="hidden py-4 pr-4 align-top text-sm text-gray-600 dark:text-gray-300 sm:table-cell">{{ typeOf(project) }}</td>
              <td class="hidden py-4 pl-4 align-top md:table-cell">
                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="tag in builtWith(project)"
                    :key="tag"
                    class="rounded-full bg-gray-900/5 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-white/10 dark:text-gray-300"
                  >{{ tag }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { FunnelIcon } from '@heroicons/vue/24/outline'
import data from '@/data/projects.json'

const projects = data.projects

const featured = computed(() => projects.filter((p) => p.featured))
const archive = computed(() =>
  [...projects.filter((p) => !p.featured)].sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
)

const selectedFilters = ref([])

const allTags = computed(() => {
  const seen = new Set()
  const out = []
  for (const project of archive.value) {
    for (const tag of builtWith(project)) {
      if (!seen.has(tag)) {
        seen.add(tag)
        out.push(tag)
      }
    }
  }
  return out.sort((a, b) => a.localeCompare(b))
})

const filteredArchive = computed(() => {
  if (!selectedFilters.value.length) return archive.value
  return archive.value.filter((project) =>
    builtWith(project).some((tag) => selectedFilters.value.includes(tag))
  )
})

function toggleFilter(tag) {
  selectedFilters.value = selectedFilters.value.includes(tag)
    ? selectedFilters.value.filter((t) => t !== tag)
    : [...selectedFilters.value, tag]
}

function builtWith(project) {
  const seen = new Set()
  const out = []
  for (const item of [project.language, ...(project.tags ?? [])]) {
    if (item && !seen.has(item)) {
      seen.add(item)
      out.push(item)
    }
  }
  return out
}

function formatDate(date) {
  if (!date) return '—'
  const [year, month] = date.split('-')
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${monthNames[Number(month) - 1]} ${year}`
}

function typeOf(project) {
  if (project.category === 'coursework') return 'Coursework'
  if (project.category === 'personal') return 'Personal'
  if (project.category === 'client') return 'Client'
  return project.tags?.[0] ?? '—'
}

function linkLabel(href) {
  if (href.includes('github.com')) return 'View on GitHub'
  if (href.includes('drive.google.com')) return 'View project'
  return 'Visit site'
}
</script>
