/**
 * 作用域插槽组件
 */

<template>
  <div class="game-list">
    <h4>游戏列表</h4>
    <ul>
      <li v-for="game in games" :key="game.id">
        <slot :game="game">
          {{ game.name }}
        </slot>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'GameList'
})

const games = ref([
  { id: 1, name: '王者荣耀', price: 0 },
  { id: 2, name: '原神', price: 0 },
  { id: 3, name: '三国志', price: 68 }
])
</script>

<style scoped>
.game-list {
  padding: 15px;
  background: #ecfdf5;
  border-radius: 8px;
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
</style>