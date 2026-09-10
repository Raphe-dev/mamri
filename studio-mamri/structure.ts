import {CalendarIcon} from '@sanity/icons/Calendar'
import {CaseIcon} from '@sanity/icons/Case'
import {CogIcon} from '@sanity/icons/Cog'
import {DocumentIcon} from '@sanity/icons/Document'
import {HomeIcon} from '@sanity/icons/Home'
import {ImageIcon} from '@sanity/icons/Image'
import {UserIcon} from '@sanity/icons/User'
import {UsersIcon} from '@sanity/icons/Users'
import type {NewDocumentOptionsResolver} from 'sanity'
import type {StructureResolver} from 'sanity/structure'

export const SINGLETONS = [
  'siteSettings',
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
  'tetPage',
]

function singleton(S: Parameters<StructureResolver>[0], type: string, title: string, icon: typeof HomeIcon) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(S.document().schemaType(type).documentId(type).title(title))
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      singleton(S, 'siteSettings', 'Paramètres du site', CogIcon),
      S.divider(),
      S.listItem()
        .title('Pages')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              singleton(S, 'homePage', 'Accueil', HomeIcon),
              singleton(S, 'aboutPage', 'À propos', UsersIcon),
              singleton(S, 'membershipPage', 'Devenir membre', UserIcon),
              S.divider(),
              singleton(S, 'servicesPage', 'Services', CaseIcon),
              singleton(S, 'formationsPage', 'Formations', DocumentIcon),
              singleton(S, 'reseauxPage', 'Réseaux professionnels', UsersIcon),
              singleton(S, 'enquetePage', 'Enquête salariale', DocumentIcon),
              singleton(S, 'recrutementPage', 'Recrutement', CaseIcon),
              S.divider(),
              singleton(S, 'depPage', 'DEP opérateur', DocumentIcon),
              singleton(S, 'lirePage', 'Lire, compter, cliquer', DocumentIcon),
              singleton(S, 'tetPage', 'Travailleurs étrangers temporaires', DocumentIcon),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem('event').title('Activités').icon(CalendarIcon),
      S.listItem()
        .title('Membres')
        .icon(UsersIcon)
        .child(
          S.list()
            .title('Membres')
            .items([
              S.documentTypeListItem('memberLogo').title('Logos').icon(ImageIcon),
              S.documentTypeListItem('memberSpotlight').title('Portraits').icon(UsersIcon),
            ]),
        ),
      S.documentTypeListItem('teamMember').title('Équipe').icon(UserIcon),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId() as string
        return !SINGLETONS.includes(id) && !['event', 'memberLogo', 'memberSpotlight', 'teamMember'].includes(id)
      }),
    ])

export const newDocumentOptions: NewDocumentOptionsResolver = (prev, {creationContext}) => {
  if (creationContext.schemaType && SINGLETONS.includes(creationContext.schemaType)) return []
  return prev.filter((t) => !SINGLETONS.includes(t.templateId))
}
