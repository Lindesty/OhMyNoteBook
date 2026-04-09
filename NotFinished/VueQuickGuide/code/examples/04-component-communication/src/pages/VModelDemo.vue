/**
 * v-model 示例 - 双向绑定
 */

<template>
  <div class="demo">
    <h3>4. v-model 双向绑定</h3>
    <div class="father">
      <h4>父组件</h4>
      <p>输入值：{{ inputValue }}</p>
      <CustomInput v-model="inputValue" />
    </div>
    <p class="note">提示：v-model 是 prop + emit 的语法糖</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomInput from './CustomInput.vue'

defineOptions({
  name: 'VModelDemo'
})

let inputValue = ref('')
</script>

<style scoped>
.demo {
  padding: 20px;
}

.father {
  padding: 20px;
  background: #e0f2fe;
  border-radius: 8px;
}

h3 {
  color: #0369a1;
  margin-bottom: 15px;
}

h4 {
  color: #35495e;
  margin-bottom: 10px;
}

.note {
  margin-top: 15px;
  color: #64748b;
  font-size: 14px;
}
</style>