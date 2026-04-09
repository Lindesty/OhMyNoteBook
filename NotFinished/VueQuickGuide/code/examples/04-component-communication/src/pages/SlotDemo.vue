/**
 * Slot 插槽示例
 */

<template>
  <div class="demo">
    <h3>6. Slot 插槽</h3>
    <div class="examples">
      <div class="example">
        <h4>默认插槽</h4>
        <Category>
          <p>这是插入的内容</p>
        </Category>
      </div>

      <div class="example">
        <h4>具名插槽</h4>
        <Category>
          <template #header>
            <p>头部内容</p>
          </template>
          <template #footer>
            <p>底部内容</p>
          </template>
        </Category>
      </div>

      <div class="example">
        <h4>作用域插槽</h4>
        <GameList>
          <template #default="{ game }">
            <span style="color: #42b883">{{ game.name }} - {{ game.price }}元</span>
          </template>
        </GameList>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Category from './Category.vue'
import GameList from './GameList.vue'

defineOptions({
  name: 'SlotDemo'
})
</script>

<style scoped>
.demo {
  padding: 20px;
}

.examples {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.example {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
}

h3 {
  color: #047857;
  margin-bottom: 15px;
}

h4 {
  color: #059669;
  margin-bottom: 10px;
}
</style>