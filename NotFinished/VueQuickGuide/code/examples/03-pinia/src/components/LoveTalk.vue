/**
 * LoveTalk 组件 - 使用 Pinia 异步 actions
 */

<template>
  <div class="talk">
    <h3>土味情话</h3>
    <button @click="getLoveTalk">获取一句土味情话</button>
    <ul>
      <li v-for="talk in talkList" :key="talk.id">{{ talk.title }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useTalkStore } from '@/store/loveTalk'

defineOptions({
  name: 'LoveTalk'
})

const talkStore = useTalkStore()
const { talkList } = storeToRefs(talkStore)

function getLoveTalk() {
  talkStore.getATalk()
}
</script>

<style scoped>
.talk {
  padding: 20px;
  background: #fef3c7;
  border-radius: 8px;
  border: 1px solid #fde68a;
}

h3 {
  color: #b45309;
  margin-bottom: 15px;
}

button {
  padding: 10px 20px;
  background: #b45309;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #92400e;
}

ul {
  list-style: none;
  padding: 0;
  margin-top: 15px;
}

li {
  padding: 10px;
  margin: 5px 0;
  background: white;
  border-radius: 4px;
}
</style>