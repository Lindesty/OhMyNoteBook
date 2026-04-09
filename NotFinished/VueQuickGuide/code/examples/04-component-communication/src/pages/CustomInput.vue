/**
 * 自定义输入组件 - 使用 defineModel (Vue 3.4+)
 */

<template>
  <div class="input">
    <h4>子组件</h4>
    <input
      type="text"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      placeholder="请输入内容"
    />
    <p class="alt-note">Vue 3.4+ 可用 defineModel 宏简化</p>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'CustomInput'
})

// 传统方式声明 v-model
defineProps<{ modelValue: string }>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// Vue 3.4+ 可以使用 defineModel 简化：
// const modelValue = defineModel<string>()
// 然后直接使用 modelValue.value 进行读写
</script>

<style scoped>
.input {
  margin-top: 15px;
  padding: 15px;
  background: #bae6fd;
  border-radius: 8px;
}

input {
  padding: 10px;
  border: 1px solid #0369a1;
  border-radius: 4px;
  width: 200px;
}

.alt-note {
  margin-top: 10px;
  color: #64748b;
  font-size: 14px;
}
</style>