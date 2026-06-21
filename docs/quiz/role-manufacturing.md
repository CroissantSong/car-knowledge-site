<script setup>
import { computed } from 'vue'
import quizBank from '../.vitepress/data/quiz/bank.js'

const questions = computed(() => quizBank.filter(q => q.role === 'manufacturing'))

function typeLabel(type) {
  if (type === 'single') return '单选题'
  if (type === 'multi') return '多选题'
  if (type === 'judge') return '判断题'
  return type
}
</script>

# 🏭 制造/质量 · 专项练习

> 3 道题，覆盖四大生产工艺、FMEA风险优先数、8D问题解决步骤。

<div v-for="(q, i) in questions" :key="q.id">

## {{ i + 1 }}. {{ q.question }} <span style="font-size:0.75em;color:var(--vp-c-text-3)">[{{ typeLabel(q.type) }}]</span>

<QuizBlock
  :question="q.question"
  :options="q.options"
  :correctHint="'✅ 正确！' + q.explanation"
  :wrongHint="'❌ 不对哦。解析：' + q.explanation"
/>

</div>

---

<ProgressBadge path="/quiz/role-manufacturing" mode="checkbox" />

<div style="margin-top:24px">
  <a href="./">← 返回题库首页</a>
</div>
