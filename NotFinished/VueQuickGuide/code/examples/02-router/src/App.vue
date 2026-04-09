/**
 * Vue Router 示例 - 主组件
 */

<template>
  <div class="app">
    <header>
      <h1>Vue Router 示例</h1>
      <p>第4章：路由管理</p>
    </header>

    <nav class="navbar">
      <router-link active-class="active" to="/home">首页</router-link>
      <router-link active-class="active" to="/news">新闻</router-link>
      <router-link active-class="active" to="/about">关于</router-link>
    </nav>

    <main>
      <router-view></router-view>
    </main>

    <footer>
      <p>Vue 3 快速上手指南 - 路由示例</p>
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
  max-width: 900px;
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
  font-size: 1.8rem;
  margin-bottom: 5px;
}

.navbar {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 15px;
  background: white;
  border-radius: 8px;
  margin-bottom: 20px;
}

.navbar a {
  padding: 10px 20px;
  text-decoration: none;
  color: #35495e;
  border-radius: 4px;
  transition: background 0.2s;
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