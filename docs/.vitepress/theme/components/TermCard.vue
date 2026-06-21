<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { glossary } from '../data/terms.js'

const props = defineProps({
  /** 术语缩写（如 BMS、NVH），不传则用 slot 内容匹配 */
  term: { type: String, default: '' }
})

const visible = ref(false)
const tooltipRef = ref(null)
const containerRef = ref(null)
const tooltipStyle = ref({})
const isMobile = ref(false)

const entry = computed(() => {
  const key = (props.term || '').toUpperCase()
  return glossary[props.term] || glossary[key] || null
})

const displayTerm = computed(() => props.term || '')

function checkMobile() {
  isMobile.value = window.innerWidth <= 640
}

function positionTooltip() {
  if (!containerRef.value || !tooltipRef.value) return

  // 移动端用 bottom-sheet，不需要 JS 定位
  if (isMobile.value) return

  const trigger = containerRef.value.getBoundingClientRect()
  const tooltip = tooltipRef.value.getBoundingClientRect()
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  let top = trigger.bottom + 8
  let left = trigger.left + trigger.width / 2 - tooltip.width / 2

  if (top + tooltip.height > viewport.height - 16) {
    top = trigger.top - tooltip.height - 8
  }

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

function handleClickOutside(e) {
  if (containerRef.value && !containerRef.value.contains(e.target)) {
    visible.value = false
  }
}

function handleScroll() {
  if (visible.value && !isMobile.value) positionTooltip()
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll, true)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
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
    @mouseenter="!isMobile && show()"
    @mouseleave="!isMobile && hide()"
    @click.stop="toggle"
    @keydown="handleKeydown"
  >
    <span class="term-text">
      <slot>{{ displayTerm }}</slot>
    </span>
    <span class="term-marker" aria-hidden="true">?</span>

    <Teleport to="body">
      <Transition :name="isMobile ? 'term-sheet' : 'term-tooltip'">
        <div
          v-if="visible && entry"
          ref="tooltipRef"
          class="term-tooltip"
          :class="{ 'term-sheet': isMobile }"
          role="tooltip"
          :style="isMobile ? {} : tooltipStyle"
          @mouseenter="!isMobile && show()"
          @mouseleave="!isMobile && hide()"
        >
          <div v-if="isMobile" class="term-sheet-handle" aria-hidden="true"></div>
          <div class="term-tooltip-header">
            <span class="term-tooltip-abbr">{{ displayTerm }}</span>
            <span class="term-tooltip-en">{{ entry.en }}</span>
          </div>
          <div class="term-tooltip-zh">{{ entry.zh }}</div>
          <div v-if="entry.note" class="term-tooltip-note">{{ entry.note }}</div>
          <button v-if="isMobile" class="term-sheet-close" @click.stop="hide()" aria-label="关闭">关闭</button>
        </div>
      </Transition>
      <!-- 移动端遮罩 -->
      <Transition name="term-overlay">
        <div v-if="visible && isMobile" class="term-overlay" @click.stop="hide()"></div>
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
  padding: 2px;
  transition: background 0.15s;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
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

/* 动画 - 桌面 */
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

/* ── 移动端 bottom-sheet ── */
.term-overlay {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: rgba(0, 0, 0, 0.35);
}

.term-overlay-enter-active {
  transition: opacity 0.2s ease;
}
.term-overlay-leave-active {
  transition: opacity 0.15s ease;
}
.term-overlay-enter-from,
.term-overlay-leave-to {
  opacity: 0;
}

.term-sheet {
  position: fixed !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  top: auto !important;
  z-index: 9999;
  max-width: 100vw !important;
  min-width: 0 !important;
  width: 100% !important;
  transform: none !important;
  border-radius: 16px 16px 0 0 !important;
  padding: 8px 20px 24px !important;
  max-height: 50vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.term-sheet-handle {
  width: 36px;
  height: 4px;
  margin: 0 auto 12px;
  border-radius: 999px;
  background: var(--vp-c-text-3, #6c7a8d);
  opacity: 0.4;
}

.term-sheet-close {
  display: block;
  width: 100%;
  margin-top: 14px;
  padding: 10px;
  border: 1px solid var(--auto-border, rgba(20, 33, 61, 0.12));
  border-radius: 8px;
  background: var(--vp-c-bg-soft, #eef6f3);
  color: var(--vp-c-text-1, #162033);
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  min-height: 44px;
}

.term-sheet-close:hover {
  background: var(--vp-c-bg-alt, #f3f7f5);
}

/* 动画 - 移动端 */
.term-sheet-enter-active {
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.term-sheet-leave-active {
  transition: transform 0.2s ease-in;
}
.term-sheet-enter-from {
  transform: translateY(100%);
}
.term-sheet-leave-to {
  transform: translateY(100%);
}

.dark .term-sheet {
  background: var(--auto-card-strong, #151e2c);
  border-color: var(--auto-border, rgba(226, 232, 240, 0.14));
}
</style>
