import { ref, watch, computed } from 'vue'
import { useRoute } from 'vitepress'
import { inBrowser } from 'vitepress'

const STORAGE_KEY = 'auto-tech-progress'

/**
 * 学习进度管理
 *
 * 存储结构（localStorage）：
 * {
 *   "visited": { "/guide/": timestamp, "/guide/classification": timestamp, ... },
 *   "completed": { "/guide/": timestamp, ... }
 * }
 *
 * - "visited"：用户曾访问过的页面（自动记录）
 * - "completed"：用户手动标记为"已学完"的页面
 */
function loadProgress() {
  if (!inBrowser) return { visited: {}, completed: {} }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { visited: {}, completed: {} }
    const data = JSON.parse(raw)
    return {
      visited: data.visited || {},
      completed: data.completed || {}
    }
  } catch {
    return { visited: {}, completed: {} }
  }
}

function saveProgress(data) {
  if (!inBrowser) return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

const progressData = ref(loadProgress())

/**
 * 主 composable：提供进度读写方法
 */
export function useProgress() {
  const route = useRoute()

  // 自动记录当前页面为已访问
  watch(
    () => route.path,
    (path) => {
      if (!inBrowser) return
      const normalized = normalizePath(path)
      if (!progressData.value.visited[normalized]) {
        progressData.value.visited[normalized] = Date.now()
        saveProgress(progressData.value)
      }
    },
    { immediate: true }
  )

  /**
   * 标记某页面为已学完
   */
  function markCompleted(path) {
    const normalized = normalizePath(path)
    progressData.value.completed[normalized] = Date.now()
    saveProgress(progressData.value)
  }

  /**
   * 取消某页面的已完成标记
   */
  function unmarkCompleted(path) {
    const normalized = normalizePath(path)
    delete progressData.value.completed[normalized]
    saveProgress(progressData.value)
  }

  /**
   * 切换完成状态
   */
  function toggleCompleted(path) {
    const normalized = normalizePath(path)
    if (progressData.value.completed[normalized]) {
      unmarkCompleted(path)
    } else {
      markCompleted(path)
    }
  }

  /**
   * 检查某页面是否已学完
   */
  function isCompleted(path) {
    const normalized = normalizePath(path)
    return !!progressData.value.completed[normalized]
  }

  /**
   * 检查某页面是否已访问
   */
  function isVisited(path) {
    const normalized = normalizePath(path)
    return !!progressData.value.visited[normalized]
  }

  /**
   * 获取某一层级的完成进度（0~1）
   * @param {string[]} paths - 该层级包含的页面路径列表
   */
  function getLayerProgress(paths) {
    if (!paths || paths.length === 0) return 0
    const completedCount = paths.filter(p => isCompleted(p)).length
    return completedCount / paths.length
  }

  /**
   * 获取某一层级的详细进度
   */
  function getLayerProgressDetail(paths) {
    if (!paths || paths.length === 0) return { total: 0, completed: 0, visited: 0, ratio: 0 }
    const completedCount = paths.filter(p => isCompleted(p)).length
    const visitedCount = paths.filter(p => isVisited(p)).length
    return {
      total: paths.length,
      completed: completedCount,
      visited: visitedCount,
      ratio: completedCount / paths.length
    }
  }

  /**
   * 重置所有进度
   */
  function resetProgress() {
    progressData.value = { visited: {}, completed: {} }
    saveProgress(progressData.value)
  }

  return {
    progressData,
    markCompleted,
    unmarkCompleted,
    toggleCompleted,
    isCompleted,
    isVisited,
    getLayerProgress,
    getLayerProgressDetail,
    resetProgress
  }
}

/**
 * 标准化路径：去掉 base 前缀、尾部斜杠、.html 后缀
 */
function normalizePath(path) {
  // 去掉 base 前缀 '/car-knowledge-site/'
  let p = path.replace(/^\/car-knowledge-site\//, '/')
  // 去掉 .html 后缀
  p = p.replace(/\.html$/, '')
  // 去掉 index 尾部
  p = p.replace(/\/index$/, '/')
  // 确保首字符为 /
  if (!p.startsWith('/')) p = '/' + p
  // 去掉尾部多余斜杠（但保留根路径的 /）
  if (p.length > 1) p = p.replace(/\/+$/, '')
  return p
}
