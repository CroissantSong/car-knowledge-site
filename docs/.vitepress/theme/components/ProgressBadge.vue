<script setup>
import { computed } from 'vue'
import { useProgress } from '../composables/useProgress.js'

const props = defineProps({
  /** 页面路径或路径数组 */
  path: { type: [String, Array], default: '' },
  /** 显示模式：'badge' | 'bar' | 'checkbox' */
  mode: { type: String, default: 'badge' },
  /** 是否显示文字 */
  showLabel: { type: Boolean, default: true }
})

const { isCompleted, isVisited, getLayerProgressDetail, toggleCompleted } = useProgress()

const detail = computed(() => {
  if (Array.isArray(props.path)) {
    return getLayerProgressDetail(props.path)
  }
  return null
})

const singleCompleted = computed(() => {
  if (typeof props.path === 'string') return isCompleted(props.path)
  return false
})

const singleVisited = computed(() => {
  if (typeof props.path === 'string') return isVisited(props.path)
  return false
})

const progressPercent = computed(() => {
  if (detail.value) return Math.round(detail.value.ratio * 100)
  return singleCompleted.value ? 100 : 0
})

function handleToggle() {
  if (typeof props.path === 'string') {
    toggleCompleted(props.path)
  }
}
</script>

<template>
  <!-- 徽章模式 -->
  <span v-if="mode === 'badge'" class="progress-badge" :class="{ completed: singleCompleted, visited: singleVisited }">
    <span v-if="singleCompleted" class="badge-icon">✓</span>
    <span v-else-if="singleVisited" class="badge-icon">◎</span>
    <span v-else class="badge-icon">○</span>
  </span>

  <!-- 进度条模式（用于层级/多页面） -->
  <div v-else-if="mode === 'bar'" class="progress-bar-wrap">
    <div class="progress-bar-track">
      <div class="progress-bar-fill" :style="{ width: progressPercent + '%' }"></div>
    </div>
    <span v-if="showLabel" class="progress-bar-label">
      {{ detail ? `${detail.completed}/${detail.total}` : progressPercent + '%' }}
    </span>
  </div>

  <!-- 复选框模式（用于单页标记） -->
  <label v-else-if="mode === 'checkbox'" class="progress-checkbox" :class="{ checked: singleCompleted }">
    <input type="checkbox" :checked="singleCompleted" @change="handleToggle" />
    <span class="checkbox-mark">{{ singleCompleted ? '✅' : '⬜' }}</span>
    <span v-if="showLabel" class="checkbox-label">{{ singleCompleted ? '已学完' : '标记完成' }}</span>
  </label>
</template>

<style scoped>
/* 徽章 */
.progress-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  margin-left: 4px;
  flex-shrink: 0;
}

.badge-icon {
  font-size: 12px;
  line-height: 1;
}

.progress-badge.completed .badge-icon {
  color: var(--auto-green, #15803d);
}

.progress-badge.visited .badge-icon {
  color: var(--vp-c-brand-2, #0d9488);
}

.progress-badge:not(.completed):not(.visited) .badge-icon {
  color: var(--vp-c-text-3, #6c7a8d);
  opacity: 0.5;
}

/* 进度条 */
.progress-bar-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 6px 0;
}

.progress-bar-track {
  flex: 1;
  height: 6px;
  border-radius: 999px;
  background: var(--vp-c-bg-soft, #eef6f3);
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--vp-c-brand-2, #0d9488), var(--auto-accent, #d97706));
  transition: width 0.4s ease;
}

.progress-bar-label {
  font-size: 12px;
  font-weight: 650;
  color: var(--vp-c-text-2, #4a5a70);
  white-space: nowrap;
}

/* 复选框 */
.progress-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;
  padding: 4px 10px;
  border: 1px solid var(--auto-border, rgba(20, 33, 61, 0.12));
  border-radius: 6px;
  font-size: 13px;
  transition: border-color 0.18s, background 0.18s;
}

.progress-checkbox:hover {
  border-color: var(--vp-c-brand-2);
  background: var(--vp-c-brand-soft);
}

.progress-checkbox.checked {
  border-color: var(--auto-green, #15803d);
  background: rgba(21, 128, 61, 0.08);
}

.progress-checkbox input {
  display: none;
}

.checkbox-mark {
  font-size: 14px;
  line-height: 1;
}

.checkbox-label {
  font-weight: 600;
  color: var(--vp-c-text-1);
}
</style>
