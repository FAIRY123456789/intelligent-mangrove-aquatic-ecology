<script setup lang="ts">
import {
  getEvents,
  localeMeta,
  pages,
  ui,
  type Locale,
} from '~/data/site'

const props = defineProps<{ locale: Locale }>()
const publicAsset = usePublicAsset()
const copy = computed(() => ui[props.locale])
const meta = computed(() => localeMeta[props.locale])
const local = computed(() => pages[props.locale])
const prefix = computed(() => props.locale === 'zh' ? '' : `/${props.locale}`)
const path = (page: string) => `${prefix.value}/${page}`
const research = computed(() => local.value.research.cards ?? [])
const eventItems = computed(() => getEvents(props.locale))

const homeCopy = computed(() => ({
  zh: {
    institution: '公开科研团队门户 · 深圳',
    intro: '围绕人工智能、生态监测、蓝碳评估与生态修复开展研究。',
    latest: '最新动态',
    latestLead: '学术交流、项目进展与招生合作信息。',
    leader: '负责人',
    platforms: '科研平台',
    platformsLead: '连接研究数据、生态诊断方法与保护修复技术。',
    news: '新闻与交流',
    newsLead: '查看团队公开活动、学术论坛、野外调查与国际交流。',
    join: '加入我们',
    joinLead: '面向生态学、遥感、环境科学、人工智能方向开展交流。',
    view: '查看入口',
    viewAll: '查看全部',
    photoAlt: '智能红树林与水生态研究团队合影',
  },
  en: {
    institution: 'Public research group portal · Shenzhen',
    intro: 'Research spanning artificial intelligence, ecological monitoring, blue-carbon assessment and ecological restoration.',
    latest: 'Latest news',
    latestLead: 'Academic exchange, project progress and research opportunities.',
    leader: 'Lead',
    platforms: 'Research platforms',
    platformsLead: 'Connecting research data, ecological diagnosis and conservation-restoration technologies.',
    news: 'News & exchange',
    newsLead: 'Public activities, academic forums, field surveys and international exchange.',
    join: 'Join us',
    joinLead: 'Exchange opportunities across ecology, remote sensing, environmental science, AI and aquatic ecology.',
    view: 'Open section',
    viewAll: 'View all',
    photoAlt: 'Group photo of the Intelligent Mangrove and Aquatic Ecology Research Group',
  },
  id: {
    institution: 'Portal kelompok riset publik · Shenzhen',
    intro: 'Riset kecerdasan buatan, pemantauan ekologi, evaluasi karbon biru, dan restorasi ekologis.',
    latest: 'Berita terbaru',
    latestLead: 'Pertukaran akademik, perkembangan proyek, dan peluang riset.',
    leader: 'Pimpinan',
    platforms: 'Platform riset',
    platformsLead: 'Menghubungkan data riset, diagnosis ekologi, serta teknologi konservasi dan restorasi.',
    news: 'Berita & pertukaran',
    newsLead: 'Kegiatan publik, forum akademik, survei lapangan, dan pertukaran internasional.',
    join: 'Bergabung',
    joinLead: 'Peluang dalam ekologi, penginderaan jauh, ilmu lingkungan, AI, dan ekologi perairan.',
    view: 'Buka bagian',
    viewAll: 'Lihat semua',
    photoAlt: 'Foto Kelompok Riset Mangrove Cerdas dan Ekologi Perairan',
  },
  ar: {
    institution: 'بوابة فريق بحثي عامة · شنتشن',
    intro: 'أبحاث في الذكاء الاصطناعي والرصد البيئي وتقييم الكربون الأزرق والاستعادة البيئية.',
    latest: 'أحدث الأخبار', latestLead: 'التبادل الأكاديمي وتقدم المشروعات وفرص البحث.', leader: 'قائدة الفريق',
    platforms: 'المنصات البحثية', platformsLead: 'ربط بيانات البحث والتشخيص البيئي وتقنيات الحماية والاستعادة.',
    news: 'الأخبار والتبادل', newsLead: 'الفعاليات العامة والمنتديات الأكاديمية والمسوحات الميدانية والتبادل الدولي.',
    join: 'انضم إلينا', joinLead: 'فرص في البيئة والاستشعار عن بعد والعلوم البيئية والذكاء الاصطناعي والبيئة المائية.',
    view: 'فتح القسم', viewAll: 'عرض الكل', photoAlt: 'صورة فريق أبحاث المانغروف الذكي والبيئة المائية',
  },
  pt: {
    institution: 'Portal público do grupo de pesquisa · Shenzhen',
    intro: 'Pesquisa em inteligência artificial, monitoramento ecológico, carbono azul e restauração ecológica.',
    latest: 'Notícias recentes', latestLead: 'Intercâmbio acadêmico, andamento de projetos e oportunidades de pesquisa.', leader: 'Líder',
    platforms: 'Plataformas de pesquisa', platformsLead: 'Conectando dados, diagnóstico ecológico e tecnologias de conservação e restauração.',
    news: 'Notícias e intercâmbio', newsLead: 'Atividades públicas, fóruns acadêmicos, trabalho de campo e intercâmbio internacional.',
    join: 'Junte-se a nós', joinLead: 'Oportunidades em ecologia, sensoriamento remoto, ciências ambientais, IA e ecologia aquática.',
    view: 'Abrir seção', viewAll: 'Ver tudo', photoAlt: 'Foto do Grupo de Pesquisa em Manguezais Inteligentes e Ecologia Aquática',
  },
})[props.locale])

const secondary = computed(() => {
  const zh = {
    latest: 'NEWS & EXCHANGE',
    platforms: 'RESEARCH PLATFORMS',
    news: 'NEWS & EXCHANGE',
    join: 'JOIN US',
  }
  const singleLanguage = {
    latest: '',
    platforms: '',
    news: '',
    join: '',
  }
  return props.locale === 'zh' ? zh : singleLanguage
})
</script>

<template>
  <div class="app-shell home-shell">
    <SeoMeta :locale="locale" />
    <SiteHeader :locale="locale" />

    <main
      id="main"
      class="v7-home"
      :style="{ '--mangrove-line-image': `url(${publicAsset('/brand/mangrove-line-background.svg')})` }"
    >
      <section class="portal-hero">
        <span class="mangrove-line-art mangrove-line-art-hero" aria-hidden="true" />
        <div class="container portal-grid portal-hero-grid">
          <div>
            <p class="eyebrow">{{ homeCopy.institution }}</p>
            <h1>{{ meta.name }}</h1>
            <p class="portal-intro">{{ homeCopy.intro }}</p>
            <div class="button-row">
              <NuxtLink class="button button-primary" :to="path('about')">
                {{ local.about.title }} <span aria-hidden="true">→</span>
              </NuxtLink>
              <NuxtLink class="button button-outline" :to="path('publications')">
                {{ copy.outcomes }} <span aria-hidden="true">↗</span>
              </NuxtLink>
            </div>
          </div>
          <aside class="portal-identity" :aria-label="meta.tagline">
            <p>{{ meta.tagline }}</p>
            <dl>
              <div>
                <dt>{{ homeCopy.leader }}</dt>
                <dd>
                  <NuxtLink :to="path('people/liruili')">
                    {{ ({ zh: '李瑞利 研究员', en: 'Li Ruili · Research Fellow', id: 'Li Ruili · Peneliti', ar: 'لي رويلي · باحثة', pt: 'Li Ruili · Pesquisadora' } as const)[locale] }}
                  </NuxtLink>
                </dd>
              </div>
              <div>
                <dt>{{ local.research.title }}</dt>
                <dd>{{ research.map(item => item[0]).join(' · ') }}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section class="team-news-section">
        <div class="container portal-grid team-news-grid">
          <div class="team-photo">
            <img
              :src="publicAsset('/images/team/team-photo.jpg')"
              :alt="homeCopy.photoAlt"
              width="2280"
              height="1280"
              fetchpriority="high"
            >
          </div>

          <div class="latest-panel">
            <SectionHeading
              :title="homeCopy.latest"
              :secondary="secondary.latest"
              :lead="homeCopy.latestLead"
            >
              <NuxtLink :to="path('news')" class="text-link">{{ homeCopy.viewAll }} →</NuxtLink>
            </SectionHeading>
            <div class="home-news-list">
              <a
                v-for="event in eventItems.slice(0, 4)"
                :key="event.title"
                :href="event.url"
                target="_blank"
                rel="noopener noreferrer"
                class="news-row"
              >
                <time>{{ event.date }}</time>
                <span>{{ event.title }}</span>
                <b aria-hidden="true">↗</b>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section class="home-directory">
        <span class="mangrove-line-art mangrove-line-art-directory" aria-hidden="true" />
        <div class="container home-directory-grid">
          <div>
            <SectionHeading
              :title="homeCopy.platforms"
              :secondary="secondary.platforms"
              :lead="homeCopy.platformsLead"
            >
              <NuxtLink :to="path('platforms')" class="text-link">{{ homeCopy.view }} →</NuxtLink>
            </SectionHeading>
          </div>
          <div>
            <SectionHeading
              :title="homeCopy.news"
              :secondary="secondary.news"
              :lead="homeCopy.newsLead"
            >
              <NuxtLink :to="path('news')" class="text-link">{{ homeCopy.view }} →</NuxtLink>
            </SectionHeading>
          </div>
          <div>
            <SectionHeading
              :title="homeCopy.join"
              :secondary="secondary.join"
              :lead="homeCopy.joinLead"
            >
              <NuxtLink :to="path('join')" class="text-link">{{ homeCopy.view }} →</NuxtLink>
            </SectionHeading>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter :locale="locale" />
  </div>
</template>
