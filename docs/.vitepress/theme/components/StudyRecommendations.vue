<script setup>
import { computed } from 'vue'
import { useErrorBook } from '../composables/useErrorBook.js'
import { useProgress } from '../composables/useProgress.js'

const { getErrorQuestions, getErrorCount } = useErrorBook()
const { isCompleted, isVisited, getLayerProgress } = useProgress()

/**
 * 六层学习路径定义
 * 每层包含名称、icon、路径和子页面列表
 */
const layers = [
  {
    id: 'guide',
    name: '整车认知',
    icon: '🚗',
    link: '/guide/',
    pages: [
      { path: '/guide/', label: '总览' },
      { path: '/guide/classification', label: '汽车分类与结构' },
      { path: '/guide/body-chassis', label: '车身与底盘' }
    ]
  },
  {
    id: 'mechanics',
    name: '机械基础',
    icon: '⚙️',
    link: '/mechanics/',
    pages: [
      { path: '/mechanics/', label: '总览' },
      { path: '/mechanics/engine', label: '发动机原理' },
      { path: '/mechanics/transmission-suspension', label: '传动与悬架' }
    ]
  },
  {
    id: 'traditional',
    name: '传统系统',
    icon: '🔧',
    link: '/traditional/',
    pages: [
      { path: '/traditional/', label: '总览' },
      { path: '/traditional/fuel-system', label: '燃油动力系统' },
      { path: '/traditional/braking-steering', label: '制动与转向' }
    ]
  },
  {
    id: 'new-energy',
    name: '新能源',
    icon: '⚡',
    link: '/new-energy/',
    pages: [
      { path: '/new-energy/', label: '总览' },
      { path: '/new-energy/battery-motor', label: '电池与电机' },
      { path: '/new-energy/hybrid-range-extender', label: '混合动力与增程' }
    ]
  },
  {
    id: 'smart-car',
    name: '智能汽车',
    icon: '🧠',
    link: '/smart-car/',
    pages: [
      { path: '/smart-car/', label: '总览' },
      { path: '/smart-car/adas', label: 'ADAS 与自动驾驶' },
      { path: '/smart-car/v2x-ota', label: 'V2X 与 OTA' }
    ]
  },
  {
    id: 'industry',
    name: '车企语境',
    icon: '🏢',
    link: '/industry/',
    pages: [
      { path: '/industry/', label: '总览' },
      { path: '/industry/terminology', label: '常用术语与流程' },
      { path: '/industry/roles', label: '岗位与协作' }
    ]
  }
]

const errorCount = computed(() => getErrorCount())

/**
 * 最近错题（最多展示 5 道）
 */
const recentErrors = computed(() => {
  return getErrorQuestions().slice(0, 5)
})

/**
 * 层级进度概览
 */
const layerProgressList = computed(() => {
  return layers.map(layer => {
    const paths = layer.pages.map(p => p.path)
    const ratio = getLayerProgress(paths)
    const completedCount = paths.filter(p => isCompleted(p)).length
    const visitedCount = paths.filter(p => isVisited(p)).length
    // 找到第一个未完成的页面作为"继续学习"入口
    const nextPage = layer.pages.find(p => !isCompleted(p.path))
    return {
      ...layer,
      ratio,
      completedCount,
      visitedCount,
      total: paths.length,
      percent: Math.round(ratio * 100),
      nextPage
    }
  })
})

/**
 * 推荐继续学习的层级（未 100% 完成且有已访问页面的优先）
 */
const continueLayers = computed(() => {
  return layerProgressList.value.filter(l => l.percent < 100)
})

/**
 * 错题按层级分组统计
 */
const errorByLayer = computed(() => {
  const questions = getErrorQuestions()
  const map = {}
  questions.forEach(q => {
    const layer = q.layer || 'other'
    if (!map[layer]) map[layer] = 0
    map[layer]++
  })
  return map
})

function layerName(id) {
  const found = layers.find(l => l.id === id)
  return found ? found.name : id
}

function layerIcon(id) {
  const found = layers.find(l => l.id === id)
  return found ? found.icon : '📚'
}
</script>

<template>
  <div class="study-rec">
    <!-- 整体状态摘要 -->
    <div class="rec-summary">
      <div class="rec-summary-item" v-if="errorCount > 0">
        <span class="rec-summary-icon">📕</span>
        <span class="rec-summary-text">
          错题本有 <strong>{{ errorCount }}</strong> 道题需要复习
        </span>
      </div>
      <div class="rec-summary-item" v-else>
        <span class="rec-summary-icon">🎉</span>
        <span class="rec-summary-text">错题本为空，继续保持！</span>
      </div>
    </div>

    <!-- 错题复习推荐（优先展示） -->
    <div v-if="recentErrors.length > 0" class="rec-section rec-errors">
      <div class="rec-section-head">
        <h3 class="rec-section-title">
          <span class="rec-section-icon">📕</span>
          错题优先复习
        </h3>
        <a class="rec-link" href="/car-knowledge-site/quiz/error-book">查看全部错题 →</a>
      </div>

      <!-- 错题按层级分组 -->
      <div class="rec-error-groups">
        <div
          v-for="(count, layerId) in errorByLayer"
          :key="layerId"
          class="rec-error-group"
        >
          <span class="rec-error-group-icon">{{ layerIcon(layerId) }}</span>
          <span class="rec-error-group-name">{{ layerName(layerId) }}</span>
          <span class="rec-error-group-count">{{ count }} 题</span>
          <a class="rec-error-group-link" :href="'/car-knowledge-site/quiz/' + layerId">去复习</a>
        </div>
      </div>

      <!-- 最近几道错题预览 -->
      <div class="rec-error-preview">
        <div
          v-for="q in recentErrors"
          :key="q.id"
          class="rec-error-item"
        >
          <span class="rec-error-badge">{{ layerIcon(q.layer) }}</span>
          <span class="rec-error-text">{{ q.question.length > 60 ? q.question.slice(0, 60) + '…' : q.question }}</span>
          <span class="rec-error-wrong">❌ ×{{ q.wrongCount }}</span>
        </div>
      </div>
    </div>

    <!-- 继续学习推荐 -->
    <div class="rec-section rec-continue">
      <div class="rec-section-head">
        <h3 class="rec-section-title">
          <span class="rec-section-icon">📖</span>
          继续学习
        </h3>
        <a class="rec-link" href="/car-knowledge-site/path">查看完整地图 →</a>
      </div>

      <div class="rec-layers">
        <div
          v-for="layer in continueLayers"
          :key="layer.id"
          class="rec-layer-card"
        >
          <div class="rec-layer-top">
            <span class="rec-layer-icon">{{ layer.icon }}</span>
            <div class="rec-layer-info">
              <span class="rec-layer-name">{{ layer.name }}</span>
              <span class="rec-layer-stat">{{ layer.completedCount }}/{{ layer.total }} 已完成</span>
            </div>
            <span class="rec-layer-percent" :class="{ 'is-zero': layer.percent === 0, 'is-done': layer.percent === 100 }">
              {{ layer.percent }}%
            </span>
          </div>

          <!-- 进度条 -->
          <div class="rec-layer-bar">
            <div class="rec-layer-bar-fill" :style="{ width: layer.percent + '%' }"></div>
          </div>

          <!-- 快捷入口 -->
          <div class="rec-layer-actions">
            <a
              v-if="layer.nextPage"
              class="rec-layer-btn primary"
              :href="'/car-knowledge-site' + layer.nextPage.path"
            >
              {{ layer.visitedCount > 0 && !isCompleted(layer.nextPage.path) ? '继续：' + layer.nextPage.label : '开始学习' }}
            </a>
            <a
              v-if="errorByLayer[layer.id]"
              class="rec-layer-btn accent"
              :href="'/car-knowledge-site/quiz/' + layer.id"
            >
              复习错题（{{ errorByLayer[layer.id] }}）
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- 如果全部完成 -->
    <div v-if="continueLayers.length === 0 && errorCount === 0" class="rec-all-done">
      <div class="rec-all-done-icon">🏆</div>
      <div class="rec-all-done-title">恭喜！六层路径全部完成</div>
      <div class="rec-all-done-desc">错题本也已清空。可以回顾岗位导航，看看有没有遗漏的专项知识点。</div>
      <a class="rec-layer-btn primary" href="/car-knowledge-site/roles-guide/">查看岗位导航</a>
    </div>
  </div>
</template>

<style scoped>
.study-rec {
  margin: 0;
}

/* ── 摘要 ── */
.rec-summary {
  margin-bottom: 20px;
}

.rec-summary-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--auto-card, rgba(255, 255, 255, 0.84)), var(--vp-c-bg-soft, #eef6f3));
  border: 1px solid var(--auto-border, rgba(20, 33, 61, 0.12));
}

.rec-summary-icon {
  font-size: 22px;
  flex-shrink: 0;
}

.rec-summary-text {
  font-size: 15px;
  color: var(--vp-c-text-1, #162033);
  font-weight: 600;
}

.rec-summary-text strong {
  color: var(--auto-accent, #d97706);
  font-weight: 800;
}

/* ── 区块通用 ── */
.rec-section {
  margin-bottom: 24px;
}

.rec-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.rec-section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: var(--auto-ink, #14213d);
  border: 0;
  padding: 0;
}

.rec-section-icon {
  font-size: 20px;
}

.rec-link {
  font-size: 13px;
  font-weight: 700;
  color: var(--vp-c-brand-2, #0d9488);
  text-decoration: none;
  transition: color 0.15s;
}

.rec-link:hover {
  color: var(--vp-c-brand-1, #0f766e);
}

/* ── 错题分组 ── */
.rec-error-groups {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}

.rec-error-group {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  background: var(--auto-card-strong, #ffffff);
  border: 1px solid var(--auto-border, rgba(20, 33, 61, 0.12));
  font-size: 13px;
}

.rec-error-group-icon {
  font-size: 16px;
}

.rec-error-group-name {
  font-weight: 700;
  color: var(--vp-c-text-1, #162033);
}

.rec-error-group-count {
  color: var(--auto-accent, #d97706);
  font-weight: 700;
  font-size: 12px;
}

.rec-error-group-link {
  margin-left: 4px;
  font-size: 12px;
  font-weight: 700;
  color: var(--vp-c-brand-2, #0d9488);
  text-decoration: none;
}

.rec-error-group-link:hover {
  text-decoration: underline;
}

/* ── 错题预览 ── */
.rec-error-preview {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.rec-error-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  border-radius: 8px;
  background: var(--auto-card-strong, #ffffff);
  border: 1px solid var(--auto-border, rgba(20, 33, 61, 0.12));
  border-left: 3px solid var(--auto-accent, #d97706);
  font-size: 13.5px;
}

.rec-error-badge {
  font-size: 16px;
  flex-shrink: 0;
}

.rec-error-text {
  flex: 1;
  color: var(--vp-c-text-1, #162033);
  font-weight: 600;
  line-height: 1.5;
}

.rec-error-wrong {
  font-size: 12px;
  color: var(--vp-c-text-3, #6c7a8d);
  white-space: nowrap;
  flex-shrink: 0;
}

/* ── 层级卡片 ── */
.rec-layers {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.rec-layer-card {
  padding: 16px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--auto-card, rgba(255, 255, 255, 0.84)), var(--vp-c-bg-soft, #eef6f3));
  border: 1px solid var(--auto-border, rgba(20, 33, 61, 0.12));
  transition: border-color 0.18s, box-shadow 0.18s;
}

.rec-layer-card:hover {
  border-color: var(--vp-c-brand-2, #0d9488);
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
}

.rec-layer-top {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.rec-layer-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.rec-layer-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.rec-layer-name {
  font-size: 15px;
  font-weight: 800;
  color: var(--auto-ink, #14213d);
}

.rec-layer-stat {
  font-size: 12px;
  color: var(--vp-c-text-3, #6c7a8d);
  font-weight: 600;
}

.rec-layer-percent {
  font-size: 20px;
  font-weight: 850;
  color: var(--vp-c-brand-1, #0f766e);
  flex-shrink: 0;
}

.rec-layer-percent.is-zero {
  color: var(--vp-c-text-3, #6c7a8d);
  opacity: 0.5;
}

/* ── 进度条 ── */
.rec-layer-bar {
  height: 5px;
  border-radius: 999px;
  background: var(--vp-c-bg-soft, #eef6f3);
  overflow: hidden;
  margin-bottom: 12px;
}

.rec-layer-bar-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--vp-c-brand-2, #0d9488), var(--auto-accent, #d97706));
  transition: width 0.5s ease;
  min-width: 0;
}

/* ── 操作按钮 ── */
.rec-layer-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.rec-layer-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 7px 14px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none !important;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, transform 0.1s;
  border: 1px solid transparent;
  min-height: 36px;
}

.rec-layer-btn:active {
  transform: scale(0.97);
}

.rec-layer-btn.primary {
  background: linear-gradient(135deg, var(--vp-c-brand-1, #0f766e), var(--auto-blue, #2563eb));
  color: white;
}

.rec-layer-btn.primary:hover {
  background: linear-gradient(135deg, var(--vp-c-brand-2, #0d9488), var(--auto-blue, #2563eb));
}

.rec-layer-btn.accent {
  background: var(--auto-accent-soft, rgba(217, 119, 6, 0.14));
  color: var(--auto-accent, #d97706);
  border-color: rgba(217, 119, 6, 0.25);
}

.rec-layer-btn.accent:hover {
  background: rgba(217, 119, 6, 0.2);
}

/* ── 全部完成 ── */
.rec-all-done {
  text-align: center;
  padding: 48px 20px;
  border: 2px dashed var(--auto-border, rgba(20, 33, 61, 0.12));
  border-radius: 12px;
  background: var(--vp-c-bg-soft, #eef6f3);
}

.rec-all-done-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.rec-all-done-title {
  font-size: 20px;
  font-weight: 800;
  color: var(--auto-ink, #14213d);
  margin-bottom: 8px;
}

.rec-all-done-desc {
  font-size: 14px;
  color: var(--vp-c-text-2, #4a5a70);
  margin-bottom: 20px;
  max-width: 440px;
  margin-left: auto;
  margin-right: auto;
}

/* ── 移动端 ── */
@media (max-width: 640px) {
  .rec-layers {
    grid-template-columns: 1fr;
  }

  .rec-section-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .rec-error-groups {
    flex-direction: column;
  }

  .rec-layer-btn {
    width: 100%;
    min-height: 44px;
  }
}
</style>
