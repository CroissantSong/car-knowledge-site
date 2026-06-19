import DefaultTheme from 'vitepress/theme'
import { inBrowser, useRoute } from 'vitepress'
import { nextTick, watch } from 'vue'
import './custom.css'

async function renderMermaid() {
  if (!inBrowser) return

  const nodes = Array.from(document.querySelectorAll('.vp-mermaid:not([data-processed])'))
  if (nodes.length === 0) return

  const { default: mermaid } = await import('mermaid')
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
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

export default {
  extends: DefaultTheme,
  setup() {
    if (!inBrowser) return

    const route = useRoute()
    watch(
      () => route.path,
      async () => {
        await nextTick()
        await renderMermaid()
      },
      { immediate: true }
    )
  }
}
