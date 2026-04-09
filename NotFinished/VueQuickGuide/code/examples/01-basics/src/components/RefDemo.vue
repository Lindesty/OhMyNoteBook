/**
 * ref 基本类型响应式数据示例
 * 展示 ref 创建基本类型响应式数据的使用方法
 */

<template>
  <div class="demo">
    <h3>ref 创建基本类型响应式数据</h3>
    <p>姓名：{{ name }}</p>
    <p>年龄：{{ age }}</p>
    <p>地址：{{ address }}</p>
    <div class="button-group">
      <button @click="changeName">修改名字</button>
      <button @click="changeAge">修改年龄</button>
      <button @click="showTel">查看联系方式</button>
    </div>
    <p class="note">提示：tel 不是响应式数据，修改不会触发视图更新</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'RefDemo'
})

// ref 创建的响应式数据
let name = ref('张三')
let age = ref(18)
let tel = '13888888888' // 普通变量，非响应式
let address = '北京昌平区宏福苑·宏福科技园'

function changeName() {
  name.value = 'zhang-san' // JS 中操作 ref 需要 .value
}

function changeAge() {
  age.value += 1
}

function showTel() {
  alert(tel)
}
</script>

<style scoped>
.demo {
  padding: 20px;
  background: #f0f9ff;
  border-radius: 8px;
  border: 1px solid #bae6fd;
}

h3 {
  color: #0284c7;
  margin-bottom: 15px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

button {
  padding: 8px 16px;
  background: #0284c7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0369a1;
}

.note {
  margin-top: 15px;
  color: #64748b;
  font-size: 14px;
}
</style>