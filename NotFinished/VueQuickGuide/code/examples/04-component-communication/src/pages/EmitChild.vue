/**
 * 自定义事件子组件
 */

<template>
  <div class="child">
    <h4>子组件</h4>
    <p>我的玩具：{{ toy }}</p>
    <button @click="emitGift">送给父组件</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'EmitChild'
})

let toy = ref('小汽车')

// Vue 3.3+ 简洁语法声明 emit
const emit = defineEmits<{
  giveGift: [value: string]
}>()

function emitGift() {
  emit('giveGift', toy.value)
}
</script>

<style scoped>
.child {
  margin-top: 15px;
  padding: 15px;
  background: #fae8ff;
  border-radius: 8px;
}

button {
  padding: 8px 16px;
  background: #a21caf;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>