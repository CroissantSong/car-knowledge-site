<script setup>
import { computed } from 'vue'
import quizBank from '../.vitepress/data/quiz/bank.js'

const questions = computed(() => quizBank.filter(q => q.role === 'procurement'))

function typeLabel(type) {
  if (type === 'single') return '单选题'
  if (type === 'multi') return '多选题'
  if (type === 'judge') return '判断题'
  return type
}
</script>

# 🛒 采购/供应链 · 专项练习

> 3 道题，覆盖电池正极材料成本、PPAP批准流程、芯片供应链风险。

<div v-for="(q, i) in questions" :key="q.id">

## {{ i + 1 }}. {{ q.question }} <span style="font-size:0.75em;color:var(--vp-c-text-3)">[{{ typeLabel(q.type) }}]</span>

<QuizBlock
  :id="q.id"
  :type="q.type"
  :question="q.question"
  :options="q.options"
  :correctHint="'✅ 正确！' + q.explanation"
  :wrongHint="'❌ 不对哦。解析：' + q.explanation"
  :layer="q.layer"
  :role="q.role"
  :explanation="q.explanation"
  :tags="q.tags"
/>

</div>

---

<ProgressBadge path="/quiz/role-procurement" mode="checkbox" />

<div style="margin-top:24px">
  <a href="./">← 返回题库首页</a>
</div>
