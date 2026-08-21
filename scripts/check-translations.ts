import { localeMeta, locales, nav, pages, ui, type PageKey } from '../data/site'

const expectedPages: PageKey[] = ['about', 'research', 'people', 'projects', 'publications', 'platforms', 'news', 'join', 'contact']
const expectedTopNavigation = ['about', 'projects', 'news', 'join', 'contact']
const expectedUi = Object.keys(ui.zh).sort().join('|')
const missing: string[] = []
for (const locale of locales) {
  if (!localeMeta[locale]?.name || nav[locale].map(item => item.key).join('|') !== expectedTopNavigation.join('|')) {
    missing.push(`${locale}: metadata or navigation`)
  }
  if (nav[locale].map(item => String(item.key)).includes('sharing')) missing.push(`${locale}: sharing remains in top navigation`)
  for (const key of expectedPages) { const page = pages[locale][key]; if (!page?.title || !page.lead) missing.push(`${locale}:${key}`) }
  if (Object.keys(ui[locale]).sort().join('|') !== expectedUi) missing.push(`${locale}: ui keys`)
}
if (missing.length) { console.error(`Missing translation keys: ${missing.join(', ')}`); process.exit(1) }
console.log(`Translation key integrity: passed (${locales.join(', ')})`)
