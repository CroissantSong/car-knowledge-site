
import { defineConfig } from 'vitepress'

export default defineConfig({
  // GitHub Pages base path: 用仓库名，部署后改为实际的
  // 例如仓库叫 auto-tech-docs，就设为 '/auto-tech-docs/'
  // 本地预览时注释掉或用 '/'
  base: '/auto-tech-docs/',

  lang: 'zh-CN',
  title: '汽车技术通识',
  description: '面向非汽车专业应届生的汽车技术学习网站',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],

  themeConfig: {
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
      { text: '知识地图', link: '/#六层知识地图' },
      { text: '核心笔记', link: '/core-notes/' },
      { text: '关于', link: '/about' }
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
      '/core-notes/': [
        {
          text: '核心笔记 📝',
          collapsed: false,
          items: [
            { text: '扭矩与马力', link: '/core-notes/torque-vs-hp' },
            { text: '变速箱', link: '/core-notes/transmission' },
            { text: '差速器', link: '/core-notes/differential' }
          ]
        }
      ]
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
      pattern: 'https://github.com/auto-tech/auto-tech-docs/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
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
