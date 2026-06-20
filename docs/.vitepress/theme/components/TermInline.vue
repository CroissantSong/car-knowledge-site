<template>
  <span class="term-inline" @mouseenter="show = true" @mouseleave="show = false" @click="show = !show">
    <span class="term-trigger"><slot></slot></span>
    <span v-if="show" class="term-popup">
      <span class="popup-arrow"></span>
      <span class="popup-content">
        <span class="popup-term">{{ term }}<span v-if="en" class="popup-en"> {{ en }}</span></span>
        <span class="popup-desc">{{ desc }}</span>
      </span>
    </span>
  </span>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  term: { type: String, required: true },
  en: { type: String, default: '' },
  desc: { type: String, required: true }
})

const show = ref(false)
</script>

<style scoped>
.term-inline {
  position: relative;
  display: inline;
  cursor: help;
}

.term-trigger {
  border-bottom: 1.5px dashed var(--vp-c-brand-2);
  color: var(--vp-c-brand-1);
  font-weight: 650;
  transition: color 0.15s, border-color 0.15s;
}

.term-trigger:hover {
  color: var(--vp-c-brand-2);
  border-bottom-style: solid;
}

.term-popup {
  position: absolute;
  z-index: 100;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  max-width: 280px;
  padding: 12px 14px;
  border: 1px solid var(--auto-border);
  border-radius: 10px;
  background: var(--auto-card-strong);
  box-shadow: 0 14px 38px rgba(15, 23, 42, 0.14);
  pointer-events: none;
  animation: popupIn 0.15s ease;
}

.popup-arrow {
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 12px;
  height: 12px;
  border-right: 1px solid var(--auto-border);
  border-bottom: 1px solid var(--auto-border);
  background: var(--auto-card-strong);
}

.popup-content {
  display: block;
}

.popup-term {
  display: block;
  color: var(--vp-c-brand-1);
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 6px;
}

.popup-en {
  color: var(--vp-c-text-3);
  font-size: 12px;
  font-weight: 500;
  font-style: italic;
}

.popup-desc {
  display: block;
  color: var(--vp-c-text-1);
  font-size: 13px;
  line-height: 1.6;
  font-weight: 500;
}

@keyframes popupIn {
  from { opacity: 0; transform: translateX(-50%) translateY(4px); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
}

@media (max-width: 768px) {
  .term-popup {
    left: 0;
    transform: none;
    max-width: min(260px, calc(100vw - 40px));
  }
  
  .popup-arrow {
    left: 20px;
    transform: rotate(45deg);
  }
}
</style>
