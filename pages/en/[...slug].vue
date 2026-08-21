<script setup lang="ts">
import InnerPage from '~/components/InnerPage.vue'
import PersonPage from '~/components/PersonPage.vue'
import type { PageKey } from '~/data/site'

defineI18nRoute(false)

const route = useRoute()
const slug = computed(() => Array.isArray(route.params.slug) ? route.params.slug.join('/') : String(route.params.slug || ''))
const valid = ['about', 'research', 'people', 'projects', 'publications', 'platforms', 'news', 'join', 'contact']

if (slug.value !== 'people/liruili' && !valid.includes(slug.value)) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}
</script>

<template>
  <PersonPage v-if="slug === 'people/liruili'" locale="en" />
  <InnerPage v-else :page="slug as PageKey" locale="en" />
</template>
