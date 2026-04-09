/**
 * Vue 3.3~3.5 新特性示例
 *
 * 本文件展示以下新特性：
 * 1. defineOptions 宏 (Vue 3.3+)
 * 2. defineEmits 简洁语法 (Vue 3.3+)
 * 3. defineModel 宏 (Vue 3.4+)
 * 4. 响应式 Props 解构 (Vue 3.5+)
 */

<template>
  <div class="new-features-demo">
    <h1>Vue 3.3~3.5 新特性演示</h1>

    <!-- defineModel 示例 -->
    <section class="feature-section">
      <h2>1. defineModel 宏 (Vue 3.4+)</h2>
      <p>当前值: {{ modelValue }}</p>
      <input
        type="text"
        v-model="modelValue"
        placeholder="直接使用 defineModel"
      />
      <button @click="modelValue = '重置值'">重置</button>
    </section>

    <!-- defineModel 带参数 -->
    <section class="feature-section">
      <h2>2. defineModel 带参数</h2>
      <p>计数器: {{ count }}</p>
      <button @click="count++">+1</button>
      <button @click="count--">-1</button>
    </section>

    <!-- 响应式 Props 解构 -->
    <section class="feature-section">
      <h2>3. 响应式 Props 解构 (Vue 3.5+)</h2>
      <p>标题: {{ title }}</p>
      <p>计数 (带默认值): {{ countProp }}</p>
      <p>标签: {{ tags.join(', ') }}</p>
    </section>

    <!-- defineEmits 简洁语法 -->
    <section class="feature-section">
      <h2>4. defineEmits 简洁语法 (Vue 3.3+)</h2>
      <button @click="handleChange(123)">触发 change 事件</button>
      <button @click="handleUpdate('新值')">触发 update 事件</button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'

// ==========================================
// 1. defineOptions 宏 (Vue 3.3+)
// ==========================================
// 编译器宏，无需从 vue 导入
defineOptions({
  name: 'NewFeaturesDemo',
  inheritAttrs: true
})

// ==========================================
// 2. defineModel 宏 (Vue 3.4+)
// ==========================================
// 默认 modelValue prop
const modelValue = defineModel<string>()

// 带参数的 model
const count = defineModel<number>('count', { default: 0 })

// ==========================================
// 3. 响应式 Props 解构 (Vue 3.5+)
// ==========================================
// 注意：以下语法需要 Vue 3.5+
// 解构后的 props 保持响应性，支持原生默认值

interface Props {
  title: string
  countProp?: number
  tags?: string[]
}

// Vue 3.5+ 语法：响应式解构 + 原生默认值
const { title, countProp = 0, tags = ['默认标签'] } = defineProps<Props>()

// Vue 3.5+ 中，watchEffect 会跟踪解构后的 props
watchEffect(() => {
  console.log('title 变化:', title)
})

// ==========================================
// 4. defineEmits 简洁语法 (Vue 3.3+)
// ==========================================

// 旧语法 (Vue 3.0 - 3.2)
// const emit = defineEmits<{
//   (e: 'change', id: number): void
//   (e: 'update', value: string): void
// }>()

// 新语法 (Vue 3.3+) - 命名元组语法，更简洁
const emit = defineEmits<{
  change: [id: number]
  update: [value: string]
}>()

function handleChange(id: number) {
  emit('change', id)
  console.log('emit change:', id)
}

function handleUpdate(value: string) {
  emit('update', value)
  console.log('emit update:', value)
}
</script>

<style scoped>
.new-features-demo {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.feature-section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
}

.feature-section h2 {
  color: #42b883;
  margin-bottom: 15px;
}

input {
  padding: 8px 12px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  margin: 5px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #3aa876;
}
</style>