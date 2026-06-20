# 🌍 Geo Explorer · 3D 地理探索地球

一个基于 Next.js 与 Three.js 的交互式 3D 地理可视化应用：在可自由旋转、缩放的地球上点击任意位置，系统自动匹配最近的国家或地区，并展示其首都、人口、面积、气候与地理概况。

## ✨ 特性

### 🗺️ 地理数据
- **25 个国家与地区** 覆盖六大洲，附首都、人口、面积、气候等结构化信息
- **真实经纬度** 每个国家以代表点定位，点击表面后通过 `haversine` 公式匹配最近国家
- **多语言友好** UI 与数据均为中文，flag emoji 直接渲染

### 🎯 交互方式
- **3D 地球旋转** 默认相机位置 `[0, 1.5, 5]`，支持鼠标拖拽与滚轮缩放（`OrbitControls`，最近 2.5、最远 12）
- **点击 / 拖拽智能区分** `Earth` 组件记录 `pointerdown` 位置；指针位移 > 5px 时视为拖拽，释放时不触发选择
- **平滑镜头运镜** GSAP 时间轴驱动 `flyToCountry` 与 `flyBackToDefault`，动画期间禁用 `OrbitControls` 防止输入冲突
- **加载状态** `useProgress` 监听 `THREE.DefaultLoadingManager`，显示资源加载进度条
- **错误边界** `SceneErrorBoundary` 兜底单个资源加载失败，避免整页空白

### 🔍 筛选系统
- **大洲切换** 顶部 Tab（全部 / 亚洲 / 欧洲 / …）由 `getFilterOptions()` 运行时从数据派生
- **实时统计** `TopStats` 显示当前筛选条件下的可见数 / 总数
- **已选回显** 控制面板在选中状态下显示国旗 + 国名，提供「重置视角」按钮

### 🎨 视觉效果
- **星空背景** `Starfield` 生成 2000 颗加性混合 (additive blending) 粒子点
- **多光源** 环境光 + 两个方向光（主光与背光）模拟日照
- **玻璃态 UI** Tailwind + 半透明 + `backdrop-blur` 实现现代感覆盖层
- **Framer Motion** 信息卡片进出场动画，控制面板淡入动画

## 🛠️ 技术栈

| 层 | 选型 |
|---|---|
| 前端框架 | Next.js 15.5.6（App Router + `output: "export"` 静态导出） |
| 视图层 | React 19 + TypeScript 5 |
| 3D 引擎 | Three.js 0.184 + React Three Fiber 9 + Drei 10 |
| 动画 | GSAP（3D 相机）、Framer Motion（UI） |
| 样式 | Tailwind CSS 3.4 |
| 部署 | GitHub Pages（`.github/workflows/deploy.yml`） |

## 🚀 快速开始

### 环境要求

- Node.js ≥ 18

### 安装与启动

```bash
npm install
npm run dev          # 开发服务器 http://localhost:3000
npm run build        # 生产构建（产物输出到 ./out）
npm start            # 预览生产构建
npm run lint         # ESLint
```

### 部署到 GitHub Pages

推送至 `main` 分支即可触发 `.github/workflows/deploy.yml`：

1. `BASE_PATH: /<repo-name>` 在 CI 中注入，`next.config.ts` 据此设置 `basePath` 与 `NEXT_PUBLIC_BASE_PATH`
2. `npm run build` 生成静态文件至 `out/`
3. `actions/upload-pages-artifact` + `actions/deploy-pages` 完成发布

> 本地开发时 `BASE_PATH` 为空，`next dev` 与 `next build` 均在根路径 `/` 工作。

### 资源路径规范

所有 `public/` 下的资源**必须**通过 `src/utils/assetPath.ts` 的 `assetPath()` 引用：

```ts
import { assetPath } from "@/utils/assetPath";
const texture = useTexture(assetPath("/textures/earth.jpg"));
```

Next.js 在 GitHub Pages 部署时会插入 `<base href="/repo/">`，但**绝对路径**（如 `/textures/earth.jpg`）会绕过 `<base>` 直接命中，导致 404。`assetPath` 在构建期拼接 `NEXT_PUBLIC_BASE_PATH`，是这类资源唯一安全的加载方式。

## 📁 项目结构

```
src/
├── app/                       # Next.js App Router
│   ├── layout.tsx            # 根布局（metadata: "Geo Explorer - 3D 地理探索地球"）
│   ├── page.tsx              # 主页面：AppProvider + EarthScene + AppUI
│   └── globals.css           # Tailwind base
├── components/
│   ├── EarthScene.tsx        # R3F Canvas + GSAP 镜头时间轴 + 加载/错误边界
│   ├── Earth.tsx             # 球体网格 + 点击/拖拽区分 + 反向经纬度
│   ├── Starfield.tsx         # 2000 颗加性混合粒子
│   └── ui/
│       ├── AppUI.tsx         # pointer-events-none 顶层覆盖层
│       ├── ControlPanel.tsx  # 大洲 Tab + 重置按钮
│       ├── CountryInfoCard.tsx # 选中国家详情卡片
│       └── TopStats.tsx      # 顶部标题 + 计数
├── store/
│   └── AppContext.tsx        # React Context：选中状态 + 大洲筛选 + 派生统计
├── data/
│   └── countries.ts          # CountryData[]：25 个国家/地区
└── utils/
    ├── coordinates.ts        # latLngToPosition / positionToLatLng / haversineDistanceKm
    └── assetPath.ts          # BASE_PATH-aware 资源路径工具
```

## 🌍 数据覆盖

| 大洲 | 代表国家 |
|---|---|
| 亚洲 | 中国、印度、日本、沙特阿拉伯、哈萨克斯坦 |
| 大洋洲 | 澳大利亚、新西兰 |
| 北美洲 | 美国、加拿大、墨西哥、格陵兰 |
| 南美洲 | 巴西、阿根廷、智利、秘鲁 |
| 欧洲 | 英国、法国、德国、意大利、挪威 |
| 非洲 | 埃及、尼日利亚、肯尼亚、南非、摩洛哥 |

每个国家包含：首都、人口、面积、所属大洲、气候描述、纬度、经纬度、国旗 emoji、地理概况。

## 🎮 使用说明

1. **浏览地球** 鼠标拖拽旋转、滚轮缩放
2. **选中位置** 在地球任意位置点击（注意：拖拽结束不会触发选择）
3. **查看详情** 右侧弹出国家信息卡片，包含首都、人口、面积、气候与地理概况
4. **筛选大洲** 底部控制面板切换大洲 Tab，仅显示对应国家的可选范围
5. **重置视角** 点击「重置视角」按钮，镜头 GSAP 平滑回到默认位置

## 🔧 开发说明

### 添加新国家

在 `src/data/countries.ts` 的 `countries` 数组中追加 `CountryData` 条目即可，无需改动其他文件 —— 大洲 Tab 会通过 `getFilterOptions()` 自动派生。

### 调整地球尺寸

地球半径硬编码为 `1.2`（见 `Earth.tsx` 的 `sphereGeometry` 与 `coordinates.ts` 的 `latLngToPosition` 默认值）。镜头距离常量 `1.22`（基准面）与 `0.92`（相机偏移）在 `EarthScene.tsx` 中定义。**三者需同步调整**，否则点击定位与镜头运镜会出现偏移。

### 自定义地球纹理

替换 `public/textures/earth.jpg` 即可，无需改动代码 —— `Earth.tsx` 已通过 `useTexture(assetPath("/textures/earth.jpg"))` 加载。

### 调整动画参数

- 镜头动画时长：`EarthScene.tsx` 中 GSAP timeline 的 `duration`（默认 1.2s 聚焦、1.0s 重置）
- 星空数量：`Starfield.tsx` 中的 `count`（默认 2000）

## 🎯 后续规划

- [ ] 添加更多国家与更细粒度数据（省/州、城市）
- [ ] 引入 GeoJSON 真实国境线渲染（替换当前点匹配）
- [ ] 季节 / 昼夜光照切换
- [ ] 移动端触控手势优化
- [ ] 加载速度监控与性能预算

## 📄 许可证

MIT License

---

**享受探索地球的地理之美！** 🌍✨
