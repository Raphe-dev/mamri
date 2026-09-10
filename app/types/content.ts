export interface Cta {
  label: string
  to: string
  external?: boolean
  variant?: 'primary' | 'secondary' | 'ghost' | 'invert'
}

export interface NavChild {
  label: string
  to: string
}

export interface NavItem {
  label: string
  to?: string
  children?: NavChild[]
}

export interface PageHero {
  kicker?: string
  title: string
  lead: string
  image?: string
  imageAlt?: string
  ctas?: Cta[]
}

export interface MemberLogo {
  name: string
  href: string
  src: string
}

export interface MemberSpotlight {
  name: string
  image: string
  imageAlt: string
  body: string
  href: string
  credit?: string
}

export type EventType = 'formation' | 'evenement' | 'visite' | 'webinaire'

export interface EventItem {
  slug: string
  title: string
  type: EventType
  startLabel: string
  timeLabel: string
  location?: string
  memberPrice?: string
  nonMemberPrice?: string
  priceNote?: string
  tags: string[]
  excerpt: string
  href: string
  month: number
  year: number
}

export interface TeamMember {
  name: string
  title: string
  image: string
  linkedin: string
}

export type SiteInfo = typeof import('../data/site').site

type HomeModule = typeof import('../data/home').home
type AboutModule = typeof import('../data/about').aboutPage
type MembershipModule = typeof import('../data/about').membershipPage
type ServicesModule = typeof import('../data/services').servicesPage
type ReseauxModule = typeof import('../data/services').reseauxPage
type FormationsModule = typeof import('../data/services').formationsPage
type EnqueteModule = typeof import('../data/services').enquetePage
type RecrutementModule = typeof import('../data/services').recrutementPage
type DepModule = typeof import('../data/projects').depPage
type LireModule = typeof import('../data/projects').lirePage
type TetModule = typeof import('../data/projects').tetPage

type WithHeroMedia<T extends { hero: object }> = Omit<T, 'hero'> & {
  hero: T['hero'] & { image?: string; imageAlt?: string; ctas?: Cta[] }
}

export type HomePage = Omit<HomeModule, 'announcement'> & {
  years: HomeModule['years'] & { image?: string; imageAlt?: string }
  networkCta: HomeModule['networkCta'] & { image?: string; imageAlt?: string }
}

export type AboutPage = WithHeroMedia<AboutModule>
export type MembershipPage = WithHeroMedia<MembershipModule>
export type ServicesPage = WithHeroMedia<ServicesModule>
export type ReseauxPage = WithHeroMedia<ReseauxModule>
export type FormationsPage = WithHeroMedia<FormationsModule>
export type EnquetePage = WithHeroMedia<EnqueteModule>
export type RecrutementPage = WithHeroMedia<RecrutementModule>
export type DepPage = WithHeroMedia<DepModule> & { whyImage?: string; learningImage?: string }
export type LirePage = WithHeroMedia<LireModule>
export type TetPage = WithHeroMedia<TetModule>

export interface SiteContent {
  site: SiteInfo
  announcement: {
    enabled: boolean
    label: string
    text: string
    to: string
  }
  zohoEnquete: string
  zohoBulletin: string
  events: EventItem[]
  memberLogos: MemberLogo[]
  memberSpotlights: Array<MemberSpotlight & { featured?: boolean }>
  team: TeamMember[]
  home: HomePage
  aboutPage: AboutPage
  membershipPage: MembershipPage
  servicesPage: ServicesPage
  reseauxPage: ReseauxPage
  formationsPage: FormationsPage
  enquetePage: EnquetePage
  recrutementPage: RecrutementPage
  depPage: DepPage
  lirePage: LirePage
  tetPage: TetPage
}

export interface FaqItem {
  question: string
  answer: string
}

export interface Partner {
  name: string
  href: string
  src: string
}
