/**
 * defineEmits 简洁语法示例 (Vue 3.3+)
 *
 * Vue 3.3+ 引入了更简洁的命名元组语法来声明 emit 类型
 */

<template>
  <div class="emits-demo">
    <h2>defineEmits 简洁语法 (Vue 3.3+)</h2>

    <div class="button-group">
      <button @click="handleClick">点击事件</button>
      <button @click="handleChange({ id: 1, name: '测试' })">变更事件</button>
      <button @click="handleSubmit('表单数据')">提交事件</button>
      <button @click="handleDelete(123)">删除事件</button>
    </div>

    <div class="event-log">
      <h3>事件日志:</h3>
      <ul>
        <li v-for="(log, index) in eventLogs" :key="index">
          {{ log }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// ==========================================
// Vue 3.0 - 3.2 的旧语法
// ==========================================
/*
const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
  (e: 'change', payload: { id: number; name: string }): void
  (e: 'submit', data: string): void
  (e: 'delete', id: number): void
}>()
*/

// ==========================================
// Vue 3.3+ 新语法 - 命名元组语法 (推荐)
// ==========================================

// 更简洁，更易读
const emit = defineEmits<{
  // 事件名: [参数类型]
  click: [event: MouseEvent]
  change: [payload: { id: number; name: string }]
  submit: [data: string]
  delete: [id: number]

  // 多参数事件
  move: [x: number, y: number]

  // 无参数事件
  reset: []
}>()

// ==========================================
// 事件处理函数
// ==========================================

const eventLogs = ref<string[]>([])

function addLog(message: string) {
  eventLogs.value.unshift(`[${new Date().toLocaleTimeString()}] ${message}`)
}

function handleClick() {
  emit('click', new MouseEvent('click'))
  addLog('触发了 click 事件')
}

function handleChange(payload: { id: number; name: string }) {
  emit('change', payload)
  addLog(`触发了 change 事件, payload: ${JSON.stringify(payload)}`)
}

function handleSubmit(data: string) {
  emit('submit', data)
  addLog(`触发了 submit 事件, data: ${data}`)
}

function handleDelete(id: number) {
  emit('delete', id)
  addLog(`触发了 delete 事件, id: ${id}`)
}

// 多参数事件示例
function handleMove() {
  emit('move', 100, 200)
  addLog('触发了 move 事件, x: 100, y: 200')
}

// 无参数事件示例
function handleReset() {
  emit('reset')
  addLog('触发了 reset 事件')
}
</script>

<style scoped>
.emits-demo {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  color: #42b883;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

button:hover {
  background: #3aa876;
}

.event-log {
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
}

.event-log h3 {
  margin-bottom: 10px;
  color: #333;
}

.event-log ul {
  list-style: none;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
}

.event-log li {
  padding: 8px 12px;
  background: white;
  margin: 5px 0;
  border-radius: 4px;
  font-family: monospace;
  font-size: 13px;
}
</style>