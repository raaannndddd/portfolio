import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

export default defineConfig({
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif', '**/*.JPG'],
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // Prevent small assets being inlined as base64 (keeps images as separate cached files)
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        // Manually split large vendor libraries into separate chunks for better caching
        manualChunks: {
          vue: ['vue', 'vue-router'],
          ui: ['@headlessui/vue', '@heroicons/vue'],
          icons: ['@iconify/vue'],
        }
      }
    }
  }
})