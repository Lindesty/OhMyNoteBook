/**
 * computed 计算属性示例
 * 展示 computed 创建计算属性的两种方式：只读和可读写
 */

<template>
  <div class="demo">
    <h3>computed 计算属性</h3>
    <div class="input-group">
      <label>姓：</label>
      <input type="text" v-model="firstName">
    </div>
    <div class="input-group">
      <label>名：</label>
      <input type="text" v-model="lastName">
    </div>
    <button @click="changeFullName">将全名改为 li-si</button>
    <div class="result">
      <p>全名（计算属性）：{{ fullName }}</p>
      <p class="note">提示：计算属性有缓存，多次访问只计算一次</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

defineOptions({
  name: 'ComputedDemo'
})

let firstName = ref('zhang')
let lastName = ref('san')

// 计算属性 - 可读可写版本
let fullName = computed({
  // getter：读取时调用
  get() {
    return firstName.value.slice(0, 1).toUpperCase() + firstName.value.slice(1) + '-' + lastName.value
  },
  // setter：修改时调用
  set(val) {
    const [str1, str2] = val.split('-')
    firstName.value = str1
    lastName.value = str2
  }
})

function changeFullName() {
  fullName.value = 'li-si' // 通过 setter 修改
}
</script>

<style scoped>
.demo {
  padding: 20px;
  background: #fef3c7;
  border-radius: 8px;
  border: 1px solid #fde68a;
}

h3 {
  color: #b45309;
  margin-bottom: 15px;
}

.input-group {
  margin: 10px 0;
}

label {
  display: inline-block;
  width: 40px;
}

input {
  padding: 5px;
  border: 1px solid #fbbf24;
  border-radius: 4px;
}

button {
  margin: 15px 0;
  padding: 8px 16px;
  background: #b45309;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #92400e;
}

.result {
  margin-top: 15px;
  padding: 10px;
  background: white;
  border-radius: 4px;
}

.note {
  color: #64748b;
  font-size: 14px;
}
</style>