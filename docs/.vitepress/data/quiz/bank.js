/**
 * 练习/测验题库 — 汽车技术通识学习网站
 * 
 * 结构：
 *   id        - 唯一标识符
 *   type      - single（单选）/ multi（多选）/ judge（判断）
 *   question  - 题目文本（支持 $...$ 公式、<TermCard> 术语卡）
 *   options   - 选项数组 [{ text, correct }]
 *   explanation - 正确答案解析
 *   layer     - 六层归属：guide/mechanics/traditional/new-energy/smart-car/industry
 *   role      - 岗位关注：pm/procurement/manufacturing/testing/all
 *   tags      - 额外标签（可选）
 */

const quizBank = [
  // ==================== 第一层：整车认知 ====================
  {
    id: 'g1',
    type: 'single',
    question: '一辆汽车通常由几大系统组成？',
    options: [
      { text: '三大系统（动力、底盘、车身）', correct: false },
      { text: '六大系统（动力、底盘、车身、电子电气、内饰、热管理）', correct: true },
      { text: '四大系统（动力、底盘、电气、内饰）', correct: false },
      { text: '八大系统（动力、底盘、车身、电气、内饰、热管理、智驾、娱乐）', correct: false }
    ],
    explanation: '标准划分是六大系统：动力系统、底盘系统、车身系统、电子电气系统、内饰系统、热管理系统。智驾和娱乐是电子电气系统的子系统。',
    layer: 'guide',
    role: 'all',
    tags: ['系统认知']
  },
  {
    id: 'g2',
    type: 'single',
    question: '"白车身"（BIW）指的是什么？',
    options: [
      { text: '白色的车身外漆', correct: false },
      { text: '焊接完成但未喷漆的金属车身骨架', correct: true },
      { text: '车身的内饰部分', correct: false },
      { text: '底盘大梁', correct: false }
    ],
    explanation: '白车身（Body in White）是焊接完成、未喷漆的裸金属车身骨架，是整车结构安全的核心。',
    layer: 'guide',
    role: 'all',
    tags: ['车身']
  },
  {
    id: 'g3',
    type: 'single',
    question: '按照中国国标 GB/T 3730.1，乘用车按什么分类？',
    options: [
      { text: '按发动机排量', correct: false },
      { text: '按车身形式和用途', correct: true },
      { text: '按品牌国籍', correct: false },
      { text: '按价格区间', correct: false }
    ],
    explanation: 'GB/T 3730.1 将汽车分为乘用车和商用车，乘用车按车身形式（轿车/SUV/MPV 等）和用途分类。',
    layer: 'guide',
    role: 'all',
    tags: ['分类', '国标']
  },
  {
    id: 'g4',
    type: 'judge',
    question: '电动车和燃油车的底盘系统完全不同，没有可共用的部分。',
    options: [
      { text: '正确', correct: false },
      { text: '错误', correct: true }
    ],
    explanation: '底盘系统（悬架、转向、制动）在燃油车和电动车上大部分相通。差异主要体现在动力总成布局（电池包嵌入底盘）和制动助力方式（真空助力 vs 电助力）。',
    layer: 'guide',
    role: 'all',
    tags: ['油电对比']
  },
  {
    id: 'g5',
    type: 'multi',
    question: '以下哪些属于 VIN 码（车辆识别代号）中编码的信息？（多选）',
    options: [
      { text: '车辆制造国', correct: true },
      { text: '制造商', correct: true },
      { text: '车辆价格', correct: false },
      { text: '车辆类型', correct: true },
      { text: '车型年份', correct: true }
    ],
    explanation: 'VIN（17位）编码了制造国、制造商、车辆类型、发动机类型、车型年份、生产工厂和序列号。价格不在 VIN 中。',
    layer: 'guide',
    role: 'all',
    tags: ['VIN']
  },

  // ==================== 第二层：机械基础 ====================
  {
    id: 'm1',
    type: 'single',
    question: '扭矩和马力（功率）的关系公式是？',
    options: [
      { text: '功率 = 扭矩 ÷ 转速', correct: false },
      { text: '功率 = 扭矩 × 转速 ÷ 9550', correct: true },
      { text: '功率 = 扭矩 + 转速', correct: false },
      { text: '功率 = 扭矩 × 转速 × 9550', correct: false }
    ],
    explanation: '$$P(kW) = T(Nm) \\times n(rpm) \\div 9550$$。扭矩决定"能拉多重"，功率决定"能跑多快"。',
    layer: 'mechanics',
    role: 'all',
    tags: ['扭矩', '马力']
  },
  {
    id: 'm2',
    type: 'single',
    question: '差速器的核心作用是什么？',
    options: [
      { text: '提高发动机转速', correct: false },
      { text: '允许左右驱动轮以不同速度旋转', correct: true },
      { text: '将发动机的动力分配到四个车轮', correct: false },
      { text: '减少变速箱齿轮磨损', correct: false }
    ],
    explanation: '转弯时外侧车轮滚过的路程比内侧长，差速器允许两侧车轮以不同速度旋转，防止轮胎打滑和传动系损伤。',
    layer: 'mechanics',
    role: 'all',
    tags: ['差速器']
  },
  {
    id: 'm3',
    type: 'single',
    question: '四冲程发动机中，哪个冲程对外输出动力？',
    options: [
      { text: '进气冲程', correct: false },
      { text: '压缩冲程', correct: false },
      { text: '做功冲程', correct: true },
      { text: '排气冲程', correct: false }
    ],
    explanation: '只有做功冲程中混合气爆燃推动活塞产生动力，其余三个冲程由飞轮惯性带动。',
    layer: 'mechanics',
    role: 'all',
    tags: ['发动机']
  },
  {
    id: 'm4',
    type: 'judge',
    question: '开放式差速器会将扭矩按 50:50 平均分配给左右车轮，即使一侧车轮打滑也始终保持这个比例。',
    options: [
      { text: '正确', correct: true },
      { text: '错误', correct: false }
    ],
    explanation: '开放式差速器始终按 50:50 分配扭矩。但一侧打滑时，两侧扭矩都趋近于零（因为打滑侧无阻力，另一侧也无法获得更多扭矩），这是开放式差速器的固有弱点。',
    layer: 'mechanics',
    role: 'all',
    tags: ['差速器']
  },

  // ==================== 第三层：传统系统 ====================
  {
    id: 't1',
    type: 'single',
    question: '从燃油化学能到车轮驱动力，传统燃油车的综合效率大约是多少？',
    options: [
      { text: '50-60%', correct: false },
      { text: '30-40%', correct: false },
      { text: '15-25%', correct: true },
      { text: '5-10%', correct: false }
    ],
    explanation: '发动机热效率约 30-40%，但经过变速箱、差速器、半轴等一系列机械传递损耗后，轮端实际效率仅 15-25%。',
    layer: 'traditional',
    role: 'all',
    tags: ['动力链', '效率']
  },
  {
    id: 't2',
    type: 'single',
    question: '液力变矩器最重要的一项能力是什么？',
    options: [
      { text: '提高发动机热效率', correct: false },
      { text: '允许发动机和变速箱之间有转速差（红灯停车不熄火）', correct: true },
      { text: '减少变速箱齿轮数量', correct: false },
      { text: '替代差速器功能', correct: false }
    ],
    explanation: '液力变矩器通过液体传递动力，允许泵轮（发动机侧）和涡轮（变速箱侧）以不同速度旋转，是 AT 变速箱实现"踩刹车挂 D 挡不熄火"的关键。',
    layer: 'traditional',
    role: 'all',
    tags: ['变速箱', '液力变矩器']
  },
  {
    id: 't3',
    type: 'single',
    question: '帕斯卡原理在制动系统中的作用是什么？',
    options: [
      { text: '把旋转运动变成直线运动', correct: false },
      { text: '利用活塞面积差放大制动力', correct: true },
      { text: '提高制动液沸点', correct: false },
      { text: '降低刹车片温度', correct: false }
    ],
    explanation: '帕斯卡原理保证密闭液体中压强处处相等，利用总泵小活塞→分泵大活塞的面积差，实现力的放大。',
    layer: 'traditional',
    role: 'all',
    tags: ['制动', '帕斯卡']
  },
  {
    id: 't4',
    type: 'single',
    question: '为什么制动液必须定期更换（通常 2 年/4 万公里）？',
    options: [
      { text: '制动液会挥发减少', correct: false },
      { text: '制动液吸湿后沸点下降，连续制动可能沸腾产生气阻', correct: true },
      { text: '制动液颜色会变深影响美观', correct: false },
      { text: '制动液会腐蚀管路', correct: false }
    ],
    explanation: '制动液（聚乙二醇基）有强吸湿性，含水后湿沸点大幅下降，重载下坡时可能沸腾→气泡→气阻→刹车失灵。',
    layer: 'traditional',
    role: 'all',
    tags: ['制动', '安全']
  },

  // ==================== 第四层：新能源 ====================
  {
    id: 'n1',
    type: 'single',
    question: '直流快充和交流慢充的关键区别是什么？',
    options: [
      { text: '直流快充电压更低', correct: false },
      { text: '直流快充时充电桩已整流，直接灌入电池，绕过 OBC', correct: true },
      { text: '交流慢充更快', correct: false },
      { text: '交流慢充不需要 OBC', correct: false }
    ],
    explanation: '直流快充桩直接输出高压直流电给电池，绕过了车载充电机（OBC）。交流慢充则需要 OBC 把交流电整流升压。',
    layer: 'new-energy',
    role: 'all',
    tags: ['充电', 'OBC']
  },
  {
    id: 'n2',
    type: 'single',
    question: '三元锂电池（NCM）和磷酸铁锂电池（LFP）相比，哪个安全性更高？',
    options: [
      { text: '三元锂电池（NCM）', correct: false },
      { text: '磷酸铁锂电池（LFP）', correct: true },
      { text: '两者安全性完全相同', correct: false },
      { text: '取决于制造商', correct: false }
    ],
    explanation: 'LFP 的化学结构更稳定，热失控温度更高（~500°C vs NCM 的 ~200°C），热失控后释放氧气更少，安全性优于三元锂。但三元锂能量密度更高。',
    layer: 'new-energy',
    role: 'all',
    tags: ['电池', '安全']
  },
  {
    id: 'n3',
    type: 'multi',
    question: '以下哪些属于电动车"三电"系统？（多选）',
    options: [
      { text: '电池（Battery）', correct: true },
      { text: '电机（Motor）', correct: true },
      { text: '电控（Electronic Control）', correct: true },
      { text: '电线束（Wire Harness）', correct: false },
      { text: '电空调（Electric A/C）', correct: false }
    ],
    explanation: '三电 = 电池、电机、电控。电控包含 BMS（电池管理）、MCU（电机控制器）、VCU（整车控制器）等。',
    layer: 'new-energy',
    role: 'all',
    tags: ['三电']
  },
  {
    id: 'n4',
    type: 'single',
    question: '800V 高压平台相比 400V 平台的核心优势是什么？',
    options: [
      { text: '电池容量翻倍', correct: false },
      { text: '相同电流下功率翻倍，且线路发热降至 1/4', correct: true },
      { text: '电机功率翻倍', correct: false },
      { text: '不需要 BMS', correct: false }
    ],
    explanation: '$$P = V \\times I$$（电压翻倍→功率翻倍），$$P_{热} = I^2R$$（同功率时电流减半→发热 1/4）。',
    layer: 'new-energy',
    role: 'all',
    tags: ['800V', '高压']
  },
  {
    id: 'n5',
    type: 'single',
    question: '电动车的 12V 低压系统从哪里取电？',
    options: [
      { text: '发动机带动的发电机', correct: false },
      { text: 'DC-DC 转换器从高压电池取电', correct: true },
      { text: '独立的小型汽油发电机', correct: false },
      { text: '直接由高压电池降压供电，没有 12V 系统', correct: false }
    ],
    explanation: '电动车没有发动机，无法用传统发电机。12V 系统（仪表/灯光/ECU 等）通过 DC-DC 转换器从高压电池取电，12V 小电池仅作缓冲和备份。',
    layer: 'new-energy',
    role: 'all',
    tags: ['12V', 'DC-DC']
  },
  {
    id: 'n6',
    type: 'judge',
    question: '增程式电动车（EREV）的发动机直接驱动车轮。',
    options: [
      { text: '正确', correct: false },
      { text: '错误', correct: true }
    ],
    explanation: '增程器的发动机只发电，不直接驱动车轮。车轮始终由电机驱动，发动机与车轮无机械连接。这一点与插电混动（PHEV）不同——PHEV 的发动机在特定工况下可以直驱车轮。',
    layer: 'new-energy',
    role: 'all',
    tags: ['增程', '混动']
  },

  // ==================== 第五层：智能汽车 ====================
  {
    id: 's1',
    type: 'single',
    question: '智能驾驶的核心闭环是？',
    options: [
      { text: '感知 → 通信 → 执行', correct: false },
      { text: '感知 → 决策 → 执行 → 反馈', correct: true },
      { text: '规划 → 控制 → 通信', correct: false },
      { text: '传感器 → 地图 → 导航', correct: false }
    ],
    explanation: '智能驾驶 = 感知（传感器理解环境）→ 决策（行为判断+运动规划）→ 执行（控制转向/制动/驱动）→ 反馈（IMU/轮速更新自车状态）的闭环循环。',
    layer: 'smart-car',
    role: 'all',
    tags: ['智驾', '闭环']
  },
  {
    id: 's2',
    type: 'single',
    question: '"线控制动"相比传统真空助力制动的核心优势是什么？',
    options: [
      { text: '成本更低', correct: false },
      { text: '系统可以不经驾驶员操作而主动建压（AEB/ACC 的基础）', correct: true },
      { text: '制动力更大', correct: false },
      { text: '不需要制动液', correct: false }
    ],
    explanation: '线控制动（如 iBooster）由电信号控制建压，不需要人踩踏板就能主动制动——这是 AEB 自动紧急制动、ACC 自适应巡航等 L2+ 功能的硬件基础。',
    layer: 'smart-car',
    role: 'all',
    tags: ['线控制动', '智能驾驶']
  },
  {
    id: 's3',
    type: 'multi',
    question: '以下哪些传感器可以用于智能驾驶的感知环节？（多选）',
    options: [
      { text: '摄像头', correct: true },
      { text: '毫米波雷达', correct: true },
      { text: '激光雷达（LiDAR）', correct: true },
      { text: '红外热成像仪', correct: false },
      { text: '超声波雷达', correct: true }
    ],
    explanation: '智能驾驶主流感知传感器包括摄像头（视觉）、毫米波雷达（测速测距）、激光雷达（3D 点云）、超声波雷达（近距泊车）。红外热成像尚未大规模上车。',
    layer: 'smart-car',
    role: 'all',
    tags: ['传感器', '感知']
  },
  {
    id: 's4',
    type: 'single',
    question: 'SAE J3016 自动驾驶分级标准中，L3 级的关键特征是什么？',
    options: [
      { text: '驾驶员可以完全不看路', correct: false },
      { text: '系统负责全部驾驶任务，但驾驶员必须在系统请求时接管', correct: true },
      { text: '车辆可以在任何道路上无人驾驶', correct: false },
      { text: '车辆不需要方向盘', correct: false }
    ],
    explanation: 'L3 定义：系统在特定条件下执行全部动态驾驶任务，驾驶员不需要持续监控道路，但必须在系统请求时接管。L4 才不需要驾驶员接管，L5 实现全场景无人驾驶。',
    layer: 'smart-car',
    role: 'all',
    tags: ['自动驾驶分级', 'SAE']
  },
  {
    id: 's5',
    type: 'single',
    question: '"幽灵刹车"（Phantom Braking）是指什么？',
    options: [
      { text: '刹车片磨损过度导致的异响', correct: false },
      { text: '系统误判障碍物导致不该刹车时突然刹车', correct: true },
      { text: '雨天制动距离变长', correct: false },
      { text: '制动液中有气泡', correct: false }
    ],
    explanation: '幽灵刹车是智能驾驶中的典型感知误报问题：系统将一个无害物体（如塑料袋、路面积水反光、桥梁阴影）误识别为障碍物，触发不必要的紧急制动。',
    layer: 'smart-car',
    role: 'all',
    tags: ['幽灵刹车', '安全']
  },

  // ==================== 第六层：车企工作语境 ====================
  {
    id: 'i1',
    type: 'single',
    question: 'NVH 是哪三个单词的缩写？',
    options: [
      { text: 'Noise, Vehicle, Heat', correct: false },
      { text: 'Noise, Vibration, Harshness', correct: true },
      { text: 'New Vehicle Handling', correct: false },
      { text: 'Normal Vehicle Height', correct: false }
    ],
    explanation: 'NVH = Noise（噪音）、Vibration（振动）、Harshness（粗糙感），是汽车用户体验最核心的三个感知维度。',
    layer: 'industry',
    role: 'all',
    tags: ['NVH']
  },
  {
    id: 'i2',
    type: 'single',
    question: '在车企开发流程中，SOP 的含义是什么？',
    options: [
      { text: 'Standard Operating Procedure（标准操作流程）', correct: false },
      { text: 'Start of Production（开始批量生产）', correct: true },
      { text: 'System Overall Plan（系统总规划）', correct: false },
      { text: 'Supplier Order Processing（供应商订单处理）', correct: false }
    ],
    explanation: 'SOP = Start of Production，是整车项目从开发阶段正式进入批量生产的节点。SOP 之后车辆开始交付客户。',
    layer: 'industry',
    role: 'all',
    tags: ['SOP', '流程']
  },
  {
    id: 'i3',
    type: 'single',
    question: '当质量工程师说"先做围堵，根因下周再分析"，"围堵"是指？',
    options: [
      { text: '把出问题的零件用围栏圈起来', correct: false },
      { text: '先紧急切断问题影响范围（如冻结库存/排查已发车辆），不等根因分析完', correct: true },
      { text: '把供应商围起来不让走', correct: false },
      { text: '把问题报告锁在柜子里', correct: false }
    ],
    explanation: '「围堵」是 8D 的 D3 步骤——先止住血（切断影响），再慢慢查病因（根因分析）。比如发现某批次刹车片有问题，立刻冻结该批次库存并通知 4S 店暂停使用。',
    layer: 'industry',
    role: 'all',
    tags: ['8D', '质量']
  },
  {
    id: 'i4',
    type: 'single',
    question: 'FMEA 是什么的缩写？',
    options: [
      { text: 'Future Manufacturing Engineering Assessment', correct: false },
      { text: 'Failure Mode and Effects Analysis（失效模式与影响分析）', correct: true },
      { text: 'Final Market Evaluation Analysis', correct: false },
      { text: 'Fast Manufacturing Efficiency Assessment', correct: false }
    ],
    explanation: 'FMEA = Failure Mode and Effects Analysis，是一种事前分析方法，用来识别"哪里会坏、坏了多严重、怎么防"，是汽车行业质量管理的基础工具。RPN = S×O×D（严重度×发生频率×检测难度）。',
    layer: 'industry',
    role: 'all',
    tags: ['FMEA', '质量']
  },
  {
    id: 'i5',
    type: 'multi',
    question: '以下哪些缩写属于车企研发流程节点？（多选）',
    options: [
      { text: 'VP（Verification Prototype）', correct: true },
      { text: 'TT（Tooling Tryout）', correct: true },
      { text: 'PP（Pilot Production）', correct: true },
      { text: 'SOP（Start of Production）', correct: true },
      { text: 'MVP（Minimum Viable Product）', correct: false }
    ],
    explanation: '车企研发流程节点：VP（验证样车）→ TT（工装样车）→ PP（试生产）→ SOP（量产启动）。MVP 是互联网/软件行业术语，不是车企节点。',
    layer: 'industry',
    role: 'all',
    tags: ['流程', '节点']
  },
  {
    id: 'i6',
    type: 'judge',
    question: 'Tier1 供应商直接向 OEM（车厂）供货，Tier2 供应商向 Tier1 供货。',
    options: [
      { text: '正确', correct: true },
      { text: '错误', correct: false }
    ],
    explanation: '汽车行业供应链层级：OEM（整车厂）← Tier1（一级供应商，提供系统总成如博世 ESP）← Tier2（二级供应商，提供零部件如制动片摩擦材料）← Tier3（原材料/基础件）。',
    layer: 'industry',
    role: 'all',
    tags: ['供应链', 'Tier']
  },

  // ==================== 岗位专项 — 产品/项目管理 ====================
  {
    id: 'pm1',
    type: 'single',
    question: '[PM] 产品经理在规划纯电动车产品时，以下哪项是"三电"选型中最具平台级影响的决策？',
    options: [
      { text: '座椅材质选择', correct: false },
      { text: '400V vs 800V 高压架构', correct: true },
      { text: '车身颜色方案', correct: false },
      { text: '轮毂样式', correct: false }
    ],
    explanation: '高压架构（400V/800V）一旦选定，所有高压部件（电池/BMS/MCU/OBC/DC-DC/线束/充电接口）都要跟随选型。切换成本极高，是整车平台级别的重大决策。',
    layer: 'new-energy',
    role: 'pm',
    tags: ['产品定义', '高压架构']
  },
  {
    id: 'pm2',
    type: 'single',
    question: '[PM] 智能驾驶 L2+/L3 对产品经理来说，核心的产品化差异不包括哪个？',
    options: [
      { text: '驾驶员是否需要持续监控道路', correct: false },
      { text: '事故责任的归属', correct: false },
      { text: '功能激活的地理围栏限制', correct: false },
      { text: '车辆的最高速度', correct: true }
    ],
    explanation: 'L2+ 和 L3 的核心差异在于：驾驶员监控责任、事故责任归属（L3 驾驶中系统负责）、ODD（设计运行域）限制。最高速度不是分级核心标准。',
    layer: 'smart-car',
    role: 'pm',
    tags: ['智驾', '产品规划']
  },
  {
    id: 'pm3',
    type: 'multi',
    question: '[PM] 项目管理中，以下哪些属于"节点交付物"评审的核心内容？（多选）',
    options: [
      { text: '当前节点 DVP 试验通过率', correct: true },
      { text: '零件成熟度状态（OTS/PPAP）', correct: true },
      { text: '项目预算执行率', correct: true },
      { text: '竞品销量数据', correct: false },
      { text: '未关闭的质量问题数量', correct: true }
    ],
    explanation: '节点评审关注：交付物完成情况（DVP、零件状态）、预算、质量（未关闭问题）、进度偏差。竞品销量通常不在技术节点评审范围内，属于市场分析范畴。',
    layer: 'industry',
    role: 'pm',
    tags: ['项目管理', '节点']
  },

  // ==================== 岗位专项 — 采购/供应链 ====================
  {
    id: 'pr1',
    type: 'single',
    question: '[采购] 动力电池中成本占比最高的核心材料是什么？',
    options: [
      { text: '电解液', correct: false },
      { text: '正极材料（含锂、镍、钴、锰）', correct: true },
      { text: '隔膜', correct: false },
      { text: '铜箔集流体', correct: false }
    ],
    explanation: '正极材料（NCM 或 LFP）约占电池成本的 30-40%，是成本最高的一环。特别是含钴的三元正极（NCM），钴价波动对成本影响显著。这也是主机厂推行 LFP 和无钴电池的动力之一。',
    layer: 'new-energy',
    role: 'procurement',
    tags: ['电池成本', '供应链']
  },
  {
    id: 'pr2',
    type: 'single',
    question: '[采购] PPAP（生产件批准程序）的核心目的是什么？',
    options: [
      { text: '计算供应商报价', correct: false },
      { text: '确保供应商批量生产的零件与工程设计一致', correct: true },
      { text: '评估供应商的财务健康', correct: false },
      { text: '选择最低价的供应商', correct: false }
    ],
    explanation: 'PPAP = Production Part Approval Process，是确保供应商在批量生产条件下能持续生产符合设计要求的零件的标准流程。是供应商进入批量供货的门槛。',
    layer: 'industry',
    role: 'procurement',
    tags: ['PPAP', '供应商']
  },
  {
    id: 'pr3',
    type: 'judge',
    question: '[采购] 芯片（SoC）的供应安全对智能汽车项目来说，目前是最大的单一风险之一。',
    options: [
      { text: '正确', correct: true },
      { text: '错误', correct: false }
    ],
    explanation: '智能驾驶域控 SoC（如英伟达 Orin、高通 8295、地平线征程）和功率半导体（IGBT/SiC）目前供应集中度高、交期长，是全球车企供应链的共同瓶颈。',
    layer: 'smart-car',
    role: 'procurement',
    tags: ['芯片', '供应链风险']
  },

  // ==================== 岗位专项 — 制造/质量 ====================
  {
    id: 'ma1',
    type: 'single',
    question: '[制造] 总装线的四大工艺是什么？',
    options: [
      { text: '冲压、焊接、涂装、总装', correct: true },
      { text: '铸造、锻造、机加工、热处理', correct: false },
      { text: '注塑、吹塑、挤出、压延', correct: false },
      { text: 'SMT、波峰焊、回流焊、测试', correct: false }
    ],
    explanation: '车企整车的"四大工艺"：冲压（钣金成形）→ 焊接（白车身）→ 涂装（喷漆防腐）→ 总装（所有零件合装成整车）。',
    layer: 'guide',
    role: 'manufacturing',
    tags: ['制造', '四大工艺']
  },
  {
    id: 'ma2',
    type: 'single',
    question: '[质量] FMEA 中 RPN（风险优先数）的计算公式是？',
    options: [
      { text: 'RPN = S + O + D', correct: false },
      { text: 'RPN = S × O × D', correct: true },
      { text: 'RPN = (S + O) × D', correct: false },
      { text: 'RPN = S × O ÷ D', correct: false }
    ],
    explanation: 'RPN = Severity（严重度）× Occurrence（发生频率）× Detection（检测难度）。三项各打 1-10 分，RPN 越高风险越大，通常 RPN > 100 需强制改善措施。',
    layer: 'industry',
    role: 'manufacturing',
    tags: ['FMEA', '质量']
  },
  {
    id: 'ma3',
    type: 'multi',
    question: '[质量] 8D 问题解决法包含以下哪些步骤？（多选）',
    options: [
      { text: 'D1-组建团队', correct: true },
      { text: 'D3-围堵措施', correct: true },
      { text: 'D4-根因分析', correct: true },
      { text: 'D6-永久纠正措施', correct: true },
      { text: 'D9-宣传推广', correct: false }
    ],
    explanation: '8D 是八个步骤：D1 建团队、D2 描述问题、D3 围堵、D4 根因分析、D5 选择永久措施、D6 实施永久措施、D7 防止复发、D8 团队庆祝。没有 D9。',
    layer: 'industry',
    role: 'manufacturing',
    tags: ['8D', '质量']
  },

  // ==================== 岗位专项 — 测试/研发 ====================
  {
    id: 'td1',
    type: 'single',
    question: '[测试] V-model 开发流程中，"V"的左半边代表什么？',
    options: [
      { text: '整车级验证', correct: false },
      { text: '需求分解与设计（从整车→系统→零部件逐级分解）', correct: true },
      { text: '供应商管理', correct: false },
      { text: '市场反馈', correct: false }
    ],
    explanation: 'V-model：左侧是自顶向下的需求分解与设计（整车→系统→子系统→零部件），右侧是自底向上的验证集成（零部件→子系统→系统→整车验收）。测试对应右侧。',
    layer: 'industry',
    role: 'testing',
    tags: ['V-model', '开发流程']
  },
  {
    id: 'td2',
    type: 'single',
    question: '[测试] 以下哪项是 DVP（设计验证计划）的核心内容？',
    options: [
      { text: '零件或系统需要完成的所有试验项目列表', correct: true },
      { text: '产品的市场定位报告', correct: false },
      { text: '供应商的成本分解表', correct: false },
      { text: '车型的外观设计方案', correct: false }
    ],
    explanation: 'DVP（Design Verification Plan）是一份清单，定义了每个零件/系统需要完成的全套试验（包括台架试验和整车试验）、测试条件和通过标准。这是测试工程师的工作依据。',
    layer: 'industry',
    role: 'testing',
    tags: ['DVP', '测试']
  },
  {
    id: 'td3',
    type: 'multi',
    question: '[测试] 智能驾驶系统测试中，以下哪些属于测试内容？（多选）',
    options: [
      { text: '感知算法的漏检率和误检率', correct: true },
      { text: '功能安全（ASIL 等级对应的故障响应）', correct: true },
      { text: '特定场景的仿真测试（如鬼探头、Cut-in）', correct: true },
      { text: '营销文案的措辞', correct: false },
      { text: '预期功能安全 SOTIF（如传感器在极端天气下的性能）', correct: true }
    ],
    explanation: '智驾测试覆盖：感知（漏检/误检/检测延迟）、功能安全（ISO 26262）、SOTIF（ISO 21448 预期功能安全）、场景测试（仿真+实车）。营销文案不在测试范围。',
    layer: 'smart-car',
    role: 'testing',
    tags: ['智驾测试', '验证']
  }
]

export default quizBank
