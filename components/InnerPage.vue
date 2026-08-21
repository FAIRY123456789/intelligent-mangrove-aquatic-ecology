<script setup lang="ts">
import {
  getEvents,
  getPlatforms,
  getProjects,
  getPublications,
  getShares,
  pages,
  publications,
  ui,
  type Locale,
  type PageKey,
} from '~/data/site'

const props = defineProps<{ locale: Locale; page: PageKey }>()
const publicAsset = usePublicAsset()
const copy = computed(() => ui[props.locale])
const content = computed(() => pages[props.locale][props.page])
const prefix = computed(() => props.locale === 'zh' ? '' : `/${props.locale}`)
const projectItems = computed(() => getProjects(props.locale))
const platformItems = computed(() => getPlatforms(props.locale))
const eventItems = computed(() => getEvents(props.locale))
const shareItems = computed(() => getShares(props.locale))
const publicationItems = computed(() => getPublications(props.locale))
const researchSecondaryTitles = computed(() => {
  if (props.locale !== 'zh') return []
  return pages.en.research.cards?.map(item => item[0]) ?? []
})

const q = ref('')
const year = ref('')
const direction = ref('')
const copied = ref('')

const filteredPapers = computed(() => publicationItems.value.filter(paper =>
  [paper.title, paper.journal, ...paper.keywords].join(' ').toLowerCase().includes(q.value.toLowerCase())
  && (!year.value || String(paper.year) === year.value)
  && (!direction.value || paper.direction === direction.value),
))

const labels = {
  zh: {
    project: '项目类别',
    leader: '负责人',
    year: '年份',
    direction: '研究方向',
    person: '人员详情',
    copy: '复制 BibTeX',
    copied: '已复制',
    papers: '代表性论文',
    paperSearch: '论文检索与筛选',
    patents: '专利与软件成果',
    datasets: '数据集与技术成果',
    datasetsLead: '基于现有科研平台资料整理的数据集、方法与技术成果入口。',
    awards: '科研奖励',
    sharing: '研究分享',
    sharingLead: '面向研究团队的周度阅读与资料整理；保留导读与最终原文链接，不转载全文。',
    readFull: '阅读全文',
    map: '打开地图',
    allYears: '全部年份',
    allDirections: '全部研究方向',
    outcomes: '相关成果',
  },
  en: {
    project: 'Project category',
    leader: 'Lead',
    year: 'Year',
    direction: 'Research area',
    person: 'Profile',
    copy: 'Copy BibTeX',
    copied: 'Copied',
    papers: 'Representative papers',
    paperSearch: 'Search and filter',
    patents: 'Patents & software',
    datasets: 'Datasets & technical outcomes',
    datasetsLead: 'Dataset, method and technical-outcome entry points compiled from the current research-platform records.',
    awards: 'Research awards',
    sharing: 'Research notes',
    sharingLead: 'Weekly reading and source curation with concise introductions and direct links to the final source pages.',
    readFull: 'Read full article',
    map: 'Open map',
    allYears: 'All years',
    allDirections: 'All research areas',
    outcomes: 'Related outcomes',
  },
  id: {
    project: 'Kategori proyek',
    leader: 'Pimpinan',
    year: 'Tahun',
    direction: 'Bidang riset',
    person: 'Profil',
    copy: 'Salin BibTeX',
    copied: 'Tersalin',
    papers: 'Publikasi representatif',
    paperSearch: 'Pencarian dan penyaringan',
    patents: 'Paten & perangkat lunak',
    datasets: 'Dataset & capaian teknis',
    datasetsLead: 'Pintu masuk dataset, metode, dan capaian teknis yang dirangkum dari catatan platform riset saat ini.',
    awards: 'Penghargaan riset',
    sharing: 'Berbagi riset',
    sharingLead: 'Kurasi bacaan mingguan dengan pengantar ringkas dan tautan langsung ke halaman sumber akhir.',
    readFull: 'Baca artikel lengkap',
    map: 'Buka peta',
    allYears: 'Semua tahun',
    allDirections: 'Semua bidang riset',
    outcomes: 'Capaian terkait',
  },
  ar: {
    project: 'فئة المشروع', leader: 'القائدة', year: 'السنة', direction: 'مجال البحث', person: 'الملف الشخصي', copy: 'نسخ BibTeX', copied: 'تم النسخ', papers: 'أوراق ممثلة', paperSearch: 'البحث والتصفية', patents: 'براءات الاختراع والبرمجيات', datasets: 'مجموعات البيانات والنتائج التقنية', datasetsLead: 'بوابات لمجموعات البيانات والطرائق والنتائج التقنية المجمعة من سجلات المنصات البحثية.', awards: 'الجوائز البحثية', sharing: 'ملاحظات بحثية', sharingLead: 'قراءات مختصرة وروابط مباشرة إلى صفحات المصادر الأصلية.', readFull: 'قراءة المقال كاملاً', map: 'فتح الخريطة', allYears: 'كل السنوات', allDirections: 'كل مجالات البحث', outcomes: 'النتائج ذات الصلة',
  },
  pt: {
    project: 'Categoria do projeto', leader: 'Líder', year: 'Ano', direction: 'Área de pesquisa', person: 'Perfil', copy: 'Copiar BibTeX', copied: 'Copiado', papers: 'Artigos representativos', paperSearch: 'Pesquisar e filtrar', patents: 'Patentes e software', datasets: 'Conjuntos de dados e resultados técnicos', datasetsLead: 'Pontos de acesso a dados, métodos e resultados técnicos compilados das plataformas de pesquisa.', awards: 'Prêmios de pesquisa', sharing: 'Notas de pesquisa', sharingLead: 'Leituras curtas e links diretos para as fontes originais.', readFull: 'Ler artigo completo', map: 'Abrir mapa', allYears: 'Todos os anos', allDirections: 'Todas as áreas', outcomes: 'Resultados relacionados',
  },
}[props.locale]

const awardSummary = computed(() => ({
  zh: '广东省科学技术奖科技成果推广奖一等奖；环境保护科学技术奖二等奖；中国产学研合作创新成果奖二等奖。',
  en: 'Guangdong Science and Technology Award; Environmental Protection Science and Technology Award; China Industry–University–Research Collaboration Innovation Award.',
  id: 'Penghargaan Sains dan Teknologi Guangdong; Penghargaan Sains dan Teknologi Perlindungan Lingkungan; Penghargaan Inovasi Kolaborasi Industri–Universitas–Riset Tiongkok.',
  ar: 'جائزة غوانغدونغ للعلوم والتكنولوجيا؛ جائزة علوم وتكنولوجيا حماية البيئة؛ جائزة الابتكار للتعاون بين الصناعة والجامعة والبحث.',
  pt: 'Prêmio de Ciência e Tecnologia de Guangdong; Prêmio de Ciência e Tecnologia de Proteção Ambiental; Prêmio de Inovação em Colaboração Indústria–Universidade–Pesquisa.',
})[props.locale])

const aboutLabels = computed(() => ({
  zh: { intro: '团队简介', leader: '团队负责人', profile: '查看负责人学术主页' },
  en: { intro: 'Group introduction', leader: 'Group leader', profile: 'View the leader’s academic profile' },
  id: { intro: 'Pengantar kelompok', leader: 'Ketua kelompok riset', profile: 'Lihat profil akademik ketua kelompok' },
  ar: { intro: 'نبذة عن الفريق', leader: 'قائدة الفريق', profile: 'عرض الملف الأكاديمي للقائدة' },
  pt: { intro: 'Apresentação do grupo', leader: 'Líder do grupo', profile: 'Ver perfil acadêmico da líder' },
})[props.locale])

const mapCopy = computed(() => ({
  zh: {
    title: '北京大学深圳研究生院 E304 室位置地图',
    address: '深圳市南山区西丽深圳大学城北京大学深圳研究生院 E304 室',
    amap: '在高德地图中查看',
    baidu: '在百度地图中查看',
    osm: '在 OpenStreetMap 中查看',
  },
  en: {
    title: 'Map of Room E304, Peking University Shenzhen Graduate School',
    address: 'Room E304, Peking University Shenzhen Graduate School, Shenzhen University Town, Xili, Nanshan District, Shenzhen',
    amap: 'View in Amap',
    baidu: 'View in Baidu Maps',
    osm: 'View in OpenStreetMap',
  },
  id: {
    title: 'Peta Ruang E304, Peking University Shenzhen Graduate School',
    address: 'Ruang E304, Peking University Shenzhen Graduate School, Shenzhen University Town, Xili, Distrik Nanshan, Shenzhen',
    amap: 'Lihat di Amap',
    baidu: 'Lihat di Baidu Maps',
    osm: 'Lihat di OpenStreetMap',
  },
  ar: { title: 'خريطة الغرفة E304، كلية الدراسات العليا بجامعة بكين في شنتشن', address: 'الغرفة E304، كلية الدراسات العليا بجامعة بكين في شنتشن، مدينة شنتشن الجامعية، نانشان، شنتشن', amap: 'عرض في Amap', baidu: 'عرض في خرائط Baidu', osm: 'عرض في OpenStreetMap' },
  pt: { title: 'Mapa da Sala E304, Escola de Pós-Graduação de Shenzhen da Universidade de Pequim', address: 'Sala E304, Escola de Pós-Graduação de Shenzhen da Universidade de Pequim, Cidade Universitária de Shenzhen, Nanshan, Shenzhen', amap: 'Ver no Amap', baidu: 'Ver no Baidu Maps', osm: 'Ver no OpenStreetMap' },
})[props.locale])

const mapAddress = '深圳市南山区西丽深圳大学城北京大学深圳研究生院E304室'
const mapUrls = {
  embed: 'https://www.openstreetmap.org/export/embed.html?bbox=113.9765%2C22.5940%2C113.9905%2C22.6043&layer=mapnik&marker=22.599167%2C113.983611',
  osm: 'https://www.openstreetmap.org/?mlat=22.599167&mlon=113.983611#map=17/22.599167/113.983611',
  amap: `https://uri.amap.com/search?keyword=${encodeURIComponent(mapAddress)}&city=%E6%B7%B1%E5%9C%B3&callnative=0`,
  baidu: `https://map.baidu.com/search/${encodeURIComponent(mapAddress)}`,
}

const copyBib = async (paper: typeof publications[number]) => {
  await navigator.clipboard.writeText(`@article{mangrove${paper.year},\n  title={${paper.title}},\n  journal={${paper.journal}},\n  year={${paper.year}},\n  doi={${paper.doi}}\n}`)
  copied.value = paper.doi
  setTimeout(() => copied.value = '', 1400)
}
</script>

<template>
  <div class="app-shell">
    <SeoMeta :locale="locale" :title="content.title" :description="content.lead" />
    <SiteHeader :locale="locale" />

    <main id="main">
      <section class="page-hero">
        <div class="container">
          <p class="eyebrow">{{ page.toUpperCase() }}</p>
          <h1>{{ content.title }}</h1>
          <p>{{ content.lead }}</p>
          <div class="page-line"/>
        </div>
      </section>

      <section class="section container" :class="`page-${page}`">
        <template v-if="page === 'about'">
          <div class="about-sections">
            <article class="about-section">
              <h2>{{ aboutLabels.intro }}</h2>
              <p v-for="text in content.body" :key="text">{{ text }}</p>
            </article>
            <article
              v-for="(item, index) in content.sections"
              :id="index === 1 ? 'members' : undefined"
              :key="item[0]"
              class="about-section"
            >
              <h2>{{ item[0] }}</h2>
              <p>{{ item[1] }}</p>
              <div v-if="index === 1" class="about-leader-card">
                <img :src="publicAsset('/images/people/li-ruili.jpg')" alt="李瑞利研究员在红树林野外调查现场" width="567" height="567">
                <div>
                  <p class="eyebrow">{{ aboutLabels.leader }}</p>
                  <h3>{{ ({ zh: '李瑞利 研究员', en: 'Li Ruili, Research Fellow', id: 'Li Ruili, Peneliti', ar: 'لي رويلي، باحثة', pt: 'Li Ruili, Pesquisadora' } as const)[locale] }}</h3>
                  <NuxtLink :to="`${prefix}/people/liruili`" class="text-link">{{ aboutLabels.profile }} →</NuxtLink>
                </div>
              </div>
            </article>
          </div>
        </template>

      <template v-else-if="page === 'research'">
        <div class="research-outcomes-link">
          <NuxtLink :to="`${prefix}/publications`" class="text-link">
            {{ labels.outcomes }} →
          </NuxtLink>
        </div>
        <div class="research-grid inner research-sections">
          <article v-for="(item, index) in content.cards" :key="item[0]" class="research-card">
            <span>0{{ index + 1 }}</span>
            <div class="research-title-row">
              <h2>{{ item[0] }}</h2>
              <strong v-if="researchSecondaryTitles[index]">{{ researchSecondaryTitles[index] }}</strong>
            </div>
            <p>{{ item[1] }}</p>
          </article>
        </div>
      </template>

      <template v-else-if="page === 'people'">
        <div class="people-grid">
          <article v-for="person in content.cards" :key="person[0]" class="person-card">
            <div class="portrait" aria-hidden="true">LR</div>
            <p class="eyebrow">{{ person[1] }}</p>
            <h2>{{ person[0] }}</h2>
            <p>{{ person[2] }}</p>
            <NuxtLink
              v-if="locale !== 'zh' || person[0] === '李瑞利'"
              :to="`${prefix}/people/liruili`"
              class="text-link"
            >
              {{ labels.person }} →
            </NuxtLink>
          </article>
        </div>
      </template>

      <template v-else-if="page === 'projects'">
        <div class="project-list full">
          <article v-for="project in projectItems" :key="project.title" class="project-row">
            <time>{{ project.year }}</time>
            <div class="project-main">
              <h2>{{ project.title }}</h2>
              <p>{{ labels.direction }} · {{ project.direction }}</p>
            </div>
            <div class="project-field">
              <small>{{ labels.project }}</small>
              <span>{{ project.type }}</span>
            </div>
            <div class="project-field">
              <small>{{ labels.leader }}</small>
              <span>{{ project.leader }}</span>
            </div>
            <div class="project-status">
              <span>{{ project.status }}</span>
            </div>
          </article>
        </div>
      </template>

      <template v-else-if="page === 'publications'">
        <div class="publications-page">
          <section class="outcome-section" aria-labelledby="representative-papers">
            <div class="subsection-heading">
              <p class="eyebrow">01 / PUBLICATIONS</p>
              <h2 id="representative-papers">{{ labels.papers }}</h2>
            </div>

            <div class="filter-section">
              <h3>{{ labels.paperSearch }}</h3>
              <div class="filters">
                <label>
                  <span class="sr-only">{{ copy.search }}</span>
                  <input v-model="q" type="search" :placeholder="copy.search">
                </label>
                <select v-model="year">
                  <option value="">{{ labels.allYears }}</option>
                  <option v-for="item in publicationItems" :key="item.year" :value="String(item.year)">{{ item.year }}</option>
                </select>
                <select v-model="direction">
                  <option value="">{{ labels.allDirections }}</option>
                  <option v-for="item in [...new Set(publicationItems.map(p => p.direction))]" :key="item" :value="item">{{ item }}</option>
                </select>
                <button @click="q = ''; year = ''; direction = ''">{{ copy.clear }}</button>
              </div>
            </div>

            <p class="result-count">{{ filteredPapers.length }} {{ labels.papers }}</p>
            <div class="publication-list">
              <article v-for="paper in filteredPapers" :key="paper.doi">
                <p>{{ paper.year }} · {{ paper.journal }} · {{ paper.direction }}</p>
                <h3>{{ paper.title }}</h3>
                <div>
                  <a :href="`https://doi.org/${paper.doi}`" target="_blank" rel="noopener noreferrer">
                    https://doi.org/{{ paper.doi }} ↗
                  </a>
                  <button @click="copyBib(paper)">{{ copied === paper.doi ? labels.copied : labels.copy }}</button>
                </div>
              </article>
            </div>
          </section>

          <section class="outcome-section" aria-labelledby="patents">
            <div class="subsection-heading">
              <p class="eyebrow">02 / PATENTS</p>
              <h2 id="patents">{{ labels.patents }}</h2>
            </div>
            <article class="achievement-row">
              <p>
                <a href="https://patents.google.com/patent/CN112861837B/zh" target="_blank" rel="noopener noreferrer">
                  一种基于无人机的红树林生态信息智慧提取方法 ↗
                </a>
              </p>
            </article>
          </section>

          <section class="outcome-section" aria-labelledby="datasets">
            <div class="subsection-heading">
              <p class="eyebrow">03 / DATA & TECHNOLOGY</p>
              <h2 id="datasets">{{ labels.datasets }}</h2>
              <p>{{ labels.datasetsLead }}</p>
            </div>
            <div class="platform-grid outcome-platforms">
              <article v-for="(platform, index) in platformItems.slice(0, 3)" :key="platform.title" class="platform-card">
                <span class="platform-number">0{{ index + 1 }}</span>
                <h3>{{ platform.title }}</h3>
                <p>{{ platform.desc }}</p>
              </article>
            </div>
          </section>

          <section class="outcome-section" aria-labelledby="awards">
            <div class="subsection-heading">
              <p class="eyebrow">04 / AWARDS</p>
              <h2 id="awards">{{ labels.awards }}</h2>
            </div>
            <article class="achievement-row">
              <strong>3</strong>
              <p>{{ awardSummary }}</p>
            </article>
          </section>

          <section id="research-sharing" class="outcome-section research-sharing" aria-labelledby="sharing-title">
            <div class="subsection-heading">
              <p class="eyebrow">05 / RESEARCH SHARING</p>
              <h2 id="sharing-title">{{ labels.sharing }}</h2>
              <p>{{ labels.sharingLead }}</p>
            </div>
            <div class="share-list">
              <a
                v-for="share in shareItems"
                :key="share.title"
                :href="share.url"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>
                  <p>{{ share.category }} · {{ share.date }}</p>
                  <h3>{{ share.title }}</h3>
                  <p>{{ share.summary }}</p>
                </div>
                <div class="share-meta">
                  <span>{{ share.source }}</span>
                  <strong>{{ labels.readFull }} ↗</strong>
                </div>
              </a>
            </div>
          </section>
        </div>
      </template>

      <template v-else-if="page === 'platforms'">
        <div class="platform-grid inner">
          <article
            v-for="(platform, index) in platformItems"
            :key="platform.title"
            class="platform-card"
          >
            <span class="platform-number">0{{ index + 1 }}</span>
            <h2>{{ platform.title }}</h2>
            <p>{{ platform.desc }}</p>
          </article>
        </div>
      </template>

      <template v-else-if="page === 'news'">
        <div class="event-list">
          <a
            v-for="event in eventItems"
            :key="event.title"
            :href="event.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{{ event.date }}<small>{{ event.type }}</small></span>
            <div>
              <h2>{{ event.title }}</h2>
              <p>{{ event.summary }}</p>
              <small>{{ event.place }}</small>
            </div>
            <b>↗</b>
          </a>
        </div>
      </template>

      <template v-else-if="page === 'join'">
        <div class="detail-grid join-grid">
          <article v-for="item in content.cards" :key="item[0]">
            <h2>{{ item[0] }}</h2>
            <p>{{ item[1] }}</p>
          </article>
        </div>
        <a class="button button-dark" href="mailto:liruili@pkusz.edu.cn">
          liruili@pkusz.edu.cn <span>→</span>
        </a>
      </template>

        <template v-else-if="page === 'contact'">
        <div class="contact-layout">
          <div class="contact-card">
            <article v-for="item in content.cards" :key="item[0]">
              <span>{{ item[0] }}</span>
              <strong>{{ item[1] }}</strong>
            </article>
            <div class="button-row">
              <a class="button button-dark" href="mailto:liruili@pkusz.edu.cn">Email <span>→</span></a>
              <a
                class="button button-ghost"
                :href="mapUrls.osm"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ labels.map }} ↗
              </a>
            </div>
            <nav class="external-map-links" :aria-label="labels.map">
              <a :href="mapUrls.amap" target="_blank" rel="noopener noreferrer">{{ mapCopy.amap }} ↗</a>
              <a :href="mapUrls.baidu" target="_blank" rel="noopener noreferrer">{{ mapCopy.baidu }} ↗</a>
              <a :href="mapUrls.osm" target="_blank" rel="noopener noreferrer">{{ mapCopy.osm }} ↗</a>
            </nav>
          </div>
          <div class="map-panel">
            <iframe
              :src="mapUrls.embed"
              :title="mapCopy.title"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allow="fullscreen"
            />
            <div class="map-fallback">
              <strong>{{ mapCopy.address }}</strong>
              <a :href="mapUrls.osm" target="_blank" rel="noopener noreferrer">{{ mapCopy.osm }} ↗</a>
            </div>
          </div>
        </div>
      </template>
      </section>
    </main>

    <SiteFooter :locale="locale" />
  </div>
</template>
