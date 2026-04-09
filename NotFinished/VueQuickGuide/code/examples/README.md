# Vue 3 示例项目集合

本文件夹包含 Vue 3 快速上手指南的示例代码，每个示例项目都可独立运行。

## 项目列表

### 01-basics - 基础语法示例
展示 Vue 3 组合式 API 的核心概念：
- `ref` - 基本类型响应式数据
- `reactive` - 对象类型响应式数据
- `computed` - 计算属性
- `watch` - 数据监视
- 生命周期钩子
- `props` - 组件数据传递

```bash
cd 01-basics
npm install
npm run dev
```

### 02-router - 路由示例
展示 Vue Router 的基本用法：
- 路由配置
- 路由导航
- 路由重定向

```bash
cd 02-router
npm install
npm run dev
```

### 03-pinia - 状态管理示例
展示 Pinia 状态管理的用法：
- `state` - 状态存储
- `getters` - 计算属性
- `actions` - 方法（包括异步）
- `storeToRefs` - 解构响应式数据

```bash
cd 03-pinia
npm install
npm run dev
```

### 04-component-communication - 组件通信示例
展示 Vue 3 组件间通信的多种方式：
- Props - 父传子、子传父（函数props）
- emit - 自定义事件
- mitt - 事件总线（任意组件通信）
- v-model - 双向绑定
- provide/inject - 跨层级通信
- Slot - 插槽（默认、具名、作用域）

```bash
cd 04-component-communication
npm install
npm run dev
```

### 05-new-features - Vue 3.3~3.5 新特性
展示 Vue 3.3 到 3.5 版本的新特性：
- `defineOptions` - 定义组件选项 (3.3+)
- `defineEmits` 简洁语法 (3.3+)
- `defineModel` - 双向绑定宏 (3.4+)
- 响应式 Props 解构 (3.5+)

```bash
cd 05-new-features
npm install
npm run dev
```

## 技术栈

- Vue 3.5+
- Vite 5.0+
- TypeScript 5.4+
- Vue Router 4.4+
- Pinia 2.2+

## 注意事项

1. 所有示例使用 `<script setup>` 语法糖
2. 使用 `defineOptions` 设置组件名称（替代 vite-plugin-vue-setup-extend）
3. 使用 Vue 3.3+ 的 `defineEmits` 简洁语法
4. 编译器宏无需从 vue 导入（如 `defineProps`, `defineEmits` 等）