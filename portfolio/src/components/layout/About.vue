<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

import img1 from '@/assets/img/rand_and_karaz.jpg';
import img2 from '@/assets/img/beach_walk.jpg';
import img3 from '@/assets/img/cheese_platter.jpg';
import img4 from '@/assets/img/hike.jpg';
import img5 from '@/assets/img/baking.jpg';
import img6 from '@/assets/img/rand_and_friends.JPG';
import img7 from '@/assets/img/flower.jpg';
import img8 from '@/assets/img/usa.jpg';
import img9 from '@/assets/img/karaz.jpg';
import img10 from '@/assets/img/new_year_grapes.jpg';
import img11 from '@/assets/img/lany.jpg';
import img12 from '@/assets/img/rand_and_hyerim.jpg';
import img14 from '@/assets/img/snow.jpg';
import img15 from '@/assets/img/view.jpg';
import img16 from '@/assets/img/cousin_grad.jpg';
import img17 from '@/assets/img/rand_and_jazz.jpg';
import img18 from '@/assets/img/friends.JPG';
import img13 from '@/assets/img/touch_grass.JPG';
import img19 from '@/assets/img/beach.jpg';

const images = [
  { id: 1, url: img1 },
  { id: 2, url: img2 },
  { id: 3, url: img3 },
  { id: 4, url: img4 },
  { id: 5, url: img5 },
  { id: 6, url: img6 },
  { id: 7, url: img7 },
  { id: 8, url: img8 },
  { id: 9, url: img9 },
  { id: 10, url: img10 },
  { id: 11, url: img11 },
  { id: 12, url: img12 },
  { id: 13, url: img13 },
  { id: 14, url: img14 },
  { id: 15, url: img15 },
  { id: 16, url: img16 },
  { id: 17, url: img17 },
  { id: 18, url: img18 },
  { id: 19, url: img19 },
];

const config = {
  height: 400,
  itemsToShow: 4,
  gap: 1,
  wrapAround: true,
};


</script>

<template>
    <div class="mt-20">
        <div class="content-center m-20">
            <h1>Hi, I'm Rand</h1>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-[0.5fr_1.5fr] lg:grid-cols-2">
            <!-- <div class="pr-30 pl-60"> -->
            <div class="p-30 pt-0 pb-20 md:p-0 md:ml-10 lg:pr-30 lg:pl-60">
                <img src="../../assets/img/cartoon icon.webp" alt = "beach" class="border-4 border-gray-500 rounded-full p-1" />

            </div>
            <div class="content-center pr-30 pl-30">
                <h2 class="justify-center font-bold text-3xl md:text-amber-950 lg:text-amber-100">A software engineer based in Sydney, Australia.</h2>
                <br>
                <p class="justify-center">I am a software engineering student at the University of Sydney in my penultimate year. I’m obsessed with artificial intelligence and natural language processors, especially large language models. Similarly, I love building websites and digital experiences for various products. Go to my showroom to see examples of my work!
                Outside this website, you’ll find me at the beach, listening to music, surrounding myself in nature, or trying new foods and recipes! I love learning new languages and am currently focused on improving my French (oui oui 😎). I also enjoy exploring unique fashion styles, often evolving my wardrobe through thrifting and one-of-a-kind pieces :)
                </p>
            </div>
        </div>

        <div class="pt-20 pb-20">
        <h1>More of Me</h1>
        <Carousel v-bind="config" class="h-auto mt-20">
            <Slide v-for="image in images" :key="image.id">
                <img :src="image.url" alt="image" class="w-[400px] h-[400px] object-contain rounded-lg shadow-lg" />
            </Slide>

            <template #addons>
                <Navigation />
            </template>
        </Carousel>
    </div>

    </div>
</template>