你是一名资深 React + TypeScript 前端工程师。

请根据当前项目中的两张 UI 参考图：

- `docs/design/ui-light.png`
- `docs/design/ui-dark.png`

开发一个「哑铃训练动作图示」移动端 PWA。

项目只供我个人在 iPhone 使用。

本次任务的核心目标是：

**完成项目基础架构、公共组件、页面路由、深浅主题和静态 UI 骨架。**

请严格控制改动范围，不要自行扩展需求。

---

# 一、非常重要：控制 Token 和工作范围

为了减少不必要的 Token 消耗，请遵守：

1. 先快速查看当前项目结构和必要文件。
2. 不要反复扫描整个项目。
3. 不要阅读 `node_modules`、构建产物或无关文件。
4. 不要长篇解释代码。
5. 不要输出完整文件代码到聊天中，直接修改项目文件。
6. 完成后只简要说明：
   - 修改了什么
   - 新增了什么
   - 是否构建成功
7. 不要重复总结需求。
8. 不要主动增加本提示词没有要求的功能。
9. 优先最小实现。
10. 保持代码简单、清晰、容易维护。
11. 不为了“架构完整”创建大量无实际用途的抽象层。
12. 不使用复杂状态管理框架。
13. 不创建后端。
14. 不实现账号系统。
15. 不实现云同步。
16. 不生成大量测试代码。
17. 不生成几十条动作数据。
18. 不生成真实动作图片。
19. 遇到 UI 图片暂时缺失时使用统一占位组件。
20. 能复用组件就复用，不复制大量相似 JSX。

---

# 二、技术栈

使用：

- React
- TypeScript
- Vite
- React Router
- lucide-react
- CSS Modules 或普通 CSS
- vite-plugin-pwa

不要使用：

- Ant Design
- Material UI
- Chakra UI
- Redux
- Zustand
- Tailwind
- styled-components
- 服务端数据库
- Axios

当前项目如果已经存在合适依赖，优先复用，不要重复安装类似依赖。

---

# 三、产品定位

App 名称：

**哑铃训练**

副标题：

**图示详解**

用途：

通过卡通人物动作图 + 文字说明，学习如何使用哑铃训练不同身体部位。

第一阶段只做 UI 和基础页面结构。

不要实现训练计划、训练打卡、训练数据统计等功能。

---

# 四、UI 参考原则

以：

`ui-light.png`

作为主要视觉参考。

以：

`ui-dark.png`

作为深色模式参考。

不要求逐像素复制。

重点保持：

- 页面结构
- 卡片层级
- 留白
- 圆角
- 字体层级
- 导航结构
- 黑白极简风
- 动作图片区域比例

不要直接把 UI 参考图作为页面背景。

---

# 五、人物插图统一规范

后续正式动作插图统一使用：

- 男性卡通人物
- 年轻
- 可爱但不过度幼稚
- 中分黑色短发
- 黑色细框眼镜
- 灰色运动背心
- 黑色或深灰运动短裤
- 灰白运动鞋
- 灰色哑铃
- 人物比例统一
- 训练器械比例统一
- 浅色背景或透明背景

本阶段不要生成这些图片。

统一建立：

`ExerciseIllustration`

组件。

图片不存在时显示灰色占位区域。

禁止显示浏览器破图图标。

---

# 六、页面路由

建立以下页面：

```text
/
首页

/exercises
动作库

/exercises/:id
动作详情

/search
搜索

/favorites
收藏

/settings
设置
```

使用 React Router。

---

# 七、底部导航

全局底部导航固定为：

```text
首页
动作库
收藏
我的
```

对应：

```text
/
 /exercises
 /favorites
 /settings
```

使用 lucide-react 图标。

当前页面：

- 图标加深
- 文字加粗

其他页面：

- 灰色

注意适配：

```css
env(safe-area-inset-bottom)
```

适配 iPhone 底部安全区域。

---

# 八、首页

首页参考 UI 图中的首页。

结构：

顶部：

```text
哑铃训练
图示详解
搜索图标
```

模块一：

```text
选择训练部位
```

身体部位：

```text
胸部
背部
肩部
手臂
腿部
臀部
核心
全身
```

采用 4 × 2 简洁网格。

当前可以默认选中：

```text
胸部
```

选中状态：

- 黑色背景
- 白色文字

未选中：

- 白色背景
- 浅灰边框
- 黑色文字

模块二：

```text
推荐动作
```

暂时只放三条：

```text
哑铃卧推
上斜哑铃卧推
哑铃飞鸟
```

每个动作显示：

- 缩略图占位
- 动作名称
- 目标肌群
- 右箭头

---

# 九、动作库页面

标题：

```text
胸部训练
```

顶部包含：

- 返回按钮
- 标题
- 搜索按钮

筛选标签：

```text
全部
入门
进阶
无需器械
需要训练凳
```

第一阶段这些筛选只需要做 UI，不需要实现复杂筛选逻辑。

动作卡片暂时只创建四条：

```text
哑铃卧推
上斜哑铃卧推
哑铃飞鸟
下斜哑铃卧推
```

每张卡片包含：

```text
动作缩略图
动作名称
目标肌肉
难度
器械标签
收藏按钮
右箭头
```

点击卡片进入：

```text
/exercises/:id
```

---

# 十、动作详情页面

先完整实现一个：

```text
哑铃卧推
```

顶部：

```text
返回
哑铃卧推
收藏
```

标签：

```text
胸部
入门
需要训练凳
```

动作图片：

```text
起始姿势
结束姿势
```

两张图片并排。

手机窄屏仍保持合理比例。

下面依次：

## 目标肌肉

```text
胸大肌
肱三头肌
三角肌前束
```

## 动作步骤

```text
1
仰卧在平板凳上，双脚踩稳地面，保持身体稳定。

2
双手各持一只哑铃，掌心向前，哑铃位于胸部两侧。

3
吸气，缓慢将哑铃下降至胸部两侧，肘部与身体保持约45度。

4
呼气，胸部发力将哑铃向上推起，直到手臂接近伸直。

5
顶峰收缩后缓慢控制哑铃下降。
```

## 动作要点

```text
肩胛骨向后收紧
背部保持稳定
手腕保持中立
下放过程缓慢可控
避免耸肩
```

## 常见错误

```text
手肘过度外展
下放速度过快
借力弹起
手腕向后折
臀部离开训练凳
```

## 推荐

```text
3–4组
8–12次
休息60–90秒
```

页面允许纵向滚动。

---

# 十一、搜索页面

第一阶段只做 UI。

顶部搜索框 placeholder：

```text
搜索动作、部位、肌肉群...
```

展示：

```text
最近搜索
热门搜索
搜索结果
```

可以使用静态数据。

不需要实现复杂搜索算法。

简单字符串匹配即可。

---

# 十二、收藏页面

标题：

```text
我的收藏
```

筛选：

```text
全部
胸部
背部
肩部
手臂
腿部
```

第一阶段使用静态假数据即可。

收藏逻辑可以简单使用：

```text
localStorage
```

不要设计数据库。

---

# 十三、设置页面

标题：

```text
设置
```

包含：

```text
显示设置
字体大小
深色模式
清除缓存
数据备份与导出
关于应用
使用条款
隐私政策
```

本阶段真正需要实现的只有：

**深色模式切换。**

其他项目只做 UI。

---

# 十四、主题系统

建立简单 CSS Variables。

例如：

```css
:root {
  --bg: #f7f7f7;
  --surface: #ffffff;
  --surface-secondary: #f3f3f3;
  --text-primary: #111111;
  --text-secondary: #777777;
  --border: #e8e8e8;
}
```

深色：

```css
[data-theme='dark'] {
  --bg: #0d0d0d;
  --surface: #181818;
  --surface-secondary: #222222;
  --text-primary: #f5f5f5;
  --text-secondary: #999999;
  --border: #303030;
}
```

页面组件禁止大量写：

```text
dark ? xxx : xxx
```

统一通过 CSS Variables 控制主题。

主题选择保存到：

```text
localStorage
```

首次进入默认跟随系统主题。

---

# 十五、基础 Design Tokens

统一使用：

```text
页面左右边距：16px

间距：
4
8
12
16
24
32

卡片圆角：
16px

小标签圆角：
8px

按钮最小点击高度：
44px

页面最大宽度：
430px
```

桌面打开时：

- 手机页面居中
- 不无限拉伸

移动端：

```text
width: 100%
max-width: 430px
```

---

# 十六、建议目录结构

保持简单：

```text
src/
├── components/
│   ├── AppHeader/
│   ├── BottomNavigation/
│   ├── ExerciseCard/
│   ├── ExerciseIllustration/
│   ├── BodyPartGrid/
│   └── Tag/
│
├── pages/
│   ├── Home/
│   ├── ExerciseLibrary/
│   ├── ExerciseDetail/
│   ├── Search/
│   ├── Favorites/
│   └── Settings/
│
├── data/
│   └── exercises.ts
│
├── types/
│   └── exercise.ts
│
├── hooks/
│   ├── useTheme.ts
│   └── useFavorites.ts
│
├── styles/
│   ├── variables.css
│   ├── reset.css
│   └── global.css
│
├── App.tsx
└── main.tsx
```

不要再增加：

```text
repositories
services
domain
useCases
store
providers
```

除非当前实现确实必要。

---

# 十七、动作数据结构

建立简单类型：

```ts
export interface Exercise {
  id: string
  name: string
  bodyPart: string
  targetMuscles: string[]
  difficulty: 'beginner' | 'intermediate'
  equipment: string[]
  thumbnail: string
  startImage: string
  endImage: string
  steps: string[]
  tips: string[]
  mistakes: string[]
  sets: string
  reps: string
  rest: string
}
```

本阶段只录入：

```text
哑铃卧推
上斜哑铃卧推
哑铃飞鸟
下斜哑铃卧推
```

不要批量创建其他动作。

---

# 十八、图片目录

预留：

```text
public/
└── images/
    └── exercises/
        └── chest/
            ├── dumbbell-bench-press/
            │   ├── thumbnail.webp
            │   ├── start.webp
            │   └── end.webp
            │
            ├── incline-dumbbell-press/
            ├── dumbbell-fly/
            └── decline-dumbbell-press/
```

当前图片不存在时使用占位组件。

---

# 十九、PWA

配置：

```text
vite-plugin-pwa
```

manifest：

```text
name: 哑铃训练
short_name: 哑铃训练
display: standalone
```

设置：

```text
theme_color
background_color
```

支持添加到 iPhone 主屏幕。

第一阶段只实现基础 PWA。

不要实现：

- push
- background sync
- service worker复杂缓存策略

---

# 二十、代码质量

要求：

- TypeScript 类型完整
- 不使用 any，除非确实无法避免
- 一个组件不要写得过大
- 相同 UI 抽成组件
- 不过度封装
- 不提前设计复杂扩展能力
- 文件名称清晰
- 保持最小依赖

---

# 二十一、执行顺序

请严格按照：

1. 查看当前项目必要文件
2. 安装缺失依赖
3. 建立类型
4. 建立静态数据
5. 建立主题系统
6. 建立公共组件
7. 建立页面
8. 建立路由
9. 配置PWA
10. 检查移动端布局
11. 执行 TypeScript 检查
12. 执行 build
13. 修复错误

不要中途停下来向我汇报。

如果没有阻塞问题，直接完成。

---

# 二十二、验收标准

最终确保：

```text
npm run build
```

成功。

首页可以正常进入。

底部导航可以切换页面。

点击动作可以进入详情。

可以返回。

收藏按钮可以切换。

深浅模式可以切换。

刷新后主题和收藏状态保留。

iPhone 尺寸显示正常。

底部导航不会挡住内容。

页面视觉整体接近参考 UI。

---

完成后不要贴大量代码。

只回复：

1. 完成了哪些内容
2. 主要新增/修改文件
3. build 是否成功
4. 如何本地运行
5. 下一步最值得做什么

总回复尽量控制在 300 字以内。
