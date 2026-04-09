/**
 * 自定义 Hook 示例 - 展示 Vue 3.5+ 新特性在 hooks 中的应用
 */

import { ref, watchEffect, computed, onUnmounted } from 'vue'

/**
 * useDebouncedRef - 防抖 ref
 * 使用 customRef 实现防抖效果
 */
import { customRef } from 'vue'

export function useDebouncedRef<T>(value: T, delay = 300) {
  let timeout: ReturnType<typeof setTimeout>

  return customRef<T>((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue: T) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}

/**
 * useCounter - 简单计数器 hook
 */
export function useCounter(initialValue = 0) {
  const count = ref(initialValue)

  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => (count.value = initialValue)

  // 计算属性
  const doubleCount = computed(() => count.value * 2)

  return {
    count,
    doubleCount,
    increment,
    decrement,
    reset
  }
}

/**
 * useLocalStorage - 本地存储 hook
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // 从 localStorage 读取初始值
  const storedValue = localStorage.getItem(key)
  const data = ref<T>(storedValue ? JSON.parse(storedValue) : initialValue)

  // 监听变化并同步到 localStorage
  watchEffect(() => {
    localStorage.setItem(key, JSON.stringify(data.value))
  })

  // 清除函数
  const clear = () => {
    data.value = initialValue
    localStorage.removeItem(key)
  }

  return {
    data,
    clear
  }
}

/**
 * useMousePosition - 鼠标位置 hook
 */
export function useMousePosition() {
  const x = ref(0)
  const y = ref(0)

  const update = (e: MouseEvent) => {
    x.value = e.clientX
    y.value = e.clientY
  }

  // 在组件挂载时添加事件监听
  if (typeof window !== 'undefined') {
    window.addEventListener('mousemove', update)

    // 在组件卸载时移除事件监听
    onUnmounted(() => {
      window.removeEventListener('mousemove', update)
    })
  }

  return { x, y }
}

/**
 * useFetch - 数据请求 hook
 */
export function useFetch<T>(url: string) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const loading = ref(true)

  const fetchData = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      data.value = await response.json()
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  fetchData()

  return {
    data,
    error,
    loading,
    refetch: fetchData
  }
}

/**
 * useToggle - 切换布尔值 hook
 */
export function useToggle(initialValue = false) {
  const value = ref(initialValue)

  const toggle = () => {
    value.value = !value.value
  }

  const setTrue = () => {
    value.value = true
  }

  const setFalse = () => {
    value.value = false
  }

  return {
    value,
    toggle,
    setTrue,
    setFalse
  }
}