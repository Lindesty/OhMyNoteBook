/**
 * defineModel 多个 v-model 示例 (Vue 3.4+)
 *
 * 展示如何在组件上使用多个 v-model
 */

<template>
  <div class="user-form">
    <div class="form-group">
      <label>用户名:</label>
      <!-- 使用 v-model:username -->
      <input
        type="text"
        :value="username"
        @input="username = ($event.target as HTMLInputElement).value"
      />
    </div>

    <div class="form-group">
      <label>邮箱:</label>
      <!-- 使用 v-model:email -->
      <input
        type="email"
        :value="email"
        @input="email = ($event.target as HTMLInputElement).value"
      />
    </div>

    <div class="form-group">
      <label>年龄:</label>
      <!-- 使用 v-model:age 带类型验证 -->
      <input
        type="number"
        :value="age"
        @input="age = Number(($event.target as HTMLInputElement).value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// ==========================================
// 多个 v-model 绑定
// ==========================================

// 父组件使用方式:
// <UserForm
//   v-model:username="formData.username"
//   v-model:email="formData.email"
//   v-model:age="formData.age"
// />

// 每个	defineModel 声明一个独立的 model
const username = defineModel<string>('username', { default: '' })
const email = defineModel<string>('email', { default: '' })
const age = defineModel<number>('age', {
  default: 0,
  type: Number
})

// 也可以获取修饰符
// const [username, usernameModifiers] = defineModel<string>('username')
</script>

<style scoped>
.user-form {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-width: 400px;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-weight: bold;
  color: #333;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #42b883;
}
</style>