/**
 * Write mapped SiteContent JSON for SANITY_FALLBACK=1.
 * Do not commit app/content/snapshot.json unless rollback-without-Sanity is required.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createClient } from '@sanity/client'
import { mapBundle, type SiteContentBundle } from '../app/content/map.server'
import { SITE_CONTENT_QUERY } from '../app/content/sanity.queries'

function loadDotEnv() {
  for (const name of ['.env', '.env.local']) {
    const path = resolve(process.cwd(), name)
    if (!existsSync(path)) continue
    for (const line of readFileSync(path, 'utf8').split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      let value = trimmed.slice(eq + 1).trim()
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }
      if (process.env[key] === undefined) process.env[key] = value
    }
  }
}

async function main() {
  loadDotEnv()
  const projectId = process.env.SANITY_PROJECT_ID || process.env.NUXT_SANITY_PROJECT_ID
  if (!projectId) {
    console.error('SANITY_PROJECT_ID is required to dump a CMS snapshot.')
    process.exit(1)
  }

  const client = createClient({
    projectId,
    dataset: process.env.SANITY_DATASET || 'production',
    apiVersion: process.env.SANITY_API_VERSION || '2025-02-19',
    useCdn: false,
    perspective: 'published',
    token: process.env.SANITY_READ_TOKEN || process.env.SANITY_WRITE_TOKEN || undefined
  })

  const raw = await client.fetch(SITE_CONTENT_QUERY)
  const mapped = mapBundle(raw as SiteContentBundle)
  const out = resolve(process.cwd(), 'app/content/snapshot.json')
  writeFileSync(out, `${JSON.stringify(mapped, null, 2)}\n`)
  console.info(`Wrote ${out}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
