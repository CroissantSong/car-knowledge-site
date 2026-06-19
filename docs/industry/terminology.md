# 常用术语与流程

## 整车开发流程 GVDP

Global Vehicle Development Process，整车从概念到量产的完整流程。

### 典型节点

```
概念阶段 → 设计开发 → 工程开发 → 试制验证 → 生产准备 → 量产（SOP）
```

| 节点 | 英文 | 核心工作 | 产出 |
|------|------|----------|------|
| 项目启动 | Program Start | 立项、市场分析、对标 | 产品定义 |
| 设计冻结 | Design Freeze | 外观/内饰方案锁定 | A面数据 |
| 工程发布 | Engineering Release | 工程设计完成 | 3D/2D 数据 |
| 试制 | Prototype Build | VP/TT/PP 样车制造 | 样车 |
| 量产开始 | SOP | 产线调试完毕、批量生产 | 商品车 |
| 量产结束 | EOP | 车型停产 | — |

### 样车阶段

- **骡车（Mule Car）**：用现款车身搭载新动力/底盘，早期验证
- **VP（Verification Prototype）**：验证样车，检查设计可行性
- **TT（Tooling Tryout）**：工装样车，生产线初步调试
- **PP（Pilot Production）**：试生产样车，接近量产状态

## V-model 开发流程

汽车软件开发（尤其安全相关系统）广泛采用 V-model：

```
需求分析                    系统测试
  │                          ↑
  ↓                          │
架构设计                  集成测试
  │                          ↑
  ↓                          │
详细设计                  单元测试
  │                          ↑
  └─────→ 编码实现 ─────────┘
```

左侧是「分解和设计」，右侧是「验证和测试」。左右一一对应：
- 需求 ← → 系统测试
- 架构 ← → 集成测试
- 详细设计 ← → 单元测试

## APQP（先期产品质量策划）

Advanced Product Quality Planning，确保产品在量产前满足质量要求。

### APQP 五阶段

1. **计划和确定项目**：明确客户需求
2. **产品设计和开发**：设计评审、样件制作
3. **过程设计和开发**：工艺设计、产线规划
4. **产品和过程确认**：试生产、PPAP
5. **反馈评定和纠正**：量产后持续改进

## PPAP（生产件批准程序）

Production Part Approval Process，供应商向主机厂提交的批准文件包。

PPAP 包含 18 项要素，如：设计记录、工程变更文件、DFMEA、PFMEA、尺寸测量结果、材料试验结果、初始过程能力研究（CPK）、零件提交保证书（PSW）等。

> **PSW（Part Submission Warrant）** 是 PPAP 的核心文件，供应商签字承诺能按节拍和质量要求持续供货。

## FMEA（失效模式与影响分析）

Failure Mode and Effects Analysis，系统性地识别潜在失效并评估风险。

### 核心概念

- **RPN（风险优先级数）** = 严重度（S）× 发生度（O）× 检测度（D）
  - S（Severity）：失效后果有多严重（1-10）
  - O（Occurrence）：失效发生的频率（1-10）
  - D（Detection）：现有的控制手段能否检测出失效（1-10，越高越难检测）
- RPN 越高，越需要采取措施降低

### DFMEA vs PFMEA

| 类型 | 对象 | 场景 |
|------|------|------|
| **DFMEA** | 设计 | 产品设计阶段的失效分析 |
| **PFMEA** | 过程 | 制造/装配过程的失效分析 |

## IATF 16949

汽车行业质量管理体系标准，基于 ISO 9001，增加了汽车行业的特殊要求。

核心要求：
- **缺陷预防**：在设计阶段就避免缺陷
- **减少变差和浪费**：通过统计过程控制（SPC）监控产线稳定性
- **持续改进**：PDCA 循环

## 关键缩写速查

| 缩写 | 全称 | 含义 |
|------|------|------|
| SOP | Start of Production | 量产开始 |
| EOP | End of Production | 量产结束 |
| BOM | Bill of Materials | 物料清单 |
| DVP | Design Verification Plan | 设计验证计划 |
| PV | Production Validation | 产品验证 |
| PPK/CPK | Process Capability | 过程能力指数 |
| SPC | Statistical Process Control | 统计过程控制 |
| 8D | 8 Disciplines | 问题解决八步法 |
| ECR/ECO | Engineering Change Request/Order | 工程变更请求/指令 |

::: tip 配图提示
建议配图：GVDP甘特图示意、V-model流程图、APQP五阶段图。
:::
