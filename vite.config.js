import {fileURLToPath, URL} from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif', "**/*.JPG"],
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
  resolve:{
    alias:{
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
