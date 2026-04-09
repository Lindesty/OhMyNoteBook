/**
 * mitt 事件总线示例 - 跨组件通信
 */

<template>
  <div class="demo">
    <h3>3. mitt 事件总线（任意组件通信）</h3>
    <div class="container">
      <div class="child1">
        <h4>组件1</h4>
        <button @click="sendMessage">发送消息给组件2</button>
      </div>
      <div class="child2">
        <h4>组件2</h4>
        <p>收到消息：{{ message }}</p>
      </div>
    </div>
    <p class="note">提示：mitt 可实现任意组件间通信，无需父子关系</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import emitter from '@/utils/emitter'

defineOptions({
  name: 'MittDemo'
})

// 组件1 发送消息
let msg = ref('你好，组件2！')

function sendMessage() {
  emitter.emit('sendMsg', msg.value)
}

// 组件2 接收消息
let message = ref('')

onMounted(() => {
  emitter.on('sendMsg', (value) => {
    message.value = value as string
  })
})

onUnmounted(() => {
  emitter.off('sendMsg')
})
</script>

<style scoped>
.demo {
  padding: 20px;
}

.container {
  display: flex;
  gap: 20px;
}

.child1,
.child2 {
  flex: 1;
  padding: 15px;
  border-radius: 8px;
}

.child1 {
  background: #fef3c7;
}

.child2 {
  background: #ecfdf5;
}

h3 {
  color: #b45309;
  margin-bottom: 15px;
}

h4 {
  color: #35495e;
  margin-bottom: 10px;
}

button {
  padding: 8px 16px;
  background: #b45309;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.note {
  margin-top: 15px;
  color: #64748b;
  font-size: 14px;
}
</style>