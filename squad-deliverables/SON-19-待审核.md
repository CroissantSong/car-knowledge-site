# SON-19 · 前端：静态站骨架
> 来源：Multica issue SON-19 的智能体评论产出。**状态：待队长/QA 审核**（尚未逐条验证准确性）。

---

## 评论 1 · 智能体

## 完成：静态文档站骨架已搭建

### 技术选型

使用 **VitePress** 搭建，生成纯静态 HTML，可零成本部署到 GitHub Pages / Vercel / Netlify。

### 项目路径

`auto-tech-docs/`（位于工作目录下）

### 本地预览

```bash
cd auto-tech-docs
npm install
npm run dev
# → http://localhost:5173
```

### 构建

```bash
npm run build      # 输出到 docs/.vitepress/dist/
npm run preview    # 预览构建产物
```

### 目录结构

```
auto-tech-docs/
├── docs/
│   ├── index.md                  # 首页（含知识地图总览表）
│   ├── .vitepress/config.js      # 导航/侧边栏/搜索/中文配置
│   ├── public/                   # 静态资源（配图放这里）
│   ├── guide/                    # 第一层：整车认知
│   │   ├── index.md
│   │   ├── classification.md     # 汽车分类与结构
│   │   └── body-chassis.md       # 车身与底盘
│   ├── mechanics/                # 第二层：机械基础
│   │   ├── index.md
│   │   ├── engine.md             # 发动机原理
│   │   └── transmission-suspension.md
│   ├── traditional/              # 第三层：传统系统
│   │   ├── index.md
│   │   ├── fuel-system.md        # 燃油动力系统
│   │   └── braking-steering.md
│   ├── new-energy/               # 第四层：新能源
│   │   ├── index.md
│   │   ├── battery-motor.md      # 电池与电机
│   │   └── hybrid-range-extender.md
│   ├── smart-car/                # 第五层：智能汽车
│   │   ├── index.md
│   │   ├── adas.md               # ADAS 与自动驾驶
│   │   └── v2x-ota.md
│   └── industry/                 # 第六层：车企工作语境
│       ├── index.md
│       ├── terminology.md        # 常用术语与流程
│       └── roles.md              # 岗位与协作
├── package.json
└── README.md
```

### 已实现功能

- ✅ 六层知识地图全在左侧可点击目录（默认展开）
- ✅ 清晰的跨层导航：在任意层都能看到全部六层入口
- ✅ 每页右侧「本页导航」自动生成目录
- ✅ 上一节/下一节翻页
- ✅ 本地全文搜索（无需外部服务）
- ✅ 深色模式切换
- ✅ 全中文界面（导航、搜索、翻页文案均已汉化）
- ✅ `npm run dev` 一键本地预览

### 待后续完善

每个 Markdown 文件中标注了 `::: tip 配图提示`，指明图片应放置的位置。图片放到 `docs/public/` 下，引用时使用 `/your-image.png` 路径即可。

### 零成本部署说明

见 `README.md`。只需修改 `.vitepress/config.js` 中的 `base` 字段（如 `/auto-tech-docs/`），推送到 GitHub Pages / Vercel 即可上线。

---

## 评论 2 · 智能体

hermes provider error: Error code: 400 - {'error': {'message': 'Failed to deserialize the JSON body into the target type: messages[0]: unknown variant `image_url`, expected `text` at line 1 column 150997', 'type': 'invalid_request_error', 'param': None, 'code': 'invalid_request_error'}}
