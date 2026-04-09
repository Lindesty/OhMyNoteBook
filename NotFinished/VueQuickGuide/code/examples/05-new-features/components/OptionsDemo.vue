/**
 * defineOptions 宏示例 (Vue 3.3+)
 *
 * defineOptions 允许在 <script setup> 中声明组件选项
 * 编译器宏，无需从 vue 导入
 */

<template>
  <div class="options-demo">
    <h2>defineOptions 示例</h2>
    <p>组件名称: {{ componentName }}</p>
    <p>未传递的属性: {{ $attrs }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// ==========================================
// defineOptions 宏 (Vue 3.3+)
// ==========================================

defineOptions({
  // 设置组件名称 (用于 Vue DevTools 和递归组件)
  name: 'OptionsDemoComponent',

  // 是否继承父组件传递的非 prop 属性
  // false: $attrs 不会自动绑定到根元素
  inheritAttrs: false,

  // 其他组件选项...
  // compatConfig: { ... },  // Vue 2 兼容配置
  // emits: ['change'],       // 虽然 defineEmits 更常用
})

// 组件内部状态
const componentName = ref('OptionsDemoComponent')
</script>

<style scoped>
.options-demo {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

h2 {
  color: #42b883;
  margin-bottom: 15px;
}

p {
  margin: 10px 0;
  padding: 10px;
  background: white;
  border-radius: 4px;
}
</style>