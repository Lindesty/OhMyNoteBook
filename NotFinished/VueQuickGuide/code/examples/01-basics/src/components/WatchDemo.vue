/**
 * watch 监视示例
 * 展示 watch 监视各种类型数据的用法
 */

<template>
  <div class="demo">
    <h3>watch 监视响应式数据</h3>

    <div class="section">
      <h4>监视 ref 基本类型</h4>
      <p>当前求和：{{ sum }}</p>
      <button @click="changeSum">sum + 1</button>
      <p class="note">当 sum >= 10 时停止监视</p>
    </div>

    <div class="section">
      <h4>监视 reactive 对象</h4>
      <p>汽车价格：{{ car.price }} 万</p>
      <button @click="changePrice">价格 + 10</button>
    </div>

    <div class="section">
      <h4>监视对象属性</h4>
      <p>汽车品牌：{{ car.brand }}</p>
      <button @click="changeBrand">修改品牌</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'

defineOptions({
  name: 'WatchDemo'
})

// 情况一：监视 ref 定义的基本类型数据
let sum = ref(0)

function changeSum() {
  sum.value += 1
}

const stopWatch = watch(sum, (newValue, oldValue) => {
  console.log('sum 变化了', newValue, oldValue)
  if (newValue >= 10) {
    stopWatch() // 停止监视
    console.log('监视已停止')
  }
})

// 情况二：监视 reactive 定义的对象
let car = reactive({ brand: '奔驰', price: 100 })

watch(car, (newValue, oldValue) => {
  console.log('car 变化了', newValue, oldValue)
})

function changePrice() {
  car.price += 10
}

// 情况三：监视对象中的某个属性（需要用 getter 函数）
watch(
  () => car.brand,
  (newValue, oldValue) => {
    console.log('car.brand 变化了', newValue, oldValue)
  }
)

function changeBrand() {
  car.brand = '宝马'
}
</script>

<style scoped>
.demo {
  padding: 20px;
  background: #ecfdf5;
  border-radius: 8px;
  border: 1px solid #d1fae5;
}

h3 {
  color: #047857;
  margin-bottom: 15px;
}

.section {
  margin: 15px 0;
  padding: 15px;
  background: white;
  border-radius: 4px;
}

h4 {
  color: #059669;
  margin-bottom: 10px;
}

button {
  padding: 8px 16px;
  background: #047857;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #065f46;
}

.note {
  color: #64748b;
  font-size: 14px;
  margin-top: 5px;
}
</style>