<script setup lang="ts">
import { localeMeta, type Locale } from '~/data/site'
const props = defineProps<{ locale: Locale; title?: string; description?: string }>()
const route = useRoute(); const config = useRuntimeConfig()
const name = computed(() => props.title ? `${props.title} | ${localeMeta[props.locale].name}` : localeMeta[props.locale].name)
const description = computed(() => props.description || localeMeta[props.locale].tagline)
const siteBase = computed(() => `${config.public.siteUrl}${config.public.sitePath}`)
const canonical = computed(() => `${siteBase.value}${route.path}`)
const localeFreePath = computed(() => route.path.replace(/^\/(en|id|ar|pt)(?=\/|$)/, '') || '/')
useHead({ htmlAttrs: { lang: localeMeta[props.locale].language, dir: localeMeta[props.locale].dir }, title: name, meta: [{ name: 'description', content: description }, { property: 'og:title', content: name }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }, { name: 'robots', content: 'index,follow' }], link: [{ rel: 'canonical', href: canonical }, { rel: 'alternate', hreflang: 'zh-CN', href: `${siteBase.value}${localeFreePath.value}` }, { rel: 'alternate', hreflang: 'en', href: `${siteBase.value}/en${localeFreePath.value}` }, { rel: 'alternate', hreflang: 'id', href: `${siteBase.value}/id${localeFreePath.value}` }, { rel: 'alternate', hreflang: 'ar', href: `${siteBase.value}/ar${localeFreePath.value}` }, { rel: 'alternate', hreflang: 'pt', href: `${siteBase.value}/pt${localeFreePath.value}` }, { rel: 'alternate', hreflang: 'x-default', href: `${siteBase.value}${localeFreePath.value}` }], script: [{ type: 'application/ld+json' as 'application/json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ResearchOrganization', name: localeMeta[props.locale].name, url: canonical.value, parentOrganization: { '@type': 'Organization', name: 'Peking University Shenzhen Graduate School, School of Environment and Energy' } }) }] })
</script><template><slot /></template>
