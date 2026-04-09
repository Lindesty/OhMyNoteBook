/**
 * Vue 3 基础语法示例 - 主组件
 * 包含 ref、reactive、computed、watch、生命周期、props 示例
 */

<template>
  <div class="app">
    <header>
      <h1>Vue 3 基础语法示例</h1>
      <p>第3章：组合式 API 核心概念</p>
    </header>

    <main>
      <div class="demo-grid">
        <RefDemo />
        <ReactiveDemo />
        <ComputedDemo />
        <WatchDemo />
        <LifecycleDemo />
        <PropsDemo :list="personList" />
      </div>
    </main>

    <footer>
      <p>Vue 3 快速上手指南 - 基础语法</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RefDemo from './components/RefDemo.vue'
import ReactiveDemo from './components/ReactiveDemo.vue'
import ComputedDemo from './components/ComputedDemo.vue'
import WatchDemo from './components/WatchDemo.vue'
import LifecycleDemo from './components/LifecycleDemo.vue'
import PropsDemo from './components/PropsDemo.vue'
import type { Persons } from './types'

defineOptions({
  name: 'App'
})

// PropsDemo 的数据
const personList = ref<Persons>([
  { id: '01', name: '张三', age: 18 },
  { id: '02', name: '李四', age: 20 },
  { id: '03', name: '王五', age: 22 }
])
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: #333;
  background: #f5f5f5;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 30px;
  padding: 30px 20px;
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  border-radius: 12px;
  color: white;
}

header h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}

header p {
  opacity: 0.9;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
}

footer {
  text-align: center;
  padding: 20px;
  color: #666;
  border-top: 1px solid #eee;
  margin-top: 30px;
}
</style>