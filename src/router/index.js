import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'Home', component: () => import('../components/layout/Home.vue') },
  { path: '/about', name: 'About', component: () => import('../About.vue') },
  { path: '/showroom', name: 'Showroom', component: () => import('../Showroom.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;