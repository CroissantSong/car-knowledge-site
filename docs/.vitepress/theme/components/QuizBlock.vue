<script setup>
import { ref } from 'vue'

const props = defineProps({
  question: { type: String, required: true },
  answer: { type: String, default: '' },
  hint: { type: String, default: '' }
})

const revealed = ref(false)

function toggle() {
  revealed.value = !revealed.value
}
</script>

<template>
  <div class="quiz-block" :class="{ 'quiz-revealed': revealed }">
    <div class="quiz-question">
      <span class="quiz-badge">Q</span>
      <span class="quiz-text">{{ question }}</span>
    </div>
    <div v-if="hint && !revealed" class="quiz-hint">
      💡 {{ hint }}
    </div>
    <div v-if="answer" class="quiz-answer" :class="{ 'quiz-answer-hidden': !revealed }">
      <div class="quiz-answer-label">✅ 答案</div>
      <div class="quiz-answer-content">{{ answer }}</div>
    </div>
    <button class="quiz-toggle" @click="toggle">
      {{ revealed ? '▲ 收起答案' : '▼ 点击查看答案' }}
    </button>
  </div>
</template>

<style scoped>
.quiz-block {
  margin: 20px 0;
  padding: 18px 22px;
  border: 1px solid color-mix(in srgb, #7c3aed 32%, var(--auto-border, #d0d5dd));
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.06), var(--auto-card, #fff));
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.04);
}

.quiz-question {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.quiz-badge {
  flex-shrink: 0;
  display: grid;
  width: 26px;
  height: 26px;
  place-items: center;
  border-radius: 8px;
  color: #fff;
  background: #7c3aed;
  font-size: 14px;
  font-weight: 850;
  line-height: 1;
}

.quiz-text {
  color: var(--auto-ink, #14213d);
  font-size: 15.5px;
  font-weight: 650;
  line-height: 1.65;
  padding-top: 2px;
}

.quiz-hint {
  margin-top: 12px;
  padding: 10px 14px;
  border-radius: 6px;
  background: rgba(124, 58, 237, 0.06);
  color: var(--vp-c-text-2, #4a5a70);
  font-size: 14px;
  line-height: 1.6;
}

.quiz-answer {
  margin-top: 14px;
  padding: 14px 16px;
  border-radius: 8px;
  background: color-mix(in srgb, var(--auto-green, #15803d) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--auto-green, #15803d) 22%, var(--auto-border, #d0d5dd));
  transition: opacity 0.25s ease, max-height 0.35s ease, margin 0.25s ease;
  overflow: hidden;
}

.quiz-answer-hidden {
  opacity: 0;
  max-height: 0;
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
  border-width: 0;
}

.quiz-answer:not(.quiz-answer-hidden) {
  opacity: 1;
  max-height: 600px;
}

.quiz-answer-label {
  color: var(--auto-green, #15803d);
  font-size: 13px;
  font-weight: 800;
  margin-bottom: 6px;
}

.quiz-answer-content {
  color: var(--vp-c-text-1, #162033);
  font-size: 15px;
  line-height: 1.72;
}

.quiz-toggle {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 14px;
  padding: 7px 16px;
  border: 1px solid color-mix(in srgb, #7c3aed 28%, var(--auto-border, #d0d5dd));
  border-radius: 7px;
  color: #7c3aed;
  background: color-mix(in srgb, #7c3aed 6%, transparent);
  font-size: 13.5px;
  font-weight: 650;
  cursor: pointer;
  transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease;
}

.quiz-toggle:hover {
  background: color-mix(in srgb, #7c3aed 14%, transparent);
  border-color: #7c3aed;
  color: #6d28d9;
}

/* Dark mode */
.dark .quiz-block {
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.08), var(--auto-card, #151e2c));
}

.dark .quiz-hint {
  background: rgba(124, 58, 237, 0.1);
}

.dark .quiz-answer {
  background: color-mix(in srgb, var(--auto-green, #86efac) 10%, transparent);
  border-color: color-mix(in srgb, var(--auto-green, #86efac) 24%, var(--auto-border, #3a4560));
}

.dark .quiz-toggle {
  background: color-mix(in srgb, #7c3aed 10%, transparent);
  border-color: color-mix(in srgb, #7c3aed 30%, var(--auto-border, #3a4560));
}

.dark .quiz-toggle:hover {
  background: color-mix(in srgb, #7c3aed 20%, transparent);
}
</style>
