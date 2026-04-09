import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'

interface Talk {
  id: string
  title: string
}

/**
 * Talk Store - 土味情话状态管理
 * 展示 Pinia 的异步 actions 用法
 */
export const useTalkStore = defineStore('talk', {
  // state：存储数据
  state() {
    return {
      talkList: [
        { id: '001', title: '今天你有点怪，哪里怪？怪好看的！' },
        { id: '002', title: '草莓、蓝莓、蔓越莓，今天想我了没？' },
        { id: '003', title: '心里给你留了一块地，我的死心塌地' }
      ] as Talk[]
    }
  },

  // actions：方法（包括异步）
  actions: {
    async getATalk() {
      // 模拟异步请求
      // 实际项目中可以使用 axios 等请求库
      const talks = [
        '你是我心中的日月，照亮我每一个清晨和夜晚',
        '你的名字是我读过最短的情诗',
        '若你是星辰，我愿做夜空',
        '世间万物皆苦，你明目张胆的偏爱就是救赎'
      ]
      const randomTalk = talks[Math.floor(Math.random() * talks.length)]
      this.talkList.unshift({
        id: nanoid(),
        title: randomTalk
      })
    }
  }
})