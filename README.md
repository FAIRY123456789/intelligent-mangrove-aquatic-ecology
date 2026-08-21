# 智能红树林与水生态研究团队公开网站

这是“智能红树林与水生态研究团队”的公开科研网站。网站面向学术同行、学生、潜在合作方、科研机构和公共部门，集中展示团队定位、研究方向、科研项目、论文成果、科研平台、学术交流、招生合作与联系方式。网站使用真实团队/负责人照片、纯白高密度主体、原创红树林品牌标识、五语言路由、负责人学术主页、可交互地图和稳定贴底页脚。

当前版本是可静态部署的公开展示站，不是北京大学官方网站，也不承担内部管理、数据存储、项目审批或个人信息收集功能。

## 1. 当前版本概览

- 技术运行环境：Node.js `20.19.x` + npm `10+`
- 前端框架：Nuxt `3.17.7`、Vue `3.5.28`、TypeScript
- 构建方式：Nuxt 静态生成，无后端、数据库和运行时密钥依赖
- 语言版本：简体中文、English、Bahasa Indonesia、العربية、Português
- 默认语言：简体中文，不根据浏览器语言自动跳转
- 公开栏目：明确“首页”入口、5 个桌面一级栏目、2 组下拉子菜单、1 个负责人详情页、五套完整路由
- 数据原则：事实可追溯、待确认内容显式标记、不过度推断组织关系
- 视觉原则：学术、稳定、高密度、国际化；深绿色只用于导航和联系页脚，主体统一纯白；原创标识不使用学校 Logo，人物照片只使用用户明确提供的本地文件

## 2. 产品定位与内容边界

### 2.1 网站目标

网站围绕三个核心任务组织信息：

1. 清楚说明团队研究对象、方法链条与学术方向。
2. 让科研项目、论文、平台和交流活动具有可查找、可追溯的公开入口。
3. 为招生、合作和每周研究分享提供低维护成本的发布基础。

### 2.2 公开内容原则

- 中文是事实主版本；英文、印度尼西亚语、阿拉伯语与葡萄牙语提供对应的系统导航和主要页面内容。
- 项目、论文、平台、活动和分享条目通过 `sourceIds` 关联来源台账。
- `reviewStatus: "public-source-verified"` 表示已按公开来源整理。
- `reviewStatus: "team-review-required"` 表示正式发布前仍需团队确认。
- 论文页仅展示有可核验 DOI 的代表性条目，不声明为完整成果库。
- 不根据论文作者名单推断当前团队成员。
- 不将本网站或建设中的科研平台描述为北京大学官方平台。
- 不复制公众号或新闻全文，仅保存导读和原始链接。
- 不使用北京大学校徽、PKU 标志或官方字体图形。用户提供的团队照片与负责人照片已登记在图片权利清单，正式上线前仍需完成入镜人员授权确认。

正式上线前的事实确认项见 [docs/CONTENT_REVIEW.md](docs/CONTENT_REVIEW.md)，来源记录见 [docs/SOURCE_LEDGER.md](docs/SOURCE_LEDGER.md)。

## 3. 信息架构

中文路由不带语言前缀；英文、印度尼西亚语、阿拉伯语和葡萄牙语分别使用 `/en/`、`/id/`、`/ar/`、`/pt/`。同一栏目在五种语言中保持相同的信息层级。

| 栏目 | 中文路由 | 内容职责 |
| --- | --- | --- |
| 首页 | `/` | 团队定位、真实合照、最新新闻、研究方向、代表项目、论文与成果、平台与合作入口 |
| 关于团队 | `/about` | 团队简介、研究基础、当前成员、毕业去向和学术联系 |
| 研究方向 | `/research` | 四个核心研究板块及其方法链条 |
| 团队成员兼容地址 | `/people` | 永久重定向至 `/about#members`，不产生死链 |
| 团队负责人 | `/people/liruili` | 李瑞利研究员完整三语言学术主页、12 项代表项目、3 项奖励及联系方式 |
| 科研项目 | `/projects` | 项目类别、年份、状态、方向和来源记录 |
| 论文与成果 | `/publications` | 代表性论文检索、筛选、专利、数据与技术成果、奖励、研究分享 |
| 科研平台 | `/platforms` | 数据集、技术平台和建设中平台 |
| 新闻与交流 | `/news` | 公开活动和国际学术交流 |
| 加入我们 | `/join` | 研究方向、合作方式和申请材料建议 |
| 联系方式 | `/contact` | 邮箱、电话、办公室地址、OpenStreetMap 嵌入和三类外部地图入口 |

非中文路由在上述路径前增加语言前缀，例如 `/en/research`、`/id/research`、`/ar/research`、`/pt/research`。

旧地址 `/sharing` 及四个语言前缀版本保留为永久重定向，分别转到对应语言的 `/publications#research-sharing`。旧地址不再出现在导航与 sitemap 中。

旧成员地址 `/people` 及四个语言前缀版本分别永久重定向到对应语言的团队介绍页 `#members` 锚点。

### 3.1 桌面导航层级

- 首页
- 关于团队：团队负责人、团队介绍、研究方向
- 科研成果：科研项目、论文与成果、科研平台
- 新闻与交流
- 加入我们
- 联系方式
- 语言选择器

下拉菜单支持鼠标悬停、键盘聚焦、Enter、Space、方向下键和 Escape；移动端抽屉直接展开全部子栏目。

### 3.2 首页叙事顺序

首页按照“团队是谁—最近发生什么—研究什么—承担什么项目—形成哪些成果”的科研门户逻辑组织：

1. 紧凑首屏：团队名称、一句研究介绍、团队负责人和四个研究方向总览。
2. 真实团队照片与最新动态：使用本地 `team-photo.jpg`，不使用网络图、AI 图、复杂遮罩或商业宣传标题。
3. 首页不展示 `20+` 科研项目、`100+` 论文成果、`20+` 授权专利等未经统一确认的团队统计。
4. 研究方向：四项编号紧凑列表。
5. 科研项目：年份、类别、项目名称、负责人和状态的表格化列表。
6. 论文与成果：代表论文的年份、期刊和 DOI。
7. 科研平台、新闻与交流、加入我们三个紧凑入口。
8. 深色联系页脚。

首页不包含待办、日程、倒计时或内部管理信息。

## 4. 研究与内容结构

### 4.1 核心研究方向

当前内容归纳为四个板块：

1. AI 数字红树林
2. 全球变化与城市红树林
3. 精准监测与生态修复
4. 智能水生态

整体研究逻辑从生态过程识别延伸到遥感与现场观测、环境评估、风险判断和修复成效评价。

### 4.2 当前结构化内容

结构化公开数据集中在 `data/site.ts`：

- 三种语言的站点名称、标语、导航、界面文案和页面导语
- 6 项科研项目
- 5 篇带 DOI 的代表性论文
- 5 项科研平台，其中 2 项标记为待团队审核
- 3 条公开活动与国际交流记录
- 3 条研究分享示例

数据结构的关键字段包括：

```ts
{
  title: string
  sourceIds: string[]
  reviewStatus?: 'public-source-verified' | 'team-review-required'
}
```

项目还包含类别、年份、负责人、状态和研究方向；论文包含期刊、年份、DOI、关键词和方向；平台包含说明、状态和审核状态。

`content/{zh,en,id}/sharing/` 中保存研究分享 Markdown 模板。研究分享已并入“论文与成果”页尾部；当前展示数据仍由 `data/site.ts` 驱动。新增 Markdown 后，应完成三语审校，再把公开条目同步到结构化数据，并确保 `url` 是最终原文详情页而不是搜索页、聚合页或中间跳转页。

## 5. 设计架构

### 5.0 参考研究与适配结论

V4/V5 重构以北京大学环境与能源信息工程实验室公开官网为重点参考，并延续对国际高校实验室网站的结构研究。项目只吸收通用方法，不复制其品牌、旧式页面或内容：

- 用稳定机构导航和高密度日期列表，帮助同行快速定位新闻、项目与成果。
- 将新闻提前到首页数据栏之后，建立高校科研门户常见的“团队动态优先”阅读顺序。
- 用克制标题、清晰分组导航和较高信息密度降低产品展示页观感。
- 将论文、项目和新闻作为可扫描、可检索、可核验的学术记录展示，而不是宣传卡片。
- 保留本项目红树林、水生态、多语言和公开来源治理特点，不沿用 HNBLUE 的视觉结构。

### 5.1 V6 机构形象与设计 tokens

设计系统采用“primitive → semantic → component”三层 token，集中维护在 `assets/css/main.css`。原始颜色先映射为机构导航、页面背景、文字、边框等语义角色，再由页头、按钮、卡片、列表和页脚消费，避免组件直接散落硬编码色值。

| Token / 角色 | 色值 | 用途 |
| --- | --- | --- |
| Institutional green | `#075A52` | 顶部导航、主按钮、链接和结构线 |
| Footer green | `#043E39` | 联系方式与网站声明页脚 |
| Main background | `#FFFFFF` | 全站主体和普通内容区 |
| Highlight surface | `rgba(140, 36, 60, 0.025–0.055)` | 负责人信息、建设中平台和 hover |
| Academic red | `#8C243C` | 日期、编号、活动态和细分隔线 |
| Ink | `#111111 / #222222` | 标题与正文 |
| Muted ink | `#444444` | 说明和辅助信息的最低对比度 |
| Border | `#D8D8D8` | 卡片、表格、筛选器和分隔线 |
| Surface | `#FFFFFF` | 信息卡片与列表行 |

设计控制原则：

- 字体栈为 `"Times New Roman", SimSun, "Songti SC", STSong, serif`；英文和数字优先 Times New Roman，中文回退宋体，不加载外部字体。
- 正文为 `15px`、`font-weight: 400`；首页主标题 `34px`，内页主标题 `30px`，首页统一栏目标题 `24px`（移动端 `22px`），记录标题 `16px`。
- 首页统计、研究方向、项目、论文、新闻、研究分享、关于正文、加入我们和联系方式使用细线、定义列表和连续记录，不再包裹白底卡片。
- 团队成员、负责人侧栏和需要区分状态的科研平台保留卡片；统一 `1px solid #D8D8D8`、`3–4px` 小圆角、`14px` padding、无阴影。
- 红色只用于导航活动态、日期、编号和微型结构线，不使用大面积红色按钮。
- 深绿色只用于顶部机构导航和底部联系区域，不在正文中铺设大面积深色背景。
- 新建 `SectionHeading.vue`，保证中文“左中文、右英文”、英文“左英文、右中文”、印度尼西亚语“左印尼语、右英文”的栏目标题顺序。
- 首页不使用插画，直接展示用户提供的真实团队合照；个人页使用用户提供的红树林野外照片。
- `html/body/#__nuxt` 与 `.app-shell` 采用弹性页面壳，短页面页脚自然贴底，不使用固定定位。

### 5.2 布局与响应式

- 内容主容器最大宽度为 `1200px`。
- 桌面端提供明确“首页”的紧凑导航与两组下拉菜单，`1180px` 以下切换为移动菜单。
- 主要断点为 `1180px`、`820px` 和 `560px`。
- 首页首屏约 `207px`；团队照片桌面高度 `320px`、移动端 `260px`；内页标题区上下 padding 为 `24–32px`，常规 section 不超过 `32px`。
- 首页在增加真实团队照片和 7 组统一栏目标题后，仍保持低于 `1950px` 的 V5 自动化高度门槛。
- 首页研究方向使用两列到单列的紧凑索引结构。
- 论文、平台、活动、联系方式和负责人详情页均有独立移动布局。
- 移动菜单按钮和关键控件提供至少 `44px` 的操作区域。
- 页面最小宽度为 `320px`，避免横向溢出。

### 5.3 交互与无障碍

- 提供“跳至主要内容”链接、语义化区域、导航 `aria` 属性和图片替代文本。
- 语言切换保持当前栏目路径。
- 论文支持标题/期刊/关键词搜索、年份筛选、方向筛选、清除筛选和 BibTeX 复制。
- 外部链接使用 `target="_blank"` 与 `rel="noopener noreferrer"`。
- 支持键盘焦点和 `prefers-reduced-motion`；减少动态偏好开启时关闭平滑滚动与过渡。
- 当前交互动效集中在 `120–180ms` 的按钮、下拉菜单和移动菜单反馈。

## 6. 技术架构

### 6.1 技术栈

| 层级 | 实现 |
| --- | --- |
| 应用框架 | Nuxt `3.17.7` |
| UI 运行时 | Vue `3.5.28`、Vue Router `4.5.1` |
| 开发语言 | TypeScript 严格模式 |
| 国际化 | `@nuxtjs/i18n 9.5.5` |
| SEO | `@nuxtjs/sitemap 7.4.1`、页面 Meta、canonical、hreflang、Open Graph、Twitter Card、JSON-LD |
| 静态服务 | Nitro `2.11.13`，`preset: "static"` |
| 代码质量 | ESLint、vue-tsc、Vitest |
| 浏览器测试 | Playwright |
| 包管理 | npm + `package-lock.json` |

项目明确使用 Node.js 20，不需要 Node.js 22，也不依赖 pnpm。

### 6.2 分层关系

```text
pages/                路由入口、语言前缀与旧分享地址重定向
    ↓
components/           布局、首页、内页、负责人页和 SEO 组件
    ↓
data/site.ts          三语页面文案与结构化公开数据
content/              并入成果页的研究分享 Markdown 模板
    ↓
docs/                 来源、审核、图片权利和部署规范
```

页面层只决定路由和使用哪个页面组件；组件层负责展示和交互；事实数据、翻译和来源编号集中维护，避免把科研数据散落在路由文件中。

### 6.3 路由与静态生成

`nuxt.config.ts` 中维护所有需要预渲染的栏目，Nitro 会抓取内部链接并为中文、英文和印度尼西亚语生成静态页面。构建产物位于：

```text
.output/public/
```

站点支持根路径和子路径部署：

- `NUXT_PUBLIC_SITE_URL`：正式站点完整地址，用于 canonical、hreflang 和 sitemap。
- `NUXT_APP_BASE_URL`：应用部署路径，根路径为 `/`，子路径必须以 `/` 开始和结束。

### 6.4 SEO

每个公开页面当前包含：

- 页面标题和描述
- canonical
- `zh-CN`、`en`、`id` 三语 hreflang
- Open Graph 基础信息
- Twitter Card
- `index,follow`
- `ResearchOrganization` JSON-LD
- sitemap
- 本地 favicon 与 social preview SVG
- 自定义 404 页面

结构化数据不会把网站声明为北京大学官方站点。

## 7. 项目目录

```text
.
├─ assets/css/main.css          # 全局设计令牌、组件样式和响应式规则
├─ components/
│  ├─ HomePage.vue             # 首页编排
│  ├─ InnerPage.vue            # 公共内页与论文成果六段式内容
│  ├─ PersonPage.vue           # 李瑞利研究员详情页
│  ├─ SectionHeading.vue       # 首页三语言统一栏目标题
│  ├─ SiteHeader.vue           # 品牌、主导航、语言切换、移动菜单
│  ├─ SiteFooter.vue           # 联系方式和网站声明
│  └─ SeoMeta.vue              # Meta、hreflang 与 JSON-LD
├─ content/{zh,en,id}/sharing/ # 三语研究分享 Markdown 模板
├─ data/site.ts                # 页面内容与结构化公开数据
├─ docs/
│  ├─ CONTENT_REVIEW.md        # 上线前内容审核清单
│  ├─ DEPLOYMENT.md            # 静态与 Nginx 部署说明
│  ├─ IMAGE_RIGHTS.md          # 图片与视觉素材权利状态
│  └─ SOURCE_LEDGER.md         # 公开资料来源台账
├─ i18n/locales/               # Nuxt i18n 界面语言文件
├─ locales/                    # 翻译完整性检查使用的语言文件
├─ pages/                      # 三语路由及旧 /sharing 永久重定向
├─ public/
│  ├─ brand/                  # 三套原创 Logo、正式站点标识与预览页
│  ├─ images/team/            # 用户提供的团队合照
│  ├─ images/people/          # 用户提供的李瑞利研究员照片
│  ├─ favicon.svg / .ico      # 正式站点图标
│  └─ apple-touch-icon.png    # 移动设备站点图标
├─ scripts/
│  ├─ check-translations.ts    # 三语键值完整性检查
│  ├─ generate-brand-icons.py  # 从正式品牌方案生成 PNG 与 ICO
│  ├─ new-share.ts             # 研究分享模板生成器
│  └─ serve-static.mjs         # 本地预览静态产物
├─ tests/
│  ├─ unit/site.spec.ts        # 内容结构和 DOI 可追溯性测试
│  └─ e2e/screenshots.spec.ts  # 多语言、移动端和重点页面截图
├─ nuxt.config.ts              # Nuxt、i18n、SEO、静态生成配置
├─ package.json                # npm 脚本与 Node 20 依赖
├─ package-lock.json           # npm 锁定文件
└─ PROJECT_SUPERVISOR.md       # 技术决策、测试与修改记录
```

## 8. 本地安装与运行

### 8.1 环境要求

```text
Node.js >= 20.19.0 且 < 21
npm >= 10
```

当前项目已经针对 Node.js `20.19.5` 验证。不要使用其他包管理器覆盖 `package-lock.json`。

### 8.2 Windows PowerShell

打开 PowerShell 或 VS Code 终端，进入项目目录：

```powershell
Set-Location "D:\Desktop\智能红树林与水生态研究团队"
npm install
npm run dev
```

终端出现以下地址后，在浏览器打开：

```text
http://localhost:3000/
```

首次安装之后，日常启动只需要：

```powershell
npm run dev
```

停止开发服务器时，在运行该命令的终端按 `Ctrl + C`。

如果 3000 端口已被旧进程占用，应先停止旧终端中的开发服务器，再重新执行 `npm run dev`，不要同时保留两个开发服务。

## 9. npm 命令

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 启动本地开发服务器 |
| `npm run build` | 检查翻译并构建 Nuxt 应用 |
| `npm run generate` | 检查翻译并生成静态站点 |
| `npm run preview` | 在 `127.0.0.1:4173` 预览 `.output/public` |
| `npm run lint` | 执行 ESLint |
| `npm run typecheck` | 检查翻译并执行 Nuxt TypeScript 检查 |
| `npm test` | 运行 Vitest 单元测试 |
| `npm run test:e2e` | 运行 Playwright 浏览器测试 |
| `npm run screenshots` | 生成三语首页、移动端和重点页面截图 |
| `npm run check:i18n` | 检查三种语言的导航、页面和 UI 键值完整性 |
| `npm run new:share` | 交互式创建研究分享 Markdown 模板 |

建议在提交或部署前执行：

```powershell
npm run lint
npm run typecheck
npm test
npm run generate
```

## 10. 内容维护

### 10.1 修改页面与数据

大部分公开内容在 `data/site.ts` 中维护：

1. 先修改中文事实版本。
2. 补齐英文和印度尼西亚语对应内容。
3. 为新增项目、论文、平台、活动或分享添加 `sourceIds`。
4. 在 `docs/SOURCE_LEDGER.md` 登记来源编号、页面标题、URL 和使用范围。
5. 无法确认的内容使用 `reviewStatus: "team-review-required"`，并加入 `docs/CONTENT_REVIEW.md`。
6. 执行 `npm run check:i18n`、`npm run typecheck` 和 `npm test`。

不要在 Vue 组件中直接堆叠新的科研事实；组件负责展示，事实与来源应进入数据层。

### 10.2 多语言维护

多语言内容分为两部分：

- `data/site.ts`：站点名称、导航、按钮、页面标题、导语和主要公开内容。
- `i18n/locales/*.json` 与 `locales/*.json`：Nuxt i18n 与翻译完整性检查使用的界面键。

修改任意语言后运行：

```powershell
npm run check:i18n
```

检查脚本会确保：

- 三种语言拥有相同数量、顺序和分组关系的导航栏目。
- 每个公共页面都有标题和导语。
- 三种语言具有相同的 UI 文案键。

语言切换器会保留当前栏目路径，例如 `/research` 可切换到 `/en/research` 和 `/id/research`；研究分享定位到对应语言的论文成果页锚点。

### 10.3 新增周度研究分享

运行：

```powershell
npm run new:share
```

按提示输入：

1. 语言：`zh`、`en` 或 `id`
2. 标题
3. 原始链接

脚本会在相应的 `content/{locale}/sharing/` 下生成 Markdown：

```yaml
---
title: ""
source: ""
published: ""
recommended: "YYYY-MM-DD"
category: ""
tags: []
summary: ""
externalUrl: ""
language: "zh"
sourceIds: []
---
```

完成生成后：

1. 补充来源、原始发布日期、分类、标签、80–150 字导读和 `sourceIds`。
2. 分别完成中文、英文和印度尼西亚语版本。
3. 不复制原文全文，`externalUrl` 必须填写最终原文详情页，不使用搜索页、聚合页或中间跳转页。
4. 当前版本还需把审核后的展示条目同步到 `data/site.ts` 的 `shares` 数组和三语翻译；成果页会在“科研奖励”之后显示研究分享。

## 11. 构建与部署

### 11.1 根路径静态部署

PowerShell：

```powershell
$env:NUXT_PUBLIC_SITE_URL = "https://example.edu.cn"
$env:NUXT_APP_BASE_URL = "/"
npm run generate
```

将 `.output/public/` 发布到静态服务器。

### 11.2 子路径部署

例如部署到 `https://example.edu.cn/mangrove/`：

```powershell
$env:NUXT_PUBLIC_SITE_URL = "https://example.edu.cn/mangrove"
$env:NUXT_APP_BASE_URL = "/mangrove/"
npm run generate
```

服务器路径、公开 URL 和 `NUXT_APP_BASE_URL` 必须一致。

### 11.3 本地预览静态产物

```powershell
npm run generate
npm run preview
```

打开：

```text
http://127.0.0.1:4173/
```

### 11.4 Nginx 示例

根路径部署：

```nginx
server {
    listen 80;
    server_name example.edu.cn;

    location / {
        root /var/www/intelligent-mangrove/.output/public;
        try_files $uri $uri/ $uri.html /404.html;
    }
}
```

子路径部署时，把 `location /` 改为目标子路径，并保持与构建时的 `NUXT_APP_BASE_URL` 一致。更完整说明见 [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)。

## 12. 测试与质量门槛

当前自动检查覆盖：

- 三语导航结构一致
- “关于团队”“科研成果”两组导航层级与项目负责人字段完整
- “关于团队”下拉严格为团队负责人、团队介绍、研究方向
- 每个公共页面都有标题和导语
- 论文 DOI 可追溯
- 三语首页截图
- 375px 中文移动端首页截图
- 桌面导航下拉菜单截图
- 首页真实团队照片、关于团队、三语负责人、研究方向、科研项目、论文成果、研究分享锚点、科研平台、真实地图和 Logo 预览截图
- 中文首页桌面高度小于 `1950px`、桌面与移动端无横向溢出
- 首页统计区不存在，7 个栏目标题组件字号一致且中文主标题位于左侧
- 三语负责人页面均包含 11 个章节、12 个代表项目、3 项奖励和同一张真实照片
- `/people` 三语兼容地址重定向到团队介绍成员锚点
- OpenStreetMap iframe 具有有效 `src`、标题与地址坐标，三类外部地图入口可打开
- 短页面 footer 底边与视口底边误差不超过 `2px`
- 首页主标题不超过 `36px`、内页主标题不超过 `32px`
- 常规 section 单侧 padding 不超过 `48px`
- 三语语言选择器状态与当前路由一致
- “关于团队”“科研成果”两组桌面下拉菜单可正常打开
- 移动菜单可访问全部分组子页面
- 三语旧 `/sharing` 地址重定向检查
- 浏览器页面异常检查
- TypeScript 严格检查
- ESLint
- 静态生成

Playwright 配置会优先复用本机已经安装的 Chromium；如果本机没有可用浏览器，按 Playwright 提示执行浏览器安装后再运行截图命令。

人工发布检查还应包含：

- 三种语言没有明显正文混排
- 所有导航、邮件、电话、DOI 与外部来源链接有效
- 论文搜索、筛选、清除和 BibTeX 复制正常
- 移动菜单和语言切换正常
- 404 页面正常
- 浏览器控制台无错误
- 375px、768px、1440px 下无横向溢出或明显排版问题
- 项目中没有未经授权 Logo、照片或字体资源
- `docs/CONTENT_REVIEW.md` 中的上线阻塞项已经获得确认

## 13. 相关文档

- [PROJECT_SUPERVISOR.md](PROJECT_SUPERVISOR.md)：项目初始化、技术决策、页面完成情况、测试和修改记录
- [docs/SOURCE_LEDGER.md](docs/SOURCE_LEDGER.md)：来源编号与公开资料台账
- [docs/CONTENT_REVIEW.md](docs/CONTENT_REVIEW.md)：正式上线前的事实与授权确认清单
- [docs/IMAGE_RIGHTS.md](docs/IMAGE_RIGHTS.md)：图片、原创视觉和授权状态
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)：静态生成、子路径和 Nginx 部署
- [docs/DEPLOYMENT_ALIYUN.md](docs/DEPLOYMENT_ALIYUN.md)：当前阿里云 ECS 的实际目录、Nginx 配置、更新与回滚流程

### 当前线上地址

- 中文首页：<http://120.26.238.159/mangrove-ecology/>
- English：<http://120.26.238.159/mangrove-ecology/en>
- Bahasa Indonesia：<http://120.26.238.159/mangrove-ecology/id>

线上站点使用静态发布，不依赖服务器 Node.js 进程。当前版本位于 `/opt/mangrove-ecology/releases/20260813T003343Z`，通过 `current` 软链接切换；正式域名和 HTTPS 尚未配置。

## 14. 后续维护优先级

1. 完成团队正式名称、成员名单、项目年份和奖励年份的团队审核；首页在口径统一前不恢复团队级统计数字。
2. 确认“海南蓝碳数字化应用平台”和“根系脉动”是否可以公开。
3. 正式上线前完成团队合照全部入镜人员和负责人照片的公开展示授权确认。
4. 将研究分享 Markdown 目录接入论文成果页的内容读取层，取消人工同步 `shares` 数组。
5. 按来源逐步扩充项目、论文、奖励、数据集和社会应用条目。
6. 在正式域名确定后更新 `NUXT_PUBLIC_SITE_URL`，重新生成 sitemap 和 canonical。

---

本 README 记录的是当前代码已经实现的设计、内容和技术架构。涉及团队事实、组织关系、统计数字和素材授权的最终口径，以来源台账和团队书面审核结果为准。
