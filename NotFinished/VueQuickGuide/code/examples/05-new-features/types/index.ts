/**
 * Vue 3.3~3.5 新特性示例 - 类型定义
 */

// 用户类型
export interface User {
  id: string
  name: string
  email: string
  age?: number
}

// 表单数据类型
export interface FormData {
  username: string
  email: string
  age: number
}

// API 响应类型
export interface ApiResponse<T> {
  code: number
  message: string
  data: T
}

// 事件载荷类型
export interface ChangePayload {
  id: number
  name: string
  timestamp?: Date
}