/**
 * 生命周期示例
 * 展示 Vue 3 组合式 API 中的生命周期钩子函数
 */

<template>
  <div class="demo">
    <h3>生命周期钩子</h3>
    <p>当前求和：{{ sum }}</p>
    <button @click="add">sum + 1</button>
    <button @click="destroy">销毁组件</button>
    <p class="note">打开控制台查看生命周期日志</p>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

defineOptions({
  name: 'LifecycleDemo'
})

let sum = ref(0)

function add() {
  sum.value += 1
}

function destroy() {
  // 在父组件中通过 v-if 控制销毁
}

// 生命周期钩子
console.log('setup 执行（创建阶段）')

onBeforeMount(() => {
  console.log('onBeforeMount - 挂载前')
})

onMounted(() => {
  console.log('onMounted - 挂载完毕')
})

onBeforeUpdate(() => {
  console.log('onBeforeUpdate - 更新前')
})

onUpdated(() => {
  console.log('onUpdated - 更新完毕')
})

onBeforeUnmount(() => {
  console.log('onBeforeUnmount - 卸载前')
})

onUnmounted(() => {
  console.log('onUnmounted - 卸载完毕')
})
</script>

<style scoped>
.demo {
  padding: 20px;
  background: #fce7f3;
  border-radius: 8px;
  border: 1px solid #fbcfe8;
}

h3 {
  color: #be185d;
  margin-bottom: 15px;
}

button {
  margin: 5px;
  padding: 8px 16px;
  background: #be185d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #9d174d;
}

.note {
  color: #64748b;
  font-size: 14px;
  margin-top: 15px;
}
</style>