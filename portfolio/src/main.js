import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { Icon } from '@iconify/vue/dist/iconify.js';

import { createRouter, createWebHistory } from "vue-router";
// import Home from "@/views/Home.vue";
import About from "./components/layout/About.vue";
// import Showroom from "@/views/Showroom.vue";
// import Connect from "@/views/Connect.vue";

const routes = [
//   { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
//   { path: "/showroom", name: "Showroom", component: Showroom },
//   { path: "/connect", name: "Connect", component: Connect },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.component('Icon', Icon);
app.use(router);  // 🔥 Register Vue Router
app.mount('#app');
