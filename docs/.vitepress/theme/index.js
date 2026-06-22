import DefaultTheme from 'vitepress/theme'
import { inBrowser, useRoute } from 'vitepress'
import { nextTick, watch } from 'vue'
import './custom.css'

// 自定义布局（含反馈入口）
import Layout from './Layout.vue'

// 全局组件
import TermCard from './components/TermCard.vue'
import GlossaryFilter from './components/GlossaryFilter.vue'
import ProgressBadge from './components/ProgressBadge.vue'
import QuizBlock from './components/QuizBlock.vue'
import InteractiveLesson from './components/InteractiveLesson.vue'
import LessonStep from './components/LessonStep.vue'
import ErrorBook from './components/ErrorBook.vue'
import StudyRecommendations from './components/StudyRecommendations.vue'
import LearningDashboard from './components/LearningDashboard.vue'

function getMermaidThemeVariables() {
  const styles = getComputedStyle(document.documentElement)

  return {
    fontFamily: styles.getPropertyValue('--vp-font-family-base').trim(),
    primaryColor: styles.getPropertyValue('--vp-c-bg-soft').trim(),
    primaryTextColor: styles.getPropertyValue('--vp-c-text-1').trim(),
    primaryBorderColor: styles.getPropertyValue('--vp-c-brand-2').trim(),
    lineColor: styles.getPropertyValue('--vp-c-text-2').trim(),
    secondaryColor: styles.getPropertyValue('--vp-c-brand-soft').trim(),
    tertiaryColor: styles.getPropertyValue('--vp-c-bg').trim()
  }
}

async function renderMermaid() {
  if (!inBrowser) return

  const nodes = Array.from(document.querySelectorAll('.vp-mermaid:not([data-processed])'))
  if (nodes.length === 0) return

  const { default: mermaid } = await import('mermaid')
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: 'base',
    themeVariables: getMermaidThemeVariables(),
    flowchart: {
      htmlLabels: true,
      curve: 'basis'
    }
  })

  try {
    await mermaid.run({ nodes })
  } catch (error) {
    console.error('Mermaid render failed:', error)
  }
}

function enhanceCourseBlocks() {
  const blocks = Array.from(document.querySelectorAll('.vp-doc p:not([data-course-block])'))

  blocks.forEach((block) => {
    const strong = block.querySelector(':scope > strong:first-child')
    if (!strong) return

    const label = strong.textContent.replace(/\s/g, '')
    let type = ''

    if (label.includes('场景化问题')) type = 'scenario'
    if (label.includes('原理')) type = 'principle'
    if (label.includes('油电对比') || label.includes('生活类比')) type = 'compare'
    if (label.includes('车企') || label.includes('工作场景')) type = 'work'
    if (label.includes('小测')) type = 'quiz'

    if (!type) return

    block.dataset.courseBlock = type
    block.classList.add('course-block', `course-block-${type}`)
  })
}

function wrapAutoDiagrams() {
  const diagrams = Array.from(document.querySelectorAll('.vp-doc svg.auto-diagram:not([data-diagram-wrapped])'))

  diagrams.forEach((diagram) => {
    if (diagram.closest('.auto-svg-frame')) return

    const figure = document.createElement('figure')
    figure.className = 'diagram-frame auto-svg-frame'

    const caption = document.createElement('figcaption')
    caption.className = 'diagram-caption'
    caption.textContent = diagram.getAttribute('aria-label') || '图示'

    diagram.parentNode.insertBefore(figure, diagram)
    figure.appendChild(caption)
    figure.appendChild(diagram)
    diagram.dataset.diagramWrapped = 'true'
  })
}

function enhanceContent() {
  if (!inBrowser) return

  enhanceCourseBlocks()
  wrapAutoDiagrams()
}

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // 注册全局组件，可在任意 .md 中直接使用
    app.component('TermCard', TermCard)
    app.component('GlossaryFilter', GlossaryFilter)
    app.component('ProgressBadge', ProgressBadge)
    app.component('QuizBlock', QuizBlock)
    app.component('InteractiveLesson', InteractiveLesson)
    app.component('LessonStep', LessonStep)
    app.component('ErrorBook', ErrorBook)
    app.component('StudyRecommendations', StudyRecommendations)
    app.component('LearningDashboard', LearningDashboard)
  },
  setup() {
    if (!inBrowser) return

    const route = useRoute()
    watch(
      () => route.path,
      async () => {
        await nextTick()
        await renderMermaid()
        enhanceContent()
      },
      { immediate: true }
    )
  }
}
