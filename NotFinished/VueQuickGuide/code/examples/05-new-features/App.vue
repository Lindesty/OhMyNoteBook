/**
 * Vue 3.3~3.5 新特性演示入口
 *
 * 本示例展示 Vue 3.3 到 3.5 版本引入的主要新特性
 */

<template>
  <div class="app-container">
    <header>
      <h1>🚀 Vue 3.3~3.5 新特性演示</h1>
      <p class="subtitle">基于 Composition API 的最新实践</p>
    </header>

    <main>
      <!-- 特性概览 -->
      <section class="feature-overview">
        <h2>📖 特性概览</h2>
        <div class="version-cards">
          <div class="version-card">
            <h3>Vue 3.3</h3>
            <ul>
              <li>defineEmits 简洁语法</li>
              <li>defineOptions 宏</li>
              <li>更好的 TypeScript 支持</li>
            </ul>
          </div>
          <div class="version-card">
            <h3>Vue 3.4</h3>
            <ul>
              <li>defineModel 宏</li>
              <li>v-bind 同名简写</li>
              <li>更快的模板解析</li>
            </ul>
          </div>
          <div class="version-card">
            <h3>Vue 3.5</h3>
            <ul>
              <li>响应式 Props 解构</li>
              <li>useId() API</li>
              <li>更快的响应式系统</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- 编译器宏说明 -->
      <section class="macro-note">
        <h2>💡 编译器宏</h2>
        <p>
          以下宏是 Vue 的编译器宏，在 <code>&lt;script setup&gt;</code> 中自动可用，<strong>无需从 vue 导入</strong>：
        </p>
        <ul>
          <li><code>defineProps</code> - 声明 props</li>
          <li><code>defineEmits</code> - 声明 emits</li>
          <li><code>defineExpose</code> - 暴露组件公共属性</li>
          <li><code>defineOptions</code> - 定义组件选项 (Vue 3.3+)</li>
          <li><code>defineModel</code> - 声明双向绑定 (Vue 3.4+)</li>
          <li><code>withDefaults</code> - 为 props 设置默认值</li>
        </ul>
      </section>

      <!-- 示例组件 -->
      <section class="demo-section">
        <h2>🔧 示例组件</h2>
        <div class="demo-grid">
          <div class="demo-card">
            <h3>defineModel</h3>
            <CustomInput v-model="inputValue" label="输入框" />
            <p>值: {{ inputValue }}</p>
          </div>

          <div class="demo-card">
            <h3>多个 v-model</h3>
            <UserForm
              v-model:username="formData.username"
              v-model:email="formData.email"
              v-model:age="formData.age"
            />
          </div>

          <div class="demo-card">
            <h3>defineOptions</h3>
            <OptionsDemo />
          </div>

          <div class="demo-card">
            <h3>defineEmits 简洁语法</h3>
            <EmitsDemo />
          </div>

          <div class="demo-card full-width">
            <h3>响应式 Props 解构</h3>
            <ReactivePropsDemo title="Props 解构示例" />
          </div>
        </div>
      </section>
    </main>

    <footer>
      <p>Vue 3 快速上手指南 - 新特性示例</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

// 导入示例组件
import CustomInput from './components/CustomInput.vue'
import UserForm from './components/UserForm.vue'
import OptionsDemo from './components/OptionsDemo.vue'
import EmitsDemo from './components/EmitsDemo.vue'
import ReactivePropsDemo from './components/ReactivePropsDemo.vue'

// 使用 defineOptions 设置组件名称
defineOptions({
  name: 'App'
})

// defineModel 演示数据
const inputValue = ref('')

// 多个 v-model 演示数据
const formData = reactive({
  username: '张三',
  email: 'zhangsan@example.com',
  age: 25
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
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 20px;
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  border-radius: 12px;
  color: white;
}

header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

.subtitle {
  opacity: 0.9;
  font-size: 1.1rem;
}

section {
  margin-bottom: 40px;
}

section h2 {
  color: #42b883;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #42b883;
}

.version-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.version-card {
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  border-left: 4px solid #42b883;
}

.version-card h3 {
  color: #35495e;
  margin-bottom: 15px;
}

.version-card ul {
  list-style: none;
}

.version-card li {
  padding: 5px 0;
  padding-left: 20px;
  position: relative;
}

.version-card li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #42b883;
}

.macro-note {
  padding: 20px;
  background: #e8f5e9;
  border-radius: 8px;
}

.macro-note code {
  background: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  color: #42b883;
}

.macro-note ul {
  list-style: none;
  margin-top: 15px;
}

.macro-note li {
  padding: 8px 0;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
}

.demo-card {
  padding: 20px;
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.demo-card.full-width {
  grid-column: 1 / -1;
}

.demo-card h3 {
  color: #35495e;
  margin-bottom: 15px;
  font-size: 1rem;
}

footer {
  text-align: center;
  padding: 20px;
  color: #666;
  border-top: 1px solid #eee;
  margin-top: 40px;
}
</style>