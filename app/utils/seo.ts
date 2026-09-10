export const SITE_NAME = 'Maison régionale de l’industrie'
export const DEFAULT_DESCRIPTION =
  'La Maison régionale de l’industrie soutient les entreprises manufacturières de l’Estrie dans la concrétisation de leurs projets stratégiques et générateurs de croissance.'
export const OG_IMAGE_PATH = '/images/og.jpg'

export const sitemapRoutes = [
  '/',
  '/a-propos',
  '/bulletin',
  '/calendrier',
  '/conditions-dutilisation',
  '/contact',
  '/membres',
  '/membres/devenir-membre',
  '/projets',
  '/projets/dep-operateur',
  '/projets/lire-compter-cliquer',
  '/projets/travailleurs-etrangers-temporaires',
  '/ressources/tarifs-douaniers',
  '/services',
  '/services/enquete-salariale',
  '/services/formations',
  '/services/recrutement',
  '/services/reseaux-professionnels'
] as const

const SEGMENT_LABELS: Record<string, string> = {
  'a-propos': 'Qui nous sommes',
  bulletin: 'Bulletin de l’industrie',
  calendrier: 'Calendrier',
  'conditions-dutilisation': 'Conditions d’utilisation',
  contact: 'Contact',
  membres: 'Membres',
  'devenir-membre': 'Devenir membre',
  projets: 'Projets',
  'dep-operateur': 'DEP en opération d’équipements de production',
  'lire-compter-cliquer': 'Lire, compter, cliquer',
  'travailleurs-etrangers-temporaires': 'Travailleurs étrangers temporaires',
  ressources: 'Ressources',
  'tarifs-douaniers': 'Tarifs douaniers',
  services: 'Services',
  'enquete-salariale': 'Enquête salariale 2026',
  formations: 'Formations',
  recrutement: 'Recrutement',
  'reseaux-professionnels': 'Réseaux professionnels'
}

export function originFromSiteUrl(siteUrl: string) {
  return String(siteUrl || 'https://mamri.ca').replace(/\/$/, '')
}

export function canonicalUrl(siteUrl: string, path: string) {
  const origin = originFromSiteUrl(siteUrl)
  const clean = path.split('?')[0].split('#')[0]
  if (!clean || clean === '/') return `${origin}/`
  return `${origin}${clean.replace(/\/$/, '')}`
}

export function absoluteUrl(siteUrl: string, path: string) {
  if (/^https?:\/\//i.test(path)) return path
  return `${originFromSiteUrl(siteUrl)}${path.startsWith('/') ? path : `/${path}`}`
}

export function breadcrumbItems(siteUrl: string, path: string) {
  const origin = originFromSiteUrl(siteUrl)
  const items = [{ name: 'Accueil', url: `${origin}/` }]
  const segments = path.split('/').filter(Boolean)
  let acc = ''
  for (const segment of segments) {
    acc += `/${segment}`
    items.push({
      name: SEGMENT_LABELS[segment] || segment,
      url: `${origin}${acc}`
    })
  }
  return items
}
