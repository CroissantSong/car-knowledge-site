import { ref } from 'vue'
import { inBrowser } from 'vitepress'

const STORAGE_KEY = 'auto-tech-error-book'

/**
 * 错题本管理
 *
 * 存储结构（localStorage）：
 * {
 *   "questions": {
 *     "g1": { question, options, type, layer, role, explanation, tags, wrongCount, lastWrongAt },
 *     ...
 *   }
 * }
 */

function loadErrorBook() {
  if (!inBrowser) return { questions: {} }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { questions: {} }
    const data = JSON.parse(raw)
    return { questions: data.questions || {} }
  } catch {
    return { questions: {} }
  }
}

function saveErrorBook(data) {
  if (!inBrowser) return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}

const errorBookData = ref(loadErrorBook())

/**
 * 错题本 composable
 */
export function useErrorBook() {
  /**
   * 记录一道错题（答错时调用）
   */
  function recordWrong(question) {
    if (!question?.id) return
    const existing = errorBookData.value.questions[question.id]
    errorBookData.value.questions[question.id] = {
      question: question.question,
      options: question.options,
      type: question.type || 'single',
      layer: question.layer || '',
      role: question.role || 'all',
      explanation: question.explanation || '',
      tags: question.tags || [],
      wrongCount: existing ? existing.wrongCount + 1 : 1,
      lastWrongAt: Date.now()
    }
    saveErrorBook(errorBookData.value)
  }

  /**
   * 从错题本移除一道题（答对时调用）
   */
  function removeQuestion(questionId) {
    delete errorBookData.value.questions[questionId]
    saveErrorBook(errorBookData.value)
  }

  /**
   * 获取所有错题（数组形式）
   */
  function getErrorQuestions() {
    return Object.entries(errorBookData.value.questions)
      .map(([id, data]) => ({ id, ...data }))
      .sort((a, b) => b.lastWrongAt - a.lastWrongAt)
  }

  /**
   * 获取错题数量
   */
  function getErrorCount() {
    return Object.keys(errorBookData.value.questions).length
  }

  /**
   * 判断某题是否在错题本中
   */
  function isError(questionId) {
    return !!errorBookData.value.questions[questionId]
  }

  /**
   * 清空错题本
   */
  function clearAll() {
    errorBookData.value = { questions: {} }
    saveErrorBook(errorBookData.value)
  }

  return {
    errorBookData,
    recordWrong,
    removeQuestion,
    getErrorQuestions,
    getErrorCount,
    isError,
    clearAll
  }
}
