# 常用术语与流程

## 整车开发流程 <TermCard term="GVDP">GVDP</TermCard>

Global Vehicle Development Process，整车从概念到量产的完整流程。

### 典型节点

| 顺序 | 阶段 | 主要目标 |
|------|------|----------|
| 1 | 概念阶段 | 明确市场定位、目标用户和产品边界 |
| 2 | 设计开发 | 完成造型、架构、系统方案和工程数据 |
| 3 | 工程开发 | 完成详细设计、样件和系统验证 |
| 4 | 试制验证 | 制造样车并暴露设计、制造和质量问题 |
| 5 | 生产准备 | 调试产线、供应链和质量控制 |
| 6 | 量产（<TermCard term="SOP">SOP</TermCard>） | 按节拍稳定生产商品车 |

| 节点 | 英文 | 核心工作 | 产出 |
|------|------|----------|------|
| 项目启动 | Program Start | 立项、市场分析、对标 | 产品定义 |
| 设计冻结 | Design Freeze | 外观/内饰方案锁定 | A面数据 |
| 工程发布 | Engineering Release | 工程设计完成 | 3D/2D 数据 |
| 试制 | Prototype Build | VP/TT/PP 样车制造 | 样车 |
| 量产开始 | <TermCard term="SOP">SOP</TermCard> | 产线调试完毕、批量生产 | 商品车 |
| 量产结束 | <TermCard term="EOP">EOP</TermCard> | 车型停产 | — |

### 样车阶段

- **骡车（Mule Car）**：用现款车身搭载新动力/底盘，早期验证
- **VP（Verification Prototype）**：验证样车，检查设计可行性
- **TT（Tooling Tryout）**：工装样车，生产线初步调试
- **PP（Pilot Production）**：试生产样车，接近量产状态

## V-model 开发流程

汽车软件开发（尤其安全相关系统）广泛采用 V-model：

| 左侧设计分解 | 中间实现 | 右侧验证活动 |
|--------------|----------|--------------|
| 需求分析 | 编码实现 | 系统测试 |
| 架构设计 | 编码实现 | 集成测试 |
| 详细设计 | 编码实现 | 单元测试 |

左侧是「分解和设计」，右侧是「验证和测试」。左右一一对应：
- 需求 ← → 系统测试
- 架构 ← → 集成测试
- 详细设计 ← → 单元测试

## <TermCard term="APQP">APQP</TermCard>（先期产品质量策划）

Advanced Product Quality Planning，确保产品在量产前满足质量要求。

### APQP 五阶段

1. **计划和确定项目**：明确客户需求
2. **产品设计和开发**：设计评审、样件制作
3. **过程设计和开发**：工艺设计、产线规划
4. **产品和过程确认**：试生产、PPAP
5. **反馈评定和纠正**：量产后持续改进

## <TermCard term="PPAP">PPAP</TermCard>（生产件批准程序）

Production Part Approval Process，供应商向主机厂提交的批准文件包。

PPAP 包含 18 项要素，如：设计记录、工程变更文件、<TermCard term="DFMEA">DFMEA</TermCard>、<TermCard term="PFMEA">PFMEA</TermCard>、尺寸测量结果、材料试验结果、初始过程能力研究（<TermCard term="CPK">CPK</TermCard>）、零件提交保证书（<TermCard term="PSW">PSW</TermCard>）等。

> **<TermCard term="PSW">PSW</TermCard>（Part Submission Warrant）** 是 PPAP 的核心文件，供应商签字承诺能按节拍和质量要求持续供货。

## <TermCard term="FMEA">FMEA</TermCard>（失效模式与影响分析）

Failure Mode and Effects Analysis，系统性地识别潜在失效并评估风险。

### 核心概念

- **RPN（风险优先级数）** = 严重度（S）× 发生度（O）× 检测度（D）
  - S（Severity）：失效后果有多严重（1-10）
  - O（Occurrence）：失效发生的频率（1-10）
  - D（Detection）：现有的控制手段能否检测出失效（1-10，越高越难检测）
- RPN 越高，越需要采取措施降低

### <TermCard term="DFMEA">DFMEA</TermCard> vs <TermCard term="PFMEA">PFMEA</TermCard>

| 类型 | 对象 | 场景 |
|------|------|------|
| **DFMEA** | 设计 | 产品设计阶段的失效分析 |
| **PFMEA** | 过程 | 制造/装配过程的失效分析 |

## IATF 16949

汽车行业质量管理体系标准，基于 ISO 9001，增加了汽车行业的特殊要求。

核心要求：
- **缺陷预防**：在设计阶段就避免缺陷
- **减少变差和浪费**：通过统计过程控制（<TermCard term="SPC">SPC</TermCard>）监控产线稳定性
- **持续改进**：PDCA 循环

## 关键缩写速查

| 缩写 | 全称 | 含义 |
|------|------|------|
| <TermCard term="SOP">SOP</TermCard> | Start of Production | 量产开始 |
| <TermCard term="EOP">EOP</TermCard> | End of Production | 量产结束 |
| <TermCard term="BOM">BOM</TermCard> | Bill of Materials | 物料清单 |
| <TermCard term="DVP">DVP</TermCard> | Design Verification Plan | 设计验证计划 |
| PV | Production Validation | 产品验证 |
| PPK/<TermCard term="CPK">CPK</TermCard> | Process Capability | 过程能力指数 |
| <TermCard term="SPC">SPC</TermCard> | Statistical Process Control | 统计过程控制 |
| 8D | 8 Disciplines | 问题解决八步法 |
| <TermCard term="ECR">ECR</TermCard>/<TermCard term="ECO">ECO</TermCard> | Engineering Change Request/Order | 工程变更请求/指令 |

## 场景化学习卡

### 1. 整车开发流程 GVDP 与 V-model

**场景问题：** 会议里有人说“按 V 流程闭环，不能跳过节点”，新人应该理解成什么？

**简要结构图：**

| 阶段 | 新人要理解的交付物 |
|------|--------------------|
| 用户/市场需求 | 产品定义、用户场景、竞品目标 |
| 系统需求 | 功能、性能、安全和法规要求 |
| 设计开发 | 方案、图纸、软件、零部件数据 |
| 样件/整车验证 | 试验报告、问题单、关闭证据 |
| SOP | 量产准备、质量放行和上市节奏 |

**原理（说人话）：** 整车研发不是先做完再测试，而是需求、设计、实现、验证逐层对应。V-model 左侧把目标拆成系统和零部件要求，右侧用台架、系统、整车试验证明这些要求满足。越早发现问题，修改成本越低；越到后期，变更越需要严格控制。

**对比/类比：** 像盖楼：先定功能和图纸，再施工，最后按图纸验收；不能入住前才发现承重墙位置错了。

**车企工作场景：** 研发、试验、采购、制造、质量会围绕同一需求闭环。听到“需求没有闭环”，通常意味着设计依据、测试证据或责任归属还没对齐。

**小测：** 为什么量产前才修改车身结构，成本和风险会远高于概念阶段？

### 2. APQP、PPAP 与 FMEA

**场景问题：** 质量会上听到 APQP、PPAP、FMEA，它们分别在解决什么？

**简要结构图：**

| 质量阶段 | 常用工具 | 目的 |
|----------|----------|------|
| 预防 | APQP、FMEA | 提前识别和控制风险 |
| 量产批准 | PPAP、PSW | 确认供应商具备稳定供货能力 |
| 问题解决 | 8D | 找根因、做围堵、验证纠正措施 |
| 持续改进 | SPC、CPK、售后数据 | 降低波动并避免复发 |

**原理（说人话）：** 质量不是出问题后返工，而是从开发早期预防风险。FMEA 用来提前识别失效模式和影响；APQP 管理产品质量策划；PPAP 确认供应商量产能力；8D 用结构化步骤处理已发生问题，找到根因并防止复发。

**对比/类比：** 像体检、入职审核和事故复盘：体检预防风险，审核确认能上岗，事故复盘防止同类问题再发生。

**车企工作场景：** 用户投诉批量异响时，质量团队会要求问题描述、围堵措施、根因分析、纠正措施和验证证据，不能只给一句“已优化”。

**小测：** FMEA 更适合在问题发生前用，还是发生后才用？为什么？

### 3. 术语、变更与合规底线

**场景问题：** 一个功能技术上能实现，为什么还要走 ECR/ECO、法规和安全评估？

**简要结构图：**

| 变更步骤 | 必须回答的问题 |
|----------|----------------|
| 新需求/问题 | 为什么要改，影响哪个用户或指标 |
| 影响分析 | 牵涉哪些系统、成本、节点和法规 |
| 变更批准 | 谁决策，是否更新需求和 BOM |
| 开发验证 | 用什么试验证明改动有效 |
| 发布追溯 | 哪些车辆/版本生效，如何售后闭环 |

**原理（说人话）：** 车企术语背后通常对应交付物或责任边界。SOP/EOP 管生命周期，BOM 管物料，DVP 管验证计划，ECR/ECO 管工程变更。变更看似只是改一个功能，实际可能影响硬件、软件、线束、供应商、测试、法规和售后文档。

**对比/类比：** 像餐厅临时加菜：菜单上写一行很快，但采购、厨房、价格、出餐时间和过敏提示都要跟着变。

**车企工作场景：** 新人参与评审时，不要只问“能不能做”，还要问“需求边界是什么、验收标准是什么、影响哪些系统、谁批准变更”。

**小测：** 一个新增座椅按摩功能，可能同时影响哪些团队和交付物？

<figure class="knowledge-figure">
  <img src="/industry-process-v-model.svg" alt="V 模型、APQP 与 ECR ECO 工程变更闭环示意图" loading="lazy">
  <figcaption>图：V 模型、APQP 阶段与工程变更闭环如何把需求、设计、验证和量产发布连起来。本站自绘 SVG。</figcaption>
</figure>
