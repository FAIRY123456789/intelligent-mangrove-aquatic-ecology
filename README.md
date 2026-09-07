# Intelligent Mangrove and Aquatic Ecology Team Website

English · [简体中文](README.zh-CN.md)

A static, multilingual research-team website built with Nuxt, Vue, and TypeScript. It presents research themes, selected projects and publications, team information, news, collaboration routes, and public contact channels while keeping factual provenance and review status visible in the content model.

This repository is a public-site implementation, not an official university website or an internal research-management system.

## Highlights

- static generation with no runtime database or backend;
- Chinese, English, Indonesian, Arabic, and Portuguese routes;
- responsive institutional layout and keyboard-accessible navigation;
- structured project, publication, platform, news, and profile content;
- canonical, hreflang, Open Graph, sitemap, and JSON-LD support;
- source IDs and review states for public factual content;
- Vitest, ESLint, TypeScript, translation, build, and Playwright checks;
- root-path and subpath deployment support.

## Content boundaries

- The Chinese content is the primary factual version; translations follow the same information architecture.
- Representative publications require a traceable DOI, but the list is not presented as a complete bibliography.
- Author lists are not used to infer current team membership.
- Pending facts and image permissions remain explicit review items under `docs/`.
- The site does not use a university emblem or claim institutional endorsement.

## Architecture

```text
pages/ + locale routes
        |
        v
Nuxt page components + SEO components
        |
        v
data/site.ts + localized content + source ledger
        |
        v
Nitro static output in .output/public/
```

## Technology

- Node.js `20.19.x`, npm 10+
- Nuxt `3.17.7`
- Vue `3.5.28`
- TypeScript strict mode
- `@nuxtjs/i18n` and `@nuxtjs/sitemap`
- Vitest, ESLint, vue-tsc, and Playwright

## Local development

```powershell
npm ci
npm run dev
```

Quality gates:

```powershell
npm run check:i18n
npm run lint
npm run typecheck
npm test
npm run generate
```

Browser checks require a Playwright-compatible Chromium installation:

```powershell
npm run test:e2e
```

## Deployment

Generate the static site with `npm run generate`; output is written to `.output/public/`. Configure:

- `NUXT_PUBLIC_SITE_URL` for canonical URLs and sitemap generation;
- `NUXT_APP_BASE_URL` for root or subpath hosting.

See `docs/DEPLOYMENT.md` for generic static hosting guidance. Host addresses, credentials, and machine-specific release paths are intentionally not documented in this public README.

## Repository map

| Path | Purpose |
|---|---|
| `pages/` | Locale-aware routes and redirects |
| `components/` | Layout, content, profile, and SEO components |
| `data/site.ts` | Structured multilingual public content |
| `content/` | Research-sharing Markdown templates |
| `docs/SOURCE_LEDGER.md` | Public-source provenance records |
| `docs/CONTENT_REVIEW.md` | Facts requiring review before publication |
| `docs/IMAGE_RIGHTS.md` | Image provenance and permission status |
| `tests/` | Unit and browser checks |

## Scope and license

The codebase demonstrates a maintainable static research portal. Team facts, organizational relationships, and media permissions remain subject to the documented review process.

The software code is available under the [Apache License 2.0](LICENSE). Photographs, research content, names, marks, and third-party media are excluded unless their source record explicitly states otherwise.