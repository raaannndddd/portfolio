<template>
    <header>
        <div class = "flex justify-between items-center p-8 lg:px-12 relative z-20  ">
            <div class="text-3xl font-bold dark:text-white">
                LOGO 
            </div>
            <div class="md:hidden z-30">
                <button class="block focus:outline-none"> @click = "isMenuOpen = !isMenuOpen "
                    <span v-if="isMenuOpen" class="text-5xl md:text-primary text-white dark:text-white ">
                        <Icon icon="el:lines"/>
                    </span>
                    <span v-else  class="text-5xl md:text-primary text-white dark:text-white ">
                        <Icon icon="lucide:house"/>
                    </span>
                </button>
            </div>
            <nav :class="['fixed inset-0 z-20 flex flex-col items-center justify-center bg-primary md:relative md:bg-transparent md:flex md:justify-between md:flex-row',isMenuOpen ? 'flex' : 'hidden md:flex']">
                <ul class="flex flex-col items-center space-y-5 md:flex-row md:space-x-5 md:space-y-0">
                    <li v-for="item in Menu" :key = " item.name" >
                        <a href="item.href" class="block transition ease-linear md:text-lg lg:text-xl font-bold text-white  md:text-primary hover:text-secondary  dark:text-white dark:hover:text-secondary"
                        @click="scrollToSection(item.href)">
                            {{ item.name }}
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue';
const isMenuOpen = ref(false); 
const Menu = ref([
    {name: 'Services' ,href: '#services'},
    {name: 'Services' ,href: '#services'},
    {name: 'Services' ,href: '#services'},
    {name: 'Services', href: '#services'},
]);

const scrollToSection = (href) => {
    isMenuOpen.value = false;
    const section = document.querySelector(href);
    if (section){
        section.scrollIntoView({behavior:"smooth"});
    }
}
</script>