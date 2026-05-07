# 🌍 地球花园 - 3D Interactive Plant Visualization

一个基于 Next.js 和 Three.js 的交互式 3D 植物可视化项目，将全球植物分布以沉浸式的方式呈现在地球之上。

## ✨ 特性

### 🌱 植物数据
- **51 株植物模型** - 涵盖 7 个不同物种
- **真实地理分布** - 按经纬度精确定位
- **丰富信息展示** - 包含中文名、拉丁学名、植被类型、气候特征
- **多地域分布** - 覆盖亚洲、欧洲、非洲、北美洲、大洋洲

### 🎯 交互功能
- **3D 地球旋转** - 流畅的地球自转动画
- **植物定位** - 在 3D 地球上显示植物生长位置
- **悬停效果** - 鼠标悬停显示植物详情
- **点击交互** - 点击植物聚焦查看，再次点击返回全局视角
- **批量导航** - 自动计算同物种植物群组的最佳视角

### 🔍 筛选系统
- **大洲筛选** - 按洲际筛选显示的植物
- **植被类型** - 过滤不同植被类型（乔木、灌木、草本、竹类等）
- **气候特征** - 根据气候条件筛选植物
- **实时统计** - 显示当前筛选结果的数量

### 🎨 视觉效果
- **星空背景** - 动态星空效果增强沉浸感
- **光照系统** - 多光源照明模拟真实光照
- **材质渲染** - 高质量纹理和材质
- **平滑动画** - GSAP 驱动的相机动画
- **响应式设计** - 适配各种屏幕尺寸

## 🛠️ 技术栈

- **Frontend**: Next.js 15.5.6
- **3D Rendering**: Three.js + React Three Fiber
- **UI Components**: Framer Motion
- **Animations**: GSAP
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- npm, yarn, pnpm 或 bun

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
# 或
bun install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
# 或
bun dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm start
```

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 主页面
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── Earth.tsx         # 3D 地球组件
│   ├── EarthScene.tsx    # 主场景组件
│   ├── Starfield.tsx     # 星空背景
│   ├── PlantModel.tsx    # 植物模型组件
│   └── ui/               # UI 组件
│       ├── AppUI.tsx     # 主 UI 容器
│       ├── ControlPanel.tsx  # 控制面板
│       ├── PlantInfoCard.tsx # 植物信息卡片
│       └── TopStats.tsx  # 顶部统计信息
├── store/                # 状态管理
│   └── AppContext.tsx    # React Context
├── data/                 # 数据文件
│   └── plants.ts         # 植物数据定义
└── utils/                # 工具函数
    └── coordinates.ts     # 坐标转换工具
```

## 🌍 植物种群

### 亚洲
- **桂花** (Osmanthus fragrans) - 8 个分布点
- **毛竹** (Phyllostachys edulis) - 7 个分布点
- **高山雪莲** (Saussurea involucrata) - 6 个分布点

### 欧洲
- **百合** (Lilium) - 8 个分布点

### 北美洲
- **北美红杉** (Sequoia sempervirens) - 7 个分布点

### 非洲
- **猴面包树** (Adansonia digitata) - 7 个分布点

### 大洋洲
- **桉树** (Eucalyptus) - 8 个分布点

## 🎮 使用说明

1. **浏览地球**: 地球会自动旋转，您可以拖拽手动旋转
2. **查看植物**: 在地球表面寻找绿色标记点
3. **聚焦查看**: 点击任意植物标记，相机将自动聚焦到该区域
4. **同物种导航**: 再次点击已选中的植物，将查看所有同物种植物的分布
5. **返回全局**: 点击空白地球区域返回全局视角
6. **筛选植物**: 使用底部的控制面板按大洲、植被类型、气候进行筛选

## 🎨 UI 设计

### 顶部统计
- 显示当前展示的植物数量 / 植物总数
- 半透明背景，不干扰 3D 视图

### 底部控制面板
- **大洲标签**: 快速切换不同洲际的植物
- **植被类型**: 下拉菜单选择特定植被类型
- **气候特征**: 根据气候条件筛选

### 交互反馈
- 鼠标悬停时植物高亮显示
- 选中植物时边界高亮
- 平滑的相机过渡动画

## 🔧 开发说明

### 添加新植物

1. 在 `src/data/plants.ts` 中添加新的植物数据
2. 确保 GLB 模型文件位于 `public/models/` 目录
3. 模型文件名与 `modelPath` 字段匹配

### 自定义地球纹理

在 `src/components/Earth.tsx` 中修改 `useTexture` 的 URL：

```typescript
const earthTexture = useTexture("/your-custom-texture.jpg");
```

### 调整动画参数

- 地球旋转速度：修改 `Earth.tsx` 中的 `delta * 0.08`
- 相机动画时长：在 `EarthScene.tsx` 中调整 `duration` 参数
- 过渡效果：修改 GSAP timeline 的 `ease` 属性

## 📸 视觉效果

- **地球材质**: 使用标准材质，调整粗糙度和金属度以获得真实感
- **光照配置**: 环境光 + 方向光组合，模拟太阳光照
- **背景色彩**: 深空蓝色背景配合动态星空
- **阴影效果**: 植物投射阴影增强立体感

## 🎯 未来计划

- [ ] 添加更多植物物种
- [ ] 实现植物生长动画
- [ ] 增加季节变化效果
- [ ] 添加植物详细信息弹窗
- [ ] 支持触摸屏交互
- [ ] 添加背景音乐和环境音效
- [ ] 实现植物数据导入/导出功能

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**享受探索地球的植物之美！** 🌱✨