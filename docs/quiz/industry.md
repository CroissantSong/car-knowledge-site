<script setup>
import { computed } from 'vue'
import quizBank from '../.vitepress/data/quiz/bank.js'

const questions = computed(() => quizBank.filter(q => q.layer === 'industry' && q.role === 'all'))

function typeLabel(type) {
  if (type === 'single') return '单选题'
  if (type === 'multi') return '多选题'
  if (type === 'judge') return '判断题'
  return type
}
</script>

# 🏢 第六层：车企工作语境 · 练习

> 6 道题，覆盖 NVH、SOP、围堵、FMEA、研发节点流程、供应链层级。

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

<ProgressBadge path="/quiz/industry" mode="checkbox" />

<div style="margin-top:24px">
  <a href="./">← 返回题库首页</a>
</div>
