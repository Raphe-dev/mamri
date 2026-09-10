import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { aboutPage as staticAbout, membershipPage as staticMembership } from '~/data/about'
import { events as staticEvents } from '~/data/events'
import { home as staticHome } from '~/data/home'
import { memberLogos as staticLogos, memberSpotlights as staticSpotlights } from '~/data/members'
import { depPage as staticDep, lirePage as staticLire, tetPage as staticTet } from '~/data/projects'
import {
  enquetePage as staticEnquete,
  formationsPage as staticFormations,
  recrutementPage as staticRecrutement,
  reseauxPage as staticReseaux,
  servicesPage as staticServices
} from '~/data/services'
import { site as staticSite } from '~/data/site'
import { team as staticTeam } from '~/data/team'
import type { SiteContent } from '~/types/content'
import { mapBundle, type SiteContentBundle } from './map.server'
import { sanityClient } from './sanity-client.server'
import { SITE_CONTENT_QUERY } from './sanity.queries'

export type { SiteContent }

const DEFAULT_ZOHO_ENQUETE =
  'https://forms.zoho.com/emploiscomptences/form/EnqutesalarialeMRIParticipantlenqute'
const DEFAULT_ZOHO_BULLETIN = 'https://mamri.ca/bulletin'

let memo: Promise<SiteContent> | null = null

export function loadSiteContent(): Promise<SiteContent> {
  if (!memo) memo = resolveContent()
  return memo
}

function fromStatic(): SiteContent {
  const { announcement: _announcement, ...homeRest } = staticHome
  return {
    site: staticSite,
    announcement: {
      ...staticHome.announcement,
      enabled: true
    },
    zohoEnquete: process.env.NUXT_PUBLIC_ZOHO_ENQUETE ?? DEFAULT_ZOHO_ENQUETE,
    zohoBulletin: process.env.NUXT_PUBLIC_ZOHO_BULLETIN ?? DEFAULT_ZOHO_BULLETIN,
    events: staticEvents,
    memberLogos: staticLogos,
    memberSpotlights: staticSpotlights,
    team: staticTeam,
    home: {
      ...homeRest,
      years: {
        ...homeRest.years,
        image: '/images/photos/dejeuner-1.jpg',
        imageAlt: 'Professionnels lors d’un déjeuner-conférence de la MRI'
      },
      networkCta: {
        ...homeRest.networkCta,
        image: '/images/photos/reseaux.jpg',
        imageAlt: 'Réseautage entre professionnels de l’industrie'
      }
    },
    aboutPage: staticAbout,
    membershipPage: staticMembership,
    servicesPage: {
      ...staticServices,
      hero: {
        ...staticServices.hero,
        image: '/images/photos/hero-services.jpg',
        imageAlt: 'Professionnels en usine discutant d’un plan de production'
      }
    },
    reseauxPage: {
      ...staticReseaux,
      hero: {
        ...staticReseaux.hero,
        image: '/images/photos/reseaux.jpg',
        imageAlt: 'Réseautage entre professionnels de l’industrie'
      }
    },
    formationsPage: {
      ...staticFormations,
      hero: {
        ...staticFormations.hero,
        image: '/images/photos/formations.jpg',
        imageAlt: 'Formation en milieu manufacturier'
      }
    },
    enquetePage: {
      ...staticEnquete,
      hero: {
        ...staticEnquete.hero,
        image: '/images/photos/enquete.jpg',
        imageAlt: 'Enquête salariale manufacturière'
      }
    },
    recrutementPage: {
      ...staticRecrutement,
      hero: {
        ...staticRecrutement.hero,
        image: '/images/photos/recrutement.jpg',
        imageAlt: 'Recrutement et acquisition de talents'
      }
    },
    depPage: {
      ...staticDep,
      hero: {
        ...staticDep.hero,
        image: '/images/photos/dep-operateur.jpg',
        imageAlt: 'Employé en production devant un équipement industriel'
      },
      whyImage: '/images/photos/dep-operateur.jpg',
      learningImage: '/images/photos/dep-apprentissage.jpg'
    },
    lirePage: {
      ...staticLire,
      hero: {
        ...staticLire.hero,
        image: '/images/photos/paysage-6.jpg',
        imageAlt: 'Implantation d’un système en entreprise manufacturière'
      }
    },
    tetPage: {
      ...staticTet,
      hero: {
        ...staticTet.hero,
        image: '/images/photos/dejeuner-2.jpg',
        imageAlt: 'Rencontre de mobilisation des manufacturiers'
      }
    }
  }
}

function fromSnapshotOrStatic(): SiteContent {
  const snap = resolve(process.cwd(), 'app/content/snapshot.json')
  if (existsSync(snap)) {
    return JSON.parse(readFileSync(snap, 'utf8')) as SiteContent
  }
  return fromStatic()
}

function assertV1(content: SiteContent) {
  if (!content.events.length) throw new Error('[content] zero events')
  if (!content.memberLogos.length) throw new Error('[content] zero member logos')
  if (!content.team.length) throw new Error('[content] zero team members')
}

function logSource(content: SiteContent, source: 'sanity' | 'static') {
  const projectId = process.env.SANITY_PROJECT_ID || process.env.NUXT_SANITY_PROJECT_ID || ''
  const dataset = process.env.SANITY_DATASET || 'production'
  if (source === 'sanity') {
    console.info(
      `[content] source=sanity project=${projectId} dataset=${dataset} events=${content.events.length} logos=${content.memberLogos.length} spotlights=${content.memberSpotlights.length} team=${content.team.length}`
    )
  } else {
    console.info('[content] source=static')
  }
}

async function resolveContent(): Promise<SiteContent> {
  if (process.env.SANITY_FALLBACK === '1') {
    const content = fromSnapshotOrStatic()
    logSource(content, 'static')
    return content
  }

  const projectId = process.env.SANITY_PROJECT_ID || process.env.NUXT_SANITY_PROJECT_ID
  if (!projectId) {
    const content = fromStatic()
    logSource(content, 'static')
    return content
  }

  try {
    const raw = await sanityClient().fetch(SITE_CONTENT_QUERY)
    const mapped = mapBundle(raw as SiteContentBundle)
    assertV1(mapped)
    logSource(mapped, 'sanity')
    return mapped
  } catch (error) {
    console.error('[content] GROQ failed', error)
    throw error
  }
}
