import { expect, test } from '@playwright/test'

const desktop = { width: 1440, height: 1000 }

test('capture and verify the V8 aligned research portal', async ({ page }) => {
  test.setTimeout(90_000)

  const pageErrors: string[] = []
  const consoleErrors: string[] = []
  page.on('pageerror', error => pageErrors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text())
  })

  await page.setViewportSize(desktop)

  const directRoutes = ['/', '/about', '/research', '/projects', '/en', '/id', '/ar', '/pt'] as const
  for (const route of directRoutes) {
    const response = await page.goto(route, { waitUntil: 'domcontentloaded' })
    expect(response?.status(), `SSR status for ${route}`).toBe(200)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(desktop.width)
  }

  await page.goto('/')
  const reloadResponse = await page.reload({ waitUntil: 'domcontentloaded' })
  expect(reloadResponse?.status()).toBe(200)
  await expect(page.locator('.portal-hero h1')).toContainText('智能红树林与水生态研究团队')
  await expect(page.locator('.portal-hero h1')).toHaveCSS('font-weight', '600')
  await expect(page.getByLabel('Language selector')).toHaveValue('zh')
  await expect(page.getByLabel('Language selector').locator('option:checked')).toHaveText('中文')

  await expect(page.locator('.v7-home > section')).toHaveCount(3)
  await expect(page.locator('.team-photo figcaption')).toHaveCount(0)
  await expect(page.locator('.research-index')).toHaveCount(0)
  await expect(page.locator('.home-core-section')).toHaveCount(0)
  await expect(page.locator('.selected-papers')).toHaveCount(0)
  await expect(page.locator('.project-table')).toHaveCount(0)
  await expect(page.locator('.section-heading')).toHaveCount(4)
  await expect(page.locator('.section-heading-row > span')).toHaveCount(4)
  await expect(page.getByRole('heading', { name: '科研平台', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: '新闻与交流', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: '加入我们', exact: true })).toBeVisible()

  const sectionGaps = await page.locator('.v7-home > section').evaluateAll((sections) => {
    const boxes = sections.map(section => section.getBoundingClientRect())
    return [boxes[1].top - boxes[0].bottom, boxes[2].top - boxes[1].bottom]
  })
  expect(sectionGaps.every(gap => gap >= 39 && gap <= 41)).toBe(true)
  expect(Math.abs(sectionGaps[0] - sectionGaps[1])).toBeLessThanOrEqual(1)

  const alignedColumns = await page.evaluate(() => {
    const identity = document.querySelector('.portal-identity')?.getBoundingClientRect()
    const latest = document.querySelector('.latest-panel')?.getBoundingClientRect()
    if (!identity || !latest) throw new Error('Home right columns are missing')
    return {
      leftDifference: Math.abs(identity.left - latest.left),
      widthDifference: Math.abs(identity.width - latest.width),
    }
  })
  expect(alignedColumns.leftDifference).toBeLessThanOrEqual(2)
  expect(alignedColumns.widthDifference).toBeLessThanOrEqual(2)

  const directoryBorders = await page.locator('.home-directory .section-heading').evaluateAll(nodes =>
    nodes.map(node => parseFloat(getComputedStyle(node).borderBottomWidth)),
  )
  expect(directoryBorders).toEqual([0, 0, 0])

  const footerGap = await page.evaluate(() => {
    const directory = document.querySelector('.home-directory')?.getBoundingClientRect()
    const footer = document.querySelector('.site-footer')?.getBoundingClientRect()
    if (!directory || !footer) throw new Error('Home directory or footer is missing')
    return footer.top - directory.bottom
  })
  expect(footerGap).toBeGreaterThanOrEqual(24)

  const chromeHeights = await page.evaluate(() => {
    const header = document.querySelector('.site-header')?.getBoundingClientRect()
    const footer = document.querySelector('.site-footer')?.getBoundingClientRect()
    if (!header || !footer) throw new Error('Site header or footer is missing')
    return { header: header.height, footer: footer.height }
  })
  expect(chromeHeights.footer).toBeLessThanOrEqual(chromeHeights.header * 1.35)

  await expect(page.locator('.mangrove-line-art')).toHaveCount(2)
  const lineArtAria = await page.locator('.mangrove-line-art').evaluateAll(nodes =>
    nodes.map(node => node.getAttribute('aria-hidden')),
  )
  expect(lineArtAria).toEqual(['true', 'true'])
  const lineArtPointerEvents = await page.locator('.mangrove-line-art').evaluateAll(nodes =>
    nodes.map(node => getComputedStyle(node).pointerEvents),
  )
  expect(lineArtPointerEvents).toEqual(['none', 'none'])
  const lineArtResponse = await page.request.get('/brand/mangrove-line-background.svg')
  expect(lineArtResponse.status()).toBe(200)

  const headingSizes = await page.locator('.section-heading h2').evaluateAll(nodes =>
    nodes.map(node => parseFloat(getComputedStyle(node).fontSize)),
  )
  expect(new Set(headingSizes).size).toBe(1)
  expect(headingSizes[0]).toBeGreaterThanOrEqual(23)
  expect(headingSizes[0]).toBeLessThanOrEqual(25)

  const teamPhoto = page.locator('.team-photo img')
  await expect(teamPhoto).toBeVisible()
  await expect(page.locator('.home-news-list .news-row > span').first()).toHaveCSS('font-weight', '400')
  expect(await teamPhoto.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(2200)
  await page.screenshot({ path: 'test-results/v8-zh-home.png', fullPage: true })
  await page.locator('.v7-home').screenshot({ path: 'test-results/v8-alignment.png' })
  await page.locator('.team-news-section').screenshot({ path: 'test-results/v8-team-news.png' })
  await page.locator('.portal-hero').screenshot({ path: 'test-results/v8-mangrove-line-detail.png' })

  const directoryFooterClip = await page.evaluate(() => {
    const directory = document.querySelector('.home-directory')?.getBoundingClientRect()
    const footer = document.querySelector('.site-footer')?.getBoundingClientRect()
    if (!directory || !footer) throw new Error('Home directory or footer is missing')
    return {
      x: 0,
      y: directory.top + window.scrollY,
      width: document.documentElement.clientWidth,
      height: footer.bottom - directory.top,
    }
  })
  await page.screenshot({ path: 'test-results/v8-directory-footer.png', clip: directoryFooterClip })

  await page.goto('/about')
  const aboutText = await page.locator('main').innerText()
  for (const phrase of ['正在整理', '待确认', '仅公开', '演示版', '团队审核', '非官方网站']) {
    expect(aboutText).not.toContain(phrase)
  }
  await expect(page.locator('#members .about-leader-card')).toHaveCount(1)
  await page.screenshot({ path: 'test-results/v7-about.png', fullPage: true })

  await page.goto('/research')
  await expect(page.locator('.research-card')).toHaveCount(4)
  await expect(page.locator('.research-title-row')).toHaveCount(4)
  await expect(page.locator('.research-sections a[href="/publications"]')).toHaveCount(0)
  await expect(page.locator('.research-outcomes-link a[href="/publications"]')).toHaveCount(1)
  expect(await page.locator('.research-card h2').first().evaluate(node => parseFloat(getComputedStyle(node).fontSize))).toBeGreaterThanOrEqual(18)
  await page.screenshot({ path: 'test-results/v7-research.png', fullPage: true })

  await page.goto('/news')
  await expect(page.locator('.event-list > a')).toHaveCount(12)
  await expect(page.locator('.event-list > a').first().locator('p')).not.toBeEmpty()
  await page.screenshot({ path: 'test-results/v7-news.png', fullPage: true })

  await page.goto('/join')
  await expect(page.locator('.join-grid article')).toHaveCount(3)
  expect(await page.locator('.join-grid p').first().evaluate(node => parseFloat(getComputedStyle(node).fontSize))).toBe(16)
  await page.screenshot({ path: 'test-results/v7-join.png', fullPage: true })

  await page.goto('/contact')
  const contactGap = await page.locator('.contact-layout').evaluate(node => parseFloat(getComputedStyle(node).columnGap))
  expect(contactGap).toBeGreaterThanOrEqual(28)
  expect(contactGap).toBeLessThanOrEqual(40)
  await expect(page.locator('.map-panel iframe')).toHaveAttribute('src', /openstreetmap\.org\/export\/embed/)
  await expect(page.locator('.external-map-links a')).toHaveCount(3)
  await page.screenshot({ path: 'test-results/v7-contact.png', fullPage: true })

  const footerText = await page.locator('.site-footer').innerText()
  for (const phrase of ['非官方网站', '演示版', 'not an official', 'Demonstration', 'bukan situs resmi']) {
    expect(footerText.toLowerCase()).not.toContain(phrase.toLowerCase())
  }

  for (const [route, locale, label, screenshot] of [
    ['/en', 'en', 'English', 'test-results/v8-en-home.png'],
    ['/id', 'id', 'Bahasa Indonesia', 'test-results/v8-id-home.png'],
    ['/ar', 'ar', 'العربية', 'test-results/v9-ar-home.png'],
    ['/pt', 'pt', 'Português', 'test-results/v9-pt-home.png'],
  ] as const) {
    await page.goto(route)
    await expect(page.getByLabel('Language selector')).toHaveValue(locale)
    await expect(page.getByLabel('Language selector').locator('option:checked')).toHaveText(label)
    await expect(page.locator('.v7-home > section')).toHaveCount(3)
    await expect(page.locator('.section-heading-row > span')).toHaveCount(0)
    await page.screenshot({ path: screenshot, fullPage: true })
  }

  await page.goto('/ar')
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar')
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl')

  await page.goto('/pt')
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt')
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr')

  for (const route of ['/en/research', '/id/research', '/ar/research', '/pt/research']) {
    await page.goto(route)
    await expect(page.locator('.research-title-row strong')).toHaveCount(0)
  }

  await page.goto('/')
  await expect(page.locator('link[rel="icon"][href="/favicon.svg"]')).toHaveCount(1)
  const logoResponse = await page.request.get('/brand/site-mark.svg')
  expect(logoResponse.status()).toBe(200)
  const teamImageResponse = await page.request.get('/images/team/team-photo.jpg')
  expect(teamImageResponse.status()).toBe(200)

  const aboutMenu = page.getByRole('button', { name: /关于团队/ })
  await aboutMenu.hover()
  await expect(page.locator('#submenu-about')).toBeVisible()
  await page.screenshot({ path: 'test-results/v7-nav-dropdown.png' })

  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375)
  await expect(page.locator('.v7-home > section')).toHaveCount(3)
  const mobileLineArt = page.locator('.mangrove-line-art:visible')
  await expect(mobileLineArt).toHaveCount(1)
  expect(await mobileLineArt.evaluate(node => parseFloat(getComputedStyle(node).opacity))).toBeLessThanOrEqual(0.03)
  await page.screenshot({ path: 'test-results/v8-mobile-home.png', fullPage: true })
  await page.getByRole('button', { name: '打开菜单' }).click()
  await expect(page.locator('#mobile-menu')).toHaveClass(/open/)
  for (const linkName of ['团队负责人', '团队介绍', '研究方向', '科研项目', '论文与成果', '科研平台']) {
    await expect(page.locator('#mobile-menu').getByRole('link', { name: linkName, exact: true })).toBeVisible()
  }

  expect(pageErrors).toEqual([])
  expect(consoleErrors).toEqual([])
})
