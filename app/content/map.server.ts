import type { EventItem, EventType, SiteContent } from '~/types/content'
import { logoUrl, photoUrl, type SanityImage } from './image-url.server'
import {
  mapAboutPage,
  mapDepPage,
  mapEnquetePage,
  mapFormationsPage,
  mapHomePage,
  mapLirePage,
  mapMembershipPage,
  mapRecrutementPage,
  mapReseauxPage,
  mapServicesPage,
  mapTetPage
} from './map-pages.server'

const EVENT_TYPES: EventType[] = ['formation', 'evenement', 'visite', 'webinaire']

const DEFAULT_ZOHO_ENQUETE =
  'https://forms.zoho.com/emploiscomptences/form/EnqutesalarialeMRIParticipantlenqute'
const DEFAULT_ZOHO_BULLETIN = 'https://mamri.ca/bulletin'

export type SiteContentBundle = {
  settings: {
    announcement?: { enabled?: boolean | null; label?: string | null; text?: string | null; to?: string | null } | null
    name?: string | null
    shortName?: string | null
    tagline?: string | null
    description?: string | null
    founded?: number | null
    address?: { line1?: string | null; city?: string | null; postal?: string | null; display?: string | null } | null
    geo?: { lat?: number | null; lng?: number | null; maps?: string | null; google?: string | null; embed?: string | null } | null
    phone?: { display?: string | null; href?: string | null; ext?: string | null } | null
    email?: {
      general?: string | null
      projects?: string | null
      privacy?: string | null
      privacyName?: string | null
      privacyTitle?: string | null
      privacyPhone?: string | null
      communication?: string | null
    } | null
    social?: { facebook?: string | null; linkedin?: string | null } | null
    emploisCompetences?: {
      name?: string | null
      url?: string | null
      phone?: string | null
      phoneHref?: string | null
      email?: string | null
    } | null
    zohoEnquete?: string | null
    zohoBulletin?: string | null
  } | null
  events: Array<{
    slug?: string | null
    title?: string | null
    type?: string | null
    startLabel?: string | null
    timeLabel?: string | null
    location?: string | null
    memberPrice?: string | null
    nonMemberPrice?: string | null
    priceNote?: string | null
    tags?: string[] | null
    excerpt?: string | null
    href?: string | null
    month?: number | null
    year?: number | null
  } | null>
  memberLogos: Array<{
    name?: string | null
    href?: string | null
    logo?: SanityImage
  } | null>
  memberSpotlights: Array<{
    name?: string | null
    image?: SanityImage
    imageAlt?: string | null
    body?: string | null
    href?: string | null
    credit?: string | null
    featured?: boolean | null
  } | null>
  team: Array<{
    name?: string | null
    title?: string | null
    image?: SanityImage
    linkedin?: string | null
  } | null>
  homePage?: Record<string, unknown> | null
  aboutPage?: Record<string, unknown> | null
  membershipPage?: Record<string, unknown> | null
  servicesPage?: Record<string, unknown> | null
  reseauxPage?: Record<string, unknown> | null
  formationsPage?: Record<string, unknown> | null
  enquetePage?: Record<string, unknown> | null
  recrutementPage?: Record<string, unknown> | null
  depPage?: Record<string, unknown> | null
  lirePage?: Record<string, unknown> | null
  tetPage?: Record<string, unknown> | null
}

function must(value: string | null | undefined, label: string): string {
  if (!value) throw new Error(`[content] missing ${label}`)
  return value
}

function asEventType(value: string | null | undefined, slug: string): EventType {
  if (value && (EVENT_TYPES as string[]).includes(value)) return value as EventType
  throw new Error(`[content] invalid event type for ${slug}`)
}

export function mapBundle(raw: SiteContentBundle): SiteContent {
  const settings = raw.settings
  if (!settings) throw new Error('[content] siteSettings missing')

  const announcement = settings.announcement
  if (!announcement) throw new Error('[content] announcement missing')

  const events: EventItem[] = (raw.events ?? []).flatMap((event) => {
    if (!event) return []
    const slug = must(event.slug, 'event.slug')
    return [
      {
        slug,
        title: must(event.title, `event.title ${slug}`),
        type: asEventType(event.type, slug),
        startLabel: must(event.startLabel, `event.startLabel ${slug}`),
        timeLabel: must(event.timeLabel, `event.timeLabel ${slug}`),
        location: event.location || undefined,
        memberPrice: event.memberPrice || undefined,
        nonMemberPrice: event.nonMemberPrice || undefined,
        priceNote: event.priceNote || undefined,
        tags: event.tags ?? [],
        excerpt: must(event.excerpt, `event.excerpt ${slug}`),
        href: must(event.href, `event.href ${slug}`),
        month: event.month ?? (() => {
          throw new Error(`[content] missing event.month ${slug}`)
        })(),
        year: event.year ?? (() => {
          throw new Error(`[content] missing event.year ${slug}`)
        })()
      }
    ]
  })

  return {
    site: {
      name: must(settings.name, 'settings.name'),
      shortName: settings.shortName ?? '',
      tagline: settings.tagline ?? '',
      description: settings.description ?? '',
      founded: settings.founded ?? 0,
      address: {
        line1: settings.address?.line1 ?? '',
        city: settings.address?.city ?? '',
        postal: settings.address?.postal ?? '',
        display: settings.address?.display ?? ''
      },
      geo: {
        lat: settings.geo?.lat ?? 0,
        lng: settings.geo?.lng ?? 0,
        maps: settings.geo?.maps ?? '',
        google: settings.geo?.google ?? '',
        embed: settings.geo?.embed ?? ''
      },
      phone: {
        display: settings.phone?.display ?? '',
        href: settings.phone?.href ?? '',
        ext: settings.phone?.ext ?? ''
      },
      email: {
        general: settings.email?.general ?? '',
        projects: settings.email?.projects ?? '',
        privacy: settings.email?.privacy ?? '',
        privacyName: settings.email?.privacyName ?? '',
        privacyTitle: settings.email?.privacyTitle ?? '',
        privacyPhone: settings.email?.privacyPhone ?? '',
        communication: settings.email?.communication ?? ''
      },
      social: {
        facebook: settings.social?.facebook ?? '',
        linkedin: settings.social?.linkedin ?? ''
      },
      emploisCompetences: {
        name: settings.emploisCompetences?.name ?? '',
        url: settings.emploisCompetences?.url ?? '',
        phone: settings.emploisCompetences?.phone ?? '',
        phoneHref: settings.emploisCompetences?.phoneHref ?? '',
        email: settings.emploisCompetences?.email ?? ''
      }
    },
    announcement: {
      enabled: announcement.enabled !== false,
      label: must(announcement.label, 'announcement.label'),
      text: must(announcement.text, 'announcement.text'),
      to: must(announcement.to, 'announcement.to')
    },
    zohoEnquete: settings.zohoEnquete || process.env.NUXT_PUBLIC_ZOHO_ENQUETE || DEFAULT_ZOHO_ENQUETE,
    zohoBulletin: settings.zohoBulletin || process.env.NUXT_PUBLIC_ZOHO_BULLETIN || DEFAULT_ZOHO_BULLETIN,
    events,
    memberLogos: (raw.memberLogos ?? []).flatMap((logo) => {
      if (!logo) return []
      const name = must(logo.name, 'memberLogo.name')
      return [
        {
          name,
          href: must(logo.href, `memberLogo.href ${name}`),
          src: logoUrl(logo.logo, name)
        }
      ]
    }),
    memberSpotlights: (raw.memberSpotlights ?? []).flatMap((spot) => {
      if (!spot) return []
      const name = must(spot.name, 'memberSpotlight.name')
      return [
        {
          name,
          image: photoUrl(spot.image, name),
          imageAlt: must(spot.imageAlt, `memberSpotlight.imageAlt ${name}`),
          body: must(spot.body, `memberSpotlight.body ${name}`),
          href: must(spot.href, `memberSpotlight.href ${name}`),
          credit: spot.credit || undefined,
          featured: spot.featured === true
        }
      ]
    }),
    team: (raw.team ?? []).flatMap((member) => {
      if (!member) return []
      const name = must(member.name, 'teamMember.name')
      return [
        {
          name,
          title: must(member.title, `teamMember.title ${name}`),
          image: photoUrl(member.image, name),
          linkedin: member.linkedin ?? ''
        }
      ]
    }),
    home: mapHomePage(raw.homePage),
    aboutPage: mapAboutPage(raw.aboutPage),
    membershipPage: mapMembershipPage(raw.membershipPage),
    servicesPage: mapServicesPage(raw.servicesPage),
    reseauxPage: mapReseauxPage(raw.reseauxPage),
    formationsPage: mapFormationsPage(raw.formationsPage),
    enquetePage: mapEnquetePage(raw.enquetePage),
    recrutementPage: mapRecrutementPage(raw.recrutementPage),
    depPage: mapDepPage(raw.depPage),
    lirePage: mapLirePage(raw.lirePage),
    tetPage: mapTetPage(raw.tetPage)
  }
}
