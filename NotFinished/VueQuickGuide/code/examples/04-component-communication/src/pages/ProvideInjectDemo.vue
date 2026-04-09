/**
 * provide/inject 示例 - 跨层级通信
 */

<template>
  <div class="demo">
    <h3>5. provide/inject 跨层级通信</h3>
    <div class="father">
      <h4>父组件</h4>
      <p>传递的数据：{{ money }} 元</p>
      <button @click="money += 100">增加100元</button>
      <Child />
    </div>
    <p class="note">提示：provide/inject 可跨越多层组件传递数据</p>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import Child from './ProvideInjectChild.vue'

defineOptions({
  name: 'ProvideInjectDemo'
})

let money = ref(1000)

// 向后代组件提供数据
provide('money', money)
provide('updateMoney', (value: number) => {
  money.value += value
})
</script>

<style scoped>
.demo {
  padding: 20px;
}

.father {
  padding: 20px;
  background: #fce7f3;
  border-radius: 8px;
}

h3 {
  color: #be185d;
  margin-bottom: 15px;
}

h4 {
  color: #9d174d;
  margin-bottom: 10px;
}

button {
  padding: 8px 16px;
  background: #be185d;
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