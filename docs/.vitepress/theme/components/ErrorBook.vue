<script setup>
import { ref, computed } from 'vue'
import { useErrorBook } from '../composables/useErrorBook.js'
import QuizBlock from './QuizBlock.vue'

const { getErrorQuestions, removeQuestion, getErrorCount, clearAll } = useErrorBook()

const layerFilter = ref('all')
const roleFilter = ref('all')

const layerOptions = [
  { value: 'all', label: '全部层级' },
  { value: 'guide', label: '🚗 整车认知' },
  { value: 'mechanics', label: '⚙️ 机械基础' },
  { value: 'traditional', label: '🔧 传统系统' },
  { value: 'new-energy', label: '⚡ 新能源' },
  { value: 'smart-car', label: '🧠 智能汽车' },
  { value: 'industry', label: '🏢 车企语境' }
]

const roleOptions = [
  { value: 'all', label: '全部岗位' },
  { value: 'all-common', label: '📋 通用题' },
  { value: 'pm', label: '📋 产品/项目管理' },
  { value: 'procurement', label: '🛒 采购/供应链' },
  { value: 'manufacturing', label: '🏭 制造/质量' },
  { value: 'testing', label: '🔬 测试/研发' }
]

const filteredQuestions = computed(() => {
  let list = getErrorQuestions()
  if (layerFilter.value !== 'all') {
    list = list.filter(q => q.layer === layerFilter.value)
  }
  if (roleFilter.value === 'all-common') {
    list = list.filter(q => q.role === 'all')
  } else if (roleFilter.value !== 'all') {
    list = list.filter(q => q.role === roleFilter.value)
  }
  return list
})

const totalCount = computed(() => getErrorCount())

function typeLabel(type) {
  if (type === 'single') return '单选题'
  if (type === 'multi') return '多选题'
  if (type === 'judge') return '判断题'
  return type
}

function layerLabel(layer) {
  const map = {
    guide: '整车认知',
    mechanics: '机械基础',
    traditional: '传统系统',
    'new-energy': '新能源',
    'smart-car': '智能汽车',
    industry: '车企语境'
  }
  return map[layer] || layer
}

function roleLabel(role) {
  const map = {
    all: '通用',
    pm: '产品/项目管理',
    procurement: '采购/供应链',
    manufacturing: '制造/质量',
    testing: '测试/研发'
  }
  return map[role] || role
}

function handleQuizResult(payload) {
  if (payload.correct) {
    removeQuestion(payload.id)
  }
}

function handleClearAll() {
  if (totalCount.value > 0) {
    clearAll()
  }
}
</script>

<template>
  <div class="error-book">
    <!-- 统计栏 -->
    <div class="eb-stats">
      <div class="eb-stats-left">
        <span class="eb-stats-count">{{ totalCount }}</span>
        <span class="eb-stats-label">道错题</span>
      </div>
      <button
        v-if="totalCount > 0"
        class="eb-clear-btn"
        @click="handleClearAll"
      >
        清空错题本
      </button>
    </div>

    <!-- 筛选器 -->
    <div class="eb-filters">
      <div class="eb-filter-group">
        <label class="eb-filter-label">按层级：</label>
        <div class="eb-filter-pills">
          <button
            v-for="opt in layerOptions"
            :key="opt.value"
            class="eb-pill"
            :class="{ active: layerFilter === opt.value }"
            @click="layerFilter = opt.value"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>
      <div class="eb-filter-group">
        <label class="eb-filter-label">按岗位：</label>
        <div class="eb-filter-pills">
          <button
            v-for="opt in roleOptions"
            :key="opt.value"
            class="eb-pill"
            :class="{ active: roleFilter === opt.value }"
            @click="roleFilter = opt.value"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="filteredQuestions.length === 0" class="eb-empty">
      <div class="eb-empty-icon">🎉</div>
      <div class="eb-empty-title">{{ totalCount === 0 ? '还没有错题记录' : '当前筛选下没有错题' }}</div>
      <div class="eb-empty-desc">{{ totalCount === 0 ? '去做题吧，答错的题会自动出现在这里！' : '试试其他筛选条件。' }}</div>
    </div>

    <!-- 错题列表 -->
    <div v-else class="eb-list">
      <div
        v-for="(q, i) in filteredQuestions"
        :key="q.id"
        class="eb-item"
      >
        <div class="eb-item-header">
          <span class="eb-item-index">{{ i + 1 }}</span>
          <span class="eb-item-tag eb-item-layer">{{ layerLabel(q.layer) }}</span>
          <span v-if="q.role !== 'all'" class="eb-item-tag eb-item-role">{{ roleLabel(q.role) }}</span>
          <span class="eb-item-tag eb-item-type">{{ typeLabel(q.type) }}</span>
          <span class="eb-item-wrong-count" title="答错次数">❌ ×{{ q.wrongCount }}</span>
        </div>
        <QuizBlock
          :id="q.id"
          :type="q.type"
          :question="q.question"
          :options="q.options"
          :correctHint="'✅ 答对了，已从错题本移除！'"
          :wrongHint="'❌ 还是不对哦。解析：' + q.explanation"
          @result="handleQuizResult"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-book {
  margin: 16px 0;
}

/* ── 统计栏 ── */
.eb-stats {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: linear-gradient(135deg, var(--auto-card, rgba(255, 255, 255, 0.84)), var(--vp-c-bg-soft, #eef6f3));
  border: 1px solid var(--auto-border, rgba(20, 33, 61, 0.12));
  border-radius: 10px;
  margin-bottom: 16px;
}

.eb-stats-left {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.eb-stats-count {
  font-size: 28px;
  font-weight: 800;
  color: var(--auto-accent, #d97706);
  line-height: 1;
}

.eb-stats-label {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-2, #4a5a70);
}

.eb-clear-btn {
  padding: 8px 16px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  background: var(--vp-c-bg-soft, #eef6f3);
  color: var(--vp-c-text-2);
  border: 1px solid var(--auto-border);
  transition: all 0.15s;
}

.eb-clear-btn:hover {
  background: rgba(220, 38, 38, 0.08);
  color: #dc2626;
  border-color: #dc2626;
}

/* ── 筛选器 ── */
.eb-filters {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.eb-filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.eb-filter-label {
  font-size: 13px;
  font-weight: 700;
  color: var(--vp-c-text-2, #4a5a70);
  white-space: nowrap;
}

.eb-filter-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.eb-pill {
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid var(--auto-border, rgba(20, 33, 61, 0.12));
  background: var(--auto-card-strong, #ffffff);
  color: var(--vp-c-text-2, #4a5a70);
  transition: all 0.15s;
  white-space: nowrap;
}

.eb-pill:hover {
  border-color: var(--vp-c-brand-2, #0d9488);
  color: var(--vp-c-brand-2);
}

.eb-pill.active {
  background: var(--vp-c-brand-1, #0f766e);
  color: white;
  border-color: var(--vp-c-brand-1);
}

/* ── 空状态 ── */
.eb-empty {
  text-align: center;
  padding: 60px 20px;
  border: 2px dashed var(--auto-border, rgba(20, 33, 61, 0.12));
  border-radius: 12px;
  background: var(--vp-c-bg-soft, #eef6f3);
}

.eb-empty-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.eb-empty-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-text-1, #14213d);
  margin-bottom: 6px;
}

.eb-empty-desc {
  font-size: 14px;
  color: var(--vp-c-text-2, #4a5a70);
}

/* ── 错题列表 ── */
.eb-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.eb-item {
  border-left: 3px solid var(--auto-accent, #d97706);
  padding-left: 16px;
}

.eb-item-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.eb-item-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: var(--auto-accent, #d97706);
  color: white;
  font-size: 12px;
  font-weight: 800;
  flex-shrink: 0;
}

.eb-item-tag {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11.5px;
  font-weight: 600;
}

.eb-item-layer {
  background: var(--vp-c-brand-soft, rgba(20, 184, 166, 0.14));
  color: var(--vp-c-brand-2, #0d9488);
}

.eb-item-role {
  background: rgba(37, 99, 235, 0.1);
  color: var(--auto-blue, #2563eb);
}

.eb-item-type {
  background: var(--vp-c-bg-soft, #eef6f3);
  color: var(--vp-c-text-2, #4a5a70);
}

.eb-item-wrong-count {
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-3, #6c7a8d);
  margin-left: auto;
}

/* ── 移动端优化 ── */
@media (max-width: 640px) {
  .eb-stats {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .eb-filter-group {
    flex-direction: column;
    align-items: flex-start;
  }

  .eb-item {
    padding-left: 12px;
  }
}
</style>
