export const locales = ['zh', 'en', 'id', 'ar', 'pt'] as const
export type Locale = typeof locales[number]
export type PageKey = 'about' | 'research' | 'people' | 'projects' | 'publications' | 'platforms' | 'news' | 'join' | 'contact'
export type NavRouteKey = PageKey | 'people/liruili'
export type NavItem = {
  key: PageKey
  label: string
  children?: Array<{ key: NavRouteKey; label: string }>
}

export const localeMeta: Record<Locale, { label: string; name: string; tagline: string; home: string; language: string; dir: 'ltr' | 'rtl' }> = {
  zh: { label: '中文', name: '智能红树林与水生态研究团队', tagline: '智能感知 · 生态监测 · 修复科学', home: '/', language: 'zh-CN', dir: 'ltr' },
  en: { label: 'English', name: 'Intelligent Mangrove and Aquatic Ecology Research Group', tagline: 'Intelligent sensing · ecological monitoring · restoration science', home: '/en/', language: 'en', dir: 'ltr' },
  id: { label: 'Bahasa Indonesia', name: 'Kelompok Riset Mangrove Cerdas dan Ekologi Perairan', tagline: 'Penginderaan cerdas · pemantauan ekologi · sains restorasi', home: '/id/', language: 'id', dir: 'ltr' },
  ar: { label: 'العربية', name: 'فريق أبحاث المانغروف الذكي والبيئة المائية', tagline: 'الاستشعار الذكي · الرصد البيئي · علوم الاستعادة', home: '/ar/', language: 'ar', dir: 'rtl' },
  pt: { label: 'Português', name: 'Grupo de Pesquisa em Manguezais Inteligentes e Ecologia Aquática', tagline: 'Sensoriamento inteligente · monitoramento ecológico · ciência da restauração', home: '/pt/', language: 'pt', dir: 'ltr' },
}

export const nav: Record<Locale, NavItem[]> = {
  zh: [
    { key: 'about', label: '关于团队', children: [{ key: 'people/liruili', label: '团队负责人' }, { key: 'about', label: '团队介绍' }, { key: 'research', label: '研究方向' }] },
    { key: 'projects', label: '科研成果', children: [{ key: 'projects', label: '科研项目' }, { key: 'publications', label: '论文与成果' }, { key: 'platforms', label: '科研平台' }] },
    { key: 'news', label: '新闻与交流' },
    { key: 'join', label: '加入我们' },
    { key: 'contact', label: '联系方式' },
  ],
  en: [
    { key: 'about', label: 'About', children: [{ key: 'people/liruili', label: 'Group Leader' }, { key: 'about', label: 'Group Overview' }, { key: 'research', label: 'Research Areas' }] },
    { key: 'projects', label: 'Outcomes', children: [{ key: 'projects', label: 'Research Projects' }, { key: 'publications', label: 'Publications & Outcomes' }, { key: 'platforms', label: 'Research Platforms' }] },
    { key: 'news', label: 'News & Exchange' },
    { key: 'join', label: 'Join Us' },
    { key: 'contact', label: 'Contact' },
  ],
  id: [
    { key: 'about', label: 'Tentang', children: [{ key: 'people/liruili', label: 'Ketua Kelompok Riset' }, { key: 'about', label: 'Profil Kelompok' }, { key: 'research', label: 'Bidang Riset' }] },
    { key: 'projects', label: 'Capaian', children: [{ key: 'projects', label: 'Proyek Riset' }, { key: 'publications', label: 'Publikasi & Capaian' }, { key: 'platforms', label: 'Platform Riset' }] },
    { key: 'news', label: 'Berita & Pertukaran' },
    { key: 'join', label: 'Bergabung' },
    { key: 'contact', label: 'Kontak' },
  ],
  ar: [
    { key: 'about', label: 'عن الفريق', children: [{ key: 'people/liruili', label: 'قائد الفريق' }, { key: 'about', label: 'نبذة عن الفريق' }, { key: 'research', label: 'مجالات البحث' }] },
    { key: 'projects', label: 'الإنجازات البحثية', children: [{ key: 'projects', label: 'المشروعات البحثية' }, { key: 'publications', label: 'المنشورات والإنجازات' }, { key: 'platforms', label: 'المنصات البحثية' }] },
    { key: 'news', label: 'الأخبار والتبادل' },
    { key: 'join', label: 'انضم إلينا' },
    { key: 'contact', label: 'اتصل بنا' },
  ],
  pt: [
    { key: 'about', label: 'Sobre', children: [{ key: 'people/liruili', label: 'Líder do grupo' }, { key: 'about', label: 'Visão geral' }, { key: 'research', label: 'Áreas de pesquisa' }] },
    { key: 'projects', label: 'Resultados', children: [{ key: 'projects', label: 'Projetos de pesquisa' }, { key: 'publications', label: 'Publicações e resultados' }, { key: 'platforms', label: 'Plataformas de pesquisa' }] },
    { key: 'news', label: 'Notícias e intercâmbio' },
    { key: 'join', label: 'Junte-se a nós' },
    { key: 'contact', label: 'Contato' },
  ],
}

export const ui = {
  zh: { explore: '了解研究方向', outcomes: '查看科研成果', read: '了解更多', status: '状态', all: '全部', search: '搜索标题、期刊或关键词', clear: '清除筛选', published: '发表', overview: '概览', official: '访问原始页面', contact: '联系团队' },
  en: { explore: 'Explore research', outcomes: 'View outcomes', read: 'Learn more', status: 'Status', all: 'All', search: 'Search title, journal or keyword', clear: 'Clear filters', published: 'Published', overview: 'Overview', official: 'Open original page', contact: 'Contact the group' },
  id: { explore: 'Jelajahi riset', outcomes: 'Lihat capaian', read: 'Pelajari lebih lanjut', status: 'Status', all: 'Semua', search: 'Cari judul, jurnal, atau kata kunci', clear: 'Hapus filter', published: 'Terbit', overview: 'Ikhtisar', official: 'Buka halaman asli', contact: 'Hubungi kelompok' },
  ar: { explore: 'استكشف البحث', outcomes: 'عرض الإنجازات', read: 'اقرأ المزيد', status: 'الحالة', all: 'الكل', search: 'ابحث في العنوان أو المجلة أو الكلمات المفتاحية', clear: 'مسح عوامل التصفية', published: 'منشور', overview: 'نظرة عامة', official: 'فتح الصفحة الأصلية', contact: 'اتصل بالفريق' },
  pt: { explore: 'Explorar pesquisas', outcomes: 'Ver resultados', read: 'Saiba mais', status: 'Status', all: 'Todos', search: 'Pesquisar título, periódico ou palavra-chave', clear: 'Limpar filtros', published: 'Publicado', overview: 'Visão geral', official: 'Abrir página original', contact: 'Contatar o grupo' },
} as const

const zh = {
  about: {
    title: '团队介绍',
    lead: '以红树林和水生态系统为对象，开展可追溯的生态观测、环境评估与修复研究。',
    body: [
      '团队关注陆海交错带生态系统的长期变化，将野外调查、遥感观测、人工智能与模型分析用于理解生态过程和支持修复决策。',
      '研究围绕 AI 数字红树林、全球变化与城市红树林、精准监测与生态修复、智能水生态四个方向展开。',
    ],
    sections: [
      ['研究基础', '团队依托北京大学深圳研究生院环境与能源学院的学术环境，连接野外调查、遥感与无人机观测、环境评价、蓝碳核算及生态修复方法。'],
      ['当前团队成员', '团队负责人李瑞利研究员主要开展 AI 数字红树林、全球变化与城市红树林、城市红树林生态系统生态学及智能水生态研究。'],
      ['已毕业成员与去向', '已毕业学生进入北京大学直博、美国加州大学和新加坡国立大学攻读博士，也有毕业生进入国家、省、市公务员或事业单位，以及华为、比亚迪和互联网科技企业。'],
      ['学术联系', '团队依托北京大学深圳研究生院环境与能源学院开展科研与人才培养，并与国内外高校、科研机构和自然保护地围绕红树林监测、保护、修复及水生态研究保持学术交流。'],
    ],
  },
  research: { title: '研究方向', lead: '从生态过程识别到监测、评估与修复方法的研究链条。', cards: [['AI 数字红树林', '结合遥感、无人机与模型方法，形成面向红树林生态信息提取的研究方法。'], ['全球变化与城市红树林', '关注城市化和环境变化背景下红树林群落、栖息地与生态服务。'], ['精准监测与生态修复', '研究生态状态识别、风险评估和修复成效评价。'], ['智能水生态', '开展水体环境、生态监测和区域水生态研究。']] },
  people: { title: '团队成员', lead: '团队围绕智能红树林、生态监测、蓝碳评估与水生态开展研究。', cards: [['李瑞利', '研究员 · 团队负责人', 'AI数字红树林、全球变化与城市红树林、城市红树林生态系统生态学。']] },
  projects: { title: '科研项目', lead: '展示团队承担的国家、地方及跨学科生态研究项目。' },
  publications: { title: '论文与成果', lead: '代表性论文、知识产权、科研奖励与技术成果。' },
  platforms: { title: '科研平台', lead: '研究数据、方法与应用场景的展示入口。' },
  news: { title: '新闻与国际交流', lead: '公开活动与学术交流记录，均链接至原始发布页面。' },
  join: { title: '加入我们', lead: '欢迎有生态学、遥感、环境科学、人工智能与水生态背景的研究者交流。', cards: [['研究生方向', '智能红树林与水生态、AI 数字红树林、全球变化与城市红树林、城市红树林生态系统生态学。'], ['博士后与科研合作', '围绕红树林智能监测、蓝碳评估、生态修复与水生态开展跨学科研究及合作。'], ['申请建议', '请准备个人简历、研究兴趣说明、代表性成果或作品，并说明拟参与的研究方向。']] },
  contact: { title: '联系方式', lead: '公开联系方式仅用于学术交流与招生咨询。', cards: [['李瑞利 研究员', '北京大学深圳研究生院环境与能源学院'], ['办公室', 'E304室'], ['电话', '+86 (0)755 26033141'], ['电子邮箱', 'liruili@pkusz.edu.cn'], ['地址', '深圳市南山区西丽深圳大学城北京大学深圳研究生院E304室'], ['邮编', '518055']] },
}

const en = {
  about: {
    title: 'Group Overview',
    lead: 'Research on observable, assessable and restorable mangrove and aquatic ecosystems.',
    body: [
      'The group studies long-term change across the land–sea interface, combining field surveys, remote sensing, artificial intelligence and modelling to interpret ecological processes and inform restoration.',
      'Work is organised around AI-enabled digital mangroves, global change and urban mangroves, precision monitoring and restoration, and intelligent aquatic ecology.',
    ],
    sections: [
      ['Research foundation', 'The group works within the academic environment of the School of Environment and Energy, Peking University Shenzhen Graduate School, connecting field surveys, remote sensing and UAV observation, environmental assessment, blue-carbon accounting and ecological-restoration methods.'],
      ['Current members', 'Group leader Li Ruili conducts research on AI-enabled digital mangroves, global change and urban mangroves, urban mangrove ecosystem ecology, and intelligent aquatic ecology.'],
      ['Alumni and destinations', 'Graduates have entered direct doctoral programmes at Peking University and doctoral programmes at the University of California and National University of Singapore. Others work in public service, public institutions, Huawei, BYD and internet-technology companies.'],
      ['Academic contact', 'Based at the School of Environment and Energy, Peking University Shenzhen Graduate School, the group collaborates with universities, research institutes and protected areas on mangrove monitoring, conservation, restoration and aquatic ecology.'],
    ],
  },
  research: { title: 'Research Areas', lead: 'A research pathway from ecological process identification to monitoring, assessment and restoration.', cards: [['AI-enabled Digital Mangroves', 'Remote sensing, UAV observations and models for extracting mangrove ecological information.'], ['Global Change & Urban Mangroves', 'Mangrove communities, habitats and ecosystem services under urbanisation and environmental change.'], ['Precision Monitoring & Restoration', 'Ecological condition recognition, risk assessment and evaluation of restoration outcomes.'], ['Intelligent Aquatic Ecology', 'Water-environment observation, ecological monitoring and regional aquatic-ecology research.']] },
  people: { title: 'People', lead: 'Research spanning intelligent mangroves, ecological monitoring, blue-carbon assessment and aquatic ecology.', cards: [['Li Ruili', 'Research Fellow · Group Lead', 'AI digital mangroves, global change and urban mangroves, and urban mangrove ecosystem ecology.']] },
  projects: { title: 'Research Projects', lead: 'National, local and interdisciplinary ecological research projects led by the group.' },
  publications: { title: 'Publications & Outcomes', lead: 'Representative publications, intellectual property, research awards and technical outcomes.' },
  platforms: { title: 'Research Platforms', lead: 'Entry points for research data, methods and application scenarios.' },
  news: { title: 'News & International Exchange', lead: 'Public events and academic exchanges, each linked to its original publication.' },
  join: { title: 'Join Us', lead: 'We welcome researchers with interests in ecology, remote sensing, environmental science, AI and aquatic ecology.', cards: [['Graduate research themes', 'Intelligent mangroves and aquatic ecology, AI digital mangroves, global change and urban mangroves, and urban mangrove ecosystem ecology.'], ['Postdoctoral & research collaboration', 'Interdisciplinary research and collaboration on intelligent mangrove monitoring, blue-carbon assessment, ecological restoration and aquatic ecology.'], ['Application guidance', 'Prepare a CV, research-interest statement, representative outputs or portfolio, and your intended research direction.']] },
  contact: { title: 'Contact', lead: 'Public contact details are for academic exchange and recruitment enquiries.', cards: [['Li Ruili', 'School of Environment and Energy, Peking University Shenzhen Graduate School'], ['Office', 'Room E304'], ['Telephone', '+86 (0)755 26033141'], ['Email', 'liruili@pkusz.edu.cn'], ['Address', 'Room E304, Peking University Shenzhen Graduate School, Shenzhen University Town, Xili, Nanshan District, Shenzhen'], ['Postcode', '518055']] },
}

const id = {
  about: {
    title: 'Profil Kelompok',
    lead: 'Riset tentang ekosistem mangrove dan perairan yang dapat diamati, dinilai, dan direstorasi.',
    body: [
      'Kelompok ini mengkaji perubahan jangka panjang di zona darat–laut melalui survei lapangan, penginderaan jauh, kecerdasan buatan, dan pemodelan untuk memahami proses ekologi serta mendukung keputusan restorasi.',
      'Riset diorganisasi dalam empat arah: mangrove digital berbasis AI, perubahan global dan mangrove perkotaan, pemantauan presisi dan restorasi, serta ekologi perairan cerdas.',
    ],
    sections: [
      ['Landasan riset', 'Kelompok bekerja dalam lingkungan akademik School of Environment and Energy, Peking University Shenzhen Graduate School, dengan menghubungkan survei lapangan, penginderaan jauh dan UAV, evaluasi lingkungan, penghitungan karbon biru, serta metode restorasi ekologis.'],
      ['Anggota saat ini', 'Ketua kelompok Li Ruili meneliti mangrove digital berbasis AI, perubahan global dan mangrove perkotaan, ekologi ekosistem mangrove perkotaan, serta ekologi perairan cerdas.'],
      ['Alumni dan tujuan karier', 'Lulusan melanjutkan program doktor langsung di Peking University, program doktor di University of California dan National University of Singapore, serta bekerja di layanan publik, lembaga pemerintah, Huawei, BYD, dan perusahaan teknologi internet.'],
      ['Kontak akademik', 'Berbasis di School of Environment and Energy, Peking University Shenzhen Graduate School, kelompok bekerja sama dengan universitas, lembaga riset, dan kawasan konservasi dalam pemantauan, perlindungan, restorasi mangrove, serta ekologi perairan.'],
    ],
  },
  research: { title: 'Bidang Riset', lead: 'Jalur riset dari pengenalan proses ekologi hingga pemantauan, evaluasi, dan restorasi.', cards: [['Mangrove Digital Berbasis AI', 'Penginderaan jauh, observasi UAV, dan model untuk mengekstraksi informasi ekologi mangrove.'], ['Perubahan Global & Mangrove Perkotaan', 'Komunitas, habitat, dan jasa ekosistem mangrove dalam konteks urbanisasi serta perubahan lingkungan.'], ['Pemantauan Presisi & Restorasi', 'Pengenalan kondisi ekologi, evaluasi risiko, dan penilaian hasil restorasi.'], ['Ekologi Perairan Cerdas', 'Observasi lingkungan air, pemantauan ekologi, dan riset ekologi perairan regional.']] },
  people: { title: 'Anggota', lead: 'Riset tentang mangrove cerdas, pemantauan ekologi, evaluasi karbon biru, dan ekologi perairan.', cards: [['Li Ruili', 'Peneliti · Pimpinan Kelompok', 'Mangrove digital AI, perubahan global dan mangrove perkotaan, serta ekologi ekosistem mangrove perkotaan.']] },
  projects: { title: 'Proyek Riset', lead: 'Proyek ekologi nasional, daerah, dan lintas disiplin yang dipimpin oleh kelompok.' },
  publications: { title: 'Publikasi & Capaian', lead: 'Publikasi representatif, kekayaan intelektual, penghargaan riset, dan capaian teknis.' },
  platforms: { title: 'Platform Riset', lead: 'Pintu masuk untuk data, metode, dan skenario penerapan riset.' },
  news: { title: 'Berita & Pertukaran Internasional', lead: 'Kegiatan publik dan pertukaran akademik, masing-masing tertaut ke publikasi aslinya.' },
  join: { title: 'Bergabung', lead: 'Kami menyambut peneliti dengan minat pada ekologi, penginderaan jauh, ilmu lingkungan, AI, dan ekologi perairan.', cards: [['Tema riset mahasiswa', 'Mangrove cerdas dan ekologi perairan, mangrove digital AI, perubahan global dan mangrove perkotaan, serta ekologi ekosistem mangrove perkotaan.'], ['Postdoktoral & kolaborasi', 'Riset dan kolaborasi lintas disiplin tentang pemantauan mangrove cerdas, evaluasi karbon biru, restorasi ekologis, dan ekologi perairan.'], ['Panduan aplikasi', 'Siapkan CV, pernyataan minat riset, karya atau portofolio representatif, serta arah riset yang diminati.']] },
  contact: { title: 'Kontak', lead: 'Kontak publik digunakan untuk pertukaran akademik dan pertanyaan rekrutmen.', cards: [['Li Ruili', 'School of Environment and Energy, Peking University Shenzhen Graduate School'], ['Kantor', 'Ruang E304'], ['Telepon', '+86 (0)755 26033141'], ['Email', 'liruili@pkusz.edu.cn'], ['Alamat', 'Ruang E304, Peking University Shenzhen Graduate School, Shenzhen University Town, Xili, Distrik Nanshan, Shenzhen'], ['Kode pos', '518055']] },
}

const ar = {
  about: {
    title: 'نبذة عن الفريق',
    lead: 'بحث في نظم المانغروف والبيئات المائية القابلة للرصد والتقييم والاستعادة.',
    body: [
      'يدرس الفريق التغيرات طويلة الأمد عند الواجهة البرية البحرية، ويجمع بين المسوحات الميدانية والاستشعار عن بعد والذكاء الاصطناعي والنمذجة لفهم العمليات البيئية ودعم قرارات الاستعادة.',
      'ينظم العمل حول المانغروف الرقمي المدعوم بالذكاء الاصطناعي، والتغير العالمي والمانغروف الحضري، والرصد الدقيق والاستعادة، والبيئة المائية الذكية.',
    ],
    sections: [
      ['القاعدة البحثية', 'يعمل الفريق ضمن البيئة الأكاديمية لكلية البيئة والطاقة في كلية الدراسات العليا بجامعة بكين في شنتشن، ويربط المسوحات الميدانية والاستشعار عن بعد والطائرات المسيّرة والتقييم البيئي وحساب الكربون الأزرق وطرائق الاستعادة البيئية.'],
      ['الأعضاء الحاليون', 'يقود الباحث لي رويلي أبحاث المانغروف الرقمي بالذكاء الاصطناعي والتغير العالمي والمانغروف الحضري وبيئة نظم المانغروف الحضرية والبيئة المائية الذكية.'],
      ['الخريجون ومساراتهم', 'التحق الخريجون ببرامج الدكتوراه في جامعة بكين وجامعة كاليفورنيا وجامعة سنغافورة الوطنية، كما يعمل آخرون في المؤسسات العامة وشركات التكنولوجيا.'],
      ['التواصل الأكاديمي', 'يتعاون الفريق مع الجامعات ومعاهد البحوث والمناطق المحمية في رصد المانغروف وحمايته واستعادته وفي أبحاث البيئة المائية.'],
    ],
  },
  research: { title: 'مجالات البحث', lead: 'مسار بحثي يمتد من تحديد العمليات البيئية إلى الرصد والتقييم والاستعادة.', cards: [['المانغروف الرقمي بالذكاء الاصطناعي', 'الاستشعار عن بعد والطائرات المسيّرة والنماذج لاستخراج المعلومات البيئية للمانغروف.'], ['التغير العالمي والمانغروف الحضري', 'مجتمعات المانغروف وموائلها وخدماتها البيئية في ظل التحضر والتغير البيئي.'], ['الرصد الدقيق والاستعادة', 'تحديد الحالة البيئية وتقييم المخاطر ونتائج الاستعادة.'], ['البيئة المائية الذكية', 'رصد البيئة المائية والمراقبة البيئية وبحوث البيئة المائية الإقليمية.']] },
  people: { title: 'أعضاء الفريق', lead: 'أبحاث تجمع المانغروف الذكي والرصد البيئي وتقييم الكربون الأزرق والبيئة المائية.', cards: [['لي رويلي', 'باحث · قائد الفريق', 'المانغروف الرقمي بالذكاء الاصطناعي والتغير العالمي والمانغروف الحضري وبيئة نظم المانغروف الحضرية.']] },
  projects: { title: 'المشروعات البحثية', lead: 'مشروعات وطنية ومحلية ومتعددة التخصصات يقودها الفريق.' },
  publications: { title: 'المنشورات والإنجازات', lead: 'منشورات ممثلة وملكية فكرية وجوائز بحثية ونتائج تقنية.' },
  platforms: { title: 'المنصات البحثية', lead: 'بوابات للبيانات والطرائق وسيناريوهات التطبيق البحثي.' },
  news: { title: 'الأخبار والتبادل الدولي', lead: 'فعاليات عامة وتبادلات أكاديمية مرتبطة بمصادرها الأصلية.' },
  join: { title: 'انضم إلينا', lead: 'نرحب بالباحثين المهتمين بالبيئة والاستشعار عن بعد والعلوم البيئية والذكاء الاصطناعي والبيئة المائية.', cards: [['موضوعات الدراسات العليا', 'المانغروف الذكي والبيئة المائية والمانغروف الرقمي والتغير العالمي والمانغروف الحضري.'], ['ما بعد الدكتوراه والتعاون', 'أبحاث متعددة التخصصات في الرصد الذكي والكربون الأزرق والاستعادة البيئية والبيئة المائية.'], ['إرشادات التقديم', 'يرجى إعداد السيرة الذاتية وبيان الاهتمامات البحثية والأعمال الممثلة وتحديد اتجاه البحث المقترح.']] },
  contact: { title: 'اتصل بنا', lead: 'بيانات الاتصال العامة مخصصة للتبادل الأكاديمي واستفسارات التوظيف.', cards: [['لي رويلي', 'كلية البيئة والطاقة، كلية الدراسات العليا بجامعة بكين في شنتشن'], ['المكتب', 'الغرفة E304'], ['الهاتف', '+86 (0)755 26033141'], ['البريد الإلكتروني', 'liruili@pkusz.edu.cn'], ['العنوان', 'الغرفة E304، كلية الدراسات العليا بجامعة بكين في شنتشن، مدينة شنتشن الجامعية، نانشان، شنتشن'], ['الرمز البريدي', '518055']] },
}

const pt = {
  about: {
    title: 'Visão geral do grupo',
    lead: 'Pesquisa sobre ecossistemas de manguezais e aquáticos observáveis, avaliáveis e restauráveis.',
    body: [
      'O grupo estuda mudanças de longo prazo na interface terra–mar, combinando levantamentos de campo, sensoriamento remoto, inteligência artificial e modelagem para interpretar processos ecológicos e orientar a restauração.',
      'O trabalho se organiza em manguezais digitais com IA, mudanças globais e manguezais urbanos, monitoramento de precisão e restauração, e ecologia aquática inteligente.',
    ],
    sections: [
      ['Base de pesquisa', 'O grupo atua no ambiente acadêmico da Escola de Meio Ambiente e Energia da Escola de Pós-Graduação de Shenzhen da Universidade de Pequim, integrando campo, sensoriamento remoto, VANTs, avaliação ambiental, carbono azul e restauração ecológica.'],
      ['Membros atuais', 'O líder Li Ruili pesquisa manguezais digitais com IA, mudanças globais e manguezais urbanos, ecologia de manguezais urbanos e ecologia aquática inteligente.'],
      ['Egressos e trajetórias', 'Egressos seguiram doutorado na Universidade de Pequim, na Universidade da Califórnia e na Universidade Nacional de Singapura, além de carreiras no setor público e em empresas de tecnologia.'],
      ['Contato acadêmico', 'O grupo colabora com universidades, institutos de pesquisa e áreas protegidas em monitoramento, conservação e restauração de manguezais e ecologia aquática.'],
    ],
  },
  research: { title: 'Áreas de pesquisa', lead: 'Uma trajetória que vai da identificação de processos ecológicos ao monitoramento, avaliação e restauração.', cards: [['Manguezais digitais com IA', 'Sensoriamento remoto, VANTs e modelos para extrair informações ecológicas de manguezais.'], ['Mudanças globais e manguezais urbanos', 'Comunidades, habitats e serviços ecossistêmicos sob urbanização e mudança ambiental.'], ['Monitoramento de precisão e restauração', 'Reconhecimento da condição ecológica, avaliação de riscos e resultados da restauração.'], ['Ecologia aquática inteligente', 'Observação da água, monitoramento ecológico e pesquisa regional em ecologia aquática.']] },
  people: { title: 'Equipe', lead: 'Pesquisa em manguezais inteligentes, monitoramento ecológico, carbono azul e ecologia aquática.', cards: [['Li Ruili', 'Pesquisador · Líder do grupo', 'Manguezais digitais com IA, mudanças globais e manguezais urbanos e ecologia de ecossistemas de manguezais urbanos.']] },
  projects: { title: 'Projetos de pesquisa', lead: 'Projetos ecológicos nacionais, locais e interdisciplinares liderados pelo grupo.' },
  publications: { title: 'Publicações e resultados', lead: 'Publicações representativas, propriedade intelectual, prêmios e resultados técnicos.' },
  platforms: { title: 'Plataformas de pesquisa', lead: 'Pontos de acesso a dados, métodos e cenários de aplicação.' },
  news: { title: 'Notícias e intercâmbio internacional', lead: 'Eventos públicos e intercâmbios acadêmicos vinculados às publicações originais.' },
  join: { title: 'Junte-se a nós', lead: 'Recebemos pesquisadores interessados em ecologia, sensoriamento remoto, ciências ambientais, IA e ecologia aquática.', cards: [['Temas de pós-graduação', 'Manguezais inteligentes e ecologia aquática, manguezais digitais com IA, mudanças globais e manguezais urbanos.'], ['Pós-doutorado e colaboração', 'Pesquisa interdisciplinar sobre monitoramento inteligente, carbono azul, restauração ecológica e ecologia aquática.'], ['Orientação para candidatura', 'Prepare currículo, declaração de interesses, resultados representativos ou portfólio e a área de pesquisa pretendida.']] },
  contact: { title: 'Contato', lead: 'Os dados públicos destinam-se a intercâmbio acadêmico e consultas de recrutamento.', cards: [['Li Ruili', 'Escola de Meio Ambiente e Energia, Escola de Pós-Graduação de Shenzhen da Universidade de Pequim'], ['Escritório', 'Sala E304'], ['Telefone', '+86 (0)755 26033141'], ['E-mail', 'liruili@pkusz.edu.cn'], ['Endereço', 'Sala E304, Escola de Pós-Graduação de Shenzhen da Universidade de Pequim, Cidade Universitária de Shenzhen, Nanshan, Shenzhen'], ['CEP', '518055']] },
}

export const pages = { zh, en, id, ar, pt } as Record<Locale, Record<PageKey, {
  title: string
  lead: string
  body?: string[]
  sections?: string[][]
  cards?: string[][]
}>>

const leaderProjectSeeds = [
  { year: '2024', title: '深圳湾红树林自然保护区老鼠簕种群的疯长过程与机制研究', types: { zh: '国家自然科学基金项目', en: 'National Natural Science Foundation of China project', id: 'Proyek National Natural Science Foundation of China' }, active: true },
  { year: '2023', title: '大型运河工程廊道重要生物类群的生境特征', types: { zh: '国家重点研发项目子课题', en: 'Subproject of the National Key R&D Program', id: 'Subproyek Program Litbang Utama Nasional' }, active: true },
  { year: '2023', title: '海南蓝碳生态系统温室气体及生态碳汇测算、国际化评估及标准', types: { zh: '海南省揭榜挂帅项目', en: 'Hainan Province challenge-based project', id: 'Proyek berbasis tantangan Provinsi Hainan' }, active: true },
  { year: '2023', title: '深圳红树林生态系统预警监测与评估体系构建', types: { zh: '深圳市海洋发展研究促进中心项目', en: 'Shenzhen Marine Development Research Promotion Center project', id: 'Proyek Shenzhen Marine Development Research Promotion Center' }, active: false },
  { year: '2022', title: '面向碳中和的红树林生态修复关键技术、标准与规范研究', types: { zh: '国家林草局重点研发项目', en: 'Key R&D project of the National Forestry and Grassland Administration', id: 'Proyek litbang utama National Forestry and Grassland Administration' }, active: false },
  { year: '2022', title: '基于碳中和的海岸带生态系统修复技术与应用示范', types: { zh: '深圳市可持续发展专项', en: 'Shenzhen Sustainable Development Programme', id: 'Program Pembangunan Berkelanjutan Shenzhen' }, active: false },
  { year: '2021', title: '红树林环境适应机制与智慧生态修复技术研究', types: { zh: '深圳市基础研究重点项目', en: 'Shenzhen key basic-research project', id: 'Proyek riset dasar utama Shenzhen' }, active: false },
  { year: '2020', title: '基于无人机的粤港澳大湾区红树林智慧监测与评估技术', types: { zh: '广东省海洋科技攻关项目', en: 'Guangdong marine science and technology project', id: 'Proyek sains dan teknologi kelautan Guangdong' }, active: false },
  { year: '2017', title: '广东省典型海湾红树林生态调查与生态保护模式研究', types: { zh: '广东省海洋科技攻关项目', en: 'Guangdong marine science and technology project', id: 'Proyek sains dan teknologi kelautan Guangdong' }, active: false },
  { year: '2017', title: '基于环境与新能源的持久性有机污染物生物修复技术研究', types: { zh: '深圳市海外高层次人才项目（小孔雀项目）', en: 'Shenzhen Overseas High-Level Talent Project (Peacock Programme)', id: 'Proyek Talenta Tingkat Tinggi Luar Negeri Shenzhen (Program Peacock)' }, active: false },
  { year: '2014', title: '根表铁膜在红树植物吸收转运重金属中的作用机理', types: { zh: '国家自然科学基金项目', en: 'National Natural Science Foundation of China project', id: 'Proyek National Natural Science Foundation of China' }, active: false },
  { year: '2011', title: '深圳湾乡土与引种红树植物耐受策略的对比研究', types: { zh: '国家博士后基金项目（特别资助）', en: 'China Postdoctoral Science Foundation project (special funding)', id: 'Proyek China Postdoctoral Science Foundation (pendanaan khusus)' }, active: false },
] as const

export const getLeaderProjects = (locale: Locale) => leaderProjectSeeds.map(project => ({
  year: project.year,
  title: project.title,
  type: project.types[locale === 'ar' || locale === 'pt' ? 'en' : locale],
  status: project.active
    ? ({ zh: '在研', en: 'Ongoing', id: 'Berlangsung', ar: 'جارٍ', pt: 'Em andamento' } as const)[locale]
    : ({ zh: '已结题', en: 'Completed', id: 'Selesai', ar: 'مكتمل', pt: 'Concluído' } as const)[locale],
  role: ({ zh: '负责人', en: 'Principal investigator', id: 'Peneliti utama', ar: 'الباحثة الرئيسية', pt: 'Pesquisadora principal' } as const)[locale],
}))

const leaderProfilesBase = {
  zh: {
    role: '团队负责人',
    name: '李瑞利 研究员',
    seo: '李瑞利研究员，智能红树林与水生态研究团队负责人，研究方向包括 AI 数字红树林、全球变化与城市红树林及智能水生态。',
    intro: [
      '李瑞利，研究员。南开大学博士，2008—2010 年赴东京大学联合培养，2010—2012 年在北京大学从事博士后研究。2016 年入选深圳市海外高层次人才。',
      '现任广东省红树林工程技术研究中心执行主任、中国生态学会红树林生态专业委员会副主任。',
      '主持国家重点研发计划项目或课题、国家自然科学基金项目、自然资源部和国家林草局重点研发项目、广东省海洋科技攻关专项、深圳市学科布局项目、深圳市可持续发展专项等二十余项。',
    ],
    labels: {
      intro: '个人简介',
      education: '教育与研究经历',
      appointments: '学术任职',
      research: '主要研究方向',
      contributions: '代表性科研贡献',
      projects: '代表性科研项目',
      awards: '科研奖励',
      outputs: '论文与知识产权概况',
      students: '学生培养与毕业去向',
      recruitment: '招生方向',
      contact: '联系方式',
      year: '年份',
      type: '项目类别',
      project: '项目名称',
      status: '状态',
      role: '角色',
    },
    education: ['南开大学博士。', '2008—2010 年，东京大学联合培养。', '2010—2012 年，北京大学博士后研究。', '2016 年，入选深圳市海外高层次人才。'],
    appointments: ['广东省红树林工程技术研究中心执行主任。', '中国生态学会红树林生态专业委员会副主任。'],
    research: ['AI 数字红树林', '全球变化与城市红树林', '城市红树林生态系统生态学', '智能水生态与 AI 红树林'],
    contributions: ['开发首套全球城市红树林数据集。', '搭建世界红树林湿地生态系统保护与修复技术库与应用平台。', '构建人工智能牵引的红树林诊断技术体系。', '创建红树林保护与修复“全科医生”模式。', '建立红树林生态系统精准监测、评估与修复技术体系。', '相关成果已服务于中国 50% 以上红树林，为红树林生态修复实践提供科技支撑。'],
    awards: ['2022 年广东省科学技术奖科技成果推广奖一等奖，第一完成人。', '2023 年环境保护科学技术奖二等奖，第一完成人。', '2024 年中国产学研合作创新成果奖二等奖，第一完成人。'],
    outputs: ['已在 Journal of Hydrology、Water Research、Environmental and Experimental Botany、《植物生态学报》、《中国环境科学》等期刊发表论文 118 篇。', '已获授权专利 30 余项。', '曾获北京大学“优秀班主任”和北京大学“优秀共产党员”等荣誉。'],
    students: '已毕业学生进入北京大学直博、美国加州大学读博、新加坡国立大学读博，以及国家、省、市公务员或事业单位；部分毕业生进入华为、比亚迪和互联网科技企业。',
    recruitment: ['AI 数字红树林', '全球变化与城市红树林', '城市红树林生态系统生态学', '智能水生态与 AI 红树林'],
    contact: ['北京大学深圳研究生院环境与能源学院', '深圳市南山区深圳大学城北京大学深圳研究生院 E304 室', '+86 (0)755 26033141', 'liruili@pkusz.edu.cn'],
    sourceIds: ['PKUSZ-SEE-LRL-2026', 'PKUSZ-POSTDOC-2024'],
  },
  en: {
    role: 'GROUP LEADER',
    name: 'Li Ruili, Research Fellow',
    seo: 'Li Ruili, Research Fellow and leader of the Intelligent Mangrove and Aquatic Ecology Research Group.',
    intro: [
      'Li Ruili is a Research Fellow. She received her PhD from Nankai University, undertook joint training at the University of Tokyo from 2008 to 2010, and conducted postdoctoral research at Peking University from 2010 to 2012. In 2016, she was selected for Shenzhen’s Overseas High-Level Talent Programme.',
      'She is Executive Director of the Guangdong Mangrove Engineering Technology Research Center and Vice Chair of the Mangrove Ecology Professional Committee of the Ecological Society of China.',
      'She has led more than twenty projects or subprojects funded by the National Key R&D Program, the National Natural Science Foundation of China, the Ministry of Natural Resources, the National Forestry and Grassland Administration, Guangdong marine science and technology programmes, Shenzhen disciplinary planning programmes and Shenzhen sustainable-development programmes.',
    ],
    labels: {
      intro: 'Profile',
      education: 'Education & research experience',
      appointments: 'Academic appointments',
      research: 'Main research areas',
      contributions: 'Representative research contributions',
      projects: 'Representative research projects',
      awards: 'Research awards',
      outputs: 'Publications & intellectual property',
      students: 'Student mentoring & graduate destinations',
      recruitment: 'Recruitment areas',
      contact: 'Contact',
      year: 'Year',
      type: 'Project category',
      project: 'Project title',
      status: 'Status',
      role: 'Role',
    },
    education: ['PhD, Nankai University.', '2008–2010: joint doctoral training, the University of Tokyo.', '2010–2012: postdoctoral research, Peking University.', '2016: selected for Shenzhen’s Overseas High-Level Talent Programme.'],
    appointments: ['Executive Director, Guangdong Mangrove Engineering Technology Research Center.', 'Vice Chair, Mangrove Ecology Professional Committee, Ecological Society of China.'],
    research: ['AI-enabled digital mangroves', 'Global change and urban mangroves', 'Urban mangrove ecosystem ecology', 'Intelligent aquatic ecology and AI mangroves'],
    contributions: ['Developed the first global urban mangrove dataset.', 'Established a technology repository and application platform for the protection and restoration of global mangrove wetland ecosystems.', 'Built an artificial-intelligence-driven mangrove diagnostic technology system.', 'Created a “general practitioner” model for mangrove conservation and restoration.', 'Established a technical system for precision monitoring, assessment and restoration of mangrove ecosystems.', 'The resulting work has supported more than 50% of China’s mangroves and provides scientific and technological support for restoration practice.'],
    awards: ['2022 Guangdong Science and Technology Award, First Prize for Promotion of Scientific and Technological Achievements — first contributor.', '2023 Environmental Protection Science and Technology Award, Second Prize — first contributor.', '2024 China Industry–University–Research Collaboration Innovation Achievement Award, Second Prize — first contributor.'],
    outputs: ['Published 118 papers in journals including Journal of Hydrology, Water Research, Environmental and Experimental Botany, Chinese Journal of Plant Ecology and China Environmental Science.', 'Granted more than 30 patents.', 'Recognised as an Outstanding Class Advisor and Outstanding Communist Party Member of Peking University.'],
    students: 'Graduates have entered direct doctoral programmes at Peking University, doctoral programmes at the University of California and National University of Singapore, and positions in national, provincial and municipal public service or public institutions. Some work at Huawei, BYD and internet-technology companies.',
    recruitment: ['AI-enabled digital mangroves', 'Global change and urban mangroves', 'Urban mangrove ecosystem ecology', 'Intelligent aquatic ecology and AI mangroves'],
    contact: ['School of Environment and Energy, Peking University Shenzhen Graduate School', 'Room E304, Peking University Shenzhen Graduate School, Shenzhen University Town, Nanshan District, Shenzhen', '+86 (0)755 26033141', 'liruili@pkusz.edu.cn'],
    sourceIds: ['PKUSZ-SEE-LRL-2026', 'PKUSZ-POSTDOC-2024'],
  },
  id: {
    role: 'KETUA KELOMPOK RISET',
    name: 'Li Ruili, Peneliti',
    seo: 'Li Ruili, Peneliti dan ketua Kelompok Riset Mangrove Cerdas dan Ekologi Perairan.',
    intro: [
      'Li Ruili adalah Peneliti. Ia memperoleh gelar doktor dari Nankai University, mengikuti pelatihan bersama di University of Tokyo pada 2008–2010, dan menjalani riset pascadoktoral di Peking University pada 2010–2012. Pada 2016, ia terpilih dalam Program Talenta Tingkat Tinggi Luar Negeri Shenzhen.',
      'Ia menjabat sebagai Direktur Eksekutif Guangdong Mangrove Engineering Technology Research Center dan Wakil Ketua Komite Profesional Ekologi Mangrove, Ecological Society of China.',
      'Ia telah memimpin lebih dari dua puluh proyek atau subproyek yang didukung National Key R&D Program, National Natural Science Foundation of China, Ministry of Natural Resources, National Forestry and Grassland Administration, program sains dan teknologi kelautan Guangdong, program perencanaan disiplin Shenzhen, serta program pembangunan berkelanjutan Shenzhen.',
    ],
    labels: {
      intro: 'Profil',
      education: 'Pendidikan & pengalaman riset',
      appointments: 'Jabatan akademik',
      research: 'Bidang riset utama',
      contributions: 'Kontribusi riset representatif',
      projects: 'Proyek riset representatif',
      awards: 'Penghargaan riset',
      outputs: 'Publikasi & kekayaan intelektual',
      students: 'Pembinaan mahasiswa & tujuan lulusan',
      recruitment: 'Bidang rekrutmen',
      contact: 'Kontak',
      year: 'Tahun',
      type: 'Kategori proyek',
      project: 'Nama proyek',
      status: 'Status',
      role: 'Peran',
    },
    education: ['Doktor, Nankai University.', '2008–2010: pelatihan doktoral bersama, University of Tokyo.', '2010–2012: riset pascadoktoral, Peking University.', '2016: terpilih dalam Program Talenta Tingkat Tinggi Luar Negeri Shenzhen.'],
    appointments: ['Direktur Eksekutif, Guangdong Mangrove Engineering Technology Research Center.', 'Wakil Ketua, Komite Profesional Ekologi Mangrove, Ecological Society of China.'],
    research: ['Mangrove digital berbasis AI', 'Perubahan global dan mangrove perkotaan', 'Ekologi ekosistem mangrove perkotaan', 'Ekologi perairan cerdas dan mangrove AI'],
    contributions: ['Mengembangkan dataset mangrove perkotaan global pertama.', 'Membangun repositori teknologi dan platform aplikasi untuk perlindungan dan restorasi ekosistem lahan basah mangrove dunia.', 'Membangun sistem teknologi diagnosis mangrove yang digerakkan oleh kecerdasan buatan.', 'Menciptakan model “dokter umum” untuk konservasi dan restorasi mangrove.', 'Membangun sistem teknologi pemantauan presisi, evaluasi, dan restorasi ekosistem mangrove.', 'Capaian terkait telah mendukung lebih dari 50% mangrove di Tiongkok dan memberikan dukungan sains-teknologi bagi praktik restorasi.'],
    awards: ['Penghargaan Sains dan Teknologi Guangdong 2022, Hadiah Pertama Promosi Capaian Sains dan Teknologi — kontributor pertama.', 'Penghargaan Sains dan Teknologi Perlindungan Lingkungan 2023, Hadiah Kedua — kontributor pertama.', 'Penghargaan Capaian Inovasi Kolaborasi Industri–Universitas–Riset Tiongkok 2024, Hadiah Kedua — kontributor pertama.'],
    outputs: ['Menerbitkan 118 artikel di jurnal termasuk Journal of Hydrology, Water Research, Environmental and Experimental Botany, Chinese Journal of Plant Ecology, dan China Environmental Science.', 'Memperoleh lebih dari 30 paten.', 'Menerima penghargaan Outstanding Class Advisor dan Outstanding Communist Party Member dari Peking University.'],
    students: 'Lulusan melanjutkan program doktor langsung di Peking University, program doktor di University of California dan National University of Singapore, serta bekerja di layanan publik nasional, provinsi, dan kota atau lembaga pemerintah. Sebagian bekerja di Huawei, BYD, dan perusahaan teknologi internet.',
    recruitment: ['Mangrove digital berbasis AI', 'Perubahan global dan mangrove perkotaan', 'Ekologi ekosistem mangrove perkotaan', 'Ekologi perairan cerdas dan mangrove AI'],
    contact: ['School of Environment and Energy, Peking University Shenzhen Graduate School', 'Ruang E304, Peking University Shenzhen Graduate School, Shenzhen University Town, Distrik Nanshan, Shenzhen', '+86 (0)755 26033141', 'liruili@pkusz.edu.cn'],
    sourceIds: ['PKUSZ-SEE-LRL-2026', 'PKUSZ-POSTDOC-2024'],
  },
} as const

export const leaderProfiles = {
  ...leaderProfilesBase,
  ar: {
    ...leaderProfilesBase.en,
    role: 'قائدة الفريق',
    name: 'لي رويلي، باحثة',
    seo: 'لي رويلي، باحثة وقائدة فريق أبحاث المانغروف الذكي والبيئة المائية.',
    labels: {
      intro: 'الملف الشخصي', education: 'التعليم والخبرة البحثية', appointments: 'المناصب الأكاديمية', research: 'مجالات البحث الرئيسية', contributions: 'إسهامات بحثية ممثلة', projects: 'مشروعات بحثية ممثلة', awards: 'الجوائز البحثية', outputs: 'المنشورات والملكية الفكرية', students: 'الإشراف ومسارات الخريجين', recruitment: 'مجالات الاستقطاب', contact: 'الاتصال', year: 'السنة', type: 'فئة المشروع', project: 'عنوان المشروع', status: 'الحالة', role: 'الدور',
    },
  },
  pt: {
    ...leaderProfilesBase.en,
    role: 'LÍDER DO GRUPO',
    name: 'Li Ruili, Pesquisadora',
    seo: 'Li Ruili, pesquisadora e líder do Grupo de Pesquisa em Manguezais Inteligentes e Ecologia Aquática.',
    labels: {
      intro: 'Perfil', education: 'Formação e experiência', appointments: 'Atuação acadêmica', research: 'Principais áreas de pesquisa', contributions: 'Contribuições representativas', projects: 'Projetos representativos', awards: 'Prêmios de pesquisa', outputs: 'Publicações e propriedade intelectual', students: 'Orientação e trajetória dos egressos', recruitment: 'Áreas de recrutamento', contact: 'Contato', year: 'Ano', type: 'Categoria', project: 'Título do projeto', status: 'Status', role: 'Função',
    },
  },
} as const

export const projects = [
  { title: '深圳湾红树林自然保护区老鼠簕种群的疯长过程与机制研究', type: '国家自然科学基金项目', year: '2024', leader: '李瑞利', status: '在研', direction: '红树林生态学', sourceIds: ['PKUSZ-SEE-LRL-2026'], reviewStatus: 'public-source-verified' },
  { title: '大型运河工程廊道重要生物类群的生境特征', type: '国家重点研发项目子课题', year: '2023', leader: '李瑞利', status: '在研', direction: '生态监测', sourceIds: ['PKUSZ-SEE-LRL-2026'], reviewStatus: 'public-source-verified' },
  { title: '海南蓝碳生态系统温室气体及生态碳汇测算、国际化评估及标准', type: '海南省重点研发项目', year: '—', leader: '李瑞利', status: '在研', direction: '蓝碳', sourceIds: ['PKUSZ-POSTDOC-2024', 'PKUSZ-SEE-LRL-2026'], reviewStatus: 'team-review-required' },
  { title: '深圳红树林生态系统预警监测与评估体系构建', type: '深圳市项目', year: '2023', leader: '李瑞利', status: '已结题', direction: '生态监测', sourceIds: ['PKUSZ-SEE-LRL-2026'], reviewStatus: 'public-source-verified' },
  { title: '面向碳中和的红树林生态修复关键技术、标准与规范研究', type: '国家林草局重点研发项目', year: '2022', leader: '李瑞利', status: '已结题', direction: '生态修复', sourceIds: ['PKUSZ-SEE-LRL-2026'], reviewStatus: 'public-source-verified' },
  { title: '基于无人机的粤港澳大湾区红树林智慧监测与评估技术', type: '广东省海洋科技攻关项目', year: '2020', leader: '李瑞利', status: '已结题', direction: '遥感与无人机', sourceIds: ['PKUSZ-SEE-LRL-2026'], reviewStatus: 'public-source-verified' },
]

export const publications = [
  { title: 'The urgent need to reduce phosphorus discharges for sustainable mangrove wetland management', year: 2024, journal: 'Water Research', doi: '10.1016/j.watres.2024.121821', direction: 'Mangrove management', keywords: ['phosphorus', 'mangrove', 'wetland'], sourceIds: ['DOI-WR-2024-121821'] },
  { title: 'Does combined heavy metal stress enhance iron plaque formation and heavy metal bioaccumulation in Kandelia obovata?', year: 2021, journal: 'Environmental and Experimental Botany', doi: '10.1016/j.envexpbot.2021.104463', direction: 'Mangrove physiology', keywords: ['heavy metal', 'iron plaque', 'Kandelia obovata'], sourceIds: ['DOI-EEB-2021-104463'] },
  { title: 'The distribution, characteristics and ecological risks of microplastics in the mangroves of Southern China', year: 2019, journal: 'Science of the Total Environment', doi: '10.1016/j.scitotenv.2019.135025', direction: 'Environmental assessment', keywords: ['microplastics', 'risk', 'mangrove'], sourceIds: ['DOI-STOTEN-2019-135025'] },
  { title: 'Distribution, Fraction, and Ecological Assessment of Heavy Metals in Sediment-Plant System in Mangrove Forest, South China Sea', year: 2016, journal: 'PLOS ONE', doi: '10.1371/journal.pone.0147308', direction: 'Environmental assessment', keywords: ['heavy metals', 'sediment', 'plant'], sourceIds: ['DOI-PLOS-2016-0147308'] },
  { title: '红树林保护与修复标准发展现状及对策', year: 2022, journal: '北京大学学报（自然科学版）', doi: '10.13209/j.0479-8023.2022.079', direction: 'Restoration standards', keywords: ['standards', 'restoration', 'mangrove'], sourceIds: ['PKU-JOURNAL-2022-079'] },
]

export const platforms = [
  { title: '全球城市红树林数据集', desc: '面向全球城市红树林研究的数据基础与持续更新线索。', status: '公开资料整理', sourceIds: ['PKUSZ-SEE-LRL-2026'], reviewStatus: 'public-source-verified' },
  { title: '世界红树林湿地生态系统保护与修复技术库与应用平台', desc: '红树林湿地保护与修复技术的信息组织与应用入口。', status: '公开资料整理', sourceIds: ['PKUSZ-SEE-LRL-2026'], reviewStatus: 'public-source-verified' },
  { title: '红树林智能诊断与精准修复技术', desc: '围绕生态诊断、评估与修复方法的技术体系介绍。', status: '公开资料整理', sourceIds: ['PKUSZ-SEE-LRL-2026'], reviewStatus: 'public-source-verified' },
  { title: '海南蓝碳数字化应用平台', desc: '面向海南蓝碳研究的数据组织、核算方法与应用场景。', status: '建设中', sourceIds: ['TEAM-REVIEW-PLATFORMS'], reviewStatus: 'team-review-required' },
  { title: '根系脉动——红树林蓝碳数字证据与可信核验系统', desc: '围绕红树林蓝碳数字证据、核验方法与应用路径开展系统研究。', status: '建设中', sourceIds: ['TEAM-REVIEW-PLATFORMS'], reviewStatus: 'team-review-required' },
]

export const events = [
  { date: '2025.06.03', title: '高校科研赋能教育新生态：参观红树林生态实验基地', place: '北京大学深圳研究生院南燕新闻网', type: '科研传播', summary: '李瑞利研究员向参观团介绍红树林云平台、无人机遥感与多尺度生态诊断系统在修复实践和湿地研学中的应用。', url: 'https://news.pkusz.edu.cn/info/1002/9055.htm', sourceIds: ['PKUSZ-NEWS-EDU-2025'] },
  { date: '2024.12.04', title: '“智能红树林与水生态”方向招聘博士后启事', place: '北京大学深圳研究生院环境与能源学院', type: '招生招聘', summary: '面向智能红树林与水生态方向的长期博士后招聘信息，介绍研究方向、申请条件与联系方式。', url: 'https://see.pkusz.edu.cn/info/1034/1683.htm', sourceIds: ['PKUSZ-POSTDOC-2024'] },
  { date: '2024.11.19', title: '深研院知联会、欧美同学会调研福田红树林自然保护区', place: '北京大学深圳研究生院南燕新闻网', type: '国际交流', summary: '围绕国际红树林中心、深港红树林保护合作及跨境、跨国科研交流前景开展实地调研。', url: 'https://news.pkusz.edu.cn/info/1002/8574.htm', sourceIds: ['PKUSZ-NEWS-MANGROVE'] },
  { date: '2024.05.10', title: '“海岸带遥感与红树林保护”主题南燕科研论坛', place: '北京大学深圳研究生院环境与能源学院', type: '学术论坛', summary: '论坛聚焦光学与 SAR 遥感在海岸带连续监测、红树林结构分析和城市化影响评估中的应用。', url: 'https://see.pkusz.edu.cn/info/1008/1597.htm', sourceIds: ['PKUSZ-FORUM-2024'] },
  { date: '2024.05.06', title: '生态与智慧水系统方向发布研究与招生信息', place: '北京大学深圳研究生院环境与能源学院', type: '招生信息', summary: '研究方向涵盖智慧水系统、大湾区水生态与红树林、运河工程水生态安全，并列出相关团队与科研项目。', url: 'https://see.pkusz.edu.cn/info/1023/1130.htm', sourceIds: ['PKUSZ-ECO-WATER-2024'] },
  { date: '2024.03.22', title: 'The Seaward Expansion Pattern of Mangroves in High Siltation Estuaries of China in the 21st Century', place: 'Temasek Laboratories @ NUS', type: '国际报告', summary: '李瑞利研究员在新加坡国立大学 Temasek Laboratories 作红树林向海扩张格局专题学术报告。', url: 'https://temasek-labs.nus.edu.sg/events/seminar22Mar2024.html', sourceIds: ['NUS-TL-2024'] },
  { date: '2023.04.03', title: '深圳北理莫斯科大学代表团到环境与能源学院调研座谈', place: '北京大学深圳研究生院环境与能源学院', type: '国际交流', summary: '双方围绕全球变化生态学、城市红树林观测平台与合作项目开展研究交流。', url: 'https://see.pkusz.edu.cn/info/1008/1199.htm', sourceIds: ['PKUSZ-SMBU-2023'] },
  { date: '2021.11.29', title: '“绿色+”协会开展红树林观候鸟生态科普活动', place: '北京大学深圳研究生院环境与能源学院', type: '野外活动', summary: '活动由李瑞利老师课题组与自然保护区管理部门支持，组织学生开展红树林与候鸟生态观察。', url: 'https://see.pkusz.edu.cn/info/1008/1225.htm', sourceIds: ['PKUSZ-BIRD-2021'] },
  { date: '2021.04.29', title: '“感悟红树，学史力行”师生联合活动', place: '北京大学深圳研究生院环境与能源学院', type: '野外教学', summary: '师生赴大鹏半岛自然保护区开展红树林保护实践，李瑞利老师参与讲解红树林群落保护与发展。', url: 'https://see.pkusz.edu.cn/info/1008/1241.htm', sourceIds: ['PKUSZ-MANGROVE-2021'] },
  { date: '2021.01.12', title: '深圳北理莫斯科大学学术事务部来访交流', place: '北京大学深圳研究生院环境与能源学院', type: '学术交流', summary: '李瑞利老师作红树林生长分布与保护修复研究报告，并带领来访代表参观红树林绿色屋顶。', url: 'https://see.pkusz.edu.cn/info/1008/1247.htm', sourceIds: ['PKUSZ-SMBU-2021'] },
  { date: '2019.11.15', title: '环境与能源学院开展红树林植树志愿服务', place: '北京大学深圳研究生院环境与能源学院', type: '生态实践', summary: '学院教工赴福田红树林保护区开展植树与湿地生态参访，活动由李瑞利老师协调组织。', url: 'https://see.pkusz.edu.cn/info/1008/1268.htm', sourceIds: ['PKUSZ-PLANTING-2019'] },
  { date: '2018.07.20', title: '环境与能源学院优秀大学生夏令营开展红树林考察', place: '北京大学深圳研究生院环境与能源学院', type: '招生交流', summary: '夏令营组织营员开展学术交流，并由李瑞利老师带队前往红树林自然保护区生态长廊参观。', url: 'https://see.pkusz.edu.cn/info/1008/1320.htm', sourceIds: ['PKUSZ-CAMP-2018'] },
]

export const shares = [
  { category: 'AI 与数字红树林', title: '从遥感影像到群落结构：红树林智能识别的研究切面', source: '研究组资料导读', date: '2026-07-24', summary: '围绕无人机遥感和深度学习在红树林物种识别、冠层尺度提取与群落结构分析中的研究问题整理阅读线索。', url: 'https://temasek-labs.nus.edu.sg/events/seminar22Mar2024.html', sourceIds: ['NUS-TL-2024'] },
  { category: '红树林保护与修复', title: '红树林保护与修复标准：可追溯资料入口', source: '北京大学学报（自然科学版）', date: '2026-07-24', summary: '从标准发展、实施场景和评估框架出发，提供代表性论文的期刊原文入口。', url: 'http://xbna.pku.edu.cn/CN/abstract/abstract3794.shtml', sourceIds: ['PKU-JOURNAL-2022-079'] },
  { category: '蓝碳', title: '磷排放与红树林湿地可持续管理', source: 'Water Research', date: '2026-07-24', summary: '围绕营养盐管理与红树林湿地可持续治理的代表性研究条目。', url: 'https://www.sciencedirect.com/science/article/pii/S004313542400722X', sourceIds: ['DOI-WR-2024-121821'] },
]

const projectTranslations = {
  en: [
    { title: 'Overgrowth dynamics and mechanisms of Aegiceras corniculatum populations in Shenzhen Bay Mangrove Nature Reserve', type: 'National Natural Science Foundation project', status: 'Ongoing', direction: 'Mangrove ecology' },
    { title: 'Habitat characteristics of key biological groups along a major canal engineering corridor', type: 'Subproject of the National Key R&D Programme', status: 'Ongoing', direction: 'Ecological monitoring' },
    { title: 'Greenhouse-gas and ecological carbon-sink accounting, international assessment and standards for Hainan blue-carbon ecosystems', type: 'Hainan Key R&D project', status: 'Ongoing', direction: 'Blue carbon' },
    { title: 'Early-warning monitoring and assessment system for Shenzhen mangrove ecosystems', type: 'Shenzhen research project', status: 'Completed', direction: 'Ecological monitoring' },
    { title: 'Key technologies, standards and specifications for carbon-neutral mangrove restoration', type: 'National Forestry and Grassland Administration project', status: 'Completed', direction: 'Ecological restoration' },
    { title: 'UAV-based intelligent mangrove monitoring and assessment in the Guangdong–Hong Kong–Macao Greater Bay Area', type: 'Guangdong marine science and technology project', status: 'Completed', direction: 'Remote sensing & UAVs' },
  ],
  id: [
    { title: 'Dinamika pertumbuhan berlebih dan mekanisme populasi Aegiceras corniculatum di Cagar Alam Mangrove Teluk Shenzhen', type: 'Proyek National Natural Science Foundation', status: 'Berjalan', direction: 'Ekologi mangrove' },
    { title: 'Karakteristik habitat kelompok biologis utama di koridor rekayasa kanal besar', type: 'Subproyek Program Litbang Utama Nasional', status: 'Berjalan', direction: 'Pemantauan ekologi' },
    { title: 'Penghitungan gas rumah kaca dan cadangan karbon, evaluasi internasional, serta standar ekosistem karbon biru Hainan', type: 'Proyek Litbang Utama Hainan', status: 'Berjalan', direction: 'Karbon biru' },
    { title: 'Sistem pemantauan peringatan dini dan evaluasi ekosistem mangrove Shenzhen', type: 'Proyek riset Shenzhen', status: 'Selesai', direction: 'Pemantauan ekologi' },
    { title: 'Teknologi utama, standar, dan spesifikasi restorasi mangrove untuk netralitas karbon', type: 'Proyek Administrasi Kehutanan dan Padang Rumput Nasional', status: 'Selesai', direction: 'Restorasi ekologi' },
    { title: 'Pemantauan dan evaluasi mangrove cerdas berbasis UAV di Kawasan Teluk Besar Guangdong–Hong Kong–Makau', type: 'Proyek sains dan teknologi kelautan Guangdong', status: 'Selesai', direction: 'Penginderaan jauh & UAV' },
  ],
} satisfies Record<'en' | 'id', Array<Pick<typeof projects[number], 'title' | 'type' | 'status' | 'direction'>>>

const platformTranslations = {
  en: [
    { title: 'Global Urban Mangrove Dataset', desc: 'A data foundation and continuing update trail for global urban-mangrove research.', status: 'Public-source compilation' },
    { title: 'World Mangrove Wetland Conservation and Restoration Technology Library', desc: 'An information and application entry point for mangrove wetland protection and restoration technologies.', status: 'Public-source compilation' },
    { title: 'Intelligent Mangrove Diagnosis and Precision Restoration Technologies', desc: 'An introduction to methods for ecological diagnosis, assessment and restoration.', status: 'Public-source compilation' },
    { title: 'Hainan Blue-carbon Digital Application Platform', desc: 'Data organisation, accounting methods and application scenarios for Hainan blue-carbon research.', status: 'In development' },
    { title: 'Root Pulse — Digital Evidence and Trusted Verification for Mangrove Blue Carbon', desc: 'A research system for digital blue-carbon evidence, verification methods and application pathways.', status: 'In development' },
  ],
  id: [
    { title: 'Dataset Mangrove Perkotaan Global', desc: 'Landasan data dan jejak pembaruan berkelanjutan untuk riset mangrove perkotaan global.', status: 'Kompilasi sumber publik' },
    { title: 'Perpustakaan Teknologi Konservasi dan Restorasi Lahan Basah Mangrove Dunia', desc: 'Pintu masuk informasi dan penerapan teknologi perlindungan serta restorasi lahan basah mangrove.', status: 'Kompilasi sumber publik' },
    { title: 'Teknologi Diagnosis Cerdas dan Restorasi Presisi Mangrove', desc: 'Pengantar metode diagnosis, evaluasi, dan restorasi ekologi.', status: 'Kompilasi sumber publik' },
    { title: 'Platform Aplikasi Digital Karbon Biru Hainan', desc: 'Organisasi data, metode penghitungan, dan skenario penerapan untuk riset karbon biru Hainan.', status: 'Dalam pengembangan' },
    { title: 'Root Pulse — Bukti Digital dan Verifikasi Tepercaya Karbon Biru Mangrove', desc: 'Sistem riset untuk bukti digital karbon biru, metode verifikasi, dan jalur penerapan.', status: 'Dalam pengembangan' },
  ],
} satisfies Record<'en' | 'id', Array<Pick<typeof platforms[number], 'title' | 'desc' | 'status'>>>

const eventTranslations = {
  en: [
    { title: 'University research supporting education: visit to the mangrove ecological research base', place: 'Nanyan News, PKU Shenzhen', type: 'Science communication', summary: 'Li Ruili introduced the mangrove cloud platform, UAV remote sensing and multiscale ecological diagnosis for restoration practice and wetland education.' },
    { title: 'Postdoctoral opportunities in Intelligent Mangroves and Aquatic Ecology', place: 'School of Environment and Energy, PKU Shenzhen', type: 'Recruitment', summary: 'An ongoing postdoctoral call describing research themes, application requirements and contact details.' },
    { title: 'Research visit to Futian Mangrove Nature Reserve', place: 'Nanyan News, PKU Shenzhen', type: 'International exchange', summary: 'A field visit addressing the International Mangrove Center, Shenzhen–Hong Kong conservation cooperation and prospects for cross-border research.' },
    { title: 'Nanyan Research Forum on Coastal Remote Sensing and Mangrove Conservation', place: 'School of Environment and Energy, PKU Shenzhen', type: 'Academic forum', summary: 'The forum examined optical and SAR remote sensing for coastal monitoring, mangrove structure analysis and urbanisation-impact assessment.' },
    { title: 'Research and admissions information for Ecological and Intelligent Water Systems', place: 'School of Environment and Energy, PKU Shenzhen', type: 'Admissions', summary: 'Research spans intelligent water systems, Greater Bay Area aquatic ecology and mangroves, and canal ecological security.' },
    { title: events[5].title, place: 'Temasek Laboratories @ NUS', type: 'International seminar', summary: 'Li Ruili presented research on the seaward expansion of mangroves in high-siltation estuaries at Temasek Laboratories, NUS.' },
    { title: 'Shenzhen MSU–BIT delegation visits the School of Environment and Energy', place: 'School of Environment and Energy, PKU Shenzhen', type: 'International exchange', summary: 'The discussion covered global-change ecology, urban mangrove observation platforms and potential research collaboration.' },
    { title: 'Green+ Association mangrove and migratory-bird ecology field programme', place: 'School of Environment and Energy, PKU Shenzhen', type: 'Field activity', summary: 'Supported by Li Ruili’s group and the nature-reserve authority, students observed mangrove and migratory-bird ecology.' },
    { title: 'Faculty and students conduct mangrove conservation field learning', place: 'School of Environment and Energy, PKU Shenzhen', type: 'Field education', summary: 'Participants visited Dapeng Peninsula Nature Reserve; Li Ruili contributed interpretation of mangrove conservation and development.' },
    { title: 'Academic Affairs delegation from Shenzhen MSU–BIT visits the School', place: 'School of Environment and Energy, PKU Shenzhen', type: 'Academic exchange', summary: 'Li Ruili reported on mangrove distribution and restoration research and guided a visit to the mangrove green roof.' },
    { title: 'Faculty members undertake mangrove planting and wetland service', place: 'School of Environment and Energy, PKU Shenzhen', type: 'Ecological practice', summary: 'Faculty visited Futian Mangrove Nature Reserve for planting and wetland learning in an activity coordinated by Li Ruili.' },
    { title: 'Undergraduate summer camp visits the mangrove ecological corridor', place: 'School of Environment and Energy, PKU Shenzhen', type: 'Admissions exchange', summary: 'Summer-camp participants joined academic activities and visited the mangrove ecological corridor under Li Ruili’s guidance.' },
  ],
  id: [
    { title: 'Riset universitas mendukung pendidikan: kunjungan ke basis ekologi mangrove', place: 'Nanyan News, PKU Shenzhen', type: 'Komunikasi sains', summary: 'Li Ruili memperkenalkan platform awan mangrove, penginderaan jauh UAV, dan diagnosis ekologi multiskala untuk restorasi dan pendidikan lahan basah.' },
    { title: 'Peluang postdoktoral Mangrove Cerdas dan Ekologi Perairan', place: 'School of Environment and Energy, PKU Shenzhen', type: 'Rekrutmen', summary: 'Pengumuman postdoktoral jangka panjang yang menjelaskan tema riset, persyaratan aplikasi, dan kontak.' },
    { title: 'Kunjungan riset ke Cagar Alam Mangrove Futian', place: 'Nanyan News, PKU Shenzhen', type: 'Pertukaran internasional', summary: 'Kunjungan lapangan membahas International Mangrove Center, kerja sama konservasi Shenzhen–Hong Kong, dan riset lintas batas.' },
    { title: 'Forum Riset Nanyan tentang Penginderaan Jauh Pesisir dan Konservasi Mangrove', place: 'School of Environment and Energy, PKU Shenzhen', type: 'Forum akademik', summary: 'Forum membahas penginderaan jauh optik dan SAR untuk pemantauan pesisir, struktur mangrove, dan dampak urbanisasi.' },
    { title: 'Informasi riset dan penerimaan Ekologi dan Sistem Air Cerdas', place: 'School of Environment and Energy, PKU Shenzhen', type: 'Penerimaan', summary: 'Riset mencakup sistem air cerdas, ekologi perairan dan mangrove Greater Bay Area, serta keamanan ekologi kanal.' },
    { title: 'Pola Ekspansi Mangrove ke Arah Laut di Estuari Bersedimen Tinggi di Tiongkok pada Abad ke-21', place: 'Temasek Laboratories @ NUS', type: 'Seminar internasional', summary: 'Li Ruili mempresentasikan riset ekspansi mangrove ke arah laut di Temasek Laboratories, NUS.' },
    { title: 'Delegasi Shenzhen MSU–BIT berkunjung ke School of Environment and Energy', place: 'School of Environment and Energy, PKU Shenzhen', type: 'Pertukaran internasional', summary: 'Diskusi membahas ekologi perubahan global, platform observasi mangrove perkotaan, dan kerja sama riset.' },
    { title: 'Program lapangan ekologi mangrove dan burung migran oleh Asosiasi Green+', place: 'School of Environment and Energy, PKU Shenzhen', type: 'Kegiatan lapangan', summary: 'Dengan dukungan kelompok Li Ruili dan pengelola cagar alam, mahasiswa mengamati ekologi mangrove dan burung migran.' },
    { title: 'Dosen dan mahasiswa belajar konservasi mangrove di lapangan', place: 'School of Environment and Energy, PKU Shenzhen', type: 'Pendidikan lapangan', summary: 'Peserta mengunjungi Cagar Alam Semenanjung Dapeng; Li Ruili menjelaskan konservasi dan perkembangan mangrove.' },
    { title: 'Delegasi urusan akademik Shenzhen MSU–BIT berkunjung', place: 'School of Environment and Energy, PKU Shenzhen', type: 'Pertukaran akademik', summary: 'Li Ruili memaparkan distribusi dan restorasi mangrove serta memandu kunjungan ke atap hijau mangrove.' },
    { title: 'Kegiatan penanaman mangrove dan layanan lahan basah', place: 'School of Environment and Energy, PKU Shenzhen', type: 'Praktik ekologi', summary: 'Dosen mengunjungi Cagar Alam Mangrove Futian untuk penanaman dan pembelajaran lahan basah dalam kegiatan yang dikoordinasikan Li Ruili.' },
    { title: 'Perkemahan musim panas mahasiswa mengunjungi koridor ekologi mangrove', place: 'School of Environment and Energy, PKU Shenzhen', type: 'Pertukaran penerimaan', summary: 'Peserta mengikuti kegiatan akademik dan mengunjungi koridor ekologi mangrove dengan panduan Li Ruili.' },
  ],
} satisfies Record<'en' | 'id', Array<Pick<typeof events[number], 'title' | 'place' | 'type' | 'summary'>>>

const shareTranslations = {
  en: [
    { category: 'AI & digital mangroves', title: 'From remote-sensing imagery to community structure: intelligent mangrove identification', source: 'Research-group reading note', summary: 'A reading path through UAV remote sensing and deep learning for mangrove species recognition, canopy-scale extraction and community-structure analysis.' },
    { category: 'Mangrove conservation & restoration', title: 'Mangrove conservation and restoration standards: a traceable source', source: 'Acta Scientiarum Naturalium Universitatis Pekinensis', summary: 'A journal-source entry covering the development, application settings and assessment framework of mangrove restoration standards.' },
    { category: 'Blue carbon', title: 'Phosphorus discharge and sustainable mangrove-wetland management', source: 'Water Research', summary: 'A representative study on nutrient management and sustainable governance of mangrove wetlands.' },
  ],
  id: [
    { category: 'AI & mangrove digital', title: 'Dari citra penginderaan jauh hingga struktur komunitas: identifikasi mangrove cerdas', source: 'Catatan bacaan kelompok riset', summary: 'Jalur bacaan tentang penginderaan jauh UAV dan pembelajaran mendalam untuk identifikasi spesies, ekstraksi skala tajuk, dan analisis struktur komunitas mangrove.' },
    { category: 'Konservasi & restorasi mangrove', title: 'Standar konservasi dan restorasi mangrove: sumber yang dapat ditelusuri', source: 'Acta Scientiarum Naturalium Universitatis Pekinensis', summary: 'Pintu masuk artikel jurnal tentang perkembangan, konteks penerapan, dan kerangka evaluasi standar restorasi mangrove.' },
    { category: 'Karbon biru', title: 'Pembuangan fosfor dan pengelolaan lahan basah mangrove berkelanjutan', source: 'Water Research', summary: 'Kajian representatif mengenai pengelolaan nutrien dan tata kelola berkelanjutan lahan basah mangrove.' },
  ],
} satisfies Record<'en' | 'id', Array<Pick<typeof shares[number], 'category' | 'title' | 'source' | 'summary'>>>

const publicationTranslations = {
  en: [
    { direction: 'Mangrove management', keywords: ['phosphorus', 'mangrove', 'wetland'] },
    { direction: 'Mangrove physiology', keywords: ['heavy metal', 'iron plaque', 'Kandelia obovata'] },
    { direction: 'Environmental assessment', keywords: ['microplastics', 'risk', 'mangrove'] },
    { direction: 'Environmental assessment', keywords: ['heavy metals', 'sediment', 'plant'] },
    { title: 'Current status and strategies for mangrove conservation and restoration standards', journal: 'Acta Scientiarum Naturalium Universitatis Pekinensis', direction: 'Restoration standards', keywords: ['standards', 'restoration', 'mangrove'] },
  ],
  id: [
    { direction: 'Pengelolaan mangrove', keywords: ['fosfor', 'mangrove', 'lahan basah'] },
    { direction: 'Fisiologi mangrove', keywords: ['logam berat', 'lapisan besi', 'Kandelia obovata'] },
    { direction: 'Evaluasi lingkungan', keywords: ['mikroplastik', 'risiko', 'mangrove'] },
    { direction: 'Evaluasi lingkungan', keywords: ['logam berat', 'sedimen', 'tumbuhan'] },
    { title: 'Perkembangan standar konservasi dan restorasi mangrove serta strategi tindak lanjut', journal: 'Acta Scientiarum Naturalium Universitatis Pekinensis', direction: 'Standar restorasi', keywords: ['standar', 'restorasi', 'mangrove'] },
  ],
} satisfies Record<'en' | 'id', Array<Partial<Pick<typeof publications[number], 'title' | 'journal' | 'direction' | 'keywords'>>>>

const translationLocale = (locale: Locale): 'en' | 'id' => locale === 'id' ? 'id' : 'en'

export const getProjects = (locale: Locale) => locale === 'zh'
  ? projects
  : projects.map((item, index) => ({ ...item, leader: 'Li Ruili', ...projectTranslations[translationLocale(locale)][index] }))

export const getPlatforms = (locale: Locale) => locale === 'zh'
  ? platforms
  : platforms.map((item, index) => ({ ...item, ...platformTranslations[translationLocale(locale)][index] }))

export const getEvents = (locale: Locale) => locale === 'zh'
  ? events
  : events.map((item, index) => ({ ...item, ...eventTranslations[translationLocale(locale)][index] }))

export const getShares = (locale: Locale) => locale === 'zh'
  ? shares
  : shares.map((item, index) => ({ ...item, ...shareTranslations[translationLocale(locale)][index] }))

export const getPublications = (locale: Locale) => locale === 'zh'
  ? publications
  : publications.map((item, index) => ({ ...item, ...publicationTranslations[translationLocale(locale)][index] }))
