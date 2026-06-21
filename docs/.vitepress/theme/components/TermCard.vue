<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { glossary } from '../data/terms.js'

const props = defineProps({
  /** 术语缩写（如 BMS、NVH），不传则用 slot 内容匹配 */
  term: { type: String, default: '' }
})

const visible = ref(false)
const tooltipRef = ref(null)
const containerRef = ref(null)
const tooltipStyle = ref({})

const entry = computed(() => {
  const key = (props.term || '').toUpperCase()
  // 先精确匹配（区分 SoC=System on Chip 与 SOC=State of Charge），再退回大小写不敏感
  return glossary[props.term] || glossary[key] || null
})

const displayTerm = computed(() => props.term || '')

function positionTooltip() {
  if (!containerRef.value || !tooltipRef.value) return

  const trigger = containerRef.value.getBoundingClientRect()
  const tooltip = tooltipRef.value.getBoundingClientRect()
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  let top = trigger.bottom + 8
  let left = trigger.left + trigger.width / 2 - tooltip.width / 2

  // 如果下方空间不足，放到上方
  if (top + tooltip.height > viewport.height - 16) {
    top = trigger.top - tooltip.height - 8
  }

  // 左右边界检查
  if (left < 16) left = 16
  if (left + tooltip.width > viewport.width - 16) {
    left = viewport.width - tooltip.width - 16
  }

  tooltipStyle.value = {
    top: `${top}px`,
    left: `${left}px`,
    transform: 'none'
  }
}

function show() {
  visible.value = true
  nextTick(positionTooltip)
}
function hide() { visible.value = false }
function toggle() {
  if (visible.value) {
    hide()
  } else {
    show()
  }
}

function handleKeydown(e) {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault()
    toggle()
  } else if (e.key === "Escape") {
    hide()
  }
}

// 点击外部关闭
function handleClickOutside(e) {
  if (containerRef.value && !containerRef.value.contains(e.target)) {
    visible.value = false
  }
}

// 滚动时重新定位
function handleScroll() {
  if (visible.value) positionTooltip()
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll, true)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll, true)
})
</script>

<template>
  <span
    ref="containerRef"
    class="term-card"
    :class="{ 'has-entry': !!entry }"
    tabindex="0"
    role="button"
    :aria-expanded="visible"
    :aria-label="`术语: ${displayTerm}${entry ? '，点击查看解释' : ''}`"
    @mouseenter="show"
    @mouseleave="hide"
    @click.stop="toggle"
    @keydown="handleKeydown"
  >
    <span class="term-text">
      <slot>{{ displayTerm }}</slot>
    </span>
    <span class="term-marker" aria-hidden="true">?</span>

    <Teleport to="body">
      <Transition name="term-tooltip">
        <div
          v-if="visible && entry"
          ref="tooltipRef"
          class="term-tooltip"
          role="tooltip"
          :style="tooltipStyle"
          @mouseenter="show"
          @mouseleave="hide"
        >
          <div class="term-tooltip-header">
            <span class="term-tooltip-abbr">{{ displayTerm }}</span>
            <span class="term-tooltip-en">{{ entry.en }}</span>
          </div>
          <div class="term-tooltip-zh">{{ entry.zh }}</div>
          <div v-if="entry.note" class="term-tooltip-note">{{ entry.note }}</div>
        </div>
      </Transition>
    </Teleport>
  </span>
</template>

<style scoped>
.term-card {
  position: relative;
  display: inline;
  cursor: help;
  border-bottom: 1px dashed var(--vp-c-brand-2, #0d9488);
  padding: 0 2px;
  transition: background 0.15s;
}

.term-card:hover {
  background: var(--vp-c-brand-soft, rgba(20, 184, 166, 0.14));
  border-radius: 3px;
}

.term-text {
  font-weight: 650;
}

.term-marker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  margin-left: 2px;
  border-radius: 50%;
  background: var(--vp-c-brand-2, #0d9488);
  color: white;
  font-size: 9px;
  font-weight: 800;
  line-height: 1;
  vertical-align: super;
  opacity: 0.7;
  transition: opacity 0.15s;
}

.term-card:hover .term-marker {
  opacity: 1;
}

.term-card:not(.has-entry) {
  border-bottom-color: var(--vp-c-text-3);
  opacity: 0.6;
}

.term-card:not(.has-entry) .term-marker {
  display: none;
}
</style>

<style>
/* 全局 tooltip 样式（Teleport 到 body） */
.term-tooltip {
  position: fixed;
  z-index: 9999;
  max-width: 380px;
  min-width: 240px;
  padding: 14px 18px;
  border: 1px solid var(--auto-border, rgba(20, 33, 61, 0.12));
  border-radius: 10px;
  background: var(--auto-card-strong, #ffffff);
  box-shadow: 0 12px 36px rgba(15, 23, 42, 0.15);
  pointer-events: auto;
}

.term-tooltip-header {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 6px;
}

.term-tooltip-abbr {
  font-size: 16px;
  font-weight: 850;
  color: var(--vp-c-brand-1, #0f766e);
}

.term-tooltip-en {
  font-size: 12px;
  color: var(--vp-c-text-3, #6c7a8d);
  font-style: italic;
}

.term-tooltip-zh {
  font-size: 15px;
  font-weight: 700;
  color: var(--auto-ink, #14213d);
  margin-bottom: 6px;
}

.term-tooltip-note {
  font-size: 13px;
  color: var(--vp-c-text-2, #4a5a70);
  line-height: 1.6;
  border-top: 1px solid var(--auto-border);
  padding-top: 8px;
  margin-top: 4px;
}

/* 动画 */
.term-tooltip-enter-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.term-tooltip-leave-active {
  transition: opacity 0.1s ease;
}
.term-tooltip-enter-from,
.term-tooltip-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

/* 深色模式适配 */
.dark .term-tooltip {
  background: var(--auto-card-strong, #151e2c);
  border-color: var(--auto-border, rgba(226, 232, 240, 0.14));
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.35);
}
</style>
