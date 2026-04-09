/**
 * 响应式 Props 解构示例 (Vue 3.5+)
 *
 * Vue 3.5+ 支持响应式解构 props
 * 解构后的变量保持响应性，支持原生默认值语法
 */

<template>
  <div class="reactive-props-demo">
    <h2>响应式 Props 解构 (Vue 3.5+)</h2>

    <div class="prop-item">
      <h3>基本用法</h3>
      <p>标题: {{ title }}</p>
    </div>

    <div class="prop-item">
      <h3>带默认值</h3>
      <p>计数: {{ count }}</p>
      <p>状态: {{ status }}</p>
    </div>

    <div class="prop-item">
      <h3>数组默认值</h3>
      <ul>
        <li v-for="item in items" :key="item">{{ item }}</li>
      </ul>
    </div>

    <div class="prop-item">
      <h3>对象默认值</h3>
      <p>用户名: {{ user.name }}</p>
      <p>邮箱: {{ user.email }}</p>
    </div>

    <div class="note">
      <p>注意: 在 Vue 3.4 及以下版本中，需要使用 withDefaults:</p>
      <code>
        const props = withDefaults(defineProps&lt;Props&gt;(), {'{'}
          count: 0,
          status: 'active'
        {'}'})
      </code>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'

// ==========================================
// 定义 Props 接口
// ==========================================
interface User {
  name: string
  email: string
}

interface Props {
  // 必填 prop
  title: string

  // 可选 prop 带默认值
  count?: number
  status?: string

  // 数组类型带默认值
  items?: string[]

  // 对象类型带默认值
  user?: User
}

// ==========================================
// Vue 3.5+ 响应式 Props 解构
// ==========================================

// 方式1: 直接解构，使用原生默认值语法
const {
  title,
  count = 0,
  status = 'active',
  items = ['默认项1', '默认项2'],
  user = { name: '默认用户', email: 'default@example.com' }
} = defineProps<Props>()

// ==========================================
// Vue 3.5+ 响应式特性
// ==========================================

// watchEffect 会跟踪解构后的 props
// 当 props 变化时，watchEffect 会重新执行
watchEffect(() => {
  console.log('标题变化:', title)
  console.log('计数变化:', count)
})

// ==========================================
// Vue 3.4 及以下的写法 (对比参考)
// ==========================================
/*
interface Props {
  title: string
  count?: number
  status?: string
  items?: string[]
  user?: User
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
  status: 'active',
  items: () => ['默认项1', '默认项2'],
  user: () => ({ name: '默认用户', email: 'default@example.com' })
})

// 使用时需要 props.title, props.count 等
watchEffect(() => {
  console.log('标题变化:', props.title)
})
*/
</script>

<style scoped>
.reactive-props-demo {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  color: #42b883;
  margin-bottom: 20px;
}

.prop-item {
  margin-bottom: 20px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
}

.prop-item h3 {
  margin-bottom: 10px;
  color: #333;
}

.note {
  padding: 15px;
  background: #fff3cd;
  border-radius: 8px;
  font-size: 14px;
}

.note code {
  display: block;
  margin-top: 10px;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 4px;
  font-family: monospace;
  white-space: pre-wrap;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 5px 10px;
  background: white;
  margin: 5px 0;
  border-radius: 4px;
}
</style>