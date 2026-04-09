/**
 * provide/inject 子组件
 */

<template>
  <div class="child">
    <h4>子组件</h4>
    <p>接收到的钱：{{ money }} 元</p>
    <button @click="updateMoney(50)">申请50元</button>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'

defineOptions({
  name: 'ProvideInjectChild'
})

// 注入父组件提供的数据
const money = inject<number>('money', 0)
const updateMoney = inject<(value: number) => void>('updateMoney', () => {})
</script>

<style scoped>
.child {
  margin-top: 15px;
  padding: 15px;
  background: #fbcfe8;
  border-radius: 8px;
}

button {
  padding: 8px 16px;
  background: #9d174d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>