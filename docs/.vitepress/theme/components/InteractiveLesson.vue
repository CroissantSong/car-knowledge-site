<script setup>
import { ref, provide } from 'vue'
import ProgressBadge from './ProgressBadge.vue'

const props = defineProps({
  /** 课程标题 */
  title: { type: String, required: true },
  /** 课程编号 */
  lessonId: { type: String, required: true },
  /** 课程简介 */
  description: { type: String, default: '' },
  /** 预计时长 */
  duration: { type: String, default: '15-20 分钟' }
})

const expandedSteps = ref(new Set())
const currentStep = ref(0)

function toggleStep(index) {
  if (expandedSteps.value.has(index)) {
    expandedSteps.value.delete(index)
  } else {
    expandedSteps.value.add(index)
  }
  // 强制更新
  expandedSteps.value = new Set(expandedSteps.value)
}

function isExpanded(index) {
  return expandedSteps.value.has(index)
}

function expandAll() {
  const steps = document.querySelectorAll('.lesson-step')
  steps.forEach((_, i) => expandedSteps.value.add(i))
  expandedSteps.value = new Set(expandedSteps.value)
}

function collapseAll() {
  expandedSteps.value = new Set()
}

// 为子组件提供 lesson 上下文
provide('lessonId', props.lessonId)
</script>

<template>
  <div class="interactive-lesson">
    <!-- 课程头部 -->
    <header class="lesson-header">
      <div class="lesson-meta">
        <span class="lesson-badge">旗舰课 {{ lessonId }}</span>
        <span class="lesson-duration">⏱ {{ duration }}</span>
      </div>
      <h1 class="lesson-title">{{ title }}</h1>
      <p v-if="description" class="lesson-desc">{{ description }}</p>
      <div class="lesson-controls" role="group" aria-label="课程操作">
        <button class="lesson-ctrl-btn" @click="expandAll" aria-label="全部展开课程步骤">全部展开</button>
        <button class="lesson-ctrl-btn" @click="collapseAll" aria-label="全部收起课程步骤">全部收起</button>
      </div>
    </header>

    <!-- 课程步骤容器 -->
    <div class="lesson-steps">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.interactive-lesson {
  max-width: 780px;
  margin: 0 auto;
}

.lesson-header {
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom: 2px solid var(--auto-border, rgba(20, 33, 61, 0.12));
}

.lesson-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.lesson-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  border-radius: 6px;
  background: linear-gradient(135deg, var(--vp-c-brand-1, #0f766e), var(--auto-blue, #2563eb));
  color: white;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.lesson-duration {
  font-size: 13px;
  color: var(--vp-c-text-2, #4a5a70);
  font-weight: 600;
}

.lesson-title {
  margin: 0 0 8px;
  font-size: 28px;
  line-height: 1.3;
  color: var(--auto-ink, #14213d);
  border: none;
  padding: 0;
}

.lesson-desc {
  margin: 0 0 16px;
  font-size: 15px;
  color: var(--vp-c-text-2, #4a5a70);
  line-height: 1.7;
}

.lesson-controls {
  display: flex;
  gap: 8px;
}

.lesson-ctrl-btn {
  padding: 6px 14px;
  border: 1px solid var(--auto-border, rgba(20, 33, 61, 0.12));
  border-radius: 6px;
  background: var(--auto-card-strong, #ffffff);
  color: var(--vp-c-text-1);
  font-size: 12px;
  font-weight: 650;
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s;
}

.lesson-ctrl-btn:hover {
  border-color: var(--vp-c-brand-2, #0d9488);
  background: var(--vp-c-brand-soft, rgba(20, 184, 166, 0.14));
}

.lesson-steps {
  display: flex;
  flex-direction: column;
  gap: 0;
}
</style>
