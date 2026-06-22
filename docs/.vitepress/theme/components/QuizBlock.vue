<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  /** 题目唯一标识（用于错题本记录） */
  id: { type: String, default: '' },
  /** 题目文本 */
  question: { type: String, required: true },
  /** 选项数组 [{ text, correct }] */
  options: { type: Array, required: true },
  /** 题目类型：single(单选) / multi(多选) / judge(判断) */
  type: { type: String, default: 'single' },
  /** 正确时的提示 */
  correctHint: { type: String, default: '答对了！' },
  /** 错误时的提示 */
  wrongHint: { type: String, default: '再想想哦~' }
})

const emit = defineEmits(['result'])

const isMulti = computed(() => props.type === 'multi')

// 单选模式：单个索引；多选模式：Set<number>
const selectedSingle = ref(null)
const selectedMulti = ref(new Set())
const submitted = ref(false)
const showHint = ref(false)

const selected = computed(() => isMulti.value ? selectedMulti.value : selectedSingle.value)

const isCorrect = computed(() => {
  if (isMulti.value) {
    // 多选：所有正确项都选中，且没有选中错误项
    if (selectedMulti.value.size === 0) return false
    const correctIndices = props.options
      .map((opt, i) => opt.correct ? i : -1)
      .filter(i => i !== -1)
    const hasAllCorrect = correctIndices.every(i => selectedMulti.value.has(i))
    const hasNoWrong = [...selectedMulti.value].every(i => props.options[i]?.correct === true)
    return hasAllCorrect && hasNoWrong
  } else {
    // 单选/判断
    if (selectedSingle.value === null) return false
    return props.options[selectedSingle.value]?.correct === true
  }
})

function selectOption(index) {
  if (submitted.value) return
  if (isMulti.value) {
    const next = new Set(selectedMulti.value)
    if (next.has(index)) {
      next.delete(index)
    } else {
      next.add(index)
    }
    selectedMulti.value = next
  } else {
    selectedSingle.value = index
  }
}

const hasSelection = computed(() => {
  if (isMulti.value) return selectedMulti.value.size > 0
  return selectedSingle.value !== null
})

function submit() {
  if (!hasSelection.value) return
  submitted.value = true
  showHint.value = true
  emit('result', { id: props.id, correct: isCorrect.value })
}

function retry() {
  selectedSingle.value = null
  selectedMulti.value = new Set()
  submitted.value = false
  showHint.value = false
}
</script>

<template>
  <div class="quiz-block" :class="{ submitted, correct: isCorrect, wrong: submitted && !isCorrect }">
    <div class="quiz-question">{{ question }}</div>

    <div class="quiz-options" :role="isMulti ? 'group' : 'radiogroup'" :aria-label="question">
      <button
        v-for="(opt, i) in options"
        :key="i"
        :role="isMulti ? 'checkbox' : 'radio'"
        :aria-checked="isMulti ? selectedMulti.has(i) : selectedSingle === i"
        :aria-disabled="submitted"
        class="quiz-option"
        :class="{
          selected: isMulti ? selectedMulti.has(i) : selectedSingle === i,
          'is-correct': submitted && opt.correct,
          'is-wrong': submitted && (isMulti ? selectedMulti.has(i) : selectedSingle === i) && !opt.correct
        }"
        @click="selectOption(i)"
      >
        <span class="quiz-option-marker">{{ String.fromCharCode(65 + i) }}</span>
        <span class="quiz-option-text">{{ opt.text }}</span>
        <span v-if="submitted && opt.correct" class="quiz-option-icon">✓</span>
        <span v-if="submitted && (isMulti ? selectedMulti.has(i) : selectedSingle === i) && !opt.correct" class="quiz-option-icon">✗</span>
      </button>
    </div>

    <div class="quiz-actions">
      <button v-if="!submitted" class="quiz-btn quiz-btn-primary" :disabled="!hasSelection" @click="submit">
        提交答案
      </button>
      <button v-else class="quiz-btn quiz-btn-secondary" @click="retry">
        重新作答
      </button>
    </div>

    <Transition name="hint">
      <div v-if="showHint" class="quiz-hint" role="alert" aria-live="polite" :class="{ 'hint-correct': isCorrect, 'hint-wrong': !isCorrect }">
        <span class="hint-icon">{{ isCorrect ? '🎉' : '💡' }}</span>
        <span>{{ isCorrect ? correctHint : wrongHint }}</span>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.quiz-block {
  margin: 20px 0;
  padding: 20px;
  border: 1px solid var(--auto-border, rgba(20, 33, 61, 0.12));
  border-radius: 10px;
  background: linear-gradient(135deg, var(--auto-card, rgba(255, 255, 255, 0.84)), var(--vp-c-bg-soft, #eef6f3));
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.06);
}

.quiz-block.correct {
  border-color: var(--auto-green, #15803d);
}

.quiz-block.wrong {
  border-color: var(--auto-accent, #d97706);
}

.quiz-question {
  font-size: 16px;
  font-weight: 750;
  color: var(--auto-ink, #14213d);
  margin-bottom: 16px;
  line-height: 1.6;
}

.quiz-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.quiz-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border: 1px solid var(--auto-border, rgba(20, 33, 61, 0.12));
  border-radius: 8px;
  background: var(--auto-card-strong, #ffffff);
  cursor: pointer;
  transition: border-color 0.15s, background 0.15s, transform 0.1s;
  text-align: left;
  font-size: 14.5px;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}

.quiz-option:hover:not(.is-correct):not(.is-wrong) {
  border-color: var(--vp-c-brand-2, #0d9488);
  background: var(--vp-c-brand-soft, rgba(20, 184, 166, 0.14));
}

.quiz-option.selected {
  border-color: var(--vp-c-brand-1, #0f766e);
  background: var(--vp-c-brand-soft);
}

.quiz-option.is-correct {
  border-color: var(--auto-green, #15803d);
  background: rgba(21, 128, 61, 0.08);
}

.quiz-option.is-wrong {
  border-color: #dc2626;
  background: rgba(220, 38, 38, 0.06);
}

.quiz-option-marker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: var(--vp-c-bg-soft, #eef6f3);
  font-size: 12px;
  font-weight: 800;
  color: var(--vp-c-text-2, #4a5a70);
  flex-shrink: 0;
}

.quiz-option.selected .quiz-option-marker {
  background: var(--vp-c-brand-1, #0f766e);
  color: white;
}

.quiz-option.is-correct .quiz-option-marker {
  background: var(--auto-green, #15803d);
  color: white;
}

.quiz-option.is-wrong .quiz-option-marker {
  background: #dc2626;
  color: white;
}

.quiz-option-text {
  flex: 1;
}

.quiz-option-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.quiz-actions {
  display: flex;
  gap: 10px;
}

.quiz-btn {
  padding: 8px 20px;
  border-radius: 7px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
  border: none;
}

.quiz-btn:active {
  transform: scale(0.97);
}

.quiz-btn-primary {
  background: linear-gradient(135deg, var(--vp-c-brand-1, #0f766e), var(--auto-blue, #2563eb));
  color: white;
}

.quiz-btn-primary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.quiz-btn-primary:not(:disabled):hover {
  background: linear-gradient(135deg, var(--vp-c-brand-2, #0d9488), var(--auto-blue, #2563eb));
}

.quiz-btn-secondary {
  background: var(--vp-c-bg-soft, #eef6f3);
  color: var(--vp-c-text-1);
  border: 1px solid var(--auto-border);
}

.quiz-btn-secondary:hover {
  background: var(--vp-c-brand-soft);
}

.quiz-hint {
  margin-top: 14px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}

.hint-correct {
  background: rgba(21, 128, 61, 0.08);
  color: var(--auto-green, #15803d);
  border: 1px solid rgba(21, 128, 61, 0.2);
}

.hint-wrong {
  background: rgba(217, 119, 6, 0.08);
  color: var(--auto-accent, #d97706);
  border: 1px solid rgba(217, 119, 6, 0.2);
}

.hint-icon {
  font-size: 18px;
}

/* 动画 */
.hint-enter-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.hint-leave-active {
  transition: opacity 0.15s ease;
}
.hint-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}
.hint-leave-to {
  opacity: 0;
}

/* ── 移动端优化 ── */
@media (max-width: 640px) {
  .quiz-block {
    padding: 16px;
  }

  .quiz-question {
    font-size: 15px;
  }

  .quiz-option {
    padding: 14px 16px;
    min-height: 48px;
  }

  .quiz-option-marker {
    width: 28px;
    height: 28px;
    font-size: 13px;
  }

  .quiz-option-text {
    font-size: 14px;
  }

  .quiz-btn {
    padding: 10px 20px;
    min-height: 44px;
    font-size: 15px;
  }

  .quiz-actions {
    flex-direction: column;
  }

  .quiz-hint {
    padding: 10px 14px;
    font-size: 13px;
  }
}
</style>
