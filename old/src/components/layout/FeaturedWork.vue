<template>
  <section class="px-6 py-24 sm:py-32 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-balance text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Featured Work
        </h2>
        <p class="mt-4 text-lg/8 text-gray-600 dark:text-gray-300">
          A client site, my honours research, an industry capstone, and a computer-vision side project — a few that show how I work.
        </p>
      </div>

      <div class="relative mt-12 sm:mt-16">
        <button
          type="button"
          @click="scroll(-1)"
          aria-label="Previous project"
          class="absolute left-0 top-1/2 z-10 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg ring-1 ring-gray-900/10 backdrop-blur transition hover:scale-105 hover:bg-white dark:bg-gray-800/90 dark:text-white dark:ring-white/10 dark:hover:bg-gray-800 sm:left-2"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="size-5" aria-hidden="true">
            <path d="M15 19 8 12l7-7" />
          </svg>
        </button>

        <div
          ref="scroller"
          class="flex snap-x snap-mandatory gap-8 overflow-x-auto px-6 pb-4 lg:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <article
            v-for="item in loopedItems"
            :key="item.key"
            class="group relative isolate flex w-[85vw] max-w-md shrink-0 snap-center flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-52 ring-1 ring-gray-900/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 hover:ring-primary/40 dark:ring-white/10 sm:w-[28rem] sm:pt-64"
          >
            <img
              v-if="item.project.image"
              :src="item.project.image"
              :alt="`Screenshot of ${item.project.title}`"
              loading="lazy"
              decoding="async"
              class="absolute inset-0 -z-10 size-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div v-else class="absolute inset-0 -z-10 bg-gradient-to-br from-primary via-[#b48ad6] to-secondary transition-transform duration-300 group-hover:scale-110">
              <span class="absolute inset-0 flex items-center justify-center pb-24 text-8xl font-bold text-white/40" aria-hidden="true">
                {{ item.project.title.charAt(0) }}
              </span>
            </div>
            <div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/50 opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

            <div class="flex flex-wrap items-center gap-2 text-sm/6">
              <span
                v-for="tag in item.project.tags"
                :key="tag"
                class="rounded-full bg-primary/20 px-3 py-0.5 text-xs font-medium text-gray-200 ring-1 ring-primary/40 backdrop-blur-sm"
              >{{ tag }}</span>
            </div>
            <h3 class="mt-3 text-lg/6 font-semibold text-white">
              <component :is="item.project.href ? 'a' : 'span'" :href="item.project.href || undefined">
                <span class="absolute inset-0" />
                {{ item.project.title }}
              </component>
            </h3>
            <p class="mt-2 line-clamp-3 text-sm/6 text-gray-300">{{ item.project.description }}</p>
          </article>
        </div>

        <button
          type="button"
          @click="scroll(1)"
          aria-label="Next project"
          class="absolute right-0 top-1/2 z-10 flex size-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg ring-1 ring-gray-900/10 backdrop-blur transition hover:scale-105 hover:bg-white dark:bg-gray-800/90 dark:text-white dark:ring-white/10 dark:hover:bg-gray-800 sm:right-2"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="size-5" aria-hidden="true">
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      <div class="mt-12 text-center">
        <router-link
          to="/showroom"
          class="inline-flex items-center gap-1 rounded-full px-5 py-2.5 text-sm font-semibold text-gray-900 ring-1 ring-gray-900/15 transition-colors hover:bg-gray-100 dark:text-white dark:ring-white/20 dark:hover:bg-white/10"
        >
          See all work <span aria-hidden="true">→</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import data from '@/data/projects.json'

const featured = computed(() => data.projects.filter((p) => p.featured))

// Three copies of the projects laid side by side so the carousel can be
// nudged back to the middle copy invisibly, making it feel endless.
const loopedItems = computed(() =>
  [...featured.value, ...featured.value, ...featured.value].map((project, index) => ({
    project,
    key: `${project.id}-${index}`,
  })),
)

const scroller = ref(null)
let cardStep = 0
let setWidth = 0
let scrollEndTimer = null

function measure() {
  const el = scroller.value
  if (!el || el.children.length < featured.value.length + 1) return
  cardStep = el.children[1].offsetLeft - el.children[0].offsetLeft
  setWidth = cardStep * featured.value.length
}

function centerScroll() {
  const el = scroller.value
  if (!el) return
  measure()
  el.scrollLeft = setWidth
}

function handleScroll() {
  if (scrollEndTimer) clearTimeout(scrollEndTimer)
  scrollEndTimer = setTimeout(() => {
    const el = scroller.value
    if (!el || !setWidth) return
    if (el.scrollLeft < setWidth * 0.5) {
      el.scrollLeft += setWidth
    } else if (el.scrollLeft > setWidth * 1.5) {
      el.scrollLeft -= setWidth
    }
  }, 120)
}

function scroll(direction) {
  const el = scroller.value
  if (!el) return
  if (!cardStep) measure()
  el.scrollBy({ left: direction * cardStep, behavior: 'smooth' })
}

onMounted(() => {
  requestAnimationFrame(centerScroll)
  scroller.value?.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', measure)
})

onBeforeUnmount(() => {
  scroller.value?.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', measure)
  if (scrollEndTimer) clearTimeout(scrollEndTimer)
})
</script>
