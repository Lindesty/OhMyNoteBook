import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
    // 注意: vite-plugin-vue-setup-extend 已移除
    // Vue 3.3+ 推荐使用 defineOptions({ name: 'ComponentName' }) 设置组件名
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})