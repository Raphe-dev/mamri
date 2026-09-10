import type { SanityClient } from '@sanity/client'
import { aboutPage, membershipPage } from '../app/data/about'
import { home } from '../app/data/home'
import { depPage, lirePage, tetPage } from '../app/data/projects'
import {
  enquetePage,
  formationsPage,
  recrutementPage,
  reseauxPage,
  servicesPage
} from '../app/data/services'

type ImageValue = {
  _type: 'image'
  asset: { _type: 'reference'; _ref: string }
}

type Upload = (src: string) => Promise<ImageValue>

const PAGE_IDS = [
  'homePage',
  'aboutPage',
  'membershipPage',
  'servicesPage',
  'reseauxPage',
  'formationsPage',
  'enquetePage',
  'recrutementPage',
  'depPage',
  'lirePage',
  'tetPage'
] as const

function keyed<T>(type: string, items: T[], map: (item: T, index: number) => Record<string, unknown>) {
  return items.map((item, index) => ({
    _type: type,
    _key: `${type}-${index}`,
    ...map(item, index)
  }))
}

export async function seedPages(
  client: SanityClient,
  opts: { force: boolean; uploadImage: Upload }
) {
  const cache = new Map<string, ImageValue>()
  const existingById = new Map<string, Record<string, unknown>>()

  if (!opts.force) {
    const existing = await client.fetch<Array<{ _id: string } & Record<string, unknown>>>(
      `*[_id in $ids]`,
      { ids: PAGE_IDS }
    )
    for (const doc of existing ?? []) existingById.set(doc._id, doc)
  }

  async function image(src: string | undefined, previous?: unknown) {
    if (!src) return undefined
    const prev = previous as { asset?: { _ref?: string } } | undefined
    if (!opts.force && prev?.asset?._ref) return prev
    const hit = cache.get(src)
    if (hit) return hit
    const uploaded = await opts.uploadImage(src)
    cache.set(src, uploaded)
    return uploaded
  }

  async function hero(
    id: string,
    data: {
      kicker?: string
      title: string
      lead: string
      image?: string
      imageAlt?: string
      ctas?: Array<{ label: string; to: string; external?: boolean; variant?: string }>
    },
    extras?: { image?: string; imageAlt?: string }
  ) {
    const prev = existingById.get(id)?.hero as Record<string, unknown> | undefined
    const src = extras?.image ?? data.image
    return {
      _type: 'pageHero',
      kicker: data.kicker,
      title: data.title,
      lead: data.lead,
      image: await image(src, prev?.image),
      imageAlt: extras?.imageAlt ?? data.imageAlt,
      ctas: data.ctas
        ? keyed('pageCta', data.ctas, (cta) => ({
            label: cta.label,
            to: cta.to,
            external: cta.external,
            variant: cta.variant
          }))
        : undefined
    }
  }

  const { announcement: _a, ...homeRest } = home
  const homeId = 'homePage'
  await client.createOrReplace({
    _id: homeId,
    _type: 'homePage',
    hero: await hero(homeId, homeRest.hero),
    intro: homeRest.intro,
    services: await Promise.all(
      homeRest.services.map(async (item, index) => ({
        _type: 'serviceCard',
        _key: `serviceCard-${index}`,
        title: item.title,
        text: item.text,
        to: item.to,
        image: await image(item.image, rec((existingById.get(homeId)?.services as unknown[])?.[index])?.image)
      }))
    ),
    stats: keyed('homeStat', homeRest.stats, (item) => ({
      value: item.value,
      suffix: item.suffix,
      label: item.label
    })),
    years: {
      title: homeRest.years.title,
      text: homeRest.years.text,
      cta: { _type: 'pageCta', ...homeRest.years.cta },
      anniversary: homeRest.years.anniversary,
      image: await image(
        '/images/photos/dejeuner-1.jpg',
        (existingById.get(homeId)?.years as Record<string, unknown> | undefined)?.image
      ),
      imageAlt: 'Professionnels lors d’un déjeuner-conférence de la MRI'
    },
    networkCta: {
      title: homeRest.networkCta.title,
      cta: { _type: 'pageCta', ...homeRest.networkCta.cta },
      image: await image(
        '/images/photos/reseaux.jpg',
        (existingById.get(homeId)?.networkCta as Record<string, unknown> | undefined)?.image
      ),
      imageAlt: 'Réseautage entre professionnels de l’industrie'
    }
  })

  const aboutId = 'aboutPage'
  const aboutPrev = existingById.get(aboutId)
  await client.createOrReplace({
    _id: aboutId,
    _type: 'aboutPage',
    hero: await hero(aboutId, aboutPage.hero),
    intro: aboutPage.intro,
    history: {
      _type: 'titledTextImage',
      title: aboutPage.history.title,
      text: aboutPage.history.text,
      image: await image(aboutPage.history.image, rec(aboutPrev?.history)?.image)
    },
    mission: {
      _type: 'titledTextImage',
      title: aboutPage.mission.title,
      text: aboutPage.mission.text,
      image: await image(aboutPage.mission.image, rec(aboutPrev?.mission)?.image)
    },
    vision: {
      _type: 'titledTextImage',
      title: aboutPage.vision.title,
      text: aboutPage.vision.text,
      image: await image(aboutPage.vision.image, rec(aboutPrev?.vision)?.image)
    },
    implication: {
      _type: 'titledTextImage',
      title: aboutPage.implication.title,
      text: aboutPage.implication.text,
      image: await image(aboutPage.implication.image, rec(aboutPrev?.implication)?.image)
    },
    timeline: keyed('timelineItem', aboutPage.timeline, (item) => ({
      year: item.year,
      text: item.text
    })),
    values: await Promise.all(
      aboutPage.values.map(async (item, index) => ({
        _type: 'titledTextImage',
        _key: `titledTextImage-${index}`,
        title: item.title,
        text: item.text,
        image: await image(item.image, rec((aboutPrev?.values as unknown[])?.[index])?.image)
      }))
    )
  })

  await client.createOrReplace({
    _id: 'membershipPage',
    _type: 'membershipPage',
    hero: await hero('membershipPage', membershipPage.hero),
    bullets: membershipPage.bullets,
    intro: membershipPage.intro,
    benefits: keyed('namedImpact', membershipPage.benefits, (item) => ({
      name: item.name,
      impact: item.impact
    })),
    dues: membershipPage.dues,
    roi: keyed('namedText', membershipPage.roi, (item) => ({ name: item.name, text: item.text })),
    types: keyed('membershipType', membershipPage.types, (item) => ({
      title: item.title,
      who: item.who,
      access: item.access,
      note: item.note
    }))
  })

  const servicesId = 'servicesPage'
  await client.createOrReplace({
    _id: servicesId,
    _type: 'servicesPage',
    hero: await hero(servicesId, servicesPage.hero, {
      image: '/images/photos/hero-services.jpg',
      imageAlt: 'Professionnels en usine discutant d’un plan de production'
    }),
    body: servicesPage.body,
    items: await Promise.all(
      servicesPage.items.map(async (item, index) => ({
        _type: 'serviceCard',
        _key: `serviceCard-${index}`,
        slug: item.slug,
        title: item.title,
        text: item.text,
        to: item.to,
        image: await image(item.image, rec((existingById.get(servicesId)?.items as unknown[])?.[index])?.image)
      }))
    )
  })

  const reseauxId = 'reseauxPage'
  await client.createOrReplace({
    _id: reseauxId,
    _type: 'reseauxPage',
    hero: await hero(reseauxId, reseauxPage.hero, {
      image: '/images/photos/reseaux.jpg',
      imageAlt: 'Réseautage entre professionnels de l’industrie'
    }),
    intro: reseauxPage.intro,
    networks: await Promise.all(
      reseauxPage.networks.map(async (item, index) => ({
        _type: 'titledTextImage',
        _key: `titledTextImage-${index}`,
        title: item.title,
        text: item.text,
        image: await image(item.image, rec((existingById.get(reseauxId)?.networks as unknown[])?.[index])?.image)
      }))
    ),
    closing: reseauxPage.closing
  })

  await client.createOrReplace({
    _id: 'formationsPage',
    _type: 'formationsPage',
    hero: await hero('formationsPage', formationsPage.hero, {
      image: '/images/photos/formations.jpg',
      imageAlt: 'Formation en milieu manufacturier'
    }),
    body: formationsPage.body,
    discount: formationsPage.discount,
    reasons: keyed('titledText', formationsPage.reasons, (item) => ({
      title: item.title,
      text: item.text
    }))
  })

  await client.createOrReplace({
    _id: 'enquetePage',
    _type: 'enquetePage',
    hero: await hero('enquetePage', enquetePage.hero, {
      image: '/images/photos/enquete.jpg',
      imageAlt: 'Enquête salariale manufacturière'
    }),
    deadline: enquetePage.deadline,
    intro: enquetePage.intro,
    why: enquetePage.why,
    contents: enquetePage.contents,
    prices: keyed('priceRow', enquetePage.prices, (item) => ({
      label: item.label,
      survey: item.survey,
      training: item.training
    }))
  })

  const recId = 'recrutementPage'
  await client.createOrReplace({
    _id: recId,
    _type: 'recrutementPage',
    hero: await hero(recId, recrutementPage.hero, {
      image: '/images/photos/recrutement.jpg',
      imageAlt: 'Recrutement et acquisition de talents'
    }),
    intro: recrutementPage.intro,
    offers: await Promise.all(
      recrutementPage.offers.map(async (item, index) => ({
        _type: 'offerCard',
        _key: `offerCard-${index}`,
        title: item.title,
        text: item.text,
        href: item.href,
        cta: item.cta,
        image: await image(item.image, rec((existingById.get(recId)?.offers as unknown[])?.[index])?.image)
      }))
    )
  })

  const depId = 'depPage'
  const depPrev = existingById.get(depId)
  await client.createOrReplace({
    _id: depId,
    _type: 'depPage',
    hero: await hero(depId, depPage.hero, {
      image: '/images/photos/dep-operateur.jpg',
      imageAlt: 'Employé en production devant un équipement industriel'
    }),
    video: depPage.video,
    partners: await Promise.all(
      depPage.partners.map(async (item, index) => ({
        _type: 'partner',
        _key: `partner-${index}`,
        name: item.name,
        href: item.href,
        src: await image(item.src, rec((depPrev?.partners as unknown[])?.[index])?.src),
        onDark: item.onDark ?? false
      }))
    ),
    whyNow: depPage.whyNow,
    whyImage: await image('/images/photos/dep-operateur.jpg', depPrev?.whyImage),
    formula: depPage.formula,
    steps: keyed('titledText', depPage.steps, (item) => ({ title: item.title, text: item.text })),
    benefits: keyed('titledText', depPage.benefits, (item) => ({ title: item.title, text: item.text })),
    learningImage: await image('/images/photos/dep-apprentissage.jpg', depPrev?.learningImage),
    audience: depPage.audience,
    faq: keyed('faqItem', depPage.faq, (item) => ({ question: item.question, answer: item.answer }))
  })

  const lireId = 'lirePage'
  await client.createOrReplace({
    _id: lireId,
    _type: 'lirePage',
    hero: await hero(lireId, lirePage.hero, {
      image: '/images/photos/paysage-6.jpg',
      imageAlt: 'Implantation d’un système en entreprise manufacturière'
    }),
    partners: await Promise.all(
      lirePage.partners.map(async (item, index) => ({
        _type: 'partner',
        _key: `partner-${index}`,
        name: item.name,
        href: item.href,
        src: await image(item.src, rec((existingById.get(lireId)?.partners as unknown[])?.[index])?.src)
      }))
    ),
    gains: keyed('titledText', lirePage.gains, (item) => ({ title: item.title, text: item.text })),
    deliverables: keyed('titledText', lirePage.deliverables, (item) => ({
      title: item.title,
      text: item.text
    })),
    stats: keyed('stringStat', lirePage.stats, (item) => ({ value: item.value, label: item.label })),
    calendar: keyed('calendarItem', lirePage.calendar, (item) => ({
      title: item.title,
      when: item.when
    })),
    contactMailto: lirePage.contactMailto
  })

  await client.createOrReplace({
    _id: 'tetPage',
    _type: 'tetPage',
    hero: await hero('tetPage', tetPage.hero, {
      image: '/images/photos/dejeuner-2.jpg',
      imageAlt: 'Rencontre de mobilisation des manufacturiers'
    }),
    objectives: tetPage.objectives,
    actions: keyed('actionItem', tetPage.actions, (item) => ({ date: item.date, text: item.text })),
    next: tetPage.next,
    survey: tetPage.survey,
    report: tetPage.report,
    letter: tetPage.letter
  })

  console.info(`pages=${PAGE_IDS.length} upserted`)
}

function rec(value: unknown): Record<string, unknown> | undefined {
  if (value && typeof value === 'object' && !Array.isArray(value)) return value as Record<string, unknown>
  return undefined
}

export const EXPECTED_PAGES = PAGE_IDS.length
