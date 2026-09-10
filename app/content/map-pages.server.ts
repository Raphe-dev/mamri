import imageUrlBuilder from '@sanity/image-url'
import type {
  AboutPage,
  Cta,
  DepPage,
  EnquetePage,
  FormationsPage,
  HomePage,
  LirePage,
  MembershipPage,
  RecrutementPage,
  ReseauxPage,
  ServicesPage,
  TetPage
} from '~/types/content'

type SanityImage =
  | {
      asset?: { _ref?: string; _id?: string } | null
      hotspot?: unknown
      crop?: unknown
    }
  | null
  | undefined

type Raw = Record<string, unknown> | null | undefined

function builder() {
  const projectId = process.env.SANITY_PROJECT_ID || process.env.NUXT_SANITY_PROJECT_ID
  const dataset = process.env.SANITY_DATASET || 'production'
  if (!projectId) throw new Error('SANITY_PROJECT_ID missing')
  return imageUrlBuilder({ projectId, dataset })
}

function hasAsset(image: SanityImage): image is NonNullable<SanityImage> {
  return Boolean(image && image.asset)
}

export function photoUrl(image: SanityImage, label: string) {
  if (!hasAsset(image)) throw new Error(`[content] photo missing asset (${label})`)
  return builder().image(image).width(1200).fit('crop').url()
}

export function photoUrlOpt(image: SanityImage) {
  if (!hasAsset(image)) return undefined
  return builder().image(image).width(1200).fit('crop').url()
}

export function logoUrl(image: SanityImage, label: string) {
  if (!hasAsset(image)) throw new Error(`[content] logo missing asset (${label})`)
  return builder().image(image).width(400).url()
}

function rec(value: unknown): Record<string, unknown> {
  if (value && typeof value === 'object' && !Array.isArray(value)) return value as Record<string, unknown>
  return {}
}

function must(value: unknown, label: string): string {
  if (typeof value !== 'string' || !value) throw new Error(`[content] missing ${label}`)
  return value
}

function str(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function strings(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === 'string')
}

function mapCta(value: unknown): Cta {
  const item = rec(value)
  const variant = item.variant
  return {
    label: must(item.label, 'cta.label'),
    to: must(item.to, 'cta.to'),
    external: item.external === true,
    variant:
      variant === 'primary' || variant === 'secondary' || variant === 'ghost' || variant === 'invert'
        ? variant
        : undefined
  }
}

function mapHero(value: unknown, label: string, fallback?: { image: string; imageAlt: string }) {
  const hero = rec(value)
  if (!hero.title) throw new Error(`[content] missing ${label}.hero.title`)
  return {
    kicker: str(hero.kicker) || undefined,
    title: must(hero.title, `${label}.hero.title`),
    lead: must(hero.lead, `${label}.hero.lead`),
    image: photoUrlOpt(hero.image as SanityImage) ?? fallback?.image,
    imageAlt: str(hero.imageAlt) || fallback?.imageAlt,
    ctas: Array.isArray(hero.ctas) ? hero.ctas.map(mapCta) : undefined
  }
}

function titled(value: unknown, label: string) {
  const item = rec(value)
  return {
    title: must(item.title, `${label}.title`),
    text: must(item.text, `${label}.text`)
  }
}

function titledImage(value: unknown, label: string) {
  const item = rec(value)
  return {
    title: must(item.title, `${label}.title`),
    text: must(item.text, `${label}.text`),
    image: photoUrlOpt(item.image as SanityImage) ?? ''
  }
}

function requireDoc(value: Raw, id: string): Record<string, unknown> {
  if (!value) throw new Error(`[content] ${id} missing`)
  return rec(value)
}

export function mapHomePage(raw: Raw): HomePage {
  const doc = requireDoc(raw, 'homePage')
  const years = rec(doc.years)
  const anniversary = rec(years.anniversary)
  const network = rec(doc.networkCta)
  const hero = mapHero(doc.hero, 'homePage')
  return {
    hero: {
      ...hero,
      ctas: hero.ctas ?? []
    },
    intro: strings(doc.intro),
    services: Array.isArray(doc.services)
      ? doc.services.map((item, i) => {
          const card = rec(item)
          const title = must(card.title, `homePage.services[${i}].title`)
          return {
            title,
            text: str(card.text),
            to: str(card.to),
            image: photoUrlOpt(card.image as SanityImage) ?? ''
          }
        })
      : [],
    stats: Array.isArray(doc.stats)
      ? doc.stats.map((item) => {
          const stat = rec(item)
          return {
            value: typeof stat.value === 'number' ? stat.value : 0,
            suffix: str(stat.suffix),
            label: str(stat.label)
          }
        })
      : [],
    years: {
      title: str(years.title),
      text: str(years.text),
      cta: {
        label: str(rec(years.cta).label),
        to: str(rec(years.cta).to)
      },
      anniversary: {
        label: str(anniversary.label),
        title: str(anniversary.title),
        href: str(anniversary.href)
      },
      image: photoUrlOpt(years.image as SanityImage),
      imageAlt: str(years.imageAlt) || undefined
    },
    networkCta: {
      title: str(network.title),
      cta: {
        label: str(rec(network.cta).label),
        to: str(rec(network.cta).to)
      },
      image: photoUrlOpt(network.image as SanityImage),
      imageAlt: str(network.imageAlt) || undefined
    }
  }
}

export function mapAboutPage(raw: Raw): AboutPage {
  const doc = requireDoc(raw, 'aboutPage')
  return {
    hero: mapHero(doc.hero, 'aboutPage'),
    intro: str(doc.intro),
    history: titledImage(doc.history, 'aboutPage.history'),
    mission: titledImage(doc.mission, 'aboutPage.mission'),
    vision: titledImage(doc.vision, 'aboutPage.vision'),
    implication: titledImage(doc.implication, 'aboutPage.implication'),
    timeline: Array.isArray(doc.timeline)
      ? doc.timeline.map((item, i) => {
          const row = rec(item)
          return { year: must(row.year, `aboutPage.timeline[${i}].year`), text: str(row.text) }
        })
      : [],
    values: Array.isArray(doc.values)
      ? doc.values.map((item, i) => titledImage(item, `aboutPage.values[${i}]`))
      : []
  }
}

export function mapMembershipPage(raw: Raw): MembershipPage {
  const doc = requireDoc(raw, 'membershipPage')
  return {
    hero: mapHero(doc.hero, 'membershipPage'),
    bullets: strings(doc.bullets),
    intro: str(doc.intro),
    benefits: Array.isArray(doc.benefits)
      ? doc.benefits.map((item, i) => {
          const row = rec(item)
          return {
            name: must(row.name, `membershipPage.benefits[${i}].name`),
            impact: str(row.impact)
          }
        })
      : [],
    dues: str(doc.dues),
    roi: Array.isArray(doc.roi)
      ? doc.roi.map((item, i) => {
          const row = rec(item)
          return { name: must(row.name, `membershipPage.roi[${i}].name`), text: str(row.text) }
        })
      : [],
    types: Array.isArray(doc.types)
      ? doc.types.map((item, i) => {
          const row = rec(item)
          return {
            title: must(row.title, `membershipPage.types[${i}].title`),
            who: str(row.who),
            access: str(row.access),
            note: str(row.note)
          }
        })
      : []
  }
}

export function mapServicesPage(raw: Raw): ServicesPage {
  const doc = requireDoc(raw, 'servicesPage')
  return {
    hero: mapHero(doc.hero, 'servicesPage', {
      image: '/images/photos/hero-services.jpg',
      imageAlt: 'Professionnels en usine discutant d’un plan de production'
    }),
    body: strings(doc.body),
    items: Array.isArray(doc.items)
      ? doc.items.map((item, i) => {
          const card = rec(item)
          return {
            slug: str(card.slug),
            title: must(card.title, `servicesPage.items[${i}].title`),
            text: str(card.text),
            to: str(card.to),
            image: photoUrlOpt(card.image as SanityImage) ?? ''
          }
        })
      : []
  }
}

export function mapReseauxPage(raw: Raw): ReseauxPage {
  const doc = requireDoc(raw, 'reseauxPage')
  return {
    hero: mapHero(doc.hero, 'reseauxPage', {
      image: '/images/photos/reseaux.jpg',
      imageAlt: 'Réseautage entre professionnels de l’industrie'
    }),
    intro: strings(doc.intro),
    networks: Array.isArray(doc.networks)
      ? doc.networks.map((item, i) => titledImage(item, `reseauxPage.networks[${i}]`))
      : [],
    closing: str(doc.closing)
  }
}

export function mapFormationsPage(raw: Raw): FormationsPage {
  const doc = requireDoc(raw, 'formationsPage')
  return {
    hero: mapHero(doc.hero, 'formationsPage', {
      image: '/images/photos/formations.jpg',
      imageAlt: 'Formation en milieu manufacturier'
    }),
    body: str(doc.body),
    discount: str(doc.discount),
    reasons: Array.isArray(doc.reasons)
      ? doc.reasons.map((item, i) => titled(item, `formationsPage.reasons[${i}]`))
      : []
  }
}

export function mapEnquetePage(raw: Raw): EnquetePage {
  const doc = requireDoc(raw, 'enquetePage')
  return {
    hero: mapHero(doc.hero, 'enquetePage', {
      image: '/images/photos/enquete.jpg',
      imageAlt: 'Enquête salariale manufacturière'
    }),
    deadline: str(doc.deadline),
    intro: str(doc.intro),
    why: strings(doc.why),
    contents: strings(doc.contents),
    prices: Array.isArray(doc.prices)
      ? doc.prices.map((item, i) => {
          const row = rec(item)
          return {
            label: must(row.label, `enquetePage.prices[${i}].label`),
            survey: str(row.survey),
            training: str(row.training)
          }
        })
      : []
  }
}

export function mapRecrutementPage(raw: Raw): RecrutementPage {
  const doc = requireDoc(raw, 'recrutementPage')
  return {
    hero: mapHero(doc.hero, 'recrutementPage', {
      image: '/images/photos/recrutement.jpg',
      imageAlt: 'Recrutement et acquisition de talents'
    }),
    intro: strings(doc.intro),
    offers: Array.isArray(doc.offers)
      ? doc.offers.map((item, i) => {
          const row = rec(item)
          return {
            title: must(row.title, `recrutementPage.offers[${i}].title`),
            text: str(row.text),
            href: str(row.href),
            cta: str(row.cta),
            image: photoUrlOpt(row.image as SanityImage) ?? ''
          }
        })
      : []
  }
}

export function mapDepPage(raw: Raw): DepPage {
  const doc = requireDoc(raw, 'depPage')
  const video = rec(doc.video)
  return {
    hero: mapHero(doc.hero, 'depPage', {
      image: '/images/photos/dep-operateur.jpg',
      imageAlt: 'Employé en production devant un équipement industriel'
    }),
    video: {
      title: str(video.title),
      lead: str(video.lead),
      src: str(video.src),
      creditHref: str(video.creditHref),
      credit: str(video.credit)
    },
    partners: Array.isArray(doc.partners)
      ? doc.partners.map((item, i) => {
          const row = rec(item)
          const name = must(row.name, `depPage.partners[${i}].name`)
          return {
            name,
            href: str(row.href),
            src: logoUrl(row.src as SanityImage, name),
            onDark: row.onDark === true
          }
        })
      : [],
    whyNow: strings(doc.whyNow),
    whyImage: photoUrlOpt(doc.whyImage as SanityImage),
    formula: strings(doc.formula),
    steps: Array.isArray(doc.steps)
      ? doc.steps.map((item, i) => titled(item, `depPage.steps[${i}]`))
      : [],
    benefits: Array.isArray(doc.benefits)
      ? doc.benefits.map((item, i) => titled(item, `depPage.benefits[${i}]`))
      : [],
    learningImage: photoUrlOpt(doc.learningImage as SanityImage),
    audience: strings(doc.audience),
    faq: Array.isArray(doc.faq)
      ? doc.faq.map((item, i) => {
          const row = rec(item)
          return {
            question: must(row.question, `depPage.faq[${i}].question`),
            answer: str(row.answer)
          }
        })
      : []
  }
}

export function mapLirePage(raw: Raw): LirePage {
  const doc = requireDoc(raw, 'lirePage')
  return {
    hero: mapHero(doc.hero, 'lirePage', {
      image: '/images/photos/paysage-6.jpg',
      imageAlt: 'Implantation d’un système en entreprise manufacturière'
    }),
    partners: Array.isArray(doc.partners)
      ? doc.partners.map((item, i) => {
          const row = rec(item)
          const name = must(row.name, `lirePage.partners[${i}].name`)
          return {
            name,
            href: str(row.href),
            src: logoUrl(row.src as SanityImage, name)
          }
        })
      : [],
    gains: Array.isArray(doc.gains)
      ? doc.gains.map((item, i) => titled(item, `lirePage.gains[${i}]`))
      : [],
    deliverables: Array.isArray(doc.deliverables)
      ? doc.deliverables.map((item, i) => titled(item, `lirePage.deliverables[${i}]`))
      : [],
    stats: Array.isArray(doc.stats)
      ? doc.stats.map((item, i) => {
          const row = rec(item)
          return {
            value: must(row.value, `lirePage.stats[${i}].value`),
            label: str(row.label)
          }
        })
      : [],
    calendar: Array.isArray(doc.calendar)
      ? doc.calendar.map((item, i) => {
          const row = rec(item)
          return {
            title: must(row.title, `lirePage.calendar[${i}].title`),
            when: str(row.when)
          }
        })
      : [],
    contactMailto: str(doc.contactMailto)
  }
}

export function mapTetPage(raw: Raw): TetPage {
  const doc = requireDoc(raw, 'tetPage')
  return {
    hero: mapHero(doc.hero, 'tetPage', {
      image: '/images/photos/dejeuner-2.jpg',
      imageAlt: 'Rencontre de mobilisation des manufacturiers'
    }),
    objectives: strings(doc.objectives),
    actions: Array.isArray(doc.actions)
      ? doc.actions.map((item, i) => {
          const row = rec(item)
          return {
            date: must(row.date, `tetPage.actions[${i}].date`),
            text: str(row.text)
          }
        })
      : [],
    next: str(doc.next),
    survey: str(doc.survey),
    report: str(doc.report),
    letter: str(doc.letter)
  }
}
