<script setup>
import { ref, computed } from 'vue'
import { glossary } from '../data/terms.js'

const searchQuery = ref('')

// Convert glossary object to array for filtering
const allTerms = computed(() => {
  return Object.entries(glossary).map(([abbr, data]) => ({
    abbr,
    en: data.en,
    zh: data.zh,
    note: data.note || ''
  }))
})

// Filter terms based on search query
const filteredTerms = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return allTerms.value
  
  return allTerms.value.filter(term => 
    term.abbr.toLowerCase().includes(query) ||
    term.en.toLowerCase().includes(query) ||
    term.zh.toLowerCase().includes(query) ||
    term.note.toLowerCase().includes(query)
  )
})

// Group terms by category for better organization
const categories = [
  { name: '三电系统', keywords: ['BMS', 'VCU', 'MCU', 'SOC', 'SOH', 'PMSM', 'SiC', 'OBC', 'DCDC', 'PTC', 'IGBT'] },
  { name: '智能驾驶', keywords: ['ADAS', 'NOA', 'AEB', 'ACC', 'LKA', 'ASIL', 'EHB'] },
  { name: '整车系统', keywords: ['ECU', 'CAN', 'EPS', 'ABS', 'ESC', 'NVH', 'VIN', 'DTC', 'OBD'] },
  { name: '车型与平台', keywords: ['HEV', 'PHEV', 'BEV', 'FCEV', 'EEA', 'V2X'] },
  { name: '车企流程与质量', keywords: ['SOP', 'EOP', 'BOM', 'DVP', 'PPAP', 'FMEA', 'DFMEA', 'PFMEA', 'APQP', 'SPC', 'CPK', 'ECR', 'ECO', 'PSW', 'GVDP', 'RPN', 'TSB'] },
  { name: '认证与法规', keywords: ['GB', 'CCC', 'LFP', 'NCM'] },
  { name: '智能座舱', keywords: ['HMI', 'HUD', 'SoC', 'OTA', 'SOMEIP'] },
  { name: '开发阶段', keywords: ['EP', 'OTS'] }
]

const filteredCategories = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) {
    // Show all categories when no search
    return categories.map(cat => ({
      ...cat,
      terms: allTerms.value.filter(t => cat.keywords.includes(t.abbr))
    })).filter(cat => cat.terms.length > 0)
  }
  
  // Filter categories that have matching terms
  return categories.map(cat => ({
    ...cat,
    terms: filteredTerms.value.filter(t => cat.keywords.includes(t.abbr))
  })).filter(cat => cat.terms.length > 0)
})

const uncategorizedTerms = computed(() => {
  const categorizedAbbrs = new Set(categories.flatMap(c => c.keywords))
  const query = searchQuery.value.trim().toLowerCase()
  
  if (!query) {
    return allTerms.value.filter(t => !categorizedAbbrs.has(t.abbr))
  }
  
  return filteredTerms.value.filter(t => !categorizedAbbrs.has(t.abbr))
})

const totalFiltered = computed(() => filteredTerms.value.length)
const totalAll = computed(() => allTerms.value.length)
</script>

<template>
  <div class="glossary-filter">
    <div class="filter-header">
      <div class="search-wrapper">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          class="search-input"
          placeholder="搜索术语（英文、中文、缩写均可）..."
          aria-label="搜索术语"
        />
        <button 
          v-if="searchQuery" 
          class="clear-btn"
          @click="searchQuery = ''"
          aria-label="清除搜索"
        >
          ×
        </button>
      </div>
      <div class="filter-stats">
        <span v-if="searchQuery">
          找到 <strong>{{ totalFiltered }}</strong> / {{ totalAll }} 个术语
        </span>
        <span v-else>
          共 <strong>{{ totalAll }}</strong> 个术语
        </span>
      </div>
    </div>

    <div v-if="filteredTerms.length === 0" class="no-results">
      <p>没有找到匹配的术语，请尝试其他关键词。</p>
    </div>

    <div v-else class="glossary-sections">
      <div 
        v-for="category in filteredCategories" 
        :key="category.name" 
        class="glossary-section"
      >
        <h3 class="section-title">{{ category.name }}</h3>
        <div class="terms-grid">
          <div 
            v-for="term in category.terms" 
            :key="term.abbr" 
            class="term-item"
          >
            <div class="term-header">
              <span class="term-abbr">{{ term.abbr }}</span>
              <span class="term-en">{{ term.en }}</span>
            </div>
            <div class="term-zh">{{ term.zh }}</div>
            <div v-if="term.note" class="term-note">{{ term.note }}</div>
          </div>
        </div>
      </div>

      <div v-if="uncategorizedTerms.length > 0" class="glossary-section">
        <h3 class="section-title">其他术语</h3>
        <div class="terms-grid">
          <div 
            v-for="term in uncategorizedTerms" 
            :key="term.abbr" 
            class="term-item"
          >
            <div class="term-header">
              <span class="term-abbr">{{ term.abbr }}</span>
              <span class="term-en">{{ term.en }}</span>
            </div>
            <div class="term-zh">{{ term.zh }}</div>
            <div v-if="term.note" class="term-note">{{ term.note }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.glossary-filter {
  margin: 24px 0;
}

.filter-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 14px;
  width: 18px;
  height: 18px;
  color: var(--vp-c-text-3);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 42px;
  border: 2px solid var(--vp-c-border);
  border-radius: 10px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 15px;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
}

.search-input:focus {
  border-color: var(--vp-c-brand-2);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.search-input::placeholder {
  color: var(--vp-c-text-3);
}

.clear-btn {
  position: absolute;
  right: 12px;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
  transition: background 0.15s, color 0.15s;
}

.clear-btn:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.filter-stats {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.filter-stats strong {
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

.no-results {
  text-align: center;
  padding: 48px 24px;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
}

.no-results p {
  margin: 0;
  font-size: 15px;
}

.glossary-sections {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.glossary-section {
  /* Section container */
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 16px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--vp-c-brand-soft);
}

.terms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.term-item {
  padding: 16px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.term-item:hover {
  border-color: var(--vp-c-brand-2);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.term-header {
  display: flex;
  align-items: baseline;
  gap: 10px;
  margin-bottom: 8px;
}

.term-abbr {
  font-size: 18px;
  font-weight: 800;
  color: var(--vp-c-brand-1);
  font-family: var(--vp-font-family-mono);
}

.term-en {
  font-size: 12px;
  color: var(--vp-c-text-3);
  font-style: italic;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.term-zh {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 6px;
}

.term-note {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed var(--vp-c-border);
}

/* Dark mode */
.dark .term-item {
  background: var(--vp-c-bg-alt);
}

.dark .term-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Mobile responsive */
@media (max-width: 640px) {
  .terms-grid {
    grid-template-columns: 1fr;
  }
  
  .search-input {
    font-size: 16px; /* Prevent zoom on iOS */
  }
}
</style>
