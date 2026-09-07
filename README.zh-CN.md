# 智能红树林与水生态研究团队公开网站

[English](README.md) · 简体中文

这是一个使用 Nuxt、Vue 和 TypeScript 构建的静态多语言科研团队网站，展示研究方向、代表项目与论文、团队信息、新闻、合作入口和公开联系方式，并在内容模型中保留事实来源与审核状态。

本仓库是公开网站实现，不是大学官方网站，也不是内部科研管理系统。

## 主要能力

- 无运行时数据库和后端依赖的静态生成；
- 中文、英文、印尼语、阿拉伯语和葡萄牙语路由；
- 响应式机构风格布局与键盘可访问导航；
- 结构化项目、论文、平台、新闻和负责人内容；
- canonical、hreflang、Open Graph、sitemap 和 JSON-LD；
- 为公开事实保留来源编号和审核状态；
- Vitest、ESLint、TypeScript、翻译、构建和 Playwright 检查；
- 支持根路径和子路径部署。

## 内容边界

- 中文是事实主版本，其他语言保持同一信息架构；
- 代表论文需具备可追溯 DOI，但不声明为完整成果库；
- 不根据作者名单推断当前团队成员；
- 待确认事实和图片授权在 `docs/` 中保留为显式审核项；
- 网站不使用大学校徽，也不声称获得机构官方背书。

## 架构

```text
pages/ 与多语言路由
        |
        v
Nuxt 页面组件与 SEO 组件
        |
        v
data/site.ts + 多语言内容 + 来源台账
        |
        v
Nitro 静态产物 .output/public/
```

## 技术栈

- Node.js `20.19.x`、npm 10+
- Nuxt `3.17.7`
- Vue `3.5.28`
- TypeScript 严格模式
- `@nuxtjs/i18n`、`@nuxtjs/sitemap`
- Vitest、ESLint、vue-tsc、Playwright

## 本地开发

```powershell
npm ci
npm run dev
```

质量门禁：

```powershell
npm run check:i18n
npm run lint
npm run typecheck
npm test
npm run generate
```

浏览器检查需要可供 Playwright 使用的 Chromium：

```powershell
npm run test:e2e
```

## 部署

运行 `npm run generate`，静态产物位于 `.output/public/`。需要配置：

- `NUXT_PUBLIC_SITE_URL`：canonical 与 sitemap 的公开地址；
- `NUXT_APP_BASE_URL`：根路径或子路径部署前缀。

通用静态部署说明见 `docs/DEPLOYMENT.md`。本公开 README 不记录服务器地址、凭据或机器专用发布路径。

## 目录

| 路径 | 用途 |
|---|---|
| `pages/` | 多语言路由与兼容重定向 |
| `components/` | 布局、内容、负责人和 SEO 组件 |
| `data/site.ts` | 结构化多语言公开内容 |
| `content/` | 研究分享 Markdown 模板 |
| `docs/SOURCE_LEDGER.md` | 公开来源台账 |
| `docs/CONTENT_REVIEW.md` | 上线前仍需确认的事实 |
| `docs/IMAGE_RIGHTS.md` | 图片来源与授权状态 |
| `tests/` | 单元和浏览器检查 |

## 定位与许可证

代码库展示的是可维护静态科研门户。团队事实、组织关系和素材授权仍以文档中的审核流程为准。

仓库当前未选择统一开源许可证。公开可见不等同于授予复制、修改或再分发网站及素材的许可。