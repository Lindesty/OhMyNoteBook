/**
 * Pinia 状态管理示例 - 主组件
 */

<template>
  <div class="app">
    <header>
      <h1>Pinia 状态管理示例</h1>
      <p>第5章：状态管理</p>
    </header>

    <main>
      <div class="demo-grid">
        <Count />
        <LoveTalk />
      </div>

      <div class="store-info">
        <h3>Pinia 核心概念</h3>
        <div class="cards">
          <div class="card">
            <h4>state</h4>
            <p>存储应用的状态数据</p>
          </div>
          <div class="card">
            <h4>getters</h4>
            <p>计算属性，派生状态</p>
          </div>
          <div class="card">
            <h4>actions</h4>
            <p>方法，修改状态（支持异步）</p>
          </div>
        </div>
      </div>
    </main>

    <footer>
      <p>Vue 3 快速上手指南 - Pinia 示例</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import Count from './components/Count.vue'
import LoveTalk from './components/LoveTalk.vue'

defineOptions({
  name: 'App'
})
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
  max-width: 900px;
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
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.store-info {
  padding: 20px;
  background: white;
  border-radius: 8px;
}

.store-info h3 {
  color: #42b883;
  margin-bottom: 15px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.card {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
  border-left: 4px solid #42b883;
}

.card h4 {
  color: #35495e;
  margin-bottom: 8px;
}

.card p {
  color: #666;
  font-size: 14px;
}

footer {
  text-align: center;
  padding: 20px;
  color: #666;
  margin-top: 30px;
}
</style>