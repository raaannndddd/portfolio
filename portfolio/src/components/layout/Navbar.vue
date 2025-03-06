<!-- website navigation bar component-->
<template>
  <header>
    <div class="flex items-center justify-center p-8 lg:px-12 relative z-20">
      <!-- Logo Section -->
      <!-- Uncomment if needed -->
      <!-- <div class="text-3xl font-bold dark:text-white">
          LOGO
        </div> -->

      <!-- Mobile Menu Toggle Button -->
      <div class="md:hidden z-30">
        <button
          class="block focus:outline-none"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span v-if="isMenuOpen" class="text-5xl text-white">
            <Icon icon="el:lines" />
          </span>
          <span v-else class="text-5xl text-white">
            <Icon icon="lucide:house" />
          </span>
        </button>
      </div>

      <!-- Navigation Menu -->
      <nav
        :class="[
          'fixed inset-0 z-20 flex flex-col items-center justify-center bg-primary',
          isMenuOpen ? 'flex' : 'hidden md:flex',
          'md:relative md:bg-transparent md:flex md:justify-between md:flex-row',
        ]"
      >
        <ul
          class="flex flex-col font-serif items-center justify-center space-y-5 md:flex-row md:space-x-5 md:space-y-0"
        >
          <li v-for="item in Menu" :key="item.name">
            <a
              :href="item.href"
              class="block transition ease-linear md:text-lg lg:text-xl font-bold text-white md:text-primary hover:text-secondary dark:text-white dark:hover:text-secondary"
              @click="scrollToSection(item.href)"
            >
              {{ item.name }}
            </a>
          </li>
        </ul>
        <!-- <button @click="toggleDarkMode" class="text-white ml-20 z-10 hidden md:block">  -->
          <!-- make backgruound invisible -->
          <!-- <Icon v-if="!isDarkMode" icon="line-md:moon-filled" class="text-5xl text-primary" />
          <Icon v-if="isDarkMode" icon="line-md:sunny-outline" class="text-5xl text-white" />
        </button> -->
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
const isMenuOpen = ref(false);
const Menu = ref([
  { name: "Home", href: "#home" },
  { name: "About", href: "./about" },
  { name: "Showroom", href: "#showroom" },
  { name: "Connect", href: "#connect" },
]);

const scrollToSection = (href) => {
  isMenuOpen.value = false;
  const section = document.querySelector(href);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const isDarkMode = ref(localStorage.getItem('theme') === 'dark');

// // Apply theme on load
// if (isDarkMode.value) {
//   document.documentElement.classList.add('dark');
// } else {
//   document.documentElement.classList.remove('dark');
// }

const toggleDarkMode = () => {
  // isDarkMode.value = !isDarkMode.value;
  const html = document.documentElement;

  if (isDarkMode.value) {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }

  isDarkMode.value = !isDarkMode.value;
};
</script>
