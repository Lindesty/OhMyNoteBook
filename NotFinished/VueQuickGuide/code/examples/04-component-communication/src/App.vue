/**
 * Vue 3 组件通信示例 - 主组件
 */

<template>
  <div class="app">
    <header>
      <h1>Vue 3 组件通信示例</h1>
      <p>第6章：组件间通信方式</p>
    </header>

    <nav class="navbar">
      <router-link active-class="active" to="/props">1. Props</router-link>
      <router-link active-class="active" to="/emit">2. emit</router-link>
      <router-link active-class="active" to="/mitt">3. mitt</router-link>
      <router-link active-class="active" to="/v-model">4. v-model</router-link>
      <router-link active-class="active" to="/provide-inject">5. provide/inject</router-link>
      <router-link active-class="active" to="/slot">6. Slot</router-link>
    </nav>

    <main>
      <router-view></router-view>
    </main>

    <footer>
      <p>Vue 3 快速上手指南 - 组件通信</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
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
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  border-radius: 12px;
  color: white;
}

header h1 {
  font-size: 1.6rem;
  margin-bottom: 5px;
}

.navbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  margin-bottom: 20px;
}

.navbar a {
  padding: 8px 16px;
  text-decoration: none;
  color: #35495e;
  border-radius: 4px;
  transition: background 0.2s;
  font-size: 14px;
}

.navbar a:hover {
  background: #f0f0f0;
}

.navbar a.active {
  background: #42b883;
  color: white;
}

main {
  background: white;
  border-radius: 8px;
  padding: 20px;
}

footer {
  text-align: center;
  padding: 15px;
  color: #666;
  margin-top: 20px;
}
</style>