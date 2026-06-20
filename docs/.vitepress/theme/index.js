import DefaultTheme from 'vitepress/theme'
import { inBrowser, useRoute } from 'vitepress'
import { nextTick, watch } from 'vue'
import QuizBlock from './components/QuizBlock.vue'
import './custom.css'

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

function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

function enhanceQuizzes() {
  const quizBlocks = Array.from(document.querySelectorAll('.course-block-quiz:not([data-quiz-enhanced])'))
  
  quizBlocks.forEach((block) => {
    block.dataset.quizEnhanced = 'true'
    
    // Get the full inner HTML of the block
    const html = block.innerHTML
    
    // Try to split on **答案：** or **答案:** to extract question and answer
    let questionPart = ''
    let answerPart = ''
    
    const strongMatch = html.match(/<strong>小测[：:]<\/strong>\s*(.*)/s)
    if (strongMatch) {
      const afterLabel = strongMatch[1] // everything after **小测：**  
      // Now try to split on **答案：** or **答案:**
      const answerSplit = afterLabel.split(/\*\*答案[：:]\*\*/s)
      if (answerSplit.length > 1) {
        questionPart = answerSplit[0].trim()
        answerPart = answerSplit.slice(1).join('**答案：**').trim()
      } else {
        questionPart = afterLabel.trim()
      }
    } else {
      questionPart = block.textContent.replace(/^小测[：:]\s*/, '').trim()
    }
    
    const hasAnswer = answerPart.length > 0
    const answerHtml = hasAnswer 
      ? `<div class="quiz-i-answer-label">✅ 答案</div><div class="quiz-i-answer-content">${answerPart}</div>`
      : `<div class="quiz-i-answer-label">💭 思考提示</div><div class="quiz-i-answer-content">请先自己思考，再参考对应知识点的原理说明。答错不可怕——把卡住的地方记下来，那是你知识地图上的盲区。</div>`
    
    block.innerHTML = `
      <div class="quiz-interactive">
        <div class="quiz-i-question">
          <span class="quiz-i-badge">Q</span>
          <span class="quiz-i-text">${escapeHtml(questionPart)}</span>
        </div>
        <div class="quiz-i-answer" style="display:none">
          ${answerHtml}
        </div>
        <button class="quiz-i-toggle" onclick="var a=this.previousElementSibling;var h=a.style.display==='none';a.style.display=h?'block':'none';this.textContent=h?'▲ 收起'+(this.dataset.hasAnswer==='true'?'答案':'提示'):'▼ 展开'+(this.dataset.hasAnswer==='true'?'答案':'思考提示')" data-has-answer="${hasAnswer}">▼ 展开${hasAnswer ? '答案' : '思考提示'}</button>
      </div>
    `
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
  enhanceQuizzes()
  wrapAutoDiagrams()
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('QuizBlock', QuizBlock)
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
