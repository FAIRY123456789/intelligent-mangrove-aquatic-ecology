<script setup lang="ts">
import { localeMeta, nav, type Locale, type NavRouteKey } from '~/data/site'

const props = defineProps<{ locale: Locale }>()
const route = useRoute()
const publicAsset = usePublicAsset()
const menuOpen = ref(false)
const openDropdown = ref('')
const prefix = computed(() => props.locale === 'zh' ? '' : `/${props.locale}`)
const homeLabel = computed(() => ({ zh: '首页', en: 'Home', id: 'Beranda', ar: 'الرئيسية', pt: 'Início' })[props.locale])
const navigationLabel = computed(() => ({
  zh: '主导航',
  en: 'Main navigation',
  id: 'Navigasi utama',
  ar: 'التنقل الرئيسي',
  pt: 'Navegação principal',
})[props.locale])
const mobileLabel = computed(() => ({
  zh: '移动端导航',
  en: 'Mobile navigation',
  id: 'Navigasi seluler',
  ar: 'تنقل الهاتف',
  pt: 'Navegação móvel',
})[props.locale])

const routeFor = (key: NavRouteKey) => `${prefix.value}/${key}`
const normalizedPath = computed(() => route.path.replace(/\/$/, '') || '/')
const isRouteActive = (key: NavRouteKey) => normalizedPath.value === routeFor(key).replace(/\/$/, '')
const isGroupActive = (children: Array<{ key: NavRouteKey }>) => children.some(item => isRouteActive(item.key))

const selectedLocale = computed({
  get: () => props.locale,
  set: (selected: Locale) => {
    const path = route.path.replace(/^\/(en|id|ar|pt)(?=\/|$)/, '') || '/'
    navigateTo(selected === 'zh' ? path : `/${selected}${path}`)
  },
})

const focusFirstDropdownLink = async (key: string) => {
  openDropdown.value = key
  await nextTick()
  document.querySelector<HTMLAnchorElement>(`#submenu-${key} a`)?.focus()
}

const onTriggerKeydown = (event: KeyboardEvent, key: string) => {
  if (['ArrowDown', 'Enter', ' '].includes(event.key)) {
    event.preventDefault()
    focusFirstDropdownLink(key)
  }
  else if (event.key === 'Escape') {
    openDropdown.value = ''
  }
}

const onGroupFocusOut = (event: FocusEvent, key: string) => {
  const group = event.currentTarget as HTMLElement
  if (!group.contains(event.relatedTarget as Node | null) && openDropdown.value === key) {
    openDropdown.value = ''
  }
}

watch(() => route.path, () => {
  menuOpen.value = false
  openDropdown.value = ''
})
</script>

<template>
  <a class="skip-link" href="#main">
    {{ ({ zh: '跳至主要内容', en: 'Skip to main content', id: 'Lewati ke konten utama', ar: 'انتقل إلى المحتوى الرئيسي', pt: 'Ir para o conteúdo principal' } as const)[locale] }}
  </a>

  <header class="site-header">
    <div class="header-inner">
      <NuxtLink :to="localeMeta[locale].home" class="brand" aria-label="Home">
        <span class="brand-mark" aria-hidden="true">
          <img :src="publicAsset('/brand/site-mark.svg')" alt="" width="38" height="38">
        </span>
        <span>
          <b>{{ localeMeta[locale].name }}</b>
          <small>{{ localeMeta[locale].tagline }}</small>
        </span>
      </NuxtLink>

      <nav class="desktop-nav" :aria-label="navigationLabel">
        <NuxtLink
          :to="localeMeta[locale].home"
          exact-active-class="nav-active"
        >
          {{ homeLabel }}
        </NuxtLink>

        <template v-for="item in nav[locale]" :key="item.key">
          <div
            v-if="item.children"
            class="nav-group"
            :class="{ active: isGroupActive(item.children), open: openDropdown === item.key }"
            @mouseenter="openDropdown = item.key"
            @mouseleave="openDropdown = ''"
            @focusin="openDropdown = item.key"
            @focusout="onGroupFocusOut($event, item.key)"
            @keydown.esc.stop.prevent="openDropdown = ''"
          >
            <button
              type="button"
              aria-haspopup="true"
              :aria-expanded="openDropdown === item.key"
              :aria-controls="`submenu-${item.key}`"
              @click="openDropdown = openDropdown === item.key ? '' : item.key"
              @keydown="onTriggerKeydown($event, item.key)"
            >
              {{ item.label }} <span aria-hidden="true">⌄</span>
            </button>
            <div
              :id="`submenu-${item.key}`"
              class="nav-dropdown"
              :aria-hidden="openDropdown !== item.key"
            >
              <NuxtLink
                v-for="child in item.children"
                :key="child.key"
                :to="routeFor(child.key)"
                exact-active-class="nav-active"
              >
                {{ child.label }}
              </NuxtLink>
            </div>
          </div>

          <NuxtLink
            v-else
            :to="routeFor(item.key)"
            exact-active-class="nav-active"
          >
            {{ item.label }}
          </NuxtLink>
        </template>
      </nav>

      <div class="header-actions">
        <label class="lang-label">
          <span class="sr-only">{{ ({ zh: '语言', en: 'Language', id: 'Bahasa', ar: 'اللغة', pt: 'Idioma' } as const)[locale] }}</span>
          <select v-model="selectedLocale" aria-label="Language selector">
            <option value="zh">中文</option>
            <option value="en">English</option>
            <option value="id">Bahasa Indonesia</option>
            <option value="ar">العربية</option>
            <option value="pt">Português</option>
          </select>
        </label>
        <button
          class="menu-button"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          @click="menuOpen = !menuOpen"
        >
          <span/><span/><span/>
          <b class="sr-only">{{ ({ zh: '打开菜单', en: 'Open menu', id: 'Buka menu', ar: 'فتح القائمة', pt: 'Abrir menu' } as const)[locale] }}</b>
        </button>
      </div>
    </div>

    <nav
      id="mobile-menu"
      class="mobile-nav"
      :class="{ open: menuOpen }"
      :aria-label="mobileLabel"
    >
      <NuxtLink :to="localeMeta[locale].home" exact-active-class="nav-active">
        {{ homeLabel }}
      </NuxtLink>
      <template v-for="item in nav[locale]" :key="item.key">
        <div v-if="item.children" class="mobile-nav-group">
          <p>{{ item.label }}</p>
          <NuxtLink
            v-for="child in item.children"
            :key="child.key"
            :to="routeFor(child.key)"
            exact-active-class="nav-active"
          >
            {{ child.label }}
          </NuxtLink>
        </div>
        <NuxtLink v-else :to="routeFor(item.key)" exact-active-class="nav-active">
          {{ item.label }}
        </NuxtLink>
      </template>
    </nav>
  </header>
</template>
