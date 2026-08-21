const slugs = [
  'about',
  'research',
  'people',
  'people/liruili',
  'projects',
  'publications',
  'platforms',
  'sharing',
  'news',
  'join',
  'contact',
]

const localeRoutes = ['', 'en', 'id', 'ar', 'pt'].flatMap((prefix) =>
  ['', ...slugs].map((slug) => {
    const path = [prefix, slug].filter(Boolean).join('/')
    return path ? `/${path}` : '/'
  }),
)

const appBaseURL = process.env.NUXT_APP_BASE_URL || '/'
const publicAsset = (path: string) => `${appBaseURL.endsWith('/') ? appBaseURL : `${appBaseURL}/`}${path.replace(/^\//, '')}`
const sitePath = process.env.NUXT_PUBLIC_SITE_PATH || appBaseURL.replace(/\/$/, '')
const publicSiteURL = process.env.NUXT_PUBLIC_SITE_URL || `https://intelligent-mangrove.example.org${sitePath}`
const siteOrigin = (() => {
  try {
    return new URL(publicSiteURL).origin
  }
  catch {
    return publicSiteURL
  }
})()

// nuxt-site-config also reads NUXT_PUBLIC_SITE_URL as an origin. Keep the
// deployment path separately so sitemap URLs receive the Nuxt base only once.
if (process.env.NUXT_PUBLIC_SITE_URL) {
  process.env.NUXT_PUBLIC_SITE_URL = siteOrigin
}

export default defineNuxtConfig({
  compatibilityDate: '2026-07-01',
  telemetry: false,
  devtools: { enabled: false },
  modules: ['@nuxtjs/i18n', '@nuxtjs/sitemap'],
  css: ['~/assets/css/main.css'],
  typescript: {
    strict: true,
    typeCheck: true,
  },
  app: {
    baseURL: appBaseURL,
    head: {
      meta: [
        { name: 'theme-color', content: '#075A52' },
        { name: 'color-scheme', content: 'light' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: publicAsset('/favicon.svg') },
        { rel: 'alternate icon', type: 'image/x-icon', href: publicAsset('/favicon.ico') },
        { rel: 'apple-touch-icon', sizes: '180x180', href: publicAsset('/apple-touch-icon.png') },
        { rel: 'preconnect', href: 'https://doi.org' },
      ],
    },
  },
  routeRules: {
    '/people': { redirect: { to: publicAsset('/about#members'), statusCode: 301 } },
    '/en/people': { redirect: { to: publicAsset('/en/about#members'), statusCode: 301 } },
    '/id/people': { redirect: { to: publicAsset('/id/about#members'), statusCode: 301 } },
    '/ar/people': { redirect: { to: publicAsset('/ar/about#members'), statusCode: 301 } },
    '/pt/people': { redirect: { to: publicAsset('/pt/about#members'), statusCode: 301 } },
  },
  i18n: {
    strategy: 'prefix_except_default',
    defaultLocale: 'zh',
    detectBrowserLanguage: false,
    bundle: {
      optimizeTranslationDirective: false,
    },
    locales: [
      { code: 'zh', language: 'zh-CN', name: '中文', file: 'zh-CN.json' },
      { code: 'en', language: 'en', name: 'English', file: 'en.json' },
      { code: 'id', language: 'id', name: 'Bahasa Indonesia', file: 'id.json' },
      { code: 'ar', language: 'ar', name: 'العربية', file: 'ar.json', dir: 'rtl' },
      { code: 'pt', language: 'pt', name: 'Português', file: 'pt.json' },
    ],
    langDir: 'locales',
  },
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: localeRoutes,
      failOnError: true,
    },
  },
  runtimeConfig: {
    public: {
      siteUrl: siteOrigin,
      sitePath,
    },
  },
  site: {
    url: siteOrigin,
    name: '智能红树林与水生态研究团队',
  },
  sitemap: {
    autoLastmod: true,
    discoverImages: false,
    exclude: ['/sharing', '/en/sharing', '/id/sharing', '/ar/sharing', '/pt/sharing'],
  },
})
