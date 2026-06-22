<script setup>
import { computed, ref, onMounted } from 'vue'
import { useErrorBook } from '../composables/useErrorBook.js'
import { useProgress } from '../composables/useProgress.js'
import StudyRecommendations from './StudyRecommendations.vue'

const { getErrorQuestions, getErrorCount } = useErrorBook()
const { isCompleted, isVisited, getLayerProgress, getLayerProgressDetail, resetProgress } = useProgress()

// Loading state (brief, for localStorage hydration)
const isReady = ref(false)
onMounted(() => {
  // Small delay to simulate hydration and let composables read localStorage
  requestAnimationFrame(() => { isReady.value = true })
})

/**
 * 六层学习路径定义（与 StudyRecommendations 保持一致）
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

/* ── 概览数据 ── */
const totalLessons = computed(() => layers.reduce((s, l) => s + l.pages.length, 0))

const completedLessons = computed(() => {
  let count = 0
  layers.forEach(l => {
    l.pages.forEach(p => {
      if (isCompleted(p.path)) count++
    })
  })
  return count
})

const visitedLessons = computed(() => {
  let count = 0
  layers.forEach(l => {
    l.pages.forEach(p => {
      if (isVisited(p.path)) count++
    })
  })
  return count
})

const overallPercent = computed(() =>
  totalLessons.value > 0 ? Math.round((completedLessons.value / totalLessons.value) * 100) : 0
)

const errorCount = computed(() => getErrorCount())

/* ── 层级进度数据 ── */
const layerProgressList = computed(() =>
  layers.map(layer => {
    const detail = getLayerProgressDetail(layer.pages.map(p => p.path))
    return {
      ...layer,
      ...detail,
      percent: Math.round(detail.ratio * 100)
    }
  })
)

/* ── 错题分布（按层级） ── */
const errorByLayer = computed(() => {
  const map = {}
  layers.forEach(l => { map[l.id] = 0 })
  getErrorQuestions().forEach(q => {
    const key = q.layer || 'other'
    map[key] = (map[key] || 0) + 1
  })
  return map
})

const maxErrorByLayer = computed(() => Math.max(1, ...Object.values(errorByLayer.value)))
const maxErrorByRole = computed(() => Math.max(1, ...Object.values(errorByRole.value)))

/* ── 错题分布（按岗位） ── */
const errorByRole = computed(() => {
  const map = { all: 0, pm: 0, procurement: 0, manufacturing: 0, testing: 0 }
  getErrorQuestions().forEach(q => {
    const key = q.role || 'all'
    map[key] = (map[key] || 0) + 1
  })
  return map
})

const roleLabels = {
  all: '通用',
  pm: '产品/项目',
  procurement: '采购/供应链',
  manufacturing: '制造/质量',
  testing: '测试/研发'
}

const roleIcons = {
  all: '📋',
  pm: '📋',
  procurement: '🛒',
  manufacturing: '🏭',
  testing: '🔬'
}

/* ── SVG 环形图计算 ── */
const ringRadius = 42
const ringCircumference = computed(() => 2 * Math.PI * ringRadius)
const ringStrokeDashoffset = computed(() =>
  ringCircumference.value * (1 - overallPercent.value / 100)
)

/* ── 重置确认 ── */
const showResetConfirm = ref(false)

function handleReset() {
  resetProgress()
  showResetConfirm.value = false
}
</script>

<template>
  <div class="dashboard">
    <!-- Loading skeleton -->
    <div v-if="!isReady" class="dash-loading">
      <div class="dash-skeleton-ring"></div>
      <div class="dash-skeleton-stats">
        <div class="dash-skeleton-card"></div>
        <div class="dash-skeleton-card"></div>
        <div class="dash-skeleton-card"></div>
        <div class="dash-skeleton-card"></div>
      </div>
      <div class="dash-skeleton-layers">
        <div class="dash-skeleton-layer"></div>
        <div class="dash-skeleton-layer"></div>
        <div class="dash-skeleton-layer"></div>
      </div>
    </div>

    <!-- Main dashboard content -->
    <template v-else>
    <!-- ═══ 顶部概览卡 ═══ -->
    <div class="dash-overview">
      <!-- 左侧：环形进度 -->
      <div class="dash-ring-card">
        <svg class="dash-ring-svg" viewBox="0 0 100 100" :aria-label="'总进度 ' + overallPercent + '%'">
          <circle
            class="dash-ring-bg"
            cx="50" cy="50"
            :r="ringRadius"
            fill="none"
            stroke-width="8"
          />
          <circle
            class="dash-ring-fill"
            cx="50" cy="50"
            :r="ringRadius"
            fill="none"
            stroke-width="8"
            stroke-linecap="round"
            :stroke-dasharray="ringCircumference"
            :stroke-dashoffset="ringStrokeDashoffset"
            transform="rotate(-90 50 50)"
          />
          <text class="dash-ring-percent" x="50" y="46" text-anchor="middle" dominant-baseline="middle">
            {{ overallPercent }}%
          </text>
          <text class="dash-ring-label" x="50" y="62" text-anchor="middle" dominant-baseline="middle">
            总进度
          </text>
        </svg>
      </div>

      <!-- 右侧：统计网格 -->
      <div class="dash-stats-grid">
        <div class="dash-stat-card">
          <span class="dash-stat-icon">📖</span>
          <div class="dash-stat-content">
            <span class="dash-stat-value">{{ completedLessons }} / {{ totalLessons }}</span>
            <span class="dash-stat-label">已完成课时</span>
          </div>
        </div>
        <div class="dash-stat-card">
          <span class="dash-stat-icon">👁️</span>
          <div class="dash-stat-content">
            <span class="dash-stat-value">{{ visitedLessons }}</span>
            <span class="dash-stat-label">已浏览页面</span>
          </div>
        </div>
        <div class="dash-stat-card" :class="{ 'has-errors': errorCount > 0 }">
          <span class="dash-stat-icon">📕</span>
          <div class="dash-stat-content">
            <span class="dash-stat-value">{{ errorCount }}</span>
            <span class="dash-stat-label">错题数量</span>
          </div>
        </div>
        <div class="dash-stat-card">
          <span class="dash-stat-icon">📊</span>
          <div class="dash-stat-content">
            <span class="dash-stat-value">{{ layerProgressList.filter(l => l.percent === 100).length }} / 6</span>
            <span class="dash-stat-label">层级完成</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ 各层进度详细 ═══ -->
    <section class="dash-section">
      <h2 class="dash-section-title">
        <span class="dash-section-icon">📈</span>
        各层学习进度
      </h2>

      <div class="dash-layer-grid">
        <div
          v-for="layer in layerProgressList"
          :key="layer.id"
          class="dash-layer-card"
          :class="{ 'layer-done': layer.percent === 100 }"
        >
          <div class="dash-layer-header">
            <span class="dash-layer-icon">{{ layer.icon }}</span>
            <div class="dash-layer-info">
              <span class="dash-layer-name">{{ layer.name }}</span>
              <span class="dash-layer-stat">{{ layer.completed }}/{{ layer.total }} 已完成</span>
            </div>
            <span
              class="dash-layer-percent"
              :class="{ 'p-zero': layer.percent === 0, 'p-done': layer.percent === 100 }"
            >
              {{ layer.percent }}%
            </span>
          </div>

          <!-- 进度条 -->
          <div class="dash-layer-bar">
            <div
              class="dash-layer-bar-fill"
              :style="{ width: layer.percent + '%' }"
            ></div>
          </div>

          <!-- 页面明细 -->
          <div class="dash-layer-pages">
            <div
              v-for="page in layer.pages"
              :key="page.path"
              class="dash-page-item"
              :class="{ done: isCompleted(page.path), visited: isVisited(page.path) }"
            >
              <span class="dash-page-icon">{{ isCompleted(page.path) ? '✅' : isVisited(page.path) ? '◎' : '○' }}</span>
              <a class="dash-page-link" :href="'/car-knowledge-site' + page.path">{{ page.label }}</a>
            </div>
          </div>

          <!-- 操作 -->
          <div class="dash-layer-actions">
            <a class="dash-action-btn primary" :href="'/car-knowledge-site' + layer.link">
              {{ layer.percent > 0 && layer.percent < 100 ? '继续学习' : layer.percent === 100 ? '回顾' : '开始学习' }}
            </a>
            <a
              v-if="errorByLayer[layer.id] > 0"
              class="dash-action-btn accent"
              :href="'/car-knowledge-site/quiz/' + layer.id"
            >
              复习错题（{{ errorByLayer[layer.id] }}）
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 错题分布 ═══ -->
    <section class="dash-section" v-if="errorCount > 0">
      <h2 class="dash-section-title">
        <span class="dash-section-icon">📊</span>
        错题分布
      </h2>

      <div class="dash-error-panels">
        <!-- 按层级分布 -->
        <div class="dash-error-panel">
          <h3 class="dash-panel-title">按学习层级</h3>
          <div class="dash-bar-chart">
            <div
              v-for="layer in layerProgressList"
              :key="layer.id"
              class="dash-bar-row"
            >
              <span class="dash-bar-label">{{ layer.icon }} {{ layer.name }}</span>
              <div class="dash-bar-track">
                <div
                  class="dash-bar-fill"
                  :style="{ width: ((errorByLayer[layer.id] || 0) / maxErrorByLayer * 100) + '%' }"
                ></div>
              </div>
              <span class="dash-bar-value">{{ errorByLayer[layer.id] || 0 }}</span>
            </div>
          </div>
        </div>

        <!-- 按岗位分布 -->
        <div class="dash-error-panel">
          <h3 class="dash-panel-title">按岗位方向</h3>
          <div class="dash-bar-chart">
            <div
              v-for="(count, role) in errorByRole"
              :key="role"
              class="dash-bar-row"
            >
              <span class="dash-bar-label">{{ roleIcons[role] }} {{ roleLabels[role] }}</span>
              <div class="dash-bar-track">
                <div
                  class="dash-bar-fill accent"
                  :style="{ width: (count / maxErrorByRole * 100) + '%' }"
                ></div>
              </div>
              <span class="dash-bar-value">{{ count }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 错题快捷入口 -->
      <div class="dash-error-links">
        <a class="dash-action-btn primary" href="/car-knowledge-site/quiz/error-book">
          📕 前往错题本复习
        </a>
      </div>
    </section>

    <!-- ═══ 推荐复习 ═══ -->
    <section class="dash-section">
      <h2 class="dash-section-title">
        <span class="dash-section-icon">💡</span>
        推荐复习
      </h2>
      <StudyRecommendations />
    </section>

    <!-- ═══ 底部操作 ═══ -->
    <div class="dash-footer">
      <a class="dash-action-btn outline" href="/car-knowledge-site/path">
        🗺️ 查看 30 天学习地图
      </a>
      <a class="dash-action-btn outline" href="/car-knowledge-site/quiz/">
        📝 前往题库
      </a>
      <a class="dash-action-btn outline" href="/car-knowledge-site/glossary">
        📖 查看术语表
      </a>
      <button
        class="dash-action-btn danger-outline"
        @click="showResetConfirm = true"
      >
        🗑️ 重置进度
      </button>
    </div>

    <!-- 重置确认弹窗 -->
    <Teleport to="body">
      <div v-if="showResetConfirm" class="dash-modal-overlay" @click.self="showResetConfirm = false">
        <div class="dash-modal">
          <div class="dash-modal-icon">⚠️</div>
          <h3 class="dash-modal-title">确认重置学习进度？</h3>
          <p class="dash-modal-desc">此操作会清空所有已学完和已访问的标记，但不会影响错题本。重置后无法恢复。</p>
          <div class="dash-modal-actions">
            <button class="dash-action-btn outline" @click="showResetConfirm = false">取消</button>
            <button class="dash-action-btn danger" @click="handleReset">确认重置</button>
          </div>
        </div>
      </div>
    </Teleport>
    </template><!-- /v-else -->
  </div>
</template>

<style scoped>
.dashboard {
  margin: 0;
}

/* ══════ Loading Skeleton ══════ */
.dash-loading {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.dash-skeleton-ring {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: linear-gradient(90deg, var(--vp-c-bg-soft) 25%, var(--vp-c-bg-alt) 50%, var(--vp-c-bg-soft) 75%);
  background-size: 200% 100%;
  animation: dash-shimmer 1.5s infinite;
  margin: 0 auto 16px;
}

.dash-skeleton-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.dash-skeleton-card {
  height: 72px;
  border-radius: 12px;
  background: linear-gradient(90deg, var(--vp-c-bg-soft) 25%, var(--vp-c-bg-alt) 50%, var(--vp-c-bg-soft) 75%);
  background-size: 200% 100%;
  animation: dash-shimmer 1.5s infinite;
}

.dash-skeleton-layers {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.dash-skeleton-layer {
  height: 180px;
  border-radius: 12px;
  background: linear-gradient(90deg, var(--vp-c-bg-soft) 25%, var(--vp-c-bg-alt) 50%, var(--vp-c-bg-soft) 75%);
  background-size: 200% 100%;
  animation: dash-shimmer 1.5s infinite;
}

@keyframes dash-shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@media (max-width: 768px) {
  .dash-skeleton-stats,
  .dash-skeleton-layers {
    grid-template-columns: 1fr;
  }
}

/* ══════ 概览区 ══════ */
.dash-overview {
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
  align-items: stretch;
}

/* 环形进度卡 */
.dash-ring-card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 20px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--auto-card, rgba(255,255,255,0.84)), var(--vp-c-bg-soft, #eef6f3));
  border: 1px solid var(--auto-border, rgba(20,33,61,0.12));
}

.dash-ring-svg {
  width: 140px;
  height: 140px;
}

.dash-ring-bg {
  stroke: var(--vp-c-bg-soft, #eef6f3);
}

.dash-ring-fill {
  stroke: var(--vp-c-brand-2, #0d9488);
  transition: stroke-dashoffset 0.8s ease;
}

.dash-ring-percent {
  font-size: 22px;
  font-weight: 800;
  fill: var(--auto-ink, #14213d);
}

.dash-ring-label {
  font-size: 11px;
  font-weight: 600;
  fill: var(--vp-c-text-2, #4a5a70);
}

/* 统计网格 */
.dash-stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
  flex: 1;
  min-width: 0;
}

.dash-stat-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--auto-card, rgba(255,255,255,0.84)), var(--vp-c-bg-soft, #eef6f3));
  border: 1px solid var(--auto-border, rgba(20,33,61,0.12));
  transition: border-color 0.18s, box-shadow 0.18s;
}

.dash-stat-card:hover {
  border-color: var(--vp-c-brand-2, #0d9488);
  box-shadow: 0 4px 16px rgba(15,23,42,0.06);
}

.dash-stat-card.has-errors {
  border-left: 3px solid var(--auto-accent, #d97706);
}

.dash-stat-icon {
  font-size: 26px;
  flex-shrink: 0;
}

.dash-stat-content {
  display: flex;
  flex-direction: column;
}

.dash-stat-value {
  font-size: 22px;
  font-weight: 850;
  color: var(--auto-ink, #14213d);
  line-height: 1.2;
}

.dash-stat-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2, #4a5a70);
}

/* ══════ 通用区块 ══════ */
.dash-section {
  margin-bottom: 32px;
}

.dash-section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 18px;
  font-size: 20px;
  font-weight: 800;
  color: var(--auto-ink, #14213d);
  border: 0;
  padding: 0;
}

.dash-section-icon {
  font-size: 22px;
}

/* ══════ 层级卡片网格 ══════ */
.dash-layer-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.dash-layer-card {
  padding: 18px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--auto-card, rgba(255,255,255,0.84)), var(--vp-c-bg-soft, #eef6f3));
  border: 1px solid var(--auto-border, rgba(20,33,61,0.12));
  transition: border-color 0.18s, box-shadow 0.18s;
}

.dash-layer-card:hover {
  border-color: var(--vp-c-brand-2, #0d9488);
  box-shadow: 0 6px 20px rgba(15,23,42,0.07);
}

.dash-layer-card.layer-done {
  border-color: var(--auto-green, #15803d);
  background: linear-gradient(135deg, rgba(21,128,61,0.04), var(--vp-c-bg-soft, #eef6f3));
}

.dash-layer-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.dash-layer-icon {
  font-size: 28px;
  flex-shrink: 0;
}

.dash-layer-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.dash-layer-name {
  font-size: 16px;
  font-weight: 800;
  color: var(--auto-ink, #14213d);
}

.dash-layer-stat {
  font-size: 12px;
  color: var(--vp-c-text-3, #6c7a8d);
  font-weight: 600;
}

.dash-layer-percent {
  font-size: 24px;
  font-weight: 850;
  color: var(--vp-c-brand-1, #0f766e);
  flex-shrink: 0;
}

.dash-layer-percent.p-zero {
  color: var(--vp-c-text-3, #6c7a8d);
  opacity: 0.5;
}

.dash-layer-percent.p-done {
  color: var(--auto-green, #15803d);
}

/* 进度条 */
.dash-layer-bar {
  height: 6px;
  border-radius: 999px;
  background: var(--vp-c-bg-soft, #eef6f3);
  overflow: hidden;
  margin-bottom: 12px;
}

.dash-layer-bar-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--vp-c-brand-2, #0d9488), var(--auto-accent, #d97706));
  transition: width 0.5s ease;
}

.layer-done .dash-layer-bar-fill {
  background: var(--auto-green, #15803d);
}

/* 页面明细 */
.dash-layer-pages {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 12px;
}

.dash-page-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--vp-c-text-2, #4a5a70);
}

.dash-page-item.done {
  color: var(--auto-green, #15803d);
}

.dash-page-item.done .dash-page-link {
  color: var(--auto-green, #15803d);
  text-decoration: line-through;
  opacity: 0.8;
}

.dash-page-icon {
  font-size: 12px;
  flex-shrink: 0;
}

.dash-page-link {
  font-weight: 600;
  color: var(--vp-c-text-2, #4a5a70);
  text-decoration: none;
  transition: color 0.15s;
}

.dash-page-link:hover {
  color: var(--vp-c-brand-2, #0d9488);
  text-decoration: underline;
}

/* 操作按钮 */
.dash-layer-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.dash-action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 7px 14px;
  border-radius: 7px;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none !important;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, transform 0.1s, color 0.15s;
  border: 1px solid transparent;
  min-height: 36px;
  background: none;
  line-height: 1.4;
}

.dash-action-btn:active {
  transform: scale(0.97);
}

.dash-action-btn.primary {
  background: linear-gradient(135deg, var(--vp-c-brand-1, #0f766e), var(--auto-blue, #2563eb));
  color: white;
}

.dash-action-btn.primary:hover {
  background: linear-gradient(135deg, var(--vp-c-brand-2, #0d9488), var(--auto-blue, #2563eb));
}

.dash-action-btn.accent {
  background: var(--auto-accent-soft, rgba(217,119,6,0.14));
  color: var(--auto-accent, #d97706);
  border-color: rgba(217,119,6,0.25);
}

.dash-action-btn.accent:hover {
  background: rgba(217,119,6,0.2);
}

.dash-action-btn.outline {
  border: 1px solid var(--auto-border, rgba(20,33,61,0.12));
  color: var(--vp-c-text-1, #162033);
  background: var(--auto-card-strong, #ffffff);
}

.dash-action-btn.outline:hover {
  border-color: var(--vp-c-brand-2, #0d9488);
  color: var(--vp-c-brand-2);
}

.dash-action-btn.danger-outline {
  border: 1px solid rgba(220,38,38,0.3);
  color: #dc2626;
  background: transparent;
}

.dash-action-btn.danger-outline:hover {
  background: rgba(220,38,38,0.06);
  border-color: #dc2626;
}

.dash-action-btn.danger {
  background: #dc2626;
  color: white;
  border-color: #dc2626;
}

.dash-action-btn.danger:hover {
  background: #b91c1c;
}

/* ══════ 错题分布面板 ══════ */
.dash-error-panels {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 16px;
}

.dash-error-panel {
  padding: 18px;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--auto-card, rgba(255,255,255,0.84)), var(--vp-c-bg-soft, #eef6f3));
  border: 1px solid var(--auto-border, rgba(20,33,61,0.12));
}

.dash-panel-title {
  margin: 0 0 14px;
  font-size: 15px;
  font-weight: 750;
  color: var(--auto-ink, #14213d);
  border: 0;
  padding: 0;
}

.dash-bar-chart {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.dash-bar-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dash-bar-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2, #4a5a70);
  white-space: nowrap;
  min-width: 80px;
  flex-shrink: 0;
}

.dash-bar-track {
  flex: 1;
  height: 8px;
  border-radius: 999px;
  background: var(--vp-c-bg-soft, #eef6f3);
  overflow: hidden;
}

.dash-bar-fill {
  height: 100%;
  border-radius: 999px;
  background: var(--vp-c-brand-2, #0d9488);
  transition: width 0.5s ease;
  min-width: 0;
}

.dash-bar-fill.accent {
  background: var(--auto-accent, #d97706);
}

.dash-bar-value {
  font-size: 13px;
  font-weight: 750;
  color: var(--auto-ink, #14213d);
  min-width: 24px;
  text-align: right;
  flex-shrink: 0;
}

.dash-error-links {
  display: flex;
  gap: 10px;
}

/* ══════ 底部操作栏 ══════ */
.dash-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
  padding-top: 24px;
  border-top: 1px solid var(--auto-border, rgba(20,33,61,0.12));
}

/* ══════ 弹窗 ══════ */
.dash-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.dash-modal {
  background: var(--vp-c-bg, #ffffff);
  border-radius: 14px;
  padding: 32px;
  max-width: 420px;
  width: 100%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}

.dash-modal-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.dash-modal-title {
  margin: 0 0 10px;
  font-size: 18px;
  font-weight: 800;
  color: var(--auto-ink, #14213d);
  border: 0;
  padding: 0;
}

.dash-modal-desc {
  margin: 0 0 24px;
  font-size: 14px;
  color: var(--vp-c-text-2, #4a5a70);
  line-height: 1.6;
}

.dash-modal-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

/* ══════ 移动端 ══════ */
@media (max-width: 768px) {
  .dash-overview {
    flex-direction: column;
    align-items: stretch;
  }

  .dash-ring-card {
    justify-content: center;
  }

  .dash-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .dash-layer-grid,
  .dash-error-panels {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .dash-stats-grid {
    grid-template-columns: 1fr;
  }

  .dash-action-btn {
    width: 100%;
    min-height: 44px;
  }

  .dash-footer {
    flex-direction: column;
  }

  .dash-modal {
    padding: 24px;
  }

  .dash-modal-actions {
    flex-direction: column;
  }
}
</style>
