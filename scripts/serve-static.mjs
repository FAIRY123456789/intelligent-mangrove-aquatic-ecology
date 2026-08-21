import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'

const root = join(process.cwd(), '.output', 'public')
const configuredBasePath = process.env.STATIC_BASE_PATH || '/'
const basePath = configuredBasePath === '/'
  ? '/'
  : `/${configuredBasePath.replace(/^\/+|\/+$/g, '')}/`
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
}
createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname)
  if (basePath !== '/' && pathname === basePath.slice(0, -1)) {
    res.writeHead(308, { location: basePath }).end()
    return
  }
  if (basePath !== '/' && !pathname.startsWith(basePath)) {
    res.writeHead(404).end()
    return
  }

  const staticPath = basePath === '/'
    ? pathname
    : `/${pathname.slice(basePath.length)}`

  if (staticPath !== '/' && staticPath.endsWith('/')) {
    res.writeHead(308, { location: pathname.slice(0, -1) }).end()
    return
  }

  const candidates = staticPath === '/'
    ? [join(root, 'index.html')]
    : [join(root, staticPath), join(root, staticPath, 'index.html')]

  for (const candidate of candidates) {
    const target = normalize(candidate)
    if (!target.startsWith(root)) {
      res.writeHead(403).end()
      return
    }

    try {
      const data = await readFile(target)
      res.writeHead(200, { 'content-type': types[extname(target)] || 'application/octet-stream' })
      res.end(data)
      return
    }
    catch {
      // Try the next static-file candidate.
    }
  }

  res.writeHead(404).end()
}).listen(4173, '127.0.0.1')
