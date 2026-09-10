import {aboutPage} from './aboutPage'
import {event} from './event'
import {homePage} from './homePage'
import {memberLogo} from './memberLogo'
import {memberSpotlight} from './memberSpotlight'
import {membershipPage} from './membershipPage'
import {objectTypes} from './objects'
import {depPage, lirePage, tetPage} from './projectPages'
import {
  enquetePage,
  formationsPage,
  recrutementPage,
  reseauxPage,
  servicesPage,
} from './servicePages'
import {siteSettings} from './siteSettings'
import {teamMember} from './teamMember'

export const schemaTypes = [
  ...objectTypes,
  siteSettings,
  event,
  memberLogo,
  memberSpotlight,
  teamMember,
  homePage,
  aboutPage,
  membershipPage,
  servicesPage,
  reseauxPage,
  formationsPage,
  enquetePage,
  recrutementPage,
  depPage,
  lirePage,
  tetPage,
]
