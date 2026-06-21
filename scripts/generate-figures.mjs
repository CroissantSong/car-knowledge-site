import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const OUT_DIR = new URL('../docs/public/', import.meta.url)
mkdirSync(OUT_DIR, { recursive: true })

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function svg(title, body) {
  const id = title.replace(/[^\w-]+/g, '-')
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" role="img" aria-labelledby="${id}">
  <title id="${id}">${esc(title)}</title>
  <style>
    .bg{fill:#f8fafc}
    .panel{fill:#fff;stroke:#d7dee8;stroke-width:2}
    .panel-soft{fill:#eef6f3;stroke:#9fd8d0;stroke-width:2}
    .ink{fill:#152236}
    .muted{fill:#526174}
    .title{font:700 34px system-ui,-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif}
    .section{font:700 22px system-ui,-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif}
    .label{font:650 17px system-ui,-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif}
    .small{font:500 14px system-ui,-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif}
    .tiny{font:500 12px system-ui,-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",sans-serif}
    .stroke{fill:none;stroke:#152236;stroke-width:4;stroke-linecap:round;stroke-linejoin:round}
    .thin{fill:none;stroke:#61728a;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}
    .arrow{fill:none;stroke:#2563eb;stroke-width:4;stroke-linecap:round;stroke-linejoin:round;marker-end:url(#arrow)}
    .teal{fill:#0f766e}.blue{fill:#2563eb}.amber{fill:#d97706}.green{fill:#15803d}.red{fill:#dc2626}.slate{fill:#475569}
    .soft-teal{fill:#dff5f1}.soft-blue{fill:#e5edff}.soft-amber{fill:#fff1d7}.soft-green{fill:#e6f6ec}.soft-red{fill:#fee2e2}.soft-slate{fill:#e7edf4}
  </style>
  <defs>
    <marker id="arrow" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
      <path d="M2 2 L10 6 L2 10 Z" fill="#2563eb"/>
    </marker>
  </defs>
  <rect class="bg" width="1200" height="675"/>
${body}
</svg>
`
}

function text(x, y, value, cls = 'label ink', anchor = 'middle') {
  return `<text x="${x}" y="${y}" class="${cls}" text-anchor="${anchor}">${esc(value)}</text>`
}

function multiline(x, y, lines, cls = 'small muted', anchor = 'middle', lineHeight = 22) {
  const tspans = lines
    .map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${esc(line)}</tspan>`)
    .join('')
  return `<text y="${y}" class="${cls}" text-anchor="${anchor}">${tspans}</text>`
}

function card(x, y, w, h, title, lines, fill = 'panel') {
  return `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" class="${fill}"/>
  ${text(x + w / 2, y + 34, title, 'section ink')}
  ${multiline(x + w / 2, y + 66, lines, 'small muted')}
`
}

function write(name, title, body) {
  writeFileSync(join(OUT_DIR.pathname, name), svg(title, body))
}

write('vehicle-four-systems.svg', '整车四大系统与 VIN 定位示意', `
  ${text(60, 64, '整车四大系统', 'title ink', 'start')}
  ${text(60, 96, '先按系统归属判断问题，再追到零部件、控制器和证据。', 'small muted', 'start')}
  <path d="M138 366 C176 280 275 238 450 236 H736 C822 236 904 286 955 356 L1012 366 C1040 370 1062 392 1062 420 V458 H116 V420 C116 392 126 376 138 366Z" fill="#f1f5f9" stroke="#152236" stroke-width="4"/>
  <path d="M344 238 L410 150 H684 L752 238" fill="#dff5f1" stroke="#152236" stroke-width="4"/>
  <path d="M428 166 H676 L724 236 H372Z" fill="#ffffff" stroke="#9fb0c6" stroke-width="2"/>
  <rect x="140" y="360" width="292" height="42" rx="8" class="soft-teal"/>
  <rect x="432" y="354" width="250" height="48" rx="8" class="soft-amber"/>
  <rect x="682" y="356" width="270" height="46" rx="8" class="soft-blue"/>
  <path d="M184 459 H1000" class="stroke"/>
  <circle cx="294" cy="459" r="61" fill="#fff" stroke="#152236" stroke-width="4"/>
  <circle cx="294" cy="459" r="28" fill="#e7edf4" stroke="#61728a" stroke-width="3"/>
  <circle cx="868" cy="459" r="61" fill="#fff" stroke="#152236" stroke-width="4"/>
  <circle cx="868" cy="459" r="28" fill="#e7edf4" stroke="#61728a" stroke-width="3"/>
  <rect x="704" y="168" width="118" height="24" rx="4" fill="#fff" stroke="#dc2626" stroke-width="3"/>
  ${text(763, 185, 'VIN', 'label red')}
  <path d="M822 180 C910 136 982 140 1030 176" class="arrow"/>
  ${card(60, 540, 250, 86, '车身 Body', ['乘员空间、碰撞结构', '外观与内外饰'], 'panel')}
  ${card(334, 540, 250, 86, '底盘 Chassis', ['悬架、转向、制动', '让车稳、能转、能停'], 'panel')}
  ${card(608, 540, 250, 86, '动力 Powertrain', ['发动机/电机与传动', '把能量变成轮端力'], 'panel')}
  ${card(882, 540, 250, 86, '电气电子 E/E', ['电源、线束、控制器', '供电、通信、控制'], 'panel')}
  <path d="M170 520 L240 458" class="thin"/>
  <path d="M450 520 L460 404" class="thin"/>
  <path d="M730 520 L750 405" class="thin"/>
  <path d="M1000 520 L872 400" class="thin"/>
`)

write('body-chassis-process.svg', '车身四大工艺与底盘合装示意', `
  ${text(60, 64, '车身制造：冲、焊、涂、总', 'title ink', 'start')}
  ${text(60, 96, '四大工艺决定外观、安全、节拍、成本，底盘与动力在总装阶段合到车身上。', 'small muted', 'start')}
  ${card(70, 140, 215, 112, '1 冲压', ['钢/铝板材', '成形为门盖侧围'], 'panel-soft')}
  ${card(335, 140, 215, 112, '2 焊接', ['冲压件连接', '形成白车身 BIW'], 'panel-soft')}
  ${card(600, 140, 215, 112, '3 涂装', ['前处理、电泳', '中涂、面漆、清漆'], 'panel-soft')}
  ${card(865, 140, 215, 112, '4 总装', ['底盘、动力、内饰', '电气电子上车'], 'panel-soft')}
  <path d="M287 196 H330" class="arrow"/>
  <path d="M552 196 H595" class="arrow"/>
  <path d="M817 196 H860" class="arrow"/>
  <path d="M184 396 C230 338 340 312 520 312 H742 C840 312 918 350 976 416" fill="#fff" stroke="#152236" stroke-width="4"/>
  <path d="M310 316 H748 L820 405 H236Z" fill="#f8fafc" stroke="#61728a" stroke-width="3"/>
  <rect x="366" y="336" width="132" height="54" rx="6" class="soft-red"/>
  <rect x="510" y="336" width="120" height="54" rx="6" class="soft-blue"/>
  <rect x="642" y="336" width="128" height="54" rx="6" class="soft-green"/>
  <path d="M190 444 H1010" class="stroke"/>
  <circle cx="310" cy="444" r="52" fill="#fff" stroke="#152236" stroke-width="4"/>
  <circle cx="884" cy="444" r="52" fill="#fff" stroke="#152236" stroke-width="4"/>
  ${text(432, 366, '热成型钢', 'small ink')}
  ${text(570, 366, '高强钢', 'small ink')}
  ${text(706, 366, '铝/覆盖件', 'small ink')}
  ${card(105, 530, 290, 78, '白车身', ['喷漆前的车身骨架，碰撞结构在这里定型'], 'panel')}
  ${card(455, 530, 290, 78, '底盘系统', ['悬架、转向、制动把车身连接到路面'], 'panel')}
  ${card(805, 530, 290, 78, '总装合车', ['动力、电气、内饰装入后成为可交付整车'], 'panel')}
`)

write('body-platform-modular.svg', '平台化开发与底盘模块示意', `
  ${text(60, 64, '平台化：共享底板，覆盖多车型', 'title ink', 'start')}
  ${text(60, 96, '平台不等于外观相同，而是前舱、底盘、电气和电池/动力模块共享。', 'small muted', 'start')}
  <rect x="165" y="334" width="870" height="82" rx="8" fill="#e7edf4" stroke="#152236" stroke-width="4"/>
  <rect x="238" y="290" width="170" height="58" rx="8" class="soft-amber" stroke="#d97706" stroke-width="3"/>
  <rect x="512" y="292" width="176" height="56" rx="8" class="soft-blue" stroke="#2563eb" stroke-width="3"/>
  <rect x="782" y="290" width="178" height="58" rx="8" class="soft-green" stroke="#15803d" stroke-width="3"/>
  <circle cx="290" cy="436" r="55" fill="#fff" stroke="#152236" stroke-width="4"/>
  <circle cx="902" cy="436" r="55" fill="#fff" stroke="#152236" stroke-width="4"/>
  ${text(323, 324, '前舱模块', 'label ink')}
  ${text(600, 325, '电池/地板', 'label ink')}
  ${text(871, 324, '后桥模块', 'label ink')}
  ${card(84, 132, 250, 104, '两厢/轿车', ['短轴距、低车高', '覆盖城市通勤'], 'panel')}
  ${card(366, 132, 250, 104, 'SUV', ['长行程悬架', '更高离地间隙'], 'panel')}
  ${card(648, 132, 250, 104, 'MPV', ['长轴距、大空间', '座椅与电气变化'], 'panel')}
  ${card(930, 132, 200, 104, '性能版', ['双电机/四驱', '制动与冷却强化'], 'panel')}
  <path d="M210 238 L278 335" class="arrow"/>
  <path d="M492 238 L545 335" class="arrow"/>
  <path d="M774 238 L704 335" class="arrow"/>
  <path d="M1030 238 L920 335" class="arrow"/>
  <path d="M238 520 H970" class="arrow"/>
  ${text(600, 556, '研发摊销下降、供应链复用、验证经验迁移，但差异化也要保留', 'label slate')}
`)

write('engine-four-stroke.svg', '四冲程与发动机布置示意', `
  ${text(60, 64, '内燃机四冲程', 'title ink', 'start')}
  ${text(60, 96, '只有做功冲程直接输出动力，其余冲程依靠飞轮惯性完成。', 'small muted', 'start')}
  ${[0,1,2,3].map((i) => {
    const x = 78 + i * 278
    const titles = ['进气', '压缩', '做功', '排气']
    const colors = ['soft-blue', 'soft-amber', 'soft-red', 'soft-slate']
    const pistonY = [274, 218, 292, 224][i]
    return `
      <rect x="${x}" y="140" width="230" height="280" rx="8" class="panel"/>
      ${text(x + 115, 178, `${i + 1}. ${titles[i]}`, 'section ink')}
      <rect x="${x + 70}" y="214" width="90" height="154" rx="8" fill="#fff" stroke="#152236" stroke-width="4"/>
      <rect x="${x + 79}" y="${pistonY}" width="72" height="34" rx="5" class="${colors}" stroke="#152236" stroke-width="3"/>
      <path d="M${x + 115} ${pistonY + 34} L${x + 115} 374" class="thin"/>
      <circle cx="${x + 115}" cy="374" r="18" fill="#e7edf4" stroke="#152236" stroke-width="3"/>
      <path d="M${x + 78} 214 L${x + 78} 190" class="thin"/>
      <path d="M${x + 152} 214 L${x + 152} 190" class="thin"/>
      ${text(x + 72, 452, ['进气门开 / 排气门关','两门关闭 / 活塞上行','火花点火 / 活塞下行','排气门开 / 废气排出'][i], 'small muted', 'start')}
    `
  }).join('')}
  <rect x="148" y="508" width="904" height="86" rx="8" class="panel-soft"/>
  ${text(600, 540, '常见布置：直列结构简单，V 型更紧凑，水平对置重心低；电机没有气缸排列问题。', 'label ink')}
  <path d="M310 570 h82 m-41 -35 v70" class="thin"/>
  <path d="M546 570 l-52 -46 m52 46 l52 -46" class="thin"/>
  <path d="M770 570 h-76 m76 0 h76" class="thin"/>
`)

write('engine-core-mechanisms.svg', '发动机机构、曲线与循环示意', `
  ${text(60, 64, '发动机核心机构与曲线', 'title ink', 'start')}
  ${text(60, 96, '把往复运动转成旋转运动，并用配气、燃烧和热循环控制效率。', 'small muted', 'start')}
  <rect x="72" y="132" width="332" height="416" rx="8" class="panel"/>
  ${text(238, 172, '曲柄连杆机构', 'section ink')}
  <rect x="192" y="214" width="92" height="84" rx="8" fill="#e5edff" stroke="#152236" stroke-width="4"/>
  <path d="M238 298 L282 384" class="stroke"/>
  <circle cx="238" cy="258" r="20" class="soft-amber" stroke="#152236" stroke-width="3"/>
  <circle cx="282" cy="384" r="46" fill="#fff" stroke="#152236" stroke-width="4"/>
  <circle cx="282" cy="384" r="10" class="blue"/>
  <path d="M282 384 L342 384" class="stroke"/>
  ${text(238, 330, '活塞往复', 'small muted')}
  ${text(314, 446, '曲轴旋转', 'small muted')}
  <rect x="444" y="132" width="332" height="416" rx="8" class="panel"/>
  ${text(610, 172, '配气机构', 'section ink')}
  <path d="M514 262 H706" class="stroke"/>
  <circle cx="560" cy="262" r="24" class="soft-green" stroke="#152236" stroke-width="3"/>
  <circle cx="660" cy="262" r="24" class="soft-green" stroke="#152236" stroke-width="3"/>
  <path d="M560 286 V392 M660 286 V392" class="stroke"/>
  <path d="M522 392 H698" class="thin"/>
  <path d="M508 228 C545 194 594 194 632 228 S698 260 724 222" class="thin"/>
  ${text(610, 438, '凸轮轴按时顶开进/排气门', 'small muted')}
  <rect x="816" y="132" width="312" height="416" rx="8" class="panel"/>
  ${text(972, 172, 'P-V / 摩擦圆', 'section ink')}
  <path d="M878 416 V230 H1074" class="thin"/>
  <path d="M910 380 C910 292 966 238 1020 250 C1078 262 1080 350 1028 382 C986 407 942 404 910 380Z" fill="none" stroke="#d97706" stroke-width="5"/>
  <path d="M920 488 C960 438 1002 438 1040 488 C1002 536 960 536 920 488Z" fill="none" stroke="#2563eb" stroke-width="4"/>
  <circle cx="980" cy="488" r="10" class="blue"/>
  ${text(910, 226, 'P', 'tiny muted')}
  ${text(1084, 420, 'V', 'tiny muted')}
  ${text(980, 548, '抓地力边界', 'small muted')}
  <path d="M404 342 H444" class="arrow"/>
  <path d="M776 342 H816" class="arrow"/>
`)

write('transmission-suspension.svg', '离合器、传动与悬架结构示意', `
  ${text(60, 64, '传动与悬架：动力传递 + 车轮导向', 'title ink', 'start')}
  ${text(60, 96, '离合器控制动力接合，悬架控制车轮运动轨迹与车身姿态。', 'small muted', 'start')}
  <rect x="62" y="132" width="330" height="430" rx="8" class="panel"/>
  ${text(227, 172, '离合器剖面', 'section ink')}
  <circle cx="164" cy="326" r="70" class="soft-amber" stroke="#152236" stroke-width="4"/>
  <circle cx="254" cy="326" r="48" class="soft-blue" stroke="#152236" stroke-width="4"/>
  <rect x="292" y="290" width="48" height="72" rx="8" class="soft-slate" stroke="#152236" stroke-width="4"/>
  <path d="M110 326 H340" class="stroke"/>
  ${text(164, 428, '飞轮', 'label ink')}
  ${text(254, 428, '离合器片', 'label ink')}
  ${text(315, 428, '压盘', 'label ink')}
  <rect x="436" y="132" width="330" height="430" rx="8" class="panel"/>
  ${text(601, 172, '麦弗逊悬架', 'section ink')}
  <path d="M610 216 L566 432" class="stroke"/>
  <path d="M582 280 L638 292" class="thin"/>
  <path d="M568 330 L626 342" class="thin"/>
  <path d="M552 424 L486 472 H680" class="stroke"/>
  <circle cx="680" cy="472" r="48" fill="#fff" stroke="#152236" stroke-width="4"/>
  <path d="M680 424 V520" class="thin"/>
  ${text(612, 556, '支柱兼导向，结构紧凑', 'small muted')}
  <rect x="810" y="132" width="330" height="430" rx="8" class="panel"/>
  ${text(975, 172, '多连杆后悬', 'section ink')}
  <circle cx="1042" cy="440" r="56" fill="#fff" stroke="#152236" stroke-width="4"/>
  <path d="M920 270 H1060" class="stroke"/>
  <path d="M902 370 L1030 440 M910 455 L1040 440 M940 530 L1040 440" class="stroke"/>
  <circle cx="920" cy="270" r="10" class="blue"/>
  <circle cx="902" cy="370" r="10" class="green"/>
  <circle cx="910" cy="455" r="10" class="amber"/>
  <circle cx="940" cy="530" r="10" class="red"/>
  ${text(975, 556, '多根连杆分别控制定位参数', 'small muted')}
`)

write('braking-abs-tire.svg', '制动、ABS 与轮胎规格示意', `
  ${text(60, 64, '制动、ABS 与轮胎规格', 'title ink', 'start')}
  ${text(60, 96, '制动把动能变成热，ABS/ESP 通过轮速信号避免抱死并修正车身姿态。', 'small muted', 'start')}
  <rect x="70" y="134" width="310" height="410" rx="8" class="panel"/>
  ${text(225, 174, '盘式制动器', 'section ink')}
  <circle cx="225" cy="325" r="98" fill="#fff" stroke="#152236" stroke-width="4"/>
  <circle cx="225" cy="325" r="44" class="soft-slate" stroke="#61728a" stroke-width="3"/>
  <path d="M288 244 C344 286 348 364 288 408" fill="#fee2e2" stroke="#dc2626" stroke-width="4"/>
  ${text(310, 464, '卡钳夹紧制动盘', 'small muted')}
  <rect x="446" y="134" width="310" height="410" rx="8" class="panel"/>
  ${text(601, 174, 'ABS 闭环', 'section ink')}
  ${card(486, 220, 230, 72, '轮速传感器', ['识别抱死趋势'], 'panel-soft')}
  ${card(486, 328, 230, 72, 'ABS 控制器', ['计算增压/保压/减压'], 'panel-soft')}
  ${card(486, 436, 230, 72, '液压执行器', ['快速调节制动力'], 'panel-soft')}
  <path d="M601 292 V323" class="arrow"/>
  <path d="M601 400 V431" class="arrow"/>
  <path d="M718 472 C790 410 790 270 718 252" class="arrow"/>
  <rect x="822" y="134" width="310" height="410" rx="8" class="panel"/>
  ${text(977, 174, '轮胎规格', 'section ink')}
  <rect x="898" y="245" width="162" height="64" rx="8" fill="#152236"/>
  ${text(979, 286, '205/55 R16 91V', 'label', 'middle').replace('class="label"', 'class="label" fill="#fff"')}
  <path d="M914 316 V374 M976 316 V374 M1042 316 V374" class="thin"/>
  ${text(914, 402, '胎宽', 'small muted')}
  ${text(976, 402, '扁平比', 'small muted')}
  ${text(1042, 402, '轮辋/载重/速度', 'small muted')}
  ${text(977, 468, '轮胎决定制动、转向和舒适性的最终上限', 'small muted')}
`)

write('hybrid-powertrain-modes.svg', '混动结构、增程模式与快充曲线示意', `
  ${text(60, 64, '混动与增程：能量流怎么走', 'title ink', 'start')}
  ${text(60, 96, '串联、并联、混联的核心差别，是发动机能否直接参与驱动车轮。', 'small muted', 'start')}
  ${card(70, 138, 310, 112, '串联 / 增程', ['发动机只发电', '电机负责驱动车轮'], 'panel')}
  ${card(445, 138, 310, 112, '并联', ['发动机和电机都可驱动', '结构直接、机械效率高'], 'panel')}
  ${card(820, 138, 310, 112, '混联', ['功率分流', '按工况选择最高效路径'], 'panel')}
  <rect x="118" y="326" width="92" height="54" rx="8" class="soft-amber" stroke="#d97706" stroke-width="3"/>
  <rect x="286" y="326" width="92" height="54" rx="8" class="soft-blue" stroke="#2563eb" stroke-width="3"/>
  <circle cx="250" cy="458" r="42" fill="#fff" stroke="#152236" stroke-width="4"/>
  ${text(164, 360, '发动机', 'small ink')}
  ${text(332, 360, '电机', 'small ink')}
  <path d="M210 353 H280" class="arrow"/>
  <path d="M332 382 L266 420" class="arrow"/>
  <rect x="488" y="326" width="92" height="54" rx="8" class="soft-amber" stroke="#d97706" stroke-width="3"/>
  <rect x="650" y="326" width="92" height="54" rx="8" class="soft-blue" stroke="#2563eb" stroke-width="3"/>
  <circle cx="615" cy="458" r="42" fill="#fff" stroke="#152236" stroke-width="4"/>
  <path d="M534 380 L604 420" class="arrow"/>
  <path d="M696 382 L626 420" class="arrow"/>
  <rect x="862" y="326" width="92" height="54" rx="8" class="soft-amber" stroke="#d97706" stroke-width="3"/>
  <rect x="1022" y="326" width="92" height="54" rx="8" class="soft-blue" stroke="#2563eb" stroke-width="3"/>
  <circle cx="978" cy="458" r="42" fill="#fff" stroke="#152236" stroke-width="4"/>
  <path d="M954 353 H1016" class="arrow"/>
  <path d="M908 380 L968 420" class="arrow"/>
  <path d="M1068 382 L990 420" class="arrow"/>
  <path d="M108 590 V515 H376" class="thin"/>
  <path d="M128 572 C178 520 246 526 306 540 C344 548 362 536 376 520" fill="none" stroke="#2563eb" stroke-width="5"/>
  ${text(112, 510, 'SOC', 'tiny muted', 'start')}
  ${text(368, 614, '时间', 'tiny muted')}
  ${text(246, 622, '快充前快后慢：中高 SOC 后充电功率下降', 'small muted')}
`)

write('torque-power-curves.svg', '扭矩与功率曲线对比示意', `
  ${text(60, 64, '扭矩、功率与不同动力源曲线', 'title ink', 'start')}
  ${text(60, 96, '日常体感多来自中低转扭矩；最高车速和持续加速能力还要看功率。', 'small muted', 'start')}
  <rect x="98" y="136" width="1004" height="420" rx="8" class="panel"/>
  <path d="M176 478 V198 H1018" class="thin"/>
  <path d="M190 428 C320 428 420 300 548 300 C690 300 790 360 940 410" fill="none" stroke="#d97706" stroke-width="6"/>
  <path d="M190 442 C310 408 454 330 600 246 C734 168 856 192 940 282" fill="none" stroke="#2563eb" stroke-width="6"/>
  <path d="M190 246 C380 246 520 246 660 315 C782 374 870 432 940 454" fill="none" stroke="#15803d" stroke-width="6"/>
  ${text(214, 188, '扭矩 / 功率', 'small muted', 'start')}
  ${text(1018, 506, '转速 rpm', 'small muted')}
  <rect x="742" y="166" width="280" height="126" rx="8" fill="#fff" stroke="#d7dee8" stroke-width="2"/>
  <path d="M766 198 H822" stroke="#d97706" stroke-width="6"/>
  ${text(842, 204, '涡轮/汽油机扭矩平台', 'small ink', 'start')}
  <path d="M766 234 H822" stroke="#2563eb" stroke-width="6"/>
  ${text(842, 240, '功率随转速上升', 'small ink', 'start')}
  <path d="M766 270 H822" stroke="#15803d" stroke-width="6"/>
  ${text(842, 276, '电机低速大扭矩', 'small ink', 'start')}
  ${card(160, 580, 258, 66, '新人判断', ['起步/超车看扭矩区间'], 'panel-soft')}
  ${card(470, 580, 258, 66, '工程判断', ['还要看齿比、车重、轮胎'], 'panel-soft')}
  ${card(780, 580, 258, 66, '电动车差异', ['0 rpm 即可输出大扭矩'], 'panel-soft')}
`)

write('differential-turning.svg', '差速器与转弯轮速差示意', `
  ${text(60, 64, '差速器：允许左右轮转速不同', 'title ink', 'start')}
  ${text(60, 96, '转弯时外侧车轮走更长路径，差速器让两侧车轮不必硬拖着转。', 'small muted', 'start')}
  <path d="M192 452 C192 250 346 138 548 138" fill="none" stroke="#d97706" stroke-width="8"/>
  <path d="M298 452 C298 316 406 244 548 244" fill="none" stroke="#2563eb" stroke-width="8"/>
  <circle cx="236" cy="452" r="46" fill="#fff" stroke="#152236" stroke-width="4"/>
  <circle cx="344" cy="452" r="46" fill="#fff" stroke="#152236" stroke-width="4"/>
  <rect x="245" y="384" width="90" height="40" rx="8" class="soft-slate" stroke="#152236" stroke-width="3"/>
  ${text(540, 160, '外侧路径更长 → 轮速更高', 'label amber', 'start')}
  ${text(540, 268, '内侧路径更短 → 轮速更低', 'label blue', 'start')}
  <rect x="706" y="158" width="356" height="356" rx="8" class="panel"/>
  ${text(884, 198, '伞齿轮差速器', 'section ink')}
  <circle cx="884" cy="348" r="96" fill="#fff" stroke="#152236" stroke-width="4"/>
  <circle cx="884" cy="348" r="30" class="soft-amber" stroke="#152236" stroke-width="3"/>
  <path d="M772 348 H996" class="stroke"/>
  <path d="M884 236 V460" class="stroke"/>
  <path d="M816 280 L952 416 M952 280 L816 416" class="thin"/>
  <circle cx="772" cy="348" r="28" class="soft-blue" stroke="#152236" stroke-width="3"/>
  <circle cx="996" cy="348" r="28" class="soft-blue" stroke="#152236" stroke-width="3"/>
  ${text(884, 486, '直行时近似等速，转弯时自动分配转速差', 'small muted')}
  <rect x="138" y="544" width="924" height="74" rx="8" class="panel-soft"/>
  ${text(600, 588, '差速锁的作用相反：在脱困时限制转速差，让扭矩不要只流向打滑车轮。', 'label ink')}
`)

write('transmission-types.svg', '主流变速箱类型对比示意', `
  ${text(60, 64, '主流变速箱：不同结构解决同一个问题', 'title ink', 'start')}
  ${text(60, 96, '把发动机高转速、小扭矩翻译成车轮可用的速度与驱动力。', 'small muted', 'start')}
  ${card(70, 142, 245, 340, 'MT 手动', ['离合器 + 齿轮组', '驾驶员选择档位', '效率高、操作多'], 'panel')}
  <path d="M118 346 H268 M156 292 V400 M224 292 V400" class="stroke"/>
  ${card(345, 142, 245, 340, 'AT 自动', ['液力变矩器', '行星齿轮组', '成熟平顺、成本高'], 'panel')}
  <circle cx="468" cy="330" r="76" fill="#fff" stroke="#152236" stroke-width="4"/>
  <circle cx="468" cy="330" r="26" class="soft-amber" stroke="#152236" stroke-width="3"/>
  <path d="M412 330 H524 M468 274 V386" class="thin"/>
  ${card(620, 142, 245, 340, 'DCT 双离合', ['奇数/偶数两套轴', '下一档预啮合', '换挡快、标定敏感'], 'panel')}
  <path d="M694 288 H796 M694 374 H796 M694 288 V374 M796 288 V374" class="stroke"/>
  <path d="M694 288 L652 330 M694 374 L652 330" class="thin"/>
  ${card(895, 142, 245, 340, 'CVT 无级', ['锥轮 + 钢带', '连续改变传动比', '平顺省油'], 'panel')}
  <circle cx="978" cy="330" r="52" fill="#fff" stroke="#152236" stroke-width="4"/>
  <circle cx="1064" cy="330" r="78" fill="#fff" stroke="#152236" stroke-width="4"/>
  <path d="M978 278 L1064 252 M978 382 L1064 408" class="stroke"/>
  <rect x="190" y="542" width="820" height="72" rx="8" class="panel-soft"/>
  ${text(600, 586, '纯电动车多数只需单级减速器，因为电机高效转速范围远大于内燃机。', 'label ink')}
`)

write('industry-info-flow.svg', '车企信息流与岗位使用场景示意', `
  ${text(60, 64, '车企新人：从信息源到工作判断', 'title ink', 'start')}
  ${text(60, 96, '外部信息提供市场和法规信号，内部评审把信号转成需求、验证和交付。', 'small muted', 'start')}
  ${card(78, 144, 238, 112, '工信部公告', ['新车准入、参数', '上市前技术线索'], 'panel')}
  ${card(78, 292, 238, 112, '销量与实测', ['销量趋势、续航', '竞品表现'], 'panel')}
  ${card(78, 440, 238, 112, '技术媒体/供应商', ['智驾、座舱、三电', '趋势与方案'], 'panel')}
  <rect x="470" y="218" width="260" height="260" rx="8" class="panel-soft"/>
  ${text(600, 270, '信息中台', 'section ink')}
  ${multiline(600, 315, ['参数归一', '竞品对齐', '风险识别', '需求拆解'], 'label muted')}
  ${card(884, 124, 238, 96, '产品/规划', ['定义卖点和竞品带宽'], 'panel')}
  ${card(884, 252, 238, 96, '工程/测试', ['判断技术可行性和验证'], 'panel')}
  ${card(884, 380, 238, 96, '采购/质量', ['锁定供应风险和质量闭环'], 'panel')}
  ${card(884, 508, 238, 96, '销售/售后', ['转成话术、维修与召回'], 'panel')}
  <path d="M316 200 H462" class="arrow"/>
  <path d="M316 348 H462" class="arrow"/>
  <path d="M316 496 H462" class="arrow"/>
  <path d="M730 284 H876" class="arrow"/>
  <path d="M730 342 H876" class="arrow"/>
  <path d="M730 400 H876" class="arrow"/>
  <path d="M730 458 H876" class="arrow"/>
`)

write('industry-collaboration-map.svg', 'OEM、Tier 供应商与 GVDP 里程碑示意', `
  ${text(60, 64, '主机厂、供应商与项目里程碑', 'title ink', 'start')}
  ${text(60, 96, '量产交付靠跨团队协作：OEM 定义整车，Tier1 集成系统，Tier2 提供关键零件。', 'small muted', 'start')}
  <rect x="470" y="182" width="260" height="130" rx="8" class="panel-soft"/>
  ${text(600, 232, 'OEM 主机厂', 'section ink')}
  ${text(600, 268, '整车定义 / 集成 / 验证', 'small muted')}
  ${card(104, 152, 250, 98, 'Tier1 系统供应商', ['制动、座椅、域控、电驱等系统'], 'panel')}
  ${card(846, 152, 250, 98, 'Tier2 零部件供应商', ['芯片、传感器、轴承、材料等'], 'panel')}
  ${card(104, 328, 250, 98, '内部职能', ['产品、研发、采购、质量、制造'], 'panel')}
  ${card(846, 328, 250, 98, '法规与市场', ['准入、标准、用户与竞品信号'], 'panel')}
  <path d="M356 200 H462" class="arrow"/>
  <path d="M838 200 H734" class="arrow"/>
  <path d="M356 376 H462" class="arrow"/>
  <path d="M838 376 H734" class="arrow"/>
  <rect x="110" y="532" width="980" height="60" rx="8" fill="#fff" stroke="#d7dee8" stroke-width="2"/>
  <path d="M162 562 H1038" class="arrow"/>
  ${['概念','立项','工程样车','验证','SOP'].map((label, i) => {
    const x = 190 + i * 200
    return `<circle cx="${x}" cy="562" r="14" class="${['teal','blue','amber','green','red'][i]}"/>${text(x, 625, label, 'label ink')}`
  }).join('')}
`)

write('industry-process-v-model.svg', 'V 模型、APQP 与工程变更流程示意', `
  ${text(60, 64, '术语背后的交付流程', 'title ink', 'start')}
  ${text(60, 96, 'SOP、BOM、DVP、ECR/ECO 都是在管理需求、验证、物料和变更责任边界。', 'small muted', 'start')}
  <rect x="92" y="132" width="1016" height="420" rx="8" class="panel"/>
  <path d="M190 190 L420 460 L600 460 L830 190" fill="none" stroke="#2563eb" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  ${card(120, 160, 188, 76, '需求定义', ['目标、法规、场景'], 'panel-soft')}
  ${card(268, 298, 188, 76, '系统设计', ['架构、接口、BOM'], 'panel-soft')}
  ${card(372, 430, 188, 76, '开发实现', ['零件、软件、样车'], 'panel-soft')}
  ${card(640, 430, 188, 76, '单元验证', ['台架、软件测试'], 'panel-soft')}
  ${card(744, 298, 188, 76, '系统验证', ['DVP、路试、标定'], 'panel-soft')}
  ${card(892, 160, 188, 76, '量产发布', ['SOP、质量闭环'], 'panel-soft')}
  <rect x="176" y="584" width="848" height="54" rx="8" class="soft-amber" stroke="#d97706" stroke-width="2"/>
  ${text(600, 618, 'APQP：计划和定义 → 产品设计 → 过程设计 → 验证 → 反馈改进', 'label ink')}
  <path d="M612 250 H722" class="arrow"/>
  ${text(666, 238, 'ECR / ECO 变更闭环', 'small muted')}
`)
