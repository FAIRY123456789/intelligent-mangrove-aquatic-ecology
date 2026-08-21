import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createInterface } from 'node:readline/promises'
const rl = createInterface({ input: process.stdin, output: process.stdout })
const locale = (await rl.question('Language (zh/en/id/ar/pt): ')).trim(); const title = (await rl.question('Title: ')).trim(); const url = (await rl.question('Original URL: ')).trim(); rl.close()
if (!['zh', 'en', 'id', 'ar', 'pt'].includes(locale) || !title || !url) throw new Error('Language, title and original URL are required.')
const slug = title.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-').replace(/^-|-$/g, '') || `share-${Date.now()}`
const target = resolve(process.cwd(), 'content', locale, 'sharing', `${slug}.md`)
await mkdir(resolve(process.cwd(), 'content', locale, 'sharing'), { recursive: true })
await writeFile(target, `---\ntitle: "${title.replace(/"/g, '\\"')}"\nsource: ""\npublished: ""\nrecommended: "${new Date().toISOString().slice(0, 10)}"\ncategory: ""\ntags: []\nsummary: ""\nexternalUrl: "${url}"\nlanguage: "${locale}"\nsourceIds: []\n---\n\n`, 'utf8')
console.log(`Created ${target}`)
