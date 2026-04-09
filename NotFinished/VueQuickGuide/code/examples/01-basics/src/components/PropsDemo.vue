/**
 * props 示例
 * 展示 defineProps 和 withDefaults 的使用方法
 */

<template>
  <div class="demo">
    <h3>props 接收父组件数据</h3>
    <ul>
      <li v-for="p in list" :key="p.id">
        {{ p.name }} -- {{ p.age }}岁
      </li>
    </ul>
    <p class="note">提示：使用 defineProps + withDefaults 定义 props</p>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
import type { Persons } from '@/types'

defineOptions({
  name: 'PropsDemo'
})

// 接收 list，限制类型 + 限制必要性 + 指定默认值
withDefaults(defineProps<{ list?: Persons }>(), {
  list: () => [{ id: '01', name: '康师傅·王麻子·特仑苏', age: 19 }]
})
</script>

<style scoped>
.demo {
  padding: 20px;
  background: #e0f2fe;
  border-radius: 8px;
  border: 1px solid #bae6fd;
}

h3 {
  color: #0369a1;
  margin-bottom: 15px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 8px;
  margin: 5px 0;
  background: white;
  border-radius: 4px;
}

.note {
  color: #64748b;
  font-size: 14px;
  margin-top: 15px;
}
</style>