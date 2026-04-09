/**
 * Props 通信示例 - 父传子
 */

<template>
  <div class="demo">
    <h3>1. Props 父传子</h3>
    <div class="father">
      <h4>父组件</h4>
      <p>汽车：{{ car }}</p>
      <p v-show="toy">子给的玩具：{{ toy }}</p>
      <Child :car="car" :sendToy="getToy" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Child from './Child.vue'

defineOptions({
  name: 'PropsDemo'
})

let car = ref('奔驰')
let toy = ref('')

function getToy(value: string) {
  toy.value = value
}
</script>

<style scoped>
.demo {
  padding: 20px;
}

.father {
  padding: 20px;
  background: #f0f0f0;
  border-radius: 8px;
}

h3 {
  color: #42b883;
  margin-bottom: 15px;
}

h4 {
  color: #35495e;
  margin-bottom: 10px;
}
</style>