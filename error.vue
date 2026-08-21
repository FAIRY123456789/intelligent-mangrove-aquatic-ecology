<script setup lang="ts">
import type { Locale } from '~/data/site'

const error = useError()
const route = useRoute()
const prefix = computed(() => route.path.startsWith('/en') ? '/en/' : route.path.startsWith('/id') ? '/id/' : '/')
const locale = computed<Locale>(() => route.path.startsWith('/en') ? 'en' : route.path.startsWith('/id') ? 'id' : 'zh')
</script>
<template>
  <div class="app-shell">
    <SiteHeader :locale="locale" />
    <main id="main" class="not-found">
      <div>
        <p class="eyebrow">404 / NOT FOUND</p>
        <h1>{{ locale === 'zh' ? '页面未找到' : locale === 'en' ? 'Page not found' : 'Halaman tidak ditemukan' }}</h1>
        <p>{{ error?.statusMessage || 'The page you requested is unavailable.' }}</p>
        <NuxtLink class="button button-dark" :to="prefix">
          {{ locale === 'zh' ? '返回首页' : locale === 'en' ? 'Return home' : 'Kembali ke beranda' }} →
        </NuxtLink>
      </div>
    </main>
    <SiteFooter :locale="locale" />
  </div>
</template>
