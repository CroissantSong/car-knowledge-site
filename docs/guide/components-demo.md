# 交互组件演示

本页演示三个可复用交互组件的用法。

## 1. 小测组件 `<Quiz>`

在 Markdown 中直接使用 `<Quiz>` 组件，支持选择题即时反馈。

### 示例 1：单选题

<Quiz 
  :options="['A. 让所有车看起来一样', 'B. 降低单车研发和制造成本', 'C. 提升最高车速', 'D. 让发动机排量更大']" 
  :correct-index="1"
  explanation="平台化开发的核心价值是通过零部件共享、工艺复用来降低研发和制造成本，同时缩短新车型的上市周期。"
>

**小测**：平台化开发的最大商业价值是什么？

</Quiz>

### 示例 2：判断题

<Quiz 
  :options="['会改变', '不会改变']" 
  :correct-index="1"
  explanation="VIN（车辆识别码）是车辆的唯一身份证，与车牌号无关。更换车牌后 VIN 保持不变。"
>

**小测**：一台车更换车牌后，VIN 会随之改变吗？

</Quiz>

### 示例 3：无选项（思考题）

<Quiz explanation="白车身（Body in White）指完成冲压焊接但尚未涂装的车身主体结构。">

**小测**："白车身"通常指喷漆前还是喷漆后的车身主体？

</Quiz>

---

## 2. 术语卡组件 `<Term>`

在文本中内嵌术语解释，鼠标悬停（桌面端）或点击（移动端）弹出释义。

### 用法示例

汽车的 <Term term="BMS" en="Battery Management System" desc="电池管理系统，负责监控电池电压、温度、SOC（荷电状态），确保电池安全运行并延长寿命。">BMS</Term> 是新能源汽车的核心控制单元之一。

<Term term="域控制器" en="Domain Controller" desc="将传统分散的多个 ECU 集中到一个高性能处理器上，按功能域（动力、底盘、座舱、驾驶）统一管理。">域控制器</Term> 正在取代传统的分布式电子架构。

车辆的 <Term term="NVH" en="Noise, Vibration, Harshness" desc="噪声、振动与声振粗糙度，是衡量车辆舒适性的关键指标。工程师通过隔振、隔音、结构优化来改善 NVH。">NVH</Term> 性能直接影响驾乘体验。

<Term term="OTA" en="Over-The-Air" desc="空中下载技术，允许车辆通过无线网络接收软件更新，无需到店即可升级功能或修复问题。">OTA</Term> 技术让车辆像手机一样可以远程升级。

---

## 3. 增强动力链交互页

动力链对比交互页已增强三种模式的视觉差异：

- **🚀 驱动模式**：箭头更粗、流速更快，突出能量流向
- **🛣️ 巡航模式**：箭头变细、流速变慢，体现节能状态
- **🔄 制动回收**：绿色虚线表示能量回收，燃油车道显示热损失

<iframe src="/auto-tech-docs/powertrain-compare.html" width="100%" height="800" style="border:1px solid var(--auto-border);border-radius:12px;"></iframe>

---

## 组件 API 参考

### `<Quiz>` 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `options` | `string[]` | 选项数组（可选，不传则为思考题） |
| `correctIndex` | `number` | 正确选项索引（从 0 开始） |
| `explanation` | `string` | 答案解析文本 |

### `<Term>` 属性

| 属性 | 类型 | 说明 |
|------|------|------|
| `term` | `string` | 术语名称（必填） |
| `en` | `string` | 英文全称（可选） |
| `desc` | `string` | 术语释义（必填） |

默认插槽：触发显示的文本（通常是术语缩写）。
