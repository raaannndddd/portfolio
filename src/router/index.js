import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/layout/Home.vue';
import About from '../About.vue';
import Showroom from '../Showroom.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/showroom', name: 'Showroom', component: Showroom },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;