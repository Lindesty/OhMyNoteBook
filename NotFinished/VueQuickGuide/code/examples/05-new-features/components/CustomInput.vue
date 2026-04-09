/**
 * defineModel 宏示例 (Vue 3.4+)
 *
 * defineModel 大幅简化了 v-model 双向绑定的实现
 * 无需手动定义 defineProps 和 defineEmits
 */

<template>
  <div class="custom-input">
    <label v-if="label">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      @input="modelValue = ($event.target as HTMLInputElement).value"
      :placeholder="placeholder"
    />

    <!-- 显示修饰符 -->
    <span v-if="modifiers.trim" class="modifier-badge">.trim</span>
    <span v-if="modifiers.lazy" class="modifier-badge">.lazy</span>
  </div>
</template>

<script setup lang="ts">
// ==========================================
// defineModel 基本用法
// ==========================================

// 方式1: 基本用法 - 自动声明 modelValue prop 和 update:modelValue 事件
const modelValue = defineModel<string>()

// 方式2: 带选项
// const modelValue = defineModel<string>({ default: '' })

// 方式3: 获取修饰符
const [modelValue, modifiers] = defineModel<string>()

// 方式4: 带 set/get 转换器
// const [modelValue, modifiers] = defineModel<string>({
//   set(value) {
//     return modifiers.trim ? value.trim() : value
//   }
// })

// Props
defineProps<{
  label?: string
  type?: string
  placeholder?: string
}>()
</script>

<style scoped>
.custom-input {
  display: flex;
  align-items: center;
  gap: 8px;
}

input {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.modifier-badge {
  font-size: 12px;
  padding: 2px 6px;
  background: #42b883;
  color: white;
  border-radius: 4px;
}
</style>