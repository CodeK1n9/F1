import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { resolve } = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  build: {
    rollupOptions: {
      input: {
        demo: resolve(__dirname, 'pages/demo/index.html'),
        start: resolve(__dirname, 'pages/start/index.html'),
        game: resolve(__dirname, 'pages/game/index.html'),
      }
    }
  }
})
