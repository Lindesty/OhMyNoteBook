/**
 * 插槽容器组件
 */

<template>
  <div class="category">
    <div class="header">
      <slot name="header">
        <h4>默认头部</h4>
      </slot>
    </div>
    <div class="content">
      <slot>
        <p>默认内容</p>
      </slot>
    </div>
    <div class="footer">
      <slot name="footer">
        <p>默认底部</p>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Category'
})
</script>

<style scoped>
.category {
  padding: 15px;
  background: #d1fae5;
  border-radius: 8px;
  border: 2px solid #047857;
}

.header,
.footer {
  padding: 10px;
  background: #a7f3d0;
}

.content {
  padding: 15px;
}
</style>