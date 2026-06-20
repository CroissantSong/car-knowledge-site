# 汽车技术通识学习网站

面向**非汽车专业、即将入职车企的应届生**（以及想系统了解汽车的人）的学习网站。
从基础到进阶，强调**可视化 · 路径化 · 场景化**。

## 🌐 在线访问

**https://croissantsong.github.io/car-knowledge-site/**

每次推送到 `main` 会经 GitHub Actions 自动构建并部署到 GitHub Pages。

## 目录结构

- `docs/` — VitePress 站点（站点根）
  - 六层：`guide/ mechanics/ traditional/ new-energy/ smart-car/ industry/`
  - `core-notes/` — 核心深度笔记
  - `lessons/` — 旗舰交互课（v0.3）
  - `public/` — 静态资源 / 交互页（如 `powertrain-compare.html`）
  - `.vitepress/` — 配置与主题（math、mermaid、暗色、搜索）
- `.github/workflows/deploy.yml` — Pages 自动部署
- `Dockerfile` / `deploy/nginx.conf` — 本地 Docker 部署
- `VERSIONS.md` / `PROGRESS.md` / `工作规范.md` — 路线图 / 迭代日志 / 协作规范

## 本地开发

```bash
npm install
npm run dev      # 本地预览 http://localhost:5173/car-knowledge-site/
npm run build    # 构建到 docs/.vitepress/dist/
```

## 本地 Docker 部署

```bash
docker build -t car-knowledge-site .
docker run -d -p 8080:80 --name car-site car-knowledge-site   # http://localhost:8080
```
（Docker 构建会把 base 改为 `/` 以便根路径访问；GitHub Pages 用 base `/car-knowledge-site/`。）
