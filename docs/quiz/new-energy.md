<script setup>
import { computed } from 'vue'
import quizBank from '../.vitepress/data/quiz/bank.js'

const questions = computed(() => quizBank.filter(q => q.layer === 'new-energy' && q.role === 'all'))

function typeLabel(type) {
  if (type === 'single') return '单选题'
  if (type === 'multi') return '多选题'
  if (type === 'judge') return '判断题'
  return type
}
</script>

# ⚡ 第四层：新能源 · 练习

> 6 道题，覆盖充电对比、电池安全、三电系统、800V高压、12V取电、增程误区。

<div v-for="(q, i) in questions" :key="q.id">

## {{ i + 1 }}. {{ q.question }} <span style="font-size:0.75em;color:var(--vp-c-text-3)">[{{ typeLabel(q.type) }}]</span>

<QuizBlock
  :type="q.type"
  :question="q.question"
  :options="q.options"
  :correctHint="'✅ 正确！' + q.explanation"
  :wrongHint="'❌ 不对哦。解析：' + q.explanation"
/>

</div>

---

<ProgressBadge path="/quiz/new-energy" mode="checkbox" />

<div style="margin-top:24px">
  <a href="./">← 返回题库首页</a>
</div>
