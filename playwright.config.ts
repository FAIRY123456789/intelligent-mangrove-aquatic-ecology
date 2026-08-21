import { defineConfig } from '@playwright/test'
import { existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

function findLocalChromium() {
  const localAppData = process.env.LOCALAPPDATA
  if (!localAppData) return undefined

  const browserRoot = join(localAppData, 'ms-playwright')
  if (!existsSync(browserRoot)) return undefined

  const revisions = readdirSync(browserRoot)
    .filter(name => /^chromium-\d+$/.test(name))
    .sort((a, b) => Number(b.split('-')[1]) - Number(a.split('-')[1]))

  for (const revision of revisions) {
    for (const relativePath of ['chrome-win64/chrome.exe', 'chrome-win/chrome.exe']) {
      const executablePath = join(browserRoot, revision, relativePath)
      if (existsSync(executablePath)) return executablePath
    }
  }

  return undefined
}

const executablePath = findLocalChromium()

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  use: {
    baseURL: 'http://127.0.0.1:4173',
    browserName: 'chromium',
    launchOptions: executablePath ? { executablePath } : undefined,
  },
  webServer: { command: 'node scripts/serve-static.mjs', port: 4173, reuseExistingServer: true },
})
