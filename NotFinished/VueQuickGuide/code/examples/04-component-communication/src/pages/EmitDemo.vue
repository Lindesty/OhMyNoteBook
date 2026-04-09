/**
 * 自定义事件通信示例 - emit
 */

<template>
  <div class="demo">
    <h3>2. 自定义事件 emit 子传父</h3>
    <div class="father">
      <h4>父组件</h4>
      <p>礼物：{{ gift }}</p>
      <Child @give-gift="receiveGift" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Child from './EmitChild.vue'

defineOptions({
  name: 'EmitDemo'
})

let gift = ref('')

// Vue 3.3+ 简洁语法
function receiveGift(value: string) {
  gift.value = value
}
</script>

<style scoped>
.demo {
  padding: 20px;
}

.father {
  padding: 20px;
  background: #fdf4ff;
  border-radius: 8px;
}

h3 {
  color: #a21caf;
  margin-bottom: 15px;
}

h4 {
  color: #86198f;
  margin-bottom: 10px;
}
</style>