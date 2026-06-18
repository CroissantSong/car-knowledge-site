# 汽车技术通识学习网站

面向**非汽车专业、即将入职车企的应届生**（以及想系统了解汽车的人）的学习网站。
从基础到进阶，强调**可视化 · 路径化 · 场景化**。

- Multica 项目：汽车技术通识学习网站（`2eac4ba6-…`）
- 负责小队：汽车网站项目组（队长 / GPT5.5 副手 / DeepSeek 开发 / Opus4.8 测试）

## 目录结构

- `content/` — 已审核 · 正式内容
  - `knowledge-map.md` — 六层汽车知识地图（6 层 / 54 知识点，已审核采纳）
- `site/` — 零依赖静态站（浏览器直接打开 `site/index.html`）
  - `index.html`、`styles.css`
- `squad-deliverables/` — 小队智能体原始产出归档（供追溯）
  - `SON-23-知识地图-原始源.md`（已采纳，对应 `content/knowledge-map.md`）
  - `SON-18 / 19 / 20 / 21-待审核.md`（评论形式产出，尚未逐条验证）
- `PROGRESS.md` — 迭代日志

## 本地预览

直接用浏览器打开 `site/index.html`，无需构建步骤。

## 推送到 GitHub

本目录已是 git 仓库（默认分支 `main`）。在 GitHub 新建一个**空仓库**后执行：

```bash
git remote add origin <你的仓库地址>   # 例如 git@github.com:用户名/car-knowledge-site.git
git push -u origin main
```

## 当前状态

- ✅ 已完成并验证：六层知识地图（SON-17 / SON-23）
- ⏳ 待审核：核心笔记(SON-18)、前端骨架(SON-19)、可视化(SON-20)、调研(SON-21)
- ⛔ QA 验收(SON-22)：blocked（等前序产出审完）
