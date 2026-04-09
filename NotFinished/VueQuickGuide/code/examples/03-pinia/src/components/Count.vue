/**
 * Count 组件 - 使用 Pinia store
 */

<template>
  <div class="count">
    <h3>计数器示例</h3>
    <p>当前求和：{{ sum }}，放大 10 倍后：{{ bigSum }}</p>
    <p>学校：{{ school }}（{{ upperSchool }}）</p>
    <p>地址：{{ address }}</p>

    <div class="controls">
      <select v-model.number="n">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <button @click="add">加</button>
      <button @click="minus">减</button>
      <button @click="reset">重置</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useCountStore } from '@/store/count'

defineOptions({
  name: 'Count'
})

const countStore = useCountStore()
// storeToRefs 只会关注 store 中数据，不会对方法进行 ref 包裹
const { sum, school, address, bigSum, upperSchool } = storeToRefs(countStore)

let n = ref(1)

function add() {
  countStore.increment(n.value)
}

function minus() {
  countStore.decrement(n.value)
}

function reset() {
  countStore.$reset()
}
</script>

<style scoped>
.count {
  padding: 20px;
  background: #e0f2fe;
  border-radius: 8px;
  border: 1px solid #bae6fd;
}

h3 {
  color: #0369a1;
  margin-bottom: 15px;
}

.controls {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

select,
button {
  padding: 8px 16px;
  border-radius: 4px;
}

select {
  border: 1px solid #bae6fd;
}

button {
  background: #0369a1;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background: #0284c7;
}
</style>