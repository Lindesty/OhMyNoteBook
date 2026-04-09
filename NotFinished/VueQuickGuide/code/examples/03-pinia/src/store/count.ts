import { defineStore } from 'pinia'

/**
 * Count Store - 计数器状态管理
 * 展示 Pinia 的 state、getters、actions 用法
 */
export const useCountStore = defineStore('count', {
  // state：存储数据
  state() {
    return {
      sum: 0,
      school: 'Vue 学习营',
      address: '北京昌平区'
    }
  },

  // getters：计算属性
  getters: {
    bigSum: (state) => state.sum * 10,
    upperSchool(): string {
      return this.school.toUpperCase()
    }
  },

  // actions：方法
  actions: {
    increment(value: number) {
      if (this.sum < 100) {
        this.sum += value
      }
    },
    decrement(value: number) {
      this.sum -= value
    }
  }
})