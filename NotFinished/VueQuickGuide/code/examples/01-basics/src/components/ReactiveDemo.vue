/**
 * reactive 对象类型响应式数据示例
 * 展示 reactive 创建对象类型响应式数据的使用方法
 */

<template>
  <div class="demo">
    <h3>reactive 创建对象类型响应式数据</h3>
    <p>汽车信息：一辆 {{ car.brand }} 车，价值 {{ car.price }} 万</p>
    <button @click="changePrice">修改汽车价格</button>

    <h4>游戏列表：</h4>
    <ul>
      <li v-for="g in games" :key="g.id">{{ g.name }}</li>
    </ul>
    <button @click="changeFirstGame">修改第一个游戏名字</button>

    <h4>深层嵌套测试：</h4>
    <p>obj.a.b.c = {{ obj.a.b.c }}</p>
    <button @click="changeObj">修改深层属性</button>

    <p class="note">提示：reactive 深层响应式，嵌套属性也是响应式的</p>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

defineOptions({
  name: 'ReactiveDemo'
})

// reactive 创建的对象类型响应式数据
let car = reactive({ brand: '奔驰', price: 100 })
let games = reactive([
  { id: '01', name: '王者荣耀' },
  { id: '02', name: '原神' },
  { id: '03', name: '三国志' }
])
let obj = reactive({
  a: {
    b: {
      c: 666
    }
  }
})

function changePrice() {
  car.price += 10
}

function changeFirstGame() {
  games[0].name = '流星蝴蝶剑'
}

function changeObj() {
  obj.a.b.c = 999
}
</script>

<style scoped>
.demo {
  padding: 20px;
  background: #fdf4ff;
  border-radius: 8px;
  border: 1px solid #fae8ff;
}

h3 {
  color: #a21caf;
  margin-bottom: 15px;
}

h4 {
  color: #86198f;
  margin: 15px 0 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 5px 0;
}

button {
  margin: 5px 0;
  padding: 8px 16px;
  background: #a21caf;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #86198f;
}

.note {
  margin-top: 15px;
  color: #64748b;
  font-size: 14px;
}
</style>