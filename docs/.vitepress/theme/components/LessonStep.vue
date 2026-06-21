<script setup>
import { ref, computed, inject } from 'vue'

const props = defineProps({
  /** 步骤编号 */
  step: { type: Number, required: true },
  /** 步骤标题 */
  title: { type: String, required: true },
  /** 步骤类型标签（场景/原理/对比/工作/小测） */
  type: { type: String, default: '' },
  /** 是否默认展开 */
  defaultOpen: { type: Boolean, default: false }
})

const expanded = ref(props.defaultOpen)

function toggle() {
  expanded.value = !expanded.value
}

const typeLabels = {
  scenario: { label: '场景', icon: '?', color: 'var(--auto-accent, #d97706)' },
  principle: { label: '原理', icon: 'i', color: 'var(--auto-blue, #2563eb)' },
  compare: { label: '对比', icon: '↔', color: 'var(--vp-c-brand-1, #0f766e)' },
  work: { label: '工作', icon: '✓', color: 'var(--auto-green, #15803d)' },
  quiz: { label: '小测', icon: 'Q', color: '#7c3aed' }
}

const typeInfo = computed(() => typeLabels[props.type] || null)


</script>

<template>
  <div class="lesson-step" :class="{ expanded, 'has-type': !!type }">
    <!-- 连接线（非第一步） -->
    <div v-if="step > 1" class="step-connector">
      <div class="step-connector-line"></div>
    </div>

    <!-- 步骤头部 -->
    <button class="step-header" @click="toggle" :aria-expanded="expanded" :aria-controls="'step-content-' + step">
      <div class="step-number-wrap">
        <span class="step-number">{{ step }}</span>
      </div>
      <div class="step-title-area">
        <span v-if="typeInfo" class="step-type-badge" aria-hidden="true" :style="{ background: typeInfo.color }">
          {{ typeInfo.icon }} {{ typeInfo.label }}
        </span>
        <span class="step-title">{{ title }}</span>
      </div>
      <span class="step-chevron" aria-hidden="true" :class="{ open: expanded }">›</span>
    </button>

    <!-- 步骤内容 -->
    <Transition name="step-content">
      <div :id="'step-content-' + step" v-show="expanded" class="step-body" role="region" :aria-label="title">
        <div class="step-content-inner">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.lesson-step {
  position: relative;
}

.step-connector {
  display: flex;
  justify-content: center;
  height: 24px;
}

.step-connector-line {
  width: 2px;
  height: 100%;
  background: var(--auto-border, rgba(20, 33, 61, 0.12));
  margin-left: 23px; /* 对齐步骤编号中心 */
}

.step-header {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--auto-border, rgba(20, 33, 61, 0.12));
  border-radius: 10px;
  background: var(--auto-card-strong, #ffffff);
  cursor: pointer;
  text-align: left;
  transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
}

.step-header:hover {
  border-color: var(--vp-c-brand-2, #0d9488);
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
}

.lesson-step.expanded .step-header {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-bottom-color: transparent;
  background: var(--vp-c-brand-soft, rgba(20, 184, 166, 0.14));
}

.step-number-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--vp-c-brand-1, #0f766e), var(--auto-blue, #2563eb));
  flex-shrink: 0;
}

.step-number {
  color: white;
  font-size: 16px;
  font-weight: 850;
}

.step-title-area {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.step-type-badge {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 2px 8px;
  border-radius: 5px;
  color: white;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.3px;
  flex-shrink: 0;
}

.step-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--auto-ink, #14213d);
}

.step-chevron {
  font-size: 20px;
  font-weight: 700;
  color: var(--vp-c-text-3, #6c7a8d);
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.step-chevron.open {
  transform: rotate(90deg);
}

.step-body {
  border: 1px solid var(--auto-border, rgba(20, 33, 61, 0.12));
  border-top: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: var(--auto-card, rgba(255, 255, 255, 0.84));
  overflow: hidden;
}

.step-content-inner {
  padding: 20px 24px;
}

/* 展开/收起动画 */
.step-content-enter-active {
  transition: all 0.25s ease;
  max-height: 2000px;
}
.step-content-leave-active {
  transition: all 0.2s ease;
  max-height: 2000px;
}
.step-content-enter-from,
.step-content-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
}

/* 深色模式 */
.dark .step-header {
  background: var(--auto-card-strong, #151e2c);
}

.dark .lesson-step.expanded .step-header {
  background: rgba(20, 184, 166, 0.08);
}

.dark .step-body {
  background: var(--auto-card, rgba(20, 29, 44, 0.78));
}
</style>
