# Dumbbell Training

一个专注于哑铃训练的移动端 PWA，提供动作库、训练部位筛选、动作详情、收藏、深色模式和中英文切换。

## 当前动作

- 哑铃飞鸟
- 单臂哑铃划船
- 哑铃罗马尼亚硬拉

动作数据集中维护在 `src/data/exercises/dumbbell.ts`，应用通过 `src/data/exerciseCatalog.ts` 统一引用。

## 功能

- 按胸部、背部、肩部、手臂、腿部、臀部、核心和全身筛选动作
- 按全部、入门和进阶筛选动作库
- 查看动作步骤、目标肌群、常见错误和训练建议
- 收藏常用动作
- 支持浅色与深色主题
- 支持中文与英文切换
- 支持 PWA，可添加到 iPhone 主屏幕独立运行
- 针对手机屏幕优化的响应式界面

## 技术栈

- React 18
- TypeScript
- Vite 5
- React Router
- Lucide React
- Vite PWA

## 本地开发

建议使用 Node.js 18 或更高版本。

```bash
npm install
npm run dev
```

默认访问地址：`http://localhost:5173`

## 手机局域网访问

确保手机和电脑连接同一个 Wi-Fi，然后启动局域网开发服务器：

```bash
npm run dev -- --host 0.0.0.0
```

终端会显示 `Network` 地址，例如：

```text
http://192.168.1.10:5173/
```

使用手机浏览器打开该地址即可预览。

## 构建与预览

```bash
npm run build
npm run preview
```

生产文件会输出到 `dist/` 目录。

## 代码格式化

```bash
npm run format
```

## 维护动作数据

新增哑铃动作时，在 `src/data/exercises/dumbbell.ts` 中追加一个符合 `Exercise` 类型的对象。动作类型定义位于 `src/types/exercise.ts`。

如果以后新增其他器械，可以在 `src/data/exercises/` 下创建独立文件，并在 `src/data/exerciseCatalog.ts` 中合并导出。

动作图片放在 `public/images/exercises/` 对应动作目录中，训练部位图标放在 `public/images/body-parts/`。

## 发布到 HTTPS

项目可以部署到 Vercel、Netlify、Cloudflare Pages 等静态网站托管服务。构建命令使用 `npm run build`，输出目录设置为 `dist`。

项目根目录已经包含 `vercel.json`，其中配置了 Vite 构建、`dist` 输出目录、React Router 路由回退，以及 PWA 更新文件的缓存策略。

在 Vercel 中导入项目时使用以下设置：

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

Vercel 会自动读取 `vercel.json`，无需手动添加重写规则。

发布完成后，在 iPhone Safari 中打开 HTTPS 地址，选择“分享” → “添加到主屏幕”，即可像 App 一样从桌面启动。

## 项目结构

```text
src/
├── components/          通用界面组件
├── data/                动作数据库与统一数据入口
├── hooks/               语言、主题和收藏状态
├── pages/               首页、动作库、收藏、设置和动作详情
├── styles/              全局样式与主题变量
└── types/               TypeScript 类型定义

public/
├── images/body-parts/   训练部位图标
└── images/exercises/    动作图片
```
