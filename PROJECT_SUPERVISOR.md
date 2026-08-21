# 项目监督记录

## 五语系统支持与云端同步 — 2026-08-21

- 在保留中文默认语言、现有导航与内容结构的前提下，新增阿拉伯语（`/ar/`）与葡萄牙语（`/pt/`），语言选择器现支持中文、English、Bahasa Indonesia、العربية、Português。
- 阿拉伯语页面设置 `lang="ar"` 与 `dir="rtl"`，葡语页面设置 `lang="pt"`；五种语言均提供同构首页、栏目页、负责人页、旧分享地址跳转和 SEO `hreflang`。
- 主导航、首页核心文案、栏目标题、页脚、联系信息与交互标签已本地化；学术记录中的英文题名和国际机构名称按原文或英文基准保留，避免篡改可追溯事实。
- 质量检查：`npm run lint`、`npm run typecheck`、`npm test`、`npm run generate` 均通过；Vitest 为 `8/8`，翻译完整性覆盖 `zh/en/id/ar/pt`。
- Playwright 五语回归通过，新增截图 `test-results/v9-ar-home.png`、`test-results/v9-pt-home.png`；确认阿拉伯语 `lang="ar" dir="rtl"`、葡语 `lang="pt" dir="ltr"`、无横向溢出且浏览器控制台无 error。
- 阿里云发布版本：`/opt/mangrove-ecology/releases/20260821T161821Z`，发布包 SHA256 `4548bbc6df1d2e173d8cd751ac43b3f3c4c56cb351aa1d2428cf0b00140e6ce9`，共 `193` 个静态文件。
- 公网子路径 `/mangrove-ecology/` 及 `/en/`、`/id/`、`/ar/`、`/pt/` 五个首页均返回 HTTP `200`；根站与其他既有子站回归为 `200`，受保护文件哈希保持不变。

## 阿里云静态站部署 — 2026-08-13

### 1. 部署目标与上线地址

- 将 Nuxt 3 静态产物部署到既有阿里云 ECS `120.26.238.159` 的独立子路径：`http://120.26.238.159/mangrove-ecology/`。
- 构建使用 `NUXT_APP_BASE_URL=/mangrove-ecology/` 和 `NUXT_PUBLIC_SITE_URL=http://120.26.238.159/mangrove-ecology`；canonical、hreflang、sitemap、静态资源和内部链接均保留该前缀且不重复。
- 发布版本为 `20260813T003343Z`，发布包 SHA256 为 `a96a572f571294a0bc45241f72fafeb2785c829847b7755f668bfc5e3d49df6a`。

### 2. 服务器盘点与隔离决策

- ECS 为 Alibaba Cloud Linux 3，Nginx `1.24.0`；部署前根分区可用约 `14G`，Nginx 状态为 active。
- 部署前 `/opt/mangrove-ecology`、`/var/www/mangrove-ecology` 和 Nginx 中的 `/mangrove-ecology/` location 均不存在，因此按首次部署处理。
- 沿用服务器现有 release/link 规范：版本目录 `/opt/mangrove-ecology/releases/20260813T003343Z`，`/opt/mangrove-ecology/current` 原子指向当前版本，`/var/www/mangrove-ecology` 指向 current。
- 仅修改 `/etc/nginx/conf.d/htmlsite.conf` 的既有 `server_name _` server block，新增带 `BEGIN/END MANGROVE_ECOLOGY` 标记的两个 location；未新建服务、未安装运行时、未开放新端口。
- Nginx 采用 `root /var/www`，避免 `alias` 的路径拼接歧义；`try_files $uri/index.html $uri $uri.html =404` 可直接读取静态目录页，同时保持无尾斜杠的前端路由。

### 3. 回滚点与保护验证

- 部署前回滚点：`/opt/mangrove-ecology-backups/20260813T003343Z/`，包含原 Nginx 配置、受保护文件哈希和首次部署的空 current 记录。
- 根站 `/var/www/htmlsite/index.html` 部署前后 SHA256 均为 `3e4a3f22010a28eb5254740ddc8d93dc7c40676a1b3671f8f85ea749d40a344e`。
- `/var/www/htmlsite/joyt-profile/` 聚合 SHA256 部署前后均为 `f7f5919b42ecb2e7480efd55aaae97c7da244f8eb59eca48182422160cd9a94d`。
- 根站、`/joyt-profile/`、`/future-bay-eco-lab/` 和 `/wenchang-brain/` 在最终回归中均返回 HTTP `200`。

### 4. 构建与质量结果

- `npm run lint`：通过。
- `npm run typecheck`：通过，三语言翻译键完整性通过。
- `npm test`：通过，`1` 个测试文件、`8` 项单元测试全部通过。
- `npm run generate`：通过，生成 `.output/public`；保留 Nuxt/Nitro 已知的非阻断 cache-driver 提示。
- 本地子路径预览中，中文、English、Bahasa Indonesia 和关键内页均可直达；桌面端与 `375px` 移动端无横向溢出、无破图、控制台无 error。

### 5. 服务器与公网验收

- 发布包远端实算 SHA256 与本地固定值一致，候选目录 `113` 个文件通过存在性、大小、资源前缀和 canonical 检查。
- `nginx -t` 通过并 reload 成功；`current` 与 `/var/www/mangrove-ecology` 均解析到版本 `20260813T003343Z`。
- 中文首页、英文首页、印尼语首页、关于、研究方向、项目、成果、平台、负责人页，以及 Logo、团队照片、JS、sitemap 均返回 HTTP `200`。
- `/mangrove-ecology` 返回 `301` 至带尾斜杠首页；未知子路径返回 `404`。
- Microsoft Edge 真实公网渲染确认三语言、关键内页、客户端导航、canonical、移动菜单正常；桌面端与 `375px` 移动端无溢出和破图，console error 与 page error 均为 `0`。
- 未遗留 canary、开发或 watch 进程；监听端口与部署前一致。

### 6. 文档与后续事项

- 新增 `docs/DEPLOYMENT_ALIYUN.md`，记录构建、发布、Nginx、验证、更新和回滚步骤。
- 当前仅有公网 IP 和 HTTP，未配置域名、HTTPS、证书或强制跳转；获得正式域名后应重新生成 canonical/sitemap，并在不影响既有 server block 的前提下增加 TLS。
- 当前工作目录不是可用 Git repository，因此本轮无法记录提交哈希；发布版本以 UTC 时间戳和包 SHA256 唯一标识。

## V8 首页对齐与极简红树林背景 — 2026-07-27

### 1. 首页右上信息区对齐

- 首屏标题/信息区与团队照片/最新动态共用 `.portal-grid`，不再维护两套比例和 gap。
- 桌面共享 token 为 `minmax(0, 2.15fr) minmax(350px, 0.95fr)` 与 `48px` gap；右侧信息区和最新动态的左右边界及宽度由同一容器、同一列轨道决定。
- 未使用负 margin、绝对定位或局部宽度补偿；Playwright 将分别测量两个右栏的 `left` 与 `width`，允许误差不超过 `2px`。

### 2. 底部三个入口与页脚间距

- 科研平台、新闻与交流、加入我们继续使用无卡片三列结构，删除各自 `SectionHeading` 的绿色底边和相关伪元素。
- 入口保留标题、辅助标题、说明和文字链接；hover 仅改变文字颜色并将链接轻移 `2px`，不增加边框、阴影或背景色。
- 首页主内容到页脚的底部留白由 `48px` 收紧为桌面 `30px`、移动端 `24px`；保留弹性应用壳和非固定定位页脚。

### 3. 极简红树林线条背景

- 新增原创 `public/brand/mangrove-line-background.svg`：由三条简化树干、支柱根、五片叶片轮廓、两条潮汐线和一条绛红细线构成。
- SVG 使用 `viewBox`、`fill="none"`、圆角线端和圆角连接；主线 `#0B675E`，点缀线 `#8C243C`，不包含北京大学标识。
- 首页只使用两个外部 SVG 装饰层：首屏右下角透明度 `0.055`，第三板块右下角透明度 `0.04`；均设置 `aria-hidden="true"`、`pointer-events: none` 且层级低于正文。

### 4. 桌面端与移动端

- 桌面端两处首页网格严格共轨，第三板块维持三列，线稿视觉宽度不超过所在区域约三分之一。
- `820px` 以下切换为单列，网格 gap 为 `24px`；只保留首屏一个局部线稿并将透明度降至 `0.03`，第三板块线稿隐藏。
- 不改变首页文字、新闻数据、导航、语言选择器、路由、SEO、地图、外链、Logo、favicon、论文筛选或旧地址跳转。

### 5. 测试结果与截图

- `npm run lint`：通过。
- `npm run typecheck`：通过，中文、English、Bahasa Indonesia 翻译键完整性通过。
- `npm test`：通过，`1` 个测试文件、`8` 项单元测试全部通过。
- `npm run generate`：通过，静态生成 `88` 条路由；仅出现 Nuxt/Nitro 已知的非阻断 cache-driver 提示。
- `npm run screenshots -- --reporter=list`：通过，`1` 项 V8 Playwright 回归测试在 `15.4s` 内完成；覆盖两栏几何、三条入口底边、页脚间距、SVG 请求和指针事件、三语言首页、移动端无溢出、首次直达/刷新及控制台错误。
- 桌面开发态实测：右上信息区与最新动态栏的 `left` 均为 `982.4375px`，宽度均为 `377.546875px`；左边界误差 `0px`，宽度误差 `0px`。第三板块与页脚间距为 `30px`，页面 `scrollWidth/clientWidth = 1440/1440`。
- 根路径首次访问和刷新、`/en`、`/id`、`/brand/mangrove-line-background.svg` 均返回 HTTP `200`；浏览器 `pageerror` 与 console error 均为 `0`。
- 截图路径：`test-results/v8-zh-home.png`、`v8-alignment.png`、`v8-team-news.png`、`v8-directory-footer.png`、`v8-mangrove-line-detail.png`、`v8-en-home.png`、`v8-id-home.png`、`v8-mobile-home.png`。
- 静态预览 PID `12016` 在截图完成后已停止，端口 `4173` 已释放。最终开发态使用包装 PID `6796`、Nuxt PID `20564`；检查后仅停止这两个项目进程，确认 `3000`、`3001`、`3002`、`4173` 均无监听。

## V7 首页重组、内容精简与稳定性修复 — 2026-07-27

### 1. 首页删除、保留与三段结构

- 保留团队名称、研究简介、团队介绍/科研成果入口、负责人和研究方向简表，继续删除未经确认的团队统计数字及“团队概况”。
- 首页重组为三段：①团队识别区；②左侧真实团队照片、右侧最新四条动态；③科研平台、新闻与交流、加入我们三个紧凑入口。
- 删除首页独立“研究方向”“科研项目”“论文与成果”板块；导航与对应内页保持不变。
- 删除团队照片 `figcaption` 及“团队合影、图片来源”等可见注释，图片本身、替代文本和直接 URL 保持有效。

### 2. 内容清理与内页调整

- 团队介绍保留团队简介、研究基础、当前团队成员、已毕业成员与去向、学术联系五段；当前成员仅展示李瑞利研究员，不显示缺失、审核、待确认或占位说明。
- 研究方向四个重复成果链接合并为一个“查看相关论文与成果”入口；四个方向增加主语言标题与辅助语言标题，并提高名称和正文字号。
- 加入我们仅展示研究生方向、博士后与科研合作、申请建议和邮箱；联系方式采用 `0.85fr / 1.15fr` 两列及 `32px` gap。
- 页脚只保留团队名称、研究方向简述、联系方式、地址和版权；项目、论文、平台及研究分享不再向访客显示内部 sourceId、reviewStatus 或审核说明。

### 3. 新闻与国际交流

- 从北京大学深圳研究生院、环境与能源学院、南燕新闻网及 NUS 正式页面核验并整理 12 条记录。
- 每条数据包含日期、标题、来源、类型、原始详情链接、简短摘要和内部 sourceId；首页展示最新 4 条，新闻内页展示全部记录。
- 新增来源及访问日期记录于 `docs/SOURCE_LEDGER.md`，不复制新闻全文，不使用搜索结果页作为最终链接。

### 4. 字号、宽度与间距

- 主内容最大宽度由 `1200px` 调整为 `1280px`；首页三段统一使用 `48px` 桌面 gap、`32px` 移动 gap。
- `SectionHeading` 主标题统一为 `24px / 600`，辅助标题为 `13px`；全站页面主标题统一 `font-weight: 600`。
- 研究方向名称为 `19px`、正文为 `15px`；加入我们二级标题 `20px`、正文 `16px / 1.75`。

### 5. 根路径与服务纪律

- V6 根路径 400 的原因是首页图片模板字面量在 SSR 中被误送入 `virtual:public`；图片和 Logo 均已改为运行时根路径字符串绑定。
- 开始 V7 前确认上轮遗留开发服务 PID `4640`、端口 `3002`，随后仅终止该项目 PID；端口已释放。
- V7 最终将使用有明确超时与 `finally` 关闭逻辑的临时服务回归 `/` 首次访问、刷新、内页直达、三语言首页和静态资源直链。

### 6. 测试与截图状态

- `npm run lint`：通过。
- `npm run typecheck`：通过，同时完成三语言数据完整性检查。
- `npm test`：通过，`1` 个测试文件、`8` 项单元测试全部通过；新增新闻记录字段完整性与最终 URL 检查。
- `npm run generate`：通过，Nuxt 静态生成 `88` 条路由；仅保留 Nuxt/Nitro 已知的非阻断 cache-driver 提示。
- `npm run screenshots -- --reporter=list`：Playwright `1` 项完整回归测试通过，受控静态预览 PID `16776` 已停止，端口 `4173` 已释放。覆盖首次直达、刷新、核心内页、三语言、桌面与移动导航、语言选择器、无横向溢出、运行时图片、标题与间距、外链和浏览器控制台。
- 已生成并人工检查 `12` 张截图：`v7-zh-home.png`、`v7-team-news.png`、`v7-home-entries.png`、`v7-about.png`、`v7-research.png`、`v7-news.png`、`v7-join.png`、`v7-contact.png`、`v7-en-home.png`、`v7-id-home.png`、`v7-nav-dropdown.png`、`v7-mobile-home.png`。
- 开发态最终检查使用端口 `3002`：启动包装 PID `3968`，Nuxt PID `6348`。`/` 首次请求与再次请求、`/about`、`/research`、`/projects`、`/publications`、`/platforms`、`/news`、`/join`、`/contact`、`/en`、`/id`、`/brand/site-mark.svg` 和 `/images/team/team-photo.jpg` 均返回 HTTP `200`。
- 检查完成后仅停止 PID `6348` 与 `3968`，确认两者均退出且端口 `3002` 已释放；未执行全局 Node 进程终止。
- Playwright 使用全新的隔离浏览器上下文并执行页面重载，等价覆盖无缓存首次访问与强制刷新场景；浏览器控制台无 `error`。

## V6 Bug Fix - Static Asset Resolution — 2026-07-27

### 错误原因

`public/brand/site-mark.svg` 属于 Nuxt `public/` 目录中的原样静态资源，应由站点根路径 `/brand/site-mark.svg` 在运行时直接访问。`SiteHeader.vue` 原先使用模板静态属性 `src="/brand/site-mark.svg"`；在当前 Nuxt 3.17.7 / Vite 开发转换链中，该字面量被错误送入 `virtual:public` 资源解析，最终请求 `/**nuxt_vite_node**/resolve/virtual:public?/brand/site-mark.svg` 并返回 HTTP 400。

### 修改文件与修复方式

- `components/SiteHeader.vue`：将站点标识改为运行时字符串绑定 `<img :src="'/brand/site-mark.svg'">`，避免 Vite 对 `public` 资源执行 import/require 式编译解析。
- 全项目检查 `public/`、`~/public/`、`/brand/`、`site-mark.svg` 与 `logo-concept` 引用；未发现 `import`、`require` 或 `~/public` 错误用法。
- `components/SiteFooter.vue`、`layouts/default.vue`、`app.vue` 及其他 favicon / Logo 相关组件未发现同类错误，不做无关修改。
- 保留 `public/brand/site-mark.svg`、`logo-concept-a.svg`、`logo-concept-b.svg`、`logo-concept-c.svg` 原文件与目录结构，不重新设计 Logo，不修改页面布局、Nuxt/Vite 配置、路由、国际化、SEO 或测试逻辑。

### 测试结果

后续 V7 全量回归已覆盖本修复：`npm run lint`、`npm run typecheck`、`npm test`、`npm run generate` 均通过；开发态首页与 `/brand/site-mark.svg` 均返回 HTTP `200`。

## V6 内容完善与机构形象适配 — 2026-07-26

### 1. 主管角色与本轮范围

本轮由“科研官网内容与机构形象主管”负责，完整落实以下用户要求，并保留 V5 已通过的导航交互、三语言路由、语言选择器状态、论文筛选、旧分享跳转、最终外链、静态生成、SEO 与 Node.js 20 + npm 工程能力：

1. 导入用户提供的真实团队照片与李瑞利研究员照片，不使用外链图片、网络替代图或 AI 人像。
2. 首页增加紧凑团队照片区，删除未经正式确认的 `20+ / 100+ / 20+` 团队统计和“团队概况”。
3. 以统一 `SectionHeading` 组件实现三语言栏目标题主次顺序。
4. 主体背景统一为纯白，正文和次要文字分别使用近黑色与不浅于 `#444444` 的深灰色。
5. “关于团队”下拉重组为“团队负责人、团队介绍、研究方向”，成员内容并入团队介绍。
6. 保留 `/people`、`/en/people`、`/id/people` 到对应团队介绍成员锚点的兼容跳转。
7. 将李瑞利研究员页面扩充为完整三语言学术主页，并移除访客可见的内部来源编号。
8. 使用弹性应用壳实现短页面页脚贴底，不使用固定定位。
9. 在联系页面接入可交互 OpenStreetMap，并提供高德、百度和 OpenStreetMap 直接地址入口。
10. 设计三套原创红树林 SVG 标识，建立多尺寸预览，选定扁平方案作为站点标识与 favicon。
11. 同步更新自动化断言、截图、README 和本主管记录。

### 2. 修改前问题与事实基线

- 首页仍显示未经团队正式确认的团队级统计数字，存在口径风险。
- 首页缺少真实团队照片，负责人页面仍使用 `LR` 字母占位符。
- 首页栏目标题分别由局部模板编写，英文标签总在左上方，未满足三语言主次顺序规则。
- 主体仍使用浅绿/暖灰分区，部分次要文字颜色低于本轮深色可读性要求。
- “关于团队”下拉包含团队成员和“李瑞利研究员”个人名称，没有优先表达团队负责人角色。
- 团队成员尚未确认，却被拆成独立一级内容页；团队介绍缺少当前成员、毕业去向与学术联系结构。
- 负责人页面只包含简要简介、教育经历和少量任职，未形成完整学术主页。
- 联系页右侧是装饰性网格，不是真实地图。
- 部分短页面未以统一应用壳保证页脚稳定贴底。
- 原品牌图形为 CSS 线条占位，不具备红树林树冠、支柱根和潮汐线识别特征。

### 3. 图片资产决策

- 团队照片已在 `D:\Desktop\微信图片_20260725181315_1914_34.jpg` 找到，画面为约 `2275 × 1280` 的横向团队合照，适合在首页按内容容器宽度整幅展示。
- 负责人照片已在 `D:\Desktop\李老师.jpg` 找到，画面为 `567 × 567` 红树林野外实拍，适合在个人页左栏按原比例矩形展示。
- 两张照片将原样复制到 `public/images/team/` 与 `public/images/people/`，不修改人物面部，不生成替代人像。

### 4. 设计与信息架构决策

- 继续使用 Primitive → Semantic → Component 三层 token；语义层主体改为纯白，层级依靠细线、绛红小面积强调、字号与紧凑间距建立。
- 新建统一 `SectionHeading.vue`。中文使用“左中文、右英文”，英文使用“左英文、右中文”，印度尼西亚语使用“左印尼语、右英文”。
- 首页团队照片采用整幅横向方案，不加商业遮罩；照片下方直接进入新闻与研究信息，控制总高度。
- 成员信息并入 `/about#members`；不虚构未确认成员姓名，仅展示已确认负责人和正式说明。
- “关于团队”下拉最终顺序：团队负责人 → 团队介绍 → 研究方向；“科研成果”结构保持不变。
- 负责人页面采用左侧真实照片与联系方式、右侧连续学术章节；项目使用五列紧凑表格，移动端转为分行记录。
- 地图坐标采用北京大学深圳研究生院公开位置 `22.599167, 113.983611`。地址由北京大学深圳研究生院校园地图公开页面核验，坐标由 Wikidata 校园坐标交叉核验；E304 为楼内办公室，地图标注采用校园位置并保留完整办公室地址。
- 页脚通过 `.app-shell` 弹性布局贴底，不使用 `position: fixed`。
- Logo 只使用红树林树冠、支柱根和潮汐线，不使用北京大学校徽、PKU 文字或官方图形。

### 5. 实施与验收状态

进行中。完成代码、三语言内容、图片、地图、品牌资产、质量门槛与真实浏览器检查后，在本节继续记录最终结果；V1—V5 历史记录保持不变。

## V5 紧凑型科研门户重构 — 2026-07-26

### 主管角色

本轮由“科研官网信息密度重构主管”负责。范围严格限定为信息密度、字号、间距和卡片使用方式；导航层级、三语言路由、静态生成、SEO、最终外链和语言选择器状态保持 V4 已验证实现，不重复设计。

### 1. 修改前高度与视觉问题

V4 静态产物在 Playwright 既定桌面视口 `1440 × 1000` 下的基线：

| 页面 | V4 `scrollHeight` | 主标题字号 |
| --- | ---: | ---: |
| 首页 | `2421px` | `41.6px` |
| 关于团队 | `1000px`（不高于视口） | `36px` |
| 研究方向 | `1000px`（不高于视口） | `36px` |
| 团队成员 | `1000px`（不高于视口） | `36px` |
| 科研项目 | `1181px` | `36px` |
| 论文与成果 | `2483px` | `36px` |
| 科研平台 | `1000px`（不高于视口） | `36px` |

所有页面 `scrollWidth` 均为 `1440px`，无横向溢出。主要问题：

- 首页主标题和内页主标题分别超过 V5 的 `36px`、`32px` 上限。
- 首页各 section 仍以完整标题区叠加列表，纵向高度超过 `1950px` 目标。
- 关于团队、研究方向、项目、论文、新闻、加入我们和联系方式仍有多处白底卡片，信息组织偏产品化。
- 论文成果的五个章节各自使用较大的标题与间距，平台成果又重复三张卡片，导致页面超过 `2400px`。
- 项目、论文和新闻虽然已列表化，但行内 padding、章节 gap 和辅助文字行数仍可压缩。

### 2. 本轮设计决策（实施前）

- 保留 V4 色彩、宋体/Times New Roman、导航、页脚、路由、外链和交互逻辑，仅重设字号和空间密度。
- 将紧凑型尺寸纳入三层 token：原始 `space/font-size` → 语义 `section/page-title/body` → 组件 `hero/card/list-row/filter`。
- 首页统计、研究方向、科研项目、论文列表取消“卡片面”观感，改用细分隔线、索引、定义列表和连续记录。
- 关于团队、研究方向、科研项目、论文记录、新闻、加入我们和联系方式优先取消卡片；团队成员与需要状态辨识的科研平台保留小卡片。
- 不删除真实内容、不隐藏字段、不使用 CSS scale、zoom、固定高度或低于 `14px` 的移动端正文。

### 3. V5 目标值

- 首页主标题 `32–36px`；内页主标题 `28–32px`；模块标题 `24–28px`。
- 内页标题区上下 padding `24–32px`；常规 section 上下 padding不超过 `48px`。
- 首页 `scrollHeight < 1950px`；科研项目目标 `≤950px`；论文成果目标 `≤1900px`；关于团队和科研平台内容在 `1000px` 视口内完整呈现。
- 所有桌面和移动页面无横向溢出；移动端正文不小于 `14px`，交互控件最小 `44px`。

### 4. 实施状态

已完成。

### 5. 字号与间距调整

- 新增原始字号 token `13/14/15/16/18/20/26/30/34px`，再映射为正文、记录标题、模块标题、内页标题和首页标题语义 token。
- 首页主标题由 `41.6px` 调整为 `34px`；内页主标题由 `36px` 调整为 `30px`；首页模块标题为 `26px`；记录标题为 `16px`；正文为 `15px`。
- 内容宽度由 `1180px` 调整为 `1200px`；页头内容高度由 `66px` 调整为 `60px`。
- 首页首屏上下 padding 为 `24px`，标题区上下 padding 在桌面端约 `28.8px`，常规 section 上下 padding 统一为 `32px`。
- 标题说明间距、列表行 padding、网格 gap 和页脚间距均压缩；移动端正文保持 `15px`，菜单、按钮、筛选控件与复制按钮保持至少 `44px` 操作高度。

### 6. 卡片取消与保留依据

已取消卡片面：

- 首页统计、最新动态、研究方向、科研项目和代表论文；
- 关于团队普通正文与事实分栏；
- 研究方向基础说明；
- 科研项目、论文记录、新闻记录和研究分享；
- 专利/奖励汇总、加入我们和联系方式定义列表。

这些区域以顶线、底线、编号、年份、定义字段和连续行建立层级，不再依赖白底外框与阴影。

保留小卡片：

- 团队成员：人物仍需要独立身份分组；
- 李瑞利研究员侧栏：联系方式与来源核验需要独立区分；
- 科研平台与数据技术成果：条目具有独立系统/数据产品属性，且部分存在“建设中”状态。

保留卡片统一使用白底、`1px` 浅灰边框、`4px` 圆角、`14px` padding、无阴影。

### 7. 页面信息布局变化

- 首页：紧凑标题与英文栏目名共行；统计改为横向数字行；4 条动态连续显示；方向为两列编号索引；项目为年份/名称/负责人/状态记录；论文为年份/题名/期刊/DOI连续列表；平台仅显示数量、少量名称和入口。
- 关于团队：正文取消外框，事实信息改为两列连续分栏。
- 研究方向：四个方向改为两列编号章节，并提供成果入口。
- 团队成员：保留人物卡片，但缩小头像、padding 和内部间距。
- 科研项目：六项记录按年份、题名、类别、负责人、状态横向排列；方向和来源留在次级行，移动端完整分行显示。
- 论文与成果：五个章节标题改为紧凑同行；筛选器压缩；论文每条控制在三行；来源与 DOI/BibTeX 合并在同一操作行；专利、奖励、分享取消卡片。
- 科研平台：五项平台改为两列紧凑状态卡，序号与标题同行。
- 新闻、加入我们、联系方式：分别改为日期列表、两列事实栏和定义列表。

### 8. 修改前后高度

Playwright 既定桌面视口 `1440 × 1000`，`contentHeight` 用于小于视口的页面，所有页面横向溢出均为 `0`：

| 页面 | V4 | V5 | 结果 |
| --- | ---: | ---: | --- |
| 中文首页 | `2421px` | `1873px` | 降低 `548px`，约 `22.6%`，低于 `1950px` |
| 英文首页 | 未单列 | `1946px` | 低于 `1950px` |
| 印度尼西亚语首页 | 未单列 | `1946px` | 低于 `1950px` |
| 关于团队 | `1000px` 视口内 | `715px` 内容高度 | 低于 `800px` |
| 研究方向 | `1000px` 视口内 | `714px` 内容高度 | 四项完整展示 |
| 团队成员 | `1000px` 视口内 | `626px` 内容高度 | 人物卡保留 |
| 科研项目 | `1181px` | `833px` 内容高度 | 低于 `950px` |
| 论文与成果 | `2483px` | `1840px` | 降低 `643px`，约 `25.9%`，低于 `1900px` |
| 科研平台 | `1000px` 视口内 | `789px` 内容高度 | 低于 `800px` |
| 新闻与交流 | 未单列 | `687px` 内容高度 | 日期列表完整 |
| 加入我们 | 未单列 | `661px` 内容高度 | 两列事实栏 |
| 联系方式 | 未单列 | `710px` 内容高度 | 定义列表与地图入口保留 |

### 9. 最终质量门槛

- `npm run lint`：通过。
- `npm run typecheck`：通过，三语翻译键完整性检查通过。
- `npm test`：通过，1 个测试文件、6 个单元测试全部通过。
- `npm run generate`：通过，静态生成 `83` 条路由到 `.output/public`。
- `npm run screenshots -- --reporter=list`：通过，1 个 Playwright 场景。
- Nuxt/Nitro 静态构建仍有 2 条 `cache-driver.js` external dependency 非阻塞警告；没有构建失败、缺页或运行时错误。

### 10. Playwright 截图与交互结果

- 新增/收紧断言：首页 `scrollHeight < 1950px`；首页主标题 `≤36px`；内页主标题 `≤32px`；常规 section 单侧 padding `≤50px`（含 2px 计算误差）；三语选择器选项文字与路由一致；全页无横向溢出；页面异常数组为空。
- “关于团队”“科研成果”两组桌面下拉菜单均可展开。
- 375px 移动菜单完整包含团队介绍、研究方向、团队成员、李瑞利研究员、科研项目、论文与成果、科研平台及其他一级入口。
- 三语旧 `/sharing` 地址继续跳转到对应成果页研究分享锚点。
- 截图：`zh-home.png`、`zh-mobile.png`、`about.png`、`research.png`、`projects.png`、`publications.png`、`platforms.png`、`nav-dropdown.png`、`en-home.png`、`id-home.png`，以及负责人、研究分享和移动菜单补充截图。

### 11. `localhost:3000` 与真实浏览器结果

- `npm run dev` 已在 Node.js `20.19.5` + npm 环境启动，`http://localhost:3000/` 返回 HTTP `200`；服务器在本轮交付时保持运行。
- 中文、英文、印度尼西亚语切换后分别显示 `中文`、`English`、`Bahasa Indonesia`。
- “关于团队”“科研成果”下拉通过键盘方向键展开正常。
- 论文搜索输入 `microplastics` 后由 5 条缩为 1 条，清除筛选后恢复 5 条。
- Temasek Laboratories 最终外链实际打开到目标详情页，测试标签随后关闭。
- 375 × 812 真实移动视口下，移动抽屉可打开，11 个内部入口完整存在，页面 `scrollWidth ≤ viewport`。
- 浏览器控制台 `error` 为 `0`；复核后恢复桌面中文首页。

### 12. 未解决问题

- 团队成员名单、统计数字、部分项目年份和平台正式公开状态仍需团队书面确认，详见 `docs/CONTENT_REVIEW.md`。
- 当前没有已授权高清团队合照或实验场景照片；V5 不新增图片，也不生成替代插画。
- 正式域名确定后仍需设置 `NUXT_PUBLIC_SITE_URL`，并进行上线前 canonical、sitemap、校内链接和性能复核。
- 英文与印度尼西亚语建议在正式上线前进行专业学术语言终审。

## V4 科研团队门户密度重构 — 2026-07-25

### 主管角色

本轮由“科研官网重构主管（Research Website Reconstruction Supervisor）”负责产品定位、信息架构、视觉系统、数据展示和工程质量。所有实现必须先记录问题与决策，再进入代码修改。

### 1. 当前问题与量化基线

- 当前 V3 已解决重色块割裂和导航冗长，但整体仍偏“现代产品展示页”：首屏使命表达、方向卡片和多段大间距模块占据较多纵向空间。
- 新闻位于首页后半段，不符合高校实验室官网“图片/团队识别 + 最新动态优先”的典型阅读路径。
- 首页依次展示方向、项目、成果、平台、新闻、分享、加入，模块完整但重复标题区与卡片使科研信息浏览效率不足。
- 页头和页脚均为浅色，机构识别和“科研单位主页”的稳定感不足。
- 科研项目已经有类别、年份、状态、方向，但首页未明确“负责人”；团队成员页也缺少可核验成员时的结构化研究角色说明。
- 2026-07-25 浏览器基线（视口宽约 1265px）：首页 `4133px`、关于团队 `1072px`、科研项目 `1633px`、论文成果 `3587px`、科研平台 `1200px`；各页无横向溢出。

### 2. 参考官网研究结论

重要参考：北京大学深圳研究生院环境与能源信息工程实验室官网。

- 首页采用明确机构名称、稳定栏目和新闻动态入口，来访者无需先理解“产品价值主张”即可进入科研内容。
- 导航按“团队—课题研究—国际联系—新闻—联系”组织，科研团队、项目和成果的层级清晰。
- 新闻列表使用日期 + 标题的高密度形式；成果按年份连续组织，适合学术同行快速扫读。
- 李瑞利研究员页面将简介、研究方向、代表项目、学生去向、招生和联系方式集中呈现，体现科研主页的事实密度。
- 本项目只借鉴信息优先级、栏目稳定性和列表密度；不复制旧站的视觉样式、WordPress 结构或品牌资产。

### 3. 本轮设计决策

- 产品定位从“科研成果展示站”进一步调整为“公开科研团队门户”。
- 采用“深色机构导航 + 浅色内容主体 + 深色联系页脚”的高校官网骨架；禁止大面积深绿内容区、红色大按钮和彩色卡片。
- 新三层 token：
  - Primitive：`#075A52` 红树林深青绿、`#F7F7F3` 主体浅灰白、`#EEF4F1` 辅助浅绿、`#8C243C` 学术红、`#222222` 正文。
  - Semantic：机构色、页面底色、强调色、正文色、边界色。
  - Component：导航、页脚、卡片、按钮、列表、标题区和统计栏专用 token。
- 字体继续采用中文宋体；英文优先 Times New Roman。正文保持 `15–16px`，首页标题控制在 `34–40px`，内页标题控制在 `30–36px`。
- 首页顺序调整为：机构首屏 → 紧凑统计栏 → 最新新闻 → 研究方向 → 科研项目 → 科研成果（论文/专利/平台）→ 联系与页脚。
- 研究分享继续并入论文成果页，不恢复独立栏目或站内详情页。
- 真实团队照片仍为首选，但当前没有已授权高清照片，因此本轮使用简洁文字首屏和“照片待授权”结构，不生成插画或伪造科研场景。

### 4. 本轮验收目标

- 桌面首页高度从约 `4133px` 降低 30% 以上，目标约 `2500–2900px`。
- 论文成果页在不删减筛选、专利、平台、奖励和分享功能的前提下明显压缩。
- 新闻进入首页首屏后的第一组主要科研内容。
- 导航、下拉、移动抽屉、语言切换、SEO、静态生成和旧分享地址兼容跳转保持可用。

### 5. 实施状态

已完成。

### 6. 页面与组件调整

- `SiteHeader.vue`：改为深绿色机构导航；保留明确“首页”；设置“关于团队”“科研成果”两组下拉菜单；桌面和移动端均展示完整层级；三语选择器改为受控状态，显示值与当前路由同步。
- `HomePage.vue`：移除展示型插画和重复平台/研究分享/营销行动区；重排为紧凑文字首屏、横向统计栏、最新动态、研究方向、科研项目、论文与成果、联系页脚。
- `InnerPage.vue`：所有内页采用浅底紧凑标题区和统一信息行；科研项目增加负责人；论文筛选改用当前语言的数据集。
- `SiteFooter.vue` 与全局样式：页脚改为深绿色联系方式与声明区域；红色只用于顶部细线、编号、日期和活动态。
- 全站卡片统一为白底、`1px solid #D8D8D3`、`4px` 小圆角和极轻阴影；标题、正文、section 与内页标题区间距同步压缩。
- 404、移动抽屉、语言切换、筛选、旧地址跳转和 SEO 结构沿用原功能并适配新版视觉。

### 7. 数据结构变化

- `data/site.ts` 的项目条目新增 `leader` 字段；中文为“李瑞利”，英文和印度尼西亚语为 “Li Ruili”。
- 第二组一级导航显示名称由“科研项目”调整为“科研成果”，子项仍为科研项目、论文与成果、科研平台，路由键和已有 URL 不变。
- 首页统计仅保留项目、论文、授权专利三项公开口径，不再展示与科研门户主任务关系较弱的宣传型比例。
- 研究分享继续作为论文成果页的组成部分，外链直接到最终原文页面；旧 `/sharing` 路由继续永久重定向，不进入 sitemap。

### 8. 高度与密度结果

浏览器测量视口宽约 `1265px`，所有页面横向溢出均为 `0`：

| 页面 | V3 高度 | V4 高度 | 结果 |
| --- | ---: | ---: | --- |
| 首页 | `4133px` | `2376px` | 降低约 `42.5%`，超过 30% 验收目标 |
| 关于团队 | `1072px` | `875px` | 标题区与内容卡片明显压缩 |
| 科研项目 | `1633px` | `1161px` | 降低约 `28.9%`，项目字段反而增加 |
| 论文成果 | `3587px` | `2453px` | 降低约 `31.6%`，筛选与全部成果类型保留 |
| 科研平台 | `1200px` | `923px` | 建设中状态与卡片信息完整保留 |

首页主标题实测约 `41.6px`，内页标题约 `36px`；主体背景为 `#F7F7F3`，页头为 `#075A52`，页脚为 `#043E39`。

### 9. 最终测试结果

- 环境：Node.js `20.19.5` + npm；未使用 pnpm，未升级 Node.js。
- `npm run lint`：通过。
- `npm run typecheck`：通过，三语翻译完整性检查通过。
- `npm test`：通过，1 个测试文件、6 个测试全部通过；覆盖导航分组、项目负责人、页面文案、DOI 和研究分享最终外链。
- `npm run generate`：通过，静态生成 `83` 条路由到 `.output/public`；三语 sitemap、负责人详情、404 和旧分享跳转均成功生成。
- `npm run screenshots -- --reporter=list`：通过，1 个 Playwright 场景；覆盖三语首页、重点内页、科研项目、桌面下拉、移动菜单、语言选择器路由同步、页面异常和横向溢出。
- 静态构建仍出现 Nuxt/Nitro `cache-driver.js` external dependency 的 2 条非阻塞警告；没有造成构建失败、缺页或浏览器运行时错误。

截图产物：

- `test-results/zh-home.png`
- `test-results/en-home.png`
- `test-results/id-home.png`
- `test-results/zh-mobile.png`
- `test-results/mobile-menu.png`
- `test-results/mobile-menu-panel.png`
- `test-results/nav-dropdown.png`
- `test-results/about.png`
- `test-results/person.png`
- `test-results/research.png`
- `test-results/projects.png`
- `test-results/publications.png`
- `test-results/platforms.png`
- `test-results/research-sharing.png`

### 10. 下一步建议

- 获取并完成团队合照、外业调查或实验场景照片的肖像权与网站使用授权后，可替换当前简洁文字首屏；图片应配克制的半透明深色遮罩，不恢复抽象插画。
- 团队成员名单、统计数字、部分项目年份与平台公开状态仍需团队书面确认，详见 `docs/CONTENT_REVIEW.md`。
- 正式站点域名确定后设置 `NUXT_PUBLIC_SITE_URL`，再做一次 sitemap、canonical、校内链接与上线性能复核。
- 英文和印度尼西亚语建议在正式上线前由学术语言人员终审；论文题名与期刊名继续按原始引用保留。

## V3 连续渐变、精简导航与成果合并 — 2026-07-25

### 本轮用户要求与现状问题（实施前记录）

- 全站统一为浅灰绿—暖白—极浅灰粉的连续渐变，不再通过深色块或彩色分区建立层级。
- 中文、英文与数字统一采用宋体/衬线字体体系；正文改为黑色、正常字重，标题继续缩小。
- 一级导航由十个内容入口收敛为：首页、关于团队、科研项目、新闻与交流、加入我们、联系方式、语言选择器。
- “关于团队”包含团队介绍、研究方向、团队成员、李瑞利研究员；“科研项目”包含科研项目、论文与成果、科研平台。
- 研究分享从独立页面和一级导航移除，合并到论文与成果页，并为三语旧地址提供永久重定向。
- 全站卡片从彩色、较大圆角体系改为白色半透明、黑色细边框、4–8px 低圆角和极轻阴影。
- 当前研究分享数据有 3 条：NUS 条目已是最终活动详情 `.html`；北京大学学报条目的 DOI 会进入多重解析页，应改为最终期刊 `.shtml`；Water Research 条目应改为最终 ScienceDirect 文章页。
- 当前英文和印度尼西亚语页面仍复用部分中文项目、平台、活动与研究分享数据，需要在不改变事实的前提下补齐对应展示文本。

### 实现结果

- 全站基础背景改为单一连续渐变：`#E4EFEB → #EDF4F1 → #FAF9F6 → #F7F0F2`。所有 section、页面标题区和页脚保持透明或半透明，使颜色从页首自然延续到页尾。
- 全站中文、英文和数字统一为 `SimSun / Songti SC / STSong` 宋体衬线回退；正文使用 `#111111` / `#474747` 与 `400` 字重，标题和强调不超过 `600`。
- 首页主标题最大约 `46px`，内页标题最大约 `40px`，模块标题最大约 `38px`；标题区与模块间距进一步压缩。
- 卡片、筛选器、菜单和信息面统一为白色半透明底、1px 黑色细边框、`4–8px` 圆角和极轻阴影；按钮统一为黑白体系。
- 桌面导航保留明确“首页”，收敛为 5 个内容一级项和语言选择器。“关于团队”“科研项目”使用支持鼠标与键盘的下拉菜单；移动抽屉直接展示全部子栏目。
- 研究分享已从 `PageKey`、正式页面模板、一级导航和 sitemap 中移除，并入论文成果页，位于代表论文、筛选、专利、数据与技术成果、奖励之后。
- `/sharing`、`/en/sharing`、`/id/sharing` 保留 301 兼容入口，分别转到对应语言的 `/publications#research-sharing`。
- 项目、论文、平台、新闻和研究分享均提供英文与印度尼西亚语展示文本；原始论文标题按学术引用惯例保留，原中文期刊条目为英语与印度尼西亚语页面提供对应标题和期刊名。

### 研究分享最终链接审查

| 条目 | 最终页面 | 结果 |
| --- | --- | --- |
| NUS Seminar, 22 March 2024 | `https://temasek-labs.nus.edu.sg/events/seminar22Mar2024.html` | 已确认活动详情页 |
| 红树林保护与修复标准 | `http://xbna.pku.edu.cn/CN/abstract/abstract3794.shtml` | 已从 DOI 中间解析页改为期刊文章详情页 |
| Water Research 2024 | `https://www.sciencedirect.com/science/article/pii/S004313542400722X` | 已从 DOI 改为 ScienceDirect 文章详情页 |

本轮没有无法取得最终地址的研究分享条目。

### 本轮测试

- 环境：Node.js `20.19.5` + npm；未使用 pnpm，未升级 Node.js。
- `npm run lint`：通过。
- `npm run typecheck`：通过，三语翻译完整性检查通过。
- `npm test`：通过，1 个测试文件、5 个测试全部通过。
- `npm run generate`：通过，静态生成 83 条路由到 `.output/public`；三语旧分享地址生成兼容跳转页，且不进入 sitemap；不存在 `/en/en`、`/id/id` 等重复语言目录。
- `npm run screenshots -- --reporter=list`：通过，1 个 Playwright 场景覆盖 12 张页面/组件截图、桌面下拉菜单、成果页研究分享锚点、移动菜单和三语旧地址跳转。
- 浏览器实测：页面背景为预期连续渐变；字体为宋体回退；正文 `400`、主标题 `600`；首页主标题约 `44.8px`；卡片圆角 `6px`；桌面无横向溢出。
- 浏览器实测：桌面下拉菜单支持键盘打开与 Escape 关闭；旧 `/sharing` 到 `/publications#research-sharing`；英文和印度尼西亚语成果页不出现中文期刊条目标题；控制台无 error。
- 移动菜单复核时发现页头 `backdrop-filter` 会建立固定定位包含块，导致抽屉高度受限；已在移动断点关闭该滤镜，并以完整菜单组件截图和 CSS 断言回归通过。
- Nuxt/Nitro 静态构建仍输出 2 条 `cache-driver.js` external dependency 警告；它们没有造成构建失败、缺页或浏览器运行时错误。

截图产物：

- `test-results/zh-home.png`
- `test-results/en-home.png`
- `test-results/id-home.png`
- `test-results/zh-mobile.png`
- `test-results/mobile-menu.png`
- `test-results/mobile-menu-panel.png`
- `test-results/nav-dropdown.png`
- `test-results/about.png`
- `test-results/person.png`
- `test-results/research.png`
- `test-results/publications.png`
- `test-results/platforms.png`
- `test-results/research-sharing.png`

### 仍待后续完成

- 正式站点域名与 sitemap 主机名仍需在部署时通过 `NUXT_PUBLIC_SITE_URL` 设置。
- 团队照片与实验场景图片仍未加入；必须先完成肖像权和使用授权。
- 团队成员名单、统计数字、部分项目年份与平台公开状态仍需团队书面确认，详见 `docs/CONTENT_REVIEW.md`。
- 英文与印度尼西亚语建议在正式上线前进行一次专业学术语言终审。

## 初始化

- 2026-07-24：确认工作目录为空；读取并分解网站建设需求。
- 2026-07-24：Nuxt 官方模板下载端点不可达，改用等价的本地最小脚手架；技术栈为 Nuxt 3、Vue 3、TypeScript 严格模式与 npm（Node.js 20.19.5）。

## 资料检索

- 2026-07-24：优先核查北京大学深圳研究生院环境与能源学院、南燕新闻网、环境与能源信息工程实验室、NUS Temasek Laboratories 指定页面。
- 2026-07-24：确认李瑞利研究员职称、联系方式、教育经历、研究方向、项目、科研平台、荣誉及成果概括；识别成果数量、海南项目年份、部分奖励年份与项目状态冲突。
- 2026-07-24：核查一组带 DOI 的代表性论文，仅将可追踪条目纳入演示版。

## 技术决策

- 2026-07-24：采用 Nuxt 静态生成、`@nuxtjs/i18n` 路由级国际化、Nuxt Content 管理研究分享、集中式 TypeScript 结构化数据。
- 2026-07-24：中文为事实主版本；英文与印度尼西亚语使用独立路由和独立文案。
- 2026-07-24：不使用校徽、学校 Logo、新闻人物照片或第三方商业图库；首屏采用 CSS 原创抽象红树林视觉。

## 页面完成情况

待完成并在本文件持续更新。

## 测试命令与结果

待完成并在本文件持续更新。

## 未解决问题

详见 `docs/CONTENT_REVIEW.md`。

## 修改记录

- 2026-07-24 / v0.1：创建项目配置、内容模型、监督记录与资料治理文档框架。


## V1 implementation update — 2026-07-24
- Implemented the public website v1: complete route-level Chinese, English, and Bahasa Indonesia pages; responsive navigation; original mangrove visual; publication filtering/BibTeX copy; platform, news, joining, and contact pages.
- Reconciled public facts against PKUSZ and NUS source pages; traceability and review flags remain in data/site.ts and docs/SOURCE_LEDGER.md.
- Validation passed: translation integrity, ESLint, type check, Vitest (3 tests), and static generation (93 routes).
- Pending official content decisions remain listed in docs/CONTENT_REVIEW.md.
- Browser QA: Playwright screenshot suite passed (desktop Chinese/English/Indonesian homes, Chinese mobile home, person, research, publication, and platform pages).

- 2026-07-24 / Node20-npm migration: removed pnpm lock/workspace configuration and old pnpm installation directories; migrated to npm with package-lock.json. Downgraded runtime stack to Nuxt 3.17.7 + Nitro 2.11.13, both Node.js 20 compatible. Verified npm install, npm run dev, npm test, and npm run typecheck.

## V2 全站设计重构 — 2026-07-25

### 本轮重构目标

- 将站点从偏模板化、偏平台式、深浅色切换生硬的初版，重构为正式、克制、柔和且具有国际化气质的高校科研团队官网。
- 保留真实学术内容、中文 / English / Bahasa Indonesia、多语言路由、论文筛选、SEO、响应式和 Nuxt 静态部署能力。
- 明确摆脱 HNBLUE 类似的首页结构与配色逻辑，不使用 SaaS 产品页式大标题、重色块和功能卡片叙事。

### 现状问题总结

- 首屏深绿面积过大，团队名称字号过大，右侧抽象插画与科研团队真实语境不匹配。
- 深绿、纯白、深绿连续切换，过渡不足；绛红只零散出现，颜色分布失衡。
- 首页数据、研究方向、项目、成果和平台主要依赖方正卡片平铺，模板感明显。
- 内页标题区上下留白偏多，正文区经常形成大面积纯白。
- 论文成果卡片过重，新闻与研究分享更像资讯流而非高校官网记录。
- 导航没有明确“首页”，普通访问者只能通过品牌区返回。
- 卡片、筛选器、语言选择器、移动菜单和 404 页缺少统一的新版组件语言。

### 参考官网设计分析

- Stanford Social Ecology Lab：借鉴“使命说明 → 项目 → 成员”的清晰学术叙事。
- Stanford Sustainable Solutions Lab：借鉴克制首屏标题与重点成果入口。
- ETH Environmental Physics：借鉴紧凑正式的导航、快速入口和出版物展示。
- Oxford Long-Term Ecology Lab：借鉴研究主题与最新消息的高校官网式组织。
- 适配原则：只学习信息层级、色彩比例、留白与成果呈现方法，不复制页面，不引入任何学校品牌资产。

### 新版设计系统

颜色采用 primitive → semantic → component 三层 token，并集中维护在 `assets/css/main.css`：

| Token | 色值 | 使用场景 |
| --- | --- | --- |
| Green 900 | `#244F47` | 标题、品牌文字、少量关键深色 |
| Green 800 | `#2F6258` | 主链接、次按钮、页脚 |
| Green 700 | `#40766A` | 结构线、图形、hover |
| Green 200 | `#D4E4DE` | 边界、首屏过渡、信息面 |
| Green 100 | `#E7F0EC` | 首屏、平台区、CTA 背景 |
| Green 50 | `#F2F6F3` | 页面分区、筛选区、浅卡片 |
| Wine 700 | `#864257` | 主按钮、数字、当前导航、重点状态 |
| Wine 100 | `#F1E3E7` | 状态标签和轻量强调 |
| Wine 50 | `#F8F0F2` | 成果卡、CTA、暖色过渡 |
| Sand 50 | `#F8F5EE` | 新闻与辅助背景 |
| Paper | `#FCFBF7` | 页面基础背景，替代大面积纯白 |

相比旧版，新颜色提高了绿色和红色的明度，降低大面积深色占比，并用灰绿、米白、暖灰和浅红米色建立连续背景节奏。绛红用于按钮、数字、时间、栏目编号、状态和当前导航，使其分布更均衡但不过量。

间距与组件规则：

- 页面标题区上下间距改为约 `36–42px`，约为旧版的 60%。
- 全站 section 间距统一为响应式 `64–88px`。
- 首屏高度压缩到约 `460px`，主标题最大字号控制在 `3.65rem`。
- 卡片统一采用 `12–16px` 克制圆角、浅描边和低透明阴影。
- 按钮、筛选器、语言选择器、状态标签和移动菜单使用同一套圆角、焦点和 hover 反馈。
- 关键操作区域不小于 `44px`，支持键盘焦点和 `prefers-reduced-motion`。

### 首页重构说明

- 删除右侧 CSS 抽象红树林插画及 `MangroveVisual.vue`。删除原因是其缺少真实科研语境且强化模板感；未来只有在取得授权后，才建议使用“课题组合照或实验场景图 + 半透明深色遮罩”。
- 首屏改为浅灰绿到暖米白的连续背景：左侧展示团队使命、简短说明和两个行动入口，右侧展示四个研究方向索引。
- 团队名称明显缩小，桌面端优先单行，移动端自然换行。
- 数据概览与首屏形成叠接过渡，不再突然切入纯白区。
- 研究方向、项目、论文、平台、新闻、研究分享、加入我们和页脚全部重做。
- 论文成果由沉重深绿卡改为浅纸面卡片；项目使用紧凑学术记录行；新闻与分享使用高校官网式记录列表。
- 模块背景依次使用 Paper、Green 50/100、Sand 50、Wine 50，形成连续但克制的阅读节奏。

### 全站联动修改

- 页头：新增明确“首页”入口，品牌区保留辅助回首页；语言切换与移动菜单轻量化。
- 页脚：保留必要联系与免责声明，使用提亮后的绿色，减少突然收成沉重色块的感觉。
- 关于团队、研究方向、团队成员、科研项目、论文与成果、科研平台、研究分享、新闻与交流、加入我们、联系方式、李瑞利研究员详情页、404 页全部应用新版标题区、背景、卡片和间距系统。
- 论文筛选区重做为浅灰绿工具条，并补全三语“全部年份 / 全部研究方向”标签。
- 移动端在 375px 下无横向溢出；移动菜单实际点击后可展开，`aria-expanded` 正确更新。

### 工程调整

- 保持 Node.js `20.19.5` + npm，未引入 pnpm，也未要求升级 Node.js。
- 为 sitemap 静态生成补充顶层 `nitropack@2.11.13`，并锁定 Node 20 兼容版本。
- 手写 `/en`、`/id` 页面使用 `defineI18nRoute(false)` 禁止二次本地化，清除 `/en/en`、`/en/id`、`/id/en`、`/id/id` 错误重复路由。
- 静态预览服务支持无尾斜杠目录路由，并把尾斜杠请求规范化到无尾斜杠地址。
- Playwright 优先复用本机已经存在的 Chromium，避免可用浏览器与包内默认 revision 不一致时无法截图。

### 测试命令与结果

运行环境：Node.js `20.19.5`，npm。

- `npm install`：通过，`package-lock.json` 已更新。
- `npm run lint`：通过。
- `npm run typecheck`：通过，三语键完整性检查通过。
- `npm test`：通过，1 个测试文件、3 个测试。
- `npm run generate`：通过，成功预渲染 86 条静态路由到 `.output/public`；错误重复语言路由不存在。
- 静态生成仍输出 2 条 Nuxt/Nitro `cache-driver.js` external dependency 警告，但未造成构建失败、缺页或运行时错误；静态产物与截图复核均正常。
- `npm run screenshots`：通过，1 个 Playwright 截图测试。
- 浏览器人工复核：桌面首页、关于团队、研究方向、论文与成果无控制台错误；375px 首页无横向溢出，移动菜单可展开。

截图产物：

- `test-results/zh-home.png`
- `test-results/en-home.png`
- `test-results/id-home.png`
- `test-results/zh-mobile.png`
- `test-results/about.png`
- `test-results/person.png`
- `test-results/research.png`
- `test-results/publications.png`
- `test-results/platforms.png`

### 未完成事项

- 团队合照、野外调查照或实验场景图尚未加入；必须先完成肖像权与使用授权审查。
- 正式上线前仍需团队确认完整成员名单、部分统计口径、平台公开状态、项目和奖励年份，详见 `docs/CONTENT_REVIEW.md`。
- 英文与印度尼西亚语公共内容建议在正式发布前由专业人员进行最终学术语言审校。
- 当前默认站点域名仍为示例值，正式部署时必须设置 `NUXT_PUBLIC_SITE_URL`。

### 历史决策更新

V1 中“使用 CSS 原创抽象红树林视觉”的决定已在本轮废止；当前首屏不使用插画。研究分享仍以现有 Markdown 模板和 `data/site.ts` 驱动，项目未引入 Nuxt Content 运行时依赖。
