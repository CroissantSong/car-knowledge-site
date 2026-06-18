# SON-21 · 调研：竞品与海外资料
> 来源：Multica issue SON-21 的智能体评论产出。**状态：待队长/QA 审核**（尚未逐条验证准确性）。

---

## 评论 1 · 智能体

已完成海外/英文资料与竞品调研。结论：我们不要做“车型/零件百科”，而要做“新员工入职场景里的汽车技术通识路径”：用一辆车/一个系统作为可视化主线，把结构、能量流、控制流、典型故障、车企语境串起来。

## 可借鉴对象与要点

| 对象 | 观察 | 可借鉴 | 不建议照搬 |
| --- | --- | --- | --- |
| How a Car Works（https://www.howacarworks.com/，视频课：https://www.howacarworks.com/video-course） | 免费文章覆盖基础系统；付费课用一台 Mazda MX-5 的拆解/重装 + CGI + handbook 串联，122 节、11 个 section。 | “一辆车贯穿全站”的叙事很强：从可见部件进入系统原理，再进入拆装细节。适合我们做整车认知、传统系统、机械基础。 | 不要只做维修/拆车向；我们的目标是车企新人，不是汽修学徒。 |
| Coursera EV Systems and Technologies（https://www.coursera.org/specializations/electric-vehicle-systems-and-technologies） | 12 门系列，覆盖 EV 系统、充电、热管理、电池、自动驾驶、V2G，并强调项目任务。 | 新能源/智能汽车部分应按“能力路径 + 项目任务”组织，而不是按术语字母表组织。 | Coursera 适合长 MOOC；我们应更短、更可视化、更场景化。 |
| Coursera Electric Vehicles and Mobility（https://www.coursera.org/learn/electric-vehicles-mobility） | 从工程、社会、环境、政策、经济、管理多学科解释 EV 扩散。 | “技术不是孤立的”：课程可加入产业、法规、用户场景和商业约束，帮助学生理解车企会议语境。 | 不要变成宏观行业报告；每个宏观点都要回到车辆系统或岗位场景。 |
| CARinfo3D / Car Anatomy（https://carinfo3d.com/，home license：https://carinfo3d.com/HL） | 6+ 小时 3D 动画，按乘用车结构讲 braking、steering、A/C 等系统，面向零基础用户。 | 适合借鉴“3D 结构 + 系统运动过程 + 初学者语言”。传统系统和整车认知页应优先做动态剖面。 | 单纯 3D 旋转很快会变成玩具；必须绑定学习任务和检查点。 |
| Explain 3D: How cars work（https://apps.apple.com/us/app/explain-3d-how-cars-work-free/id1008832037） | 移动端 3D simulation，覆盖 engine、clutch、manual transmission、steering、differential、brakes、fuel、ignition、suspension、turbo、airbag 等。 | 每个系统可做“看得见的 14 个关键动作”：比如制动压力如何传递、差速器如何分配转速。 | 不要堆满系统清单；要按新手最常遇到的认知断点排序。 |
| DOE AFDC: How all-electric cars work（https://afdc.energy.gov/vehicles/how-do-all-electric-cars-work） | 用标准部件图解释 battery pack、DC/DC、motor、onboard charger、power electronics、thermal system 等。 | 新能源章节应采用权威组件词表，减少口径混乱；适合作为术语卡和组件图基准。 | 官方资料偏静态，需补“为什么这么设计”和“工况中如何协同”。 |
| Toyota TPS（https://global.toyota/en/company/vision-and-philosophy/production-system/index.html）/ Tesla First Responders（https://www.tesla.com/firstresponders）/ VW MEB（https://www.volkswagen.ie/en/electric-cars/software-and-technology/meb.html） | OEM/工程资料更贴近真实工作语境：制造效率、高压安全、平台化、电池包、应急处置。 | “车企工作语境”层要引入工厂、平台、质量、安全、法规、售后服务等真实材料，而不是只讲原理。 | 不能直接拼贴 OEM 宣传页；要转译为新人能执行的情境题。 |

注：未找到稳定、可核验的单一汽车学习产品名为 “Meccanismo”。我把它按“mechanism / 3D 机构动画类产品”处理，并用 CARinfo3D、Explain 3D、Mozaik/zSpace 类资料作为可验证样本。

## 对我们网站的产品建议

1. 首屏不是“汽车百科目录”，而是“入职车企 30 天学习地图”：第 1 周看懂整车，第 2 周看懂动力/底盘/电气，第 3 周看懂新能源与智能化，第 4 周进入车企会议和岗位语境。
2. 每课固定模板：工作场景问题 -> 整车位置 -> 结构拆解 -> 动画解释能量/力/信号流 -> 典型误区 -> 车企会议怎么说 -> 3 题检查点。
3. 六层课程建议做成可视化路径，而不是并列频道：
   - 整车认知：以“一辆车”为对象，建立车身、底盘、动力、电子电气、座舱、热管理全局图。
   - 机械基础：只讲会立刻用到的力、扭矩、传动比、摩擦、材料、热，而不是大学机械课复刻。
   - 传统系统：按用户动作切入，如“踩油门/踩刹车/打方向/过减速带”。
   - 新能源：按能量链切入，充电 -> 电池 -> BMS -> 电驱 -> 热管理 -> 安全。
   - 智能汽车：按感知 -> 决策 -> 执行 -> OTA/数据闭环，而不是传感器名词堆砌。
   - 车企工作语境：需求评审、试验、标定、质量问题、供应商沟通、售后案例。
4. 视觉策略：优先做“分层剖视 + 流向动画 + 状态切换”。每张图都要回答一个问题，例如“制动踏板到轮端发生了什么”“高压电从哪里来、到哪里去、哪里危险”。
5. 内容差异化：每个知识点都绑定一个新人会遇到的句子，比如“这个问题是机械、电子还是标定？”“为什么电动车也需要热管理？”“平台化到底复用什么？”
6. MVP 推荐先做 6 个旗舰交互课：
   - 一辆车由哪些系统组成
   - 发动机车如何把燃油变成轮端驱动力
   - 踩刹车时力和液压如何传递
   - 电动车的高压能量流
   - 智能驾驶的一次感知-决策-执行闭环
   - 新人第一次参加问题分析会如何听懂术语

建议后续交给开发同学时，不要先做大而全 CMS；先做“6 个旗舰交互课 + 统一课程模板 + 术语卡组件 + 学习路径进度”。本 issue 是调研产出，无代码变更，无需 PR。
