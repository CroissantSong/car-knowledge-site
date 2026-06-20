<template>
  <span 
    class="term-card" 
    :class="{ 'term-active': showTooltip }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="toggleTooltip"
  >
    <span class="term-text"><slot></slot></span>
    <span v-if="showTooltip" class="term-tooltip" :style="tooltipStyle">
      <span class="tooltip-term">{{ term }}</span>
      <span v-if="en" class="tooltip-en">{{ en }}</span>
      <span class="tooltip-desc">{{ desc }}</span>
    </span>
  </span>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  term: {
    type: String,
    required: true
  },
  en: {
    type: String,
    default: ''
  },
  desc: {
    type: String,
    required: true
  }
})

const showTooltip = ref(false)
const tooltipPos = ref({ x: 0, y: 0 })
const isMobile = ref(false)

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  document.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
  document.removeEventListener('click', handleOutsideClick)
})

function checkMobile() {
  isMobile.value = window.innerWidth <= 768
}

function handleMouseEnter(e) {
  if (isMobile.value) return
  updatePosition(e)
  showTooltip.value = true
}

function handleMouseLeave() {
  if (isMobile.value) return
  showTooltip.value = false
}

function toggleTooltip(e) {
  if (!isMobile.value) return
  e.stopPropagation()
  showTooltip.value = !showTooltip.value
  if (showTooltip.value) {
    updatePosition(e)
  }
}

function handleOutsideClick(e) {
  if (!e.target.closest('.term-card')) {
    showTooltip.value = false
  }
}

function updatePosition(e) {
  const rect = e.currentTarget.getBoundingClientRect()
  const tooltipWidth = 280
  const tooltipHeight = 120
  const padding = 12
  
  let x = rect.left + rect.width / 2 - tooltipWidth / 2
  let y = rect.top - tooltipHeight - padding
  
  // Keep tooltip within viewport
  if (x < padding) x = padding
  if (x + tooltipWidth > window.innerWidth - padding) {
    x = window.innerWidth - tooltipWidth - padding
  }
  if (y < padding) {
    y = rect.bottom + padding
  }
  
  tooltipPos.value = { x, y }
}

const tooltipStyle = computed(() => ({
  left: `${tooltipPos.value.x}px`,
  top: `${tooltipPos.value.y}px`
}))
</script>

<style scoped>
.term-card {
  position: relative;
  display: inline;
  cursor: help;
  border-bottom: 1px dashed var(--vp-c-brand-2);
  color: var(--vp-c-brand-1);
  font-weight: 600;
  transition: all 0.2s ease;
}

.term-card:hover {
  color: var(--vp-c-brand-2);
  border-bottom-color: var(--vp-c-brand-1);
}

.term-active {
  color: var(--vp-c-brand-2);
  border-bottom-color: var(--vp-c-brand-1);
}

.term-tooltip {
  position: fixed;
  z-index: 1000;
  width: 280px;
  padding: 14px 16px;
  border: 1px solid var(--auto-border);
  border-radius: 10px;
  background: var(--auto-card-strong);
  box-shadow: 0 16px 42px rgba(15, 23, 42, 0.15);
  pointer-events: none;
  animation: tooltipFadeIn 0.2s ease;
}

.tooltip-term {
  display: block;
  color: var(--vp-c-brand-1);
  font-size: 15px;
  font-weight: 800;
  margin-bottom: 4px;
}

.tooltip-en {
  display: block;
  color: var(--vp-c-text-3);
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 8px;
  font-style: italic;
}

.tooltip-desc {
  display: block;
  color: var(--vp-c-text-1);
  font-size: 13px;
  line-height: 1.6;
  font-weight: 500;
}

@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .term-card {
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  
  .term-tooltip {
    width: min(280px, calc(100vw - 32px));
    pointer-events: auto;
  }
}
</style>
