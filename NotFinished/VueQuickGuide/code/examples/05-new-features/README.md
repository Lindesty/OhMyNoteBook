# Vue 3.3~3.5 新特性示例

本目录包含 Vue 3.3 到 3.5 版本新特性的示例代码，对应快速上手指南的更新内容。

## 📁 目录结构

```
vue3-new-features/
├── App.vue                          # 主入口组件，展示所有新特性
├── main.ts                          # 应用入口
├── components/
│   ├── CustomInput.vue              # defineModel 基本用法
│   ├── UserForm.vue                 # 多个 v-model 绑定
│   ├── OptionsDemo.vue              # defineOptions 宏
│   ├── EmitsDemo.vue                # defineEmits 简洁语法
│   └── ReactivePropsDemo.vue        # 响应式 Props 解构
└── types/
    └── index.ts                     # 类型定义
```

## 🚀 新特性说明

### Vue 3.3 新特性

#### 1. defineEmits 简洁语法

使用命名元组语法声明 emit 类型，更加简洁：

```ts
// 旧语法
const emit = defineEmits<{
  (e: 'change', id: number): void
}>()

// 新语法 (Vue 3.3+)
const emit = defineEmits<{
  change: [id: number]
}>()
```

#### 2. defineOptions 宏

在 `<script setup>` 中定义组件选项：

```ts
defineOptions({
  name: 'MyComponent',
  inheritAttrs: false
})
```

### Vue 3.4 新特性

#### 1. defineModel 宏

大幅简化 v-model 双向绑定的实现：

```ts
// 无需手动定义 props 和 emits
const modelValue = defineModel<string>()

// 直接修改会自动触发 update 事件
modelValue.value = '新值'
```

#### 2. 多个 v-model

```ts
const username = defineModel<string>('username')
const email = defineModel<string>('email')

// 父组件使用:
// <UserForm v-model:username="name" v-model:email="mail" />
```

### Vue 3.5 新特性

#### 1. 响应式 Props 解构

解构后的 props 保持响应性，支持原生默认值：

```ts
// Vue 3.5+ 语法
const { title, count = 0, items = [] } = defineProps<Props>()

// watchEffect 会跟踪解构后的变量
watchEffect(() => {
  console.log(title)  // 响应式
})
```

## 💡 编译器宏

以下宏在 `<script setup>` 中**无需从 vue 导入**：

- `defineProps` - 声明 props
- `defineEmits` - 声明 emits
- `defineExpose` - 暴露组件公共属性
- `defineOptions` - 定义组件选项 (Vue 3.3+)
- `defineModel` - 声明双向绑定 (Vue 3.4+)
- `withDefaults` - 为 props 设置默认值

## 🔧 使用方法

1. 将此目录复制到你的 Vue 3.5+ 项目中
2. 在 `main.ts` 中引入并挂载
3. 查看各组件的实现代码

## ⚠️ 版本要求

- **Vue 3.3+**: defineEmits 简洁语法、defineOptions
- **Vue 3.4+**: defineModel
- **Vue 3.5+**: 响应式 Props 解构

请确保你的项目使用对应版本或更高版本。