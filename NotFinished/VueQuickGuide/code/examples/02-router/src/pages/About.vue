/**
 * 关于页面组件
 */

<template>
  <div class="page">
    <h2>关于页</h2>
    <div class="content">
      <p>Vue 3 快速上手指南</p>
      <p>本教程帮助你快速掌握 Vue 3 的核心概念和最佳实践。</p>
      <div class="features">
        <h3>主要内容</h3>
        <ul>
          <li>组合式 API</li>
          <li>响应式系统</li>
          <li>组件通信</li>
          <li>状态管理 (Pinia)</li>
          <li>路由管理</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'About'
})
</script>

<style scoped>
.page {
  padding: 20px;
}

h2 {
  color: #42b883;
  margin-bottom: 20px;
}

.content {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
}

.features {
  margin-top: 20px;
  padding: 15px;
  background: white;
  border-radius: 8px;
}

.features h3 {
  color: #35495e;
  margin-bottom: 10px;
}

.features ul {
  padding-left: 20px;
}

.features li {
  margin: 5px 0;
}
</style>