/**
 * 首页组件
 */

<template>
  <div class="page">
    <h2>首页</h2>
    <p>欢迎来到 Vue 3 路由示例！</p>
    <div class="content">
      <p>本示例展示了 Vue Router 的基本用法：</p>
      <ul>
        <li>路由基本配置</li>
        <li>路由导航</li>
        <li>路由重定向</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Home'
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

ul {
  margin-top: 10px;
  padding-left: 20px;
}

li {
  margin: 5px 0;
}
</style>