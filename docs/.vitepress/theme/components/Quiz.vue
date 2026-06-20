<template>
  <div class="quiz-block" :class="{ 'quiz-answered': answered }">
    <div class="quiz-header">
      <span class="quiz-icon">Q</span>
      <span class="quiz-label">小测</span>
    </div>
    
    <div class="quiz-question">
      <slot></slot>
    </div>
    
    <div v-if="options.length" class="quiz-options">
      <button
        v-for="(option, index) in options"
        :key="index"
        class="quiz-option"
        :class="{
          'selected': selected === index,
          'correct': answered && index === correctIndex,
          'wrong': answered && selected === index && index !== correctIndex,
          'disabled': answered
        }"
        @click="selectOption(index)"
        :disabled="answered"
      >
        <span class="option-letter">{{ String.fromCharCode(65 + index) }}</span>
        <span class="option-text">{{ option }}</span>
        <span v-if="answered && index === correctIndex" class="option-icon">✓</span>
        <span v-else-if="answered && selected === index" class="option-icon">✗</span>
      </button>
    </div>
    
    <div v-if="answered" class="quiz-feedback" :class="isCorrect ? 'feedback-correct' : 'feedback-wrong'">
      <div class="feedback-header">
        <span v-if="isCorrect" class="feedback-icon">✓</span>
        <span v-else class="feedback-icon">✗</span>
        <span class="feedback-text">{{ isCorrect ? '回答正确！' : '再想想看' }}</span>
      </div>
      <div v-if="explanation" class="feedback-explanation">
        {{ explanation }}
      </div>
    </div>
    
    <button v-if="answered" class="quiz-retry" @click="reset">
      重新作答
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    default: () => []
  },
  correctIndex: {
    type: Number,
    default: 0
  },
  explanation: {
    type: String,
    default: ''
  }
})

const selected = ref(null)
const answered = ref(false)

const isCorrect = computed(() => selected.value === props.correctIndex)

function selectOption(index) {
  if (answered.value) return
  selected.value = index
  answered.value = true
}

function reset() {
  selected.value = null
  answered.value = false
}
</script>

<style scoped>
.quiz-block {
  margin: 24px 0;
  padding: 20px;
  border: 1px solid var(--auto-border);
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(124, 58, 237, 0.06), var(--auto-card));
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06);
}

.quiz-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.quiz-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  background: #7c3aed;
  color: white;
  font-size: 14px;
  font-weight: 800;
}

.quiz-label {
  color: #7c3aed;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.quiz-question {
  margin-bottom: 18px;
  font-size: 16px;
  line-height: 1.7;
  color: var(--vp-c-text-1);
}

.quiz-question :deep(p) {
  margin: 0;
}

.quiz-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.quiz-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid var(--auto-border);
  border-radius: 10px;
  background: var(--auto-card-strong);
  cursor: pointer;
  text-align: left;
  font-size: 15px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  transition: all 0.2s ease;
}

.quiz-option:hover:not(.disabled) {
  border-color: #7c3aed;
  background: rgba(124, 58, 237, 0.06);
  transform: translateX(4px);
}

.quiz-option.selected {
  border-color: #7c3aed;
  background: rgba(124, 58, 237, 0.1);
}

.quiz-option.correct {
  border-color: #15803d;
  background: rgba(21, 128, 61, 0.1);
}

.quiz-option.wrong {
  border-color: #dc2626;
  background: rgba(220, 38, 38, 0.08);
}

.quiz-option.disabled {
  cursor: default;
  opacity: 0.85;
}

.option-letter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
}

.quiz-option.selected .option-letter {
  background: #7c3aed;
  color: white;
}

.quiz-option.correct .option-letter {
  background: #15803d;
  color: white;
}

.quiz-option.wrong .option-letter {
  background: #dc2626;
  color: white;
}

.option-text {
  flex: 1;
}

.option-icon {
  font-size: 18px;
  font-weight: 700;
}

.quiz-option.correct .option-icon {
  color: #15803d;
}

.quiz-option.wrong .option-icon {
  color: #dc2626;
}

.quiz-feedback {
  margin-top: 18px;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid;
}

.feedback-correct {
  border-color: rgba(21, 128, 61, 0.3);
  background: rgba(21, 128, 61, 0.08);
}

.feedback-wrong {
  border-color: rgba(220, 38, 38, 0.3);
  background: rgba(220, 38, 38, 0.06);
}

.feedback-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.feedback-icon {
  font-size: 20px;
  font-weight: 700;
}

.feedback-correct .feedback-icon {
  color: #15803d;
}

.feedback-wrong .feedback-icon {
  color: #dc2626;
}

.feedback-text {
  font-size: 15px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.feedback-explanation {
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

.quiz-retry {
  margin-top: 14px;
  padding: 8px 18px;
  border: 1px solid var(--auto-border);
  border-radius: 8px;
  background: var(--auto-card-strong);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.quiz-retry:hover {
  border-color: #7c3aed;
  color: #7c3aed;
  background: rgba(124, 58, 237, 0.06);
}

@media (max-width: 640px) {
  .quiz-block {
    padding: 16px;
  }
  
  .quiz-option {
    padding: 12px 14px;
    font-size: 14px;
  }
}
</style>
