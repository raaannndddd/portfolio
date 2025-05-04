<template>
    <div class="bg-white py-24 sm:py-32">
      <!-- Previous Works -->
      <section class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center mb-12">
          <h2 class="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900">Previous Works</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <WorkCard v-for="post in previousPosts" :key="post.id" :post="post" />
        </div>
      </section>
  
      <!-- Future Works -->
      <section class="mx-auto max-w-7xl px-6 lg:px-8 mt-28">
        <div class="mx-auto max-w-2xl text-center mb-12">
          <h2 class="text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900">Future Works</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <WorkCard v-for="post in futurePosts" :key="post.id" :post="post" />
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  const previousPosts = [
    {
      id: 1,
      title: 'AI Research Paper',
      date: 'Jan 15, 2024',
      datetime: '2024-01-15',
      imageUrl: 'https://source.unsplash.com/600x400/?technology',
      href: '#',
      author: {
        name: 'John Doe',
        imageUrl: 'https://source.unsplash.com/50x50/?portrait',
      },
    },
    {
      id: 2,
      title: 'UX/UI Case Study',
      date: 'Feb 20, 2024',
      datetime: '2024-02-20',
      imageUrl: 'https://source.unsplash.com/600x400/?design',
      href: '#',
      author: {
        name: 'Jane Smith',
        imageUrl: 'https://source.unsplash.com/51x51/?portrait',
      },
    },
    {
      id: 3,
      title: 'Vue + Django App',
      date: 'Mar 10, 2024',
      datetime: '2024-03-10',
      imageUrl: 'https://source.unsplash.com/600x400/?code',
      href: '#',
      author: {
        name: 'Alice Chen',
        imageUrl: 'https://source.unsplash.com/52x52/?portrait',
      },
    },
  ];
  
  const futurePosts = [
    {
      id: 4,
      title: 'AI-Powered Email Sorter',
      date: 'Coming Soon',
      datetime: '',
      imageUrl: 'https://source.unsplash.com/600x400/?ai',
      href: '#',
      author: {
        name: 'You',
        imageUrl: 'https://source.unsplash.com/53x53/?portrait',
      },
    },
    {
      id: 5,
      title: 'Mental Health Tracker App',
      date: 'Coming Soon',
      datetime: '',
      imageUrl: 'https://source.unsplash.com/600x400/?mentalhealth',
      href: '#',
      author: {
        name: 'You',
        imageUrl: 'https://source.unsplash.com/54x54/?portrait',
      },
    },
    {
      id: 6,
      title: 'ML-based Sleep Analysis Tool',
      date: 'Coming Soon',
      datetime: '',
      imageUrl: 'https://source.unsplash.com/600x400/?sleep',
      href: '#',
      author: {
        name: 'You',
        imageUrl: 'https://source.unsplash.com/55x55/?portrait',
      },
    },
  ];
  </script>
  
  <!-- Work Card as reusable component -->
  <script>
  export default {
    components: {
      WorkCard: {
        props: ['post'],
        template: `
          <article class="relative flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 text-white shadow-md hover:shadow-xl transition-shadow duration-300">
            <img :src="post.imageUrl" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover" />
            <div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/60" />
            <div class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
            <div class="p-6">
              <div class="flex items-center gap-4 text-sm text-gray-300 mb-2">
                <time v-if="post.datetime" :datetime="post.datetime">{{ post.date }}</time>
                <div class="flex items-center gap-2">
                  <img :src="post.author.imageUrl" alt="" class="h-6 w-6 rounded-full bg-white/10" />
                  <span>{{ post.author.name }}</span>
                </div>
              </div>
              <h3 class="text-xl font-semibold">
                <a :href="post.href" class="hover:underline">{{ post.title }}</a>
              </h3>
            </div>
          </article>
        `,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Optional: Smooth fade on hover */
  article:hover img {
    filter: brightness(0.9);
  }
  </style>  