import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { Icon } from '@iconify/vue/dist/iconify.js';
import router from './router';

const app = createApp(App);
app.component('Icon', Icon);
app.use(router);
app.mount('#app');