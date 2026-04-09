/**
 * 新闻页面组件
 */

<template>
  <div class="page">
    <h2>新闻页</h2>
    <div class="news-list">
      <div v-for="news in newsList" :key="news.id" class="news-item">
        <h4>{{ news.title }}</h4>
        <p>{{ news.content }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'News'
})

const newsList = ref([
  { id: 1, title: 'Vue 3.5 发布', content: 'Vue 3.5 带来了更快的响应式系统...' },
  { id: 2, title: 'Vite 5.0 发布', content: 'Vite 5.0 提供了更好的开发体验...' },
  { id: 3, title: 'TypeScript 5.4 发布', content: 'TypeScript 5.4 新增了多项特性...' }
])
</script>

<style scoped>
.page {
  padding: 20px;
}

h2 {
  color: #42b883;
  margin-bottom: 20px;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.news-item {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
  border-left: 4px solid #42b883;
}

.news-item h4 {
  color: #35495e;
  margin-bottom: 10px;
}

.news-item p {
  color: #666;
}
</style>