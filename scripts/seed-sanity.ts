/**
 * Seed Sanity dataset `production` (u5ov5dbs) from app/data and public/images.
 *
 * Pause the Netlify webhook in Sanity Manage before running (or a live hook
 * will enqueue tens of production builds). Re-enable after.
 *
 * importKey is import-only. Do not re-run after editors have created documents
 * in Studio: those docs have no key, so a second pass cannot match them and
 * --force would duplicate rows.
 *
 * Usage:
 *   npm run seed
 *   npm run seed -- --force   # re-upload images from public/
 */
import { createReadStream, existsSync, readFileSync } from 'node:fs'
import { basename, resolve } from 'node:path'
import { createClient, type SanityClient } from '@sanity/client'
import { events } from '../app/data/events'
import { home } from '../app/data/home'
import { memberLogos, memberSpotlights } from '../app/data/members'
import { site } from '../app/data/site'
import { team } from '../app/data/team'
import { EXPECTED_PAGES, seedPages } from './seed-pages'

const PROJECT_ID = 'u5ov5dbs'
const EXPECTED = { events: 14, logos: 60, spotlights: 10, team: 2, settings: 1, pages: EXPECTED_PAGES } as const
const DEFAULT_ZOHO_ENQUETE =
  'https://forms.zoho.com/emploiscomptences/form/EnqutesalarialeMRIParticipantlenqute'
const DEFAULT_ZOHO_BULLETIN = 'https://mamri.ca/bulletin'

function parseEnvValue(raw: string) {
  let value = raw.trim()
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1).trim()
  }
  return value.replace(/[\u0000-\u001F\u007F-\uFFFF]/g, '')
}

function isHttpHeaderSafe(value: string) {
  return value.length > 0 && /^[\t\x20-\x7E]*$/.test(value)
}

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
      const value = parseEnvValue(trimmed.slice(eq + 1))
      const current = process.env[key]
      if (current === undefined || current === '' || !isHttpHeaderSafe(current)) {
        process.env[key] = value
      }
    }
  }
}

function kebab(name: string) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function publicFile(src: string) {
  const abs = resolve(process.cwd(), 'public', src.replace(/^\//, ''))
  if (!existsSync(abs)) throw new Error(`Missing image: ${abs}`)
  return abs
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function uploadImage(client: SanityClient, src: string) {
  const abs = publicFile(src)
  let lastError: unknown
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const asset = await client.assets.upload('image', createReadStream(abs), {
        filename: basename(abs)
      })
      return {
        _type: 'image' as const,
        asset: { _type: 'reference' as const, _ref: asset._id }
      }
    } catch (error) {
      lastError = error
      const status = (error as { statusCode?: number }).statusCode
      const retryable = status === 429 || status === 500 || status === 502 || status === 503
      if (!retryable || attempt === 5) throw error
      const delay = attempt * 1500
      console.warn(`Upload retry ${attempt}/5 for ${basename(abs)} (HTTP ${status}), waiting ${delay}ms`)
      await sleep(delay)
    }
  }
  throw lastError
}

async function findId(client: SanityClient, type: string, importKey: string) {
  return client.fetch<string | null>(`*[_type == $type && importKey == $k][0]._id`, {
    type,
    k: importKey
  })
}

async function main() {
  loadDotEnv()
  const force = process.argv.includes('--force')
  const token = parseEnvValue(process.env.SANITY_WRITE_TOKEN || '')
  if (!token) {
    console.error('SANITY_WRITE_TOKEN is required (local .env only, never Netlify).')
    process.exit(1)
  }
  if (!isHttpHeaderSafe(token)) {
    console.error(
      'SANITY_WRITE_TOKEN contains characters that cannot go in an HTTP Authorization header (quotes, a newline, or a copied “…”). Use the token from .env as-is: npm run seed -- --force'
    )
    process.exit(1)
  }

  console.warn(
    [
      '',
      '*** Pause the Netlify webhook in Sanity Manage before seeding. ***',
      'A live webhook would enqueue a production build per document.',
      'Re-enable the webhook after this script exits.',
      'Do not re-run after editors have created documents (no importKey).',
      ''
    ].join('\n')
  )

  const client = createClient({
    projectId: PROJECT_ID,
    dataset: process.env.SANITY_DATASET || 'production',
    apiVersion: process.env.SANITY_API_VERSION || '2025-02-19',
    token,
    useCdn: false
  })

  if (events.length !== EXPECTED.events) {
    throw new Error(`events.ts has ${events.length} rows, expected ${EXPECTED.events}`)
  }
  if (memberLogos.length !== EXPECTED.logos) {
    throw new Error(`memberLogos has ${memberLogos.length} rows, expected ${EXPECTED.logos}`)
  }
  if (memberSpotlights.length !== EXPECTED.spotlights) {
    throw new Error(`memberSpotlights has ${memberSpotlights.length} rows, expected ${EXPECTED.spotlights}`)
  }
  if (team.length !== EXPECTED.team) {
    throw new Error(`team has ${team.length} rows, expected ${EXPECTED.team}`)
  }

  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    announcement: {
      enabled: true,
      label: home.announcement.label,
      text: home.announcement.text,
      to: home.announcement.to
    },
    name: site.name,
    shortName: site.shortName,
    tagline: site.tagline,
    description: site.description,
    founded: site.founded,
    address: site.address,
    geo: site.geo,
    phone: site.phone,
    email: site.email,
    social: site.social,
    emploisCompetences: site.emploisCompetences,
    zohoEnquete: process.env.NUXT_PUBLIC_ZOHO_ENQUETE || DEFAULT_ZOHO_ENQUETE,
    zohoBulletin: DEFAULT_ZOHO_BULLETIN
  })
  console.info('settings=1 upserted (siteSettings)')

  let eventsCreated = 0
  let eventsPatched = 0
  for (const [i, event] of events.entries()) {
    const importKey = event.slug
    const fields = {
      title: event.title,
      slug: { _type: 'slug', current: event.slug },
      type: event.type,
      startLabel: event.startLabel,
      timeLabel: event.timeLabel,
      location: event.location,
      memberPrice: event.memberPrice,
      nonMemberPrice: event.nonMemberPrice,
      priceNote: event.priceNote,
      tags: event.tags ?? [],
      excerpt: event.excerpt,
      href: event.href,
      month: event.month,
      year: event.year,
      sortIndex: i,
      hidden: false,
      importKey
    }
    const id = await findId(client, 'event', importKey)
    if (id) {
      await client.patch(id).set(fields).commit()
      eventsPatched++
    } else {
      await client.create({ _type: 'event', ...fields })
      eventsCreated++
    }
  }
  console.info(`events=${events.length} created=${eventsCreated} patched=${eventsPatched}`)

  let logosCreated = 0
  let logosPatched = 0
  for (const [i, logo] of memberLogos.entries()) {
    if (logo.src.toLowerCase().endsWith('.bmp')) {
      throw new Error(`Refusing to seed bmp: ${logo.src}`)
    }
    const importKey = kebab(logo.name)
    const existing = await client.fetch<{
      _id: string
      logo?: { asset?: { _ref?: string } }
    } | null>(`*[_type == "memberLogo" && importKey == $k][0]{_id, logo}`, { k: importKey })

    const image =
      existing?.logo?.asset?._ref && !force ? existing.logo : await uploadImage(client, logo.src)

    const fields = {
      name: logo.name,
      href: logo.href,
      logo: image,
      sortIndex: i,
      importKey
    }
    if (existing?._id) {
      await client.patch(existing._id).set(fields).commit()
      logosPatched++
    } else {
      await client.create({ _type: 'memberLogo', ...fields })
      logosCreated++
    }
  }
  console.info(`logos=${memberLogos.length} created=${logosCreated} patched=${logosPatched}`)

  let spotsCreated = 0
  let spotsPatched = 0
  for (const [i, spot] of memberSpotlights.entries()) {
    const importKey = kebab(spot.name)
    const existing = await client.fetch<{
      _id: string
      image?: { asset?: { _ref?: string } }
    } | null>(`*[_type == "memberSpotlight" && importKey == $k][0]{_id, image}`, { k: importKey })

    const image =
      existing?.image?.asset?._ref && !force ? existing.image : await uploadImage(client, spot.image)

    const fields = {
      name: spot.name,
      image,
      imageAlt: spot.imageAlt,
      body: spot.body,
      href: spot.href,
      credit: spot.credit,
      featured: i === 0,
      sortIndex: i,
      importKey
    }
    if (existing?._id) {
      await client.patch(existing._id).set(fields).commit()
      spotsPatched++
    } else {
      await client.create({ _type: 'memberSpotlight', ...fields })
      spotsCreated++
    }
  }
  console.info(`spotlights=${memberSpotlights.length} created=${spotsCreated} patched=${spotsPatched}`)

  let teamCreated = 0
  let teamPatched = 0
  for (const [i, member] of team.entries()) {
    const importKey = kebab(member.name)
    const existing = await client.fetch<{
      _id: string
      image?: { asset?: { _ref?: string } }
    } | null>(`*[_type == "teamMember" && importKey == $k][0]{_id, image}`, { k: importKey })

    const image =
      existing?.image?.asset?._ref && !force ? existing.image : await uploadImage(client, member.image)

    const fields = {
      name: member.name,
      title: member.title,
      image,
      linkedin: member.linkedin,
      sortIndex: i,
      importKey
    }
    if (existing?._id) {
      await client.patch(existing._id).set(fields).commit()
      teamPatched++
    } else {
      await client.create({ _type: 'teamMember', ...fields })
      teamCreated++
    }
  }
  console.info(`team=${team.length} created=${teamCreated} patched=${teamPatched}`)

  await seedPages(client, { force, uploadImage: (src) => uploadImage(client, src) })

  const counts = await client.fetch<{
    events: number
    logos: number
    spotlights: number
    team: number
    settings: number
    pages: number
  }>(`{
    "events": count(*[_type == "event"]),
    "logos": count(*[_type == "memberLogo"]),
    "spotlights": count(*[_type == "memberSpotlight"]),
    "team": count(*[_type == "teamMember"]),
    "settings": count(*[_id == "siteSettings"]),
    "pages": count(*[_id in ["homePage","aboutPage","membershipPage","servicesPage","reseauxPage","formationsPage","enquetePage","recrutementPage","depPage","lirePage","tetPage"]])
  }`)

  const report = `events=${counts.events} logos=${counts.logos} spotlights=${counts.spotlights} team=${counts.team} settings=${counts.settings} pages=${counts.pages}`
  console.info(report)

  const mismatches: string[] = []
  if (counts.events !== EXPECTED.events) mismatches.push(`events ${counts.events}!=${EXPECTED.events}`)
  if (counts.logos !== EXPECTED.logos) mismatches.push(`logos ${counts.logos}!=${EXPECTED.logos}`)
  if (counts.spotlights !== EXPECTED.spotlights) {
    mismatches.push(`spotlights ${counts.spotlights}!=${EXPECTED.spotlights}`)
  }
  if (counts.team !== EXPECTED.team) mismatches.push(`team ${counts.team}!=${EXPECTED.team}`)
  if (counts.settings !== EXPECTED.settings) {
    mismatches.push(`settings ${counts.settings}!=${EXPECTED.settings}`)
  }
  if (counts.pages !== EXPECTED.pages) mismatches.push(`pages ${counts.pages}!=${EXPECTED.pages}`)
  if (mismatches.length) {
    console.error(`Seed count mismatch: ${mismatches.join(', ')}`)
    process.exit(1)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
