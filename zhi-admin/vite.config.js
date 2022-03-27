import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias:{
      "@src": resolve(__dirname, './src')
    }
  },
  server:{
    port: 3100,
    proxy: {
      // 选项写法
      '/api': {
        target: 'https://www.health-longevity.top',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    https: true,
  },
})
