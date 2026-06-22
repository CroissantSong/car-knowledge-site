
import { defineConfig } from 'vitepress'
import { writeFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, join, relative } from 'node:path'

export default defineConfig({
  // GitHub Pages base path: 用仓库名，部署后改为实际的
  // 例如仓库叫 auto-tech-docs，就设为 '/auto-tech-docs/'
  // 本地预览时注释掉或用 '/'
  base: '/car-knowledge-site/',  // Vite 构建优化：将 mermaid/katex 等重型依赖拆为独立按需 chunk
  vite: {
    build: {
      chunkSizeWarningLimit: 3200,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/mermaid')) {
              return 'mermaid'
            }
            if (id.includes('node_modules/katex')) {
              return 'katex'
            }
          }
        }
      }
    }
  },


  lang: 'zh-CN',
  title: '汽车技术通识',
  description: '面向非汽车专业应届生的汽车技术学习网站',

  // 开启 MathJax 数学公式渲染，并把 Mermaid fence 转成客户端可渲染容器
  markdown: {
    math: true,
    config(md) {
      const defaultFence = md.renderer.rules.fence

      md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const info = token.info.trim().split(/\s+/)[0]

        if (info === 'mermaid') {
          return [
            '<figure class="diagram-frame diagram-frame-mermaid">',
            '<figcaption class="diagram-caption">结构图</figcaption>',
            `<pre class="vp-mermaid mermaid">${md.utils.escapeHtml(token.content)}</pre>`,
            '</figure>'
          ].join('')
        }

        return defaultFence
          ? defaultFence(tokens, idx, options, env, self)
          : self.renderToken(tokens, idx, options)
      }
    }
  },
  
  head: [
    ['link', { rel: 'icon', href: '/car-knowledge-site/favicon.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'description', content: '面向非汽车专业应届生的汽车技术通识学习网站，用30天建立车企入职前的整车技术地图。覆盖动力、底盘、新能源、智能驾驶和车企工作语境。' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: '汽车技术通识' }],
    ['meta', { property: 'og:title', content: '汽车技术通识 — 面向非汽车专业新人的汽车学习路径' }],
    ['meta', { property: 'og:description', content: '从一辆车出发，看懂结构、能量流、控制流和会议里的工程语言。30天从零建立车企入职前的整车技术地图。' }],
    ['meta', { property: 'og:image', content: '/car-knowledge-site/hero-cutaway.png' }],
    ['meta', { property: 'og:image:alt', content: '透明车身展示动力、底盘、电池和传感器系统' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: '汽车技术通识 — 面向非汽车专业新人的汽车学习路径' }],
    ['meta', { name: 'twitter:description', content: '从一辆车出发，看懂结构、能量流、控制流和会议里的工程语言。' }],
    ['meta', { name: 'twitter:image', content: '/car-knowledge-site/hero-cutaway.png' }]
  ],

  // 为每个 HTML 页面注入页面级 meta description
  transformHtml(code, id) {
    // 从页面 frontmatter 或内容提取 description
    const ogImage = '/car-knowledge-site/hero-cutaway.png'
    const siteName = '汽车技术通识'
    // 注入 og:url（基于文件路径）
    if (id.endsWith('.html')) {
      const url = id.replace(/.*\.vitepress\/dist\//, '').replace(/index\.html$/, '')
      const fullUrl = `https://croissantsong.github.io/car-knowledge-site/${url}`
      const meta = `
        <meta property="og:url" content="${fullUrl}" />
        <link rel="canonical" href="${fullUrl}" />`
      return code.replace('</head>', `${meta}\n  </head>`)
    }
    return code
  },

  // 构建结束后生成 sitemap.xml
  buildEnd(siteConfig) {
    const outDir = siteConfig.outDir
    const base = '/car-knowledge-site/'
    const siteUrl = 'https://croissantsong.github.io/car-knowledge-site'

    function collectHtmlFiles(dir) {
      const files = []
      for (const entry of readdirSync(dir)) {
        const fullPath = join(dir, entry)
        const stat = statSync(fullPath)
        if (stat.isDirectory()) {
          files.push(...collectHtmlFiles(fullPath))
        } else if (entry.endsWith('.html')) {
          files.push(fullPath)
        }
      }
      return files
    }

    const htmlFiles = collectHtmlFiles(outDir)
    const urls = htmlFiles.map(f => {
      const rel = relative(outDir, f)
      const path = rel.replace(/\\/g, '/').replace(/index\.html$/, '').replace(/\.html$/, '')
      return `${siteUrl}/${path}`
    })

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>`

    writeFileSync(join(outDir, 'sitemap.xml'), sitemap, 'utf-8')
    console.log(`[sitemap] Generated sitemap.xml with ${urls.length} URLs`)
  },

  themeConfig: {
    logo: '/favicon.svg',

    // 搜索（本地，无需外部服务）
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '无匹配结果',
            resetButtonTitle: '清除搜索条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    },

    // 顶部导航
    nav: [
      { text: '首页', link: '/' },
      { text: '30天地图', link: '/path' },
      { text: '岗位导航', link: '/roles-guide/' },
      { text: '旗舰课', link: '/lessons/' },
      { text: '题库', link: '/quiz/' },
      { text: '术语表', link: '/glossary' },
      { text: '六层路径', link: '/#六层学习路径' },
      { text: '核心笔记', link: '/core-notes/' },
      { text: '关于', link: '/#关于本站' }
    ],

    // 侧边栏
    sidebar: {
      '/guide/': [
        {
          text: '第一层：整车认知 🚗',
          collapsed: false,
          items: [
            { text: '总览', link: '/guide/' },
            { text: '汽车分类与结构', link: '/guide/classification' },
            { text: '车身与底盘', link: '/guide/body-chassis' }
          ]
        }
      ],
      '/mechanics/': [
        {
          text: '第二层：机械基础 ⚙️',
          collapsed: false,
          items: [
            { text: '总览', link: '/mechanics/' },
            { text: '发动机原理', link: '/mechanics/engine' },
            { text: '传动与悬架', link: '/mechanics/transmission-suspension' }
          ]
        }
      ],
      '/traditional/': [
        {
          text: '第三层：传统系统 🔧',
          collapsed: false,
          items: [
            { text: '总览', link: '/traditional/' },
            { text: '燃油动力系统', link: '/traditional/fuel-system' },
            { text: '制动与转向', link: '/traditional/braking-steering' }
          ]
        }
      ],
      '/new-energy/': [
        {
          text: '第四层：新能源 ⚡',
          collapsed: false,
          items: [
            { text: '总览', link: '/new-energy/' },
            { text: '电池与电机', link: '/new-energy/battery-motor' },
            { text: '混合动力与增程', link: '/new-energy/hybrid-range-extender' }
          ]
        }
      ],
      '/smart-car/': [
        {
          text: '第五层：智能汽车 🧠',
          collapsed: false,
          items: [
            { text: '总览', link: '/smart-car/' },
            { text: 'ADAS 与自动驾驶', link: '/smart-car/adas' },
            { text: 'V2X 与 OTA', link: '/smart-car/v2x-ota' }
          ]
        }
      ],
      '/industry/': [
        {
          text: '第六层：车企工作语境 🏢',
          collapsed: false,
          items: [
            { text: '总览', link: '/industry/' },
            { text: '常用术语与流程', link: '/industry/terminology' },
            { text: '岗位与协作', link: '/industry/roles' }
          ]
        }
      ],
      '/lessons/': [
        {
          text: '旗舰交互课 🎓',
          collapsed: false,
          items: [
            { text: '总览', link: '/lessons/' },
            { text: '① 整车系统组成', link: '/lessons/01-car-systems' },
            { text: '② 燃油→轮端驱动力', link: '/lessons/02-fuel-to-wheel' },
            { text: '③ 刹车力/液压传递', link: '/lessons/03-braking-force' },
            { text: '④ 电动车高压能量流', link: '/lessons/04-ev-energy-flow' },
            { text: '⑤ 智驾感知-决策-执行', link: '/lessons/05-adas-loop' },
            { text: '⑥ 新人听懂术语', link: '/lessons/06-newcomer-terminology' }
          ]
        }
      ],
      '/roles-guide/': [
        {
          text: '岗位通识 🧭',
          collapsed: false,
          items: [
            { text: '岗位导航', link: '/roles-guide/' },
            { text: '产品/项目管理路径', link: '/roles-guide/pm-path' },
            { text: '采购/供应链路径', link: '/roles-guide/procurement-supply-chain-path' },
            { text: '制造/质量路径', link: '/roles-guide/manufacturing-quality-path' },
            { text: '测试/研发路径', link: '/roles-guide/testing-rd-path' }
          ]
        }
      ],
      '/core-notes/': [
        {
          text: '核心笔记 📝',
          collapsed: false,
          items: [
            { text: '扭矩与马力', link: '/core-notes/torque-vs-hp' },
            { text: '变速箱', link: '/core-notes/transmission' },
            { text: '差速器', link: '/core-notes/differential' },
            { text: '混动架构深度对比', link: '/core-notes/hybrid-architecture' },
            { text: '电池安全深度解析', link: '/core-notes/battery-safety' }
          ]
        }
      ],

      '/quiz/': [
        {
          text: '练习题库 📝',
          collapsed: false,
          items: [
            { text: '题库首页', link: '/quiz/' },
            { text: '🚗 第一层：整车认知', link: '/quiz/guide' },
            { text: '⚙️ 第二层：机械基础', link: '/quiz/mechanics' },
            { text: '🔧 第三层：传统系统', link: '/quiz/traditional' },
            { text: '⚡ 第四层：新能源', link: '/quiz/new-energy' },
            { text: '🧠 第五层：智能汽车', link: '/quiz/smart-car' },
            { text: '🏢 第六层：车企语境', link: '/quiz/industry' },
            { text: '📋 产品/项目管理专项', link: '/quiz/role-pm' },
            { text: '🛒 采购/供应链专项', link: '/quiz/role-procurement' },
            { text: '🏭 制造/质量专项', link: '/quiz/role-manufacturing' },
            { text: '🔬 测试/研发专项', link: '/quiz/role-testing' },
            { text: '📕 错题复习', link: '/quiz/error-book' }
          ]
        }
      ],

    },

    // 全局侧边栏（首页等非特定路径时显示）
    sidebarMulti: true,

    // 中文翻译
    docFooter: {
      prev: '上一节',
      next: '下一节'
    },

    outline: {
      level: [2, 3],
      label: '本页导航'
    },

    lastUpdated: {
      text: '最后更新于'
    },

    editLink: {
      pattern: 'https://github.com/CroissantSong/car-knowledge-site/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    footer: {
      message: '为非汽车专业新人设计的汽车技术通识学习路径',
      copyright: '内容持续迭代，请以课程页和知识地图为准'
    },

    darkModeSwitchLabel: '深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '回到顶部',
    notFound: {
      title: '页面未找到',
      quote: '看看知识地图也许能找到你要的内容。'
    }
  }
})
