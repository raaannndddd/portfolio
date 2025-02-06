import { createApp } from 'vue'
import './style.css'
import App from './App.vue' 
import {Icon} from '@iconify/vue/dist/iconify.js'

createApp(App).component('Icon', Icon). mount('#app')