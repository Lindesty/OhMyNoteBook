/**
 * Props 子传父 - 通过函数 props
 */

<template>
  <div class="child">
    <h4>子组件</h4>
    <p>玩具：{{ toy }}</p>
    <p>父给的车：{{ car }}</p>
    <button @click="sendToy(toy)">把玩具给父亲</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'PropsChild'
})

let toy = ref('奥特曼')

// 接收父组件传递的数据和函数
defineProps<{
  car: string
  sendToy: (value: string) => void
}>()
</script>

<style scoped>
.child {
  margin-top: 15px;
  padding: 15px;
  background: #e0f2fe;
  border-radius: 8px;
}

button {
  padding: 8px 16px;
  background: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>