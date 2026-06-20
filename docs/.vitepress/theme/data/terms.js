/**
 * 汽车行业常用术语缩写词典
 * 格式：{ term: { en: 英文全称, zh: 中文释义, note: 补充说明（可选） } }
 */
export const glossary = {
  BMS: {
    en: 'Battery Management System',
    zh: '电池管理系统',
    note: '监控电芯电压/温度/SOC，执行均衡与热管理策略，是三电系统安全核心。'
  },
  VCU: {
    en: 'Vehicle Control Unit',
    zh: '整车控制器',
    note: '新能源车的"大脑"，协调电机、电池、制动能量回收等扭矩分配。'
  },
  MCU: {
    en: 'Motor Control Unit',
    zh: '电机控制器',
    note: '包含逆变器（DC→AC）和整流器（AC→DC），控制电机扭矩输出。'
  },
  SOP: {
    en: 'Start of Production',
    zh: '量产开始',
    note: '产线按节拍稳定生产商品车的起始节点，是整车开发流程的里程碑。'
  },
  EOP: {
    en: 'End of Production',
    zh: '量产结束',
    note: '车型停产节点。'
  },
  NVH: {
    en: 'Noise, Vibration, Harshness',
    zh: '噪声、振动与声振粗糙度',
    note: '衡量驾乘舒适性的核心指标，涉及发动机、底盘、风噪、路噪等。'
  },
  ADAS: {
    en: 'Advanced Driver Assistance System',
    zh: '高级驾驶辅助系统',
    note: '包括 ACC、LKA、AEB 等功能，是自动驾驶的渐进路径。'
  },
  OTA: {
    en: 'Over-The-Air',
    zh: '空中升级',
    note: '通过无线网络远程更新车辆软件，实现功能迭代和缺陷修复。'
  },
  ECU: {
    en: 'Electronic Control Unit',
    zh: '电子控制单元',
    note: '汽车上每个独立功能的微型计算机，现代汽车可达上百个。'
  },
  EPS: {
    en: 'Electric Power Steering',
    zh: '电动助力转向',
    note: '用电机取代液压泵提供转向助力，节能且可与 ADAS 联动。'
  },
  ABS: {
    en: 'Anti-lock Braking System',
    zh: '防抱死制动系统',
    note: '紧急制动时防止车轮锁死，保持转向能力并缩短制动距离。'
  },
  ESC: {
    en: 'Electronic Stability Control',
    zh: '电子稳定控制系统',
    note: '检测并纠正车辆侧滑/甩尾，通过单轮制动干预恢复稳定。'
  },
  AEB: {
    en: 'Autonomous Emergency Braking',
    zh: '自动紧急制动',
    note: '检测前方碰撞风险并自动刹车，是 ADAS 的基础安全功能。'
  },
  ACC: {
    en: 'Adaptive Cruise Control',
    zh: '自适应巡航控制',
    note: '自动保持与前车距离，可实现跟车启停。'
  },
  LKA: {
    en: 'Lane Keeping Assist',
    zh: '车道保持辅助',
    note: '检测车道线并辅助方向盘微调，防止无意识偏离。'
  },
  NOA: {
    en: 'Navigate on Autopilot',
    zh: '导航辅助驾驶',
    note: '在高速/城市道路上按导航路径自动变道、上下匝道。'
  },
  SOC: {
    en: 'State of Charge',
    zh: '荷电状态',
    note: '电池当前电量百分比，类似手机电量显示。'
  },
  SOH: {
    en: 'State of Health',
    zh: '健康状态',
    note: '电池相对于新电池的容量保持率，反映衰减程度。'
  },
  PMSM: {
    en: 'Permanent Magnet Synchronous Motor',
    zh: '永磁同步电机',
    note: '效率高、功率密度大，是目前纯电车最常用的驱动电机类型。'
  },
  SiC: {
    en: 'Silicon Carbide',
    zh: '碳化硅',
    note: '第三代半导体材料，用于逆变器可降低损耗、提升 800V 平台效率。'
  },
  BOM: {
    en: 'Bill of Materials',
    zh: '物料清单',
    note: '整车所有零部件的清单，是采购、成本和制造的基础文档。'
  },
  DVP: {
    en: 'Design Verification Plan',
    zh: '设计验证计划',
    note: '规定每个零部件/系统的验证项目、方法和标准。'
  },
  PPAP: {
    en: 'Production Part Approval Process',
    zh: '生产件批准程序',
    note: '供应商向主机厂提交的批准文件包，证明量产能力。'
  },
  FMEA: {
    en: 'Failure Mode and Effects Analysis',
    zh: '失效模式与影响分析',
    note: '系统性识别潜在失效并评估风险优先级（RPN = S × O × D）。'
  },
  DFMEA: {
    en: 'Design FMEA',
    zh: '设计 FMEA',
    note: '产品设计阶段的失效分析，关注设计缺陷。'
  },
  PFMEA: {
    en: 'Process FMEA',
    zh: '过程 FMEA',
    note: '制造/装配过程的失效分析，关注工艺风险。'
  },
  APQP: {
    en: 'Advanced Product Quality Planning',
    zh: '先期产品质量策划',
    note: '确保产品在量产前满足质量要求的五阶段方法论。'
  },
  SPC: {
    en: 'Statistical Process Control',
    zh: '统计过程控制',
    note: '用统计方法监控产线稳定性，CPK/PPK 是其核心指标。'
  },
  CPK: {
    en: 'Process Capability Index',
    zh: '过程能力指数',
    note: '衡量制造过程满足规格要求的能力，CPK≥1.33 为常见门槛。'
  },
  VIN: {
    en: 'Vehicle Identification Number',
    zh: '车辆识别代号',
    note: '17 位全球唯一编码，包含制造商、车型特征和生产序列号。'
  },
  GVDP: {
    en: 'Global Vehicle Development Process',
    zh: '全球整车开发流程',
    note: '通用汽车体系下的整车开发流程，覆盖概念到量产全周期。'
  },
  V2X: {
    en: 'Vehicle-to-Everything',
    zh: '车联万物',
    note: '包括 V2V（车对车）、V2I（车对基础设施）、V2P（车对行人）、V2N（车对网络）。'
  },
  EEA: {
    en: 'Electrical/Electronic Architecture',
    zh: '电子电气架构',
    note: '从分布式 ECU → 域集中 → 中央计算+区域控制的演进路线。'
  },
  SoC: {
    en: 'System on Chip',
    zh: '系统级芯片',
    note: '座舱域/智驾域的高算力处理器，如高通 8295、英伟达 Orin。'
  },
  ASIL: {
    en: 'Automotive Safety Integrity Level',
    zh: '汽车安全完整性等级',
    note: 'ISO 26262 定义的功能安全等级，从 A（最低）到 D（最高）。'
  },
  CAN: {
    en: 'Controller Area Network',
    zh: '控制器局域网',
    note: '车内 ECU 通信总线，比点对点布线更轻量高效。'
  },
  SOMEIP: {
    en: 'Scalable service-Oriented MiddlewarE over IP',
    zh: '面向服务的中间件',
    note: 'SOA 架构下车载以太网的服务通信协议。'
  },
  FCEV: {
    en: 'Fuel Cell Electric Vehicle',
    zh: '燃料电池电动车',
    note: '用氢燃料电池发电驱动电机，排放物只有水。'
  },
  HEV: {
    en: 'Hybrid Electric Vehicle',
    zh: '混合动力电动车',
    note: '内燃机+电机，不外接充电，电池靠制动回收和发动机充电。'
  },
  PHEV: {
    en: 'Plug-in Hybrid Electric Vehicle',
    zh: '插电式混合动力',
    note: '可外接充电，纯电续航较长（通常 50-200km），亏电后用发动机。'
  },
  BEV: {
    en: 'Battery Electric Vehicle',
    zh: '纯电动车',
    note: '仅靠电池+电机驱动，无内燃机。'
  },
  EP: {
    en: 'Engineering Prototype',
    zh: '工程样车',
    note: '验证设计可行性的样车阶段，在 VP 之后、OTS 之前。'
  },
  OTS: {
    en: 'Off-Tooling Sample',
    zh: '工装样件',
    note: '用量产工装制造的样件，验证模具和工艺。'
  },
  PSW: {
    en: 'Part Submission Warrant',
    zh: '零件提交保证书',
    note: 'PPAP 的核心文件，供应商签字承诺按质按量持续供货。'
  },
  ECR: {
    en: 'Engineering Change Request',
    zh: '工程变更请求',
    note: '发起设计变更的正式请求。'
  },
  ECO: {
    en: 'Engineering Change Order',
    zh: '工程变更指令',
    note: '批准后的工程变更执行指令。'
  },
  DTC: {
    en: 'Diagnostic Trouble Code',
    zh: '诊断故障码',
    note: '车辆 ECU 存储的故障代码，维修时通过 OBD 读取。'
  },
  OBD: {
    en: 'On-Board Diagnostics',
    zh: '车载诊断系统',
    note: '车辆自诊断接口，OBD-II 是通用诊断标准。'
  },
  HMI: {
    en: 'Human-Machine Interface',
    zh: '人机交互界面',
    note: '车机屏幕、HUD、语音助手等用户与车辆交互的界面。'
  },
  HUD: {
    en: 'Head-Up Display',
    zh: '抬头显示',
    note: '将车速、导航等信息投射到挡风玻璃上，减少视线转移。'
  },
  LFP: {
    en: 'Lithium Iron Phosphate',
    zh: '磷酸铁锂',
    note: '电池正极材料，安全性好、成本低、循环寿命长，但能量密度低于三元锂。'
  },
  NCM: {
    en: 'Nickel Cobalt Manganese',
    zh: '三元锂（镍钴锰）',
    note: '电池正极材料，能量密度高，但成本较高、热稳定性需 BMS 管理。'
  },
  GB: {
    en: 'Guobiao (National Standard)',
    zh: '国标',
    note: '中国国家标准，如 GB/T 3730.1（汽车术语）、GB/T（充电接口）等。'
  },
  CCC: {
    en: 'China Compulsory Certification',
    zh: '中国强制认证（3C）',
    note: '在中国销售的汽车及零部件必须通过的强制认证。'
  }
}
