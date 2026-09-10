import {defineArrayMember, defineField, defineType} from 'sanity'
import {urlHttpHttps} from './url'

export const pageHero = defineType({
  name: 'pageHero',
  title: 'En-tête de page',
  type: 'object',
  fields: [
    defineField({name: 'kicker', title: 'Sur-titre', type: 'string'}),
    defineField({name: 'title', title: 'Titre', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'lead', title: 'Chapô', type: 'text', rows: 3, validation: (r) => r.required()}),
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'imageAlt', title: 'Texte alternatif', type: 'string'}),
    defineField({
      name: 'ctas',
      title: 'Boutons',
      type: 'array',
      of: [defineArrayMember({type: 'pageCta'})],
    }),
  ],
})

export const pageCta = defineType({
  name: 'pageCta',
  title: 'Bouton',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Libellé', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'to',
      title: 'Lien',
      type: 'string',
      description: 'Chemin interne (/contact), URL ou mailto:',
      validation: (r) => r.required(),
    }),
    defineField({name: 'external', title: 'Lien externe', type: 'boolean', initialValue: false}),
    defineField({
      name: 'variant',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          {title: 'Principal', value: 'primary'},
          {title: 'Secondaire', value: 'secondary'},
          {title: 'Discret', value: 'ghost'},
          {title: 'Inversé', value: 'invert'},
        ],
      },
    }),
  ],
  preview: {select: {title: 'label', subtitle: 'to'}},
})

export const titledText = defineType({
  name: 'titledText',
  title: 'Bloc titre + texte',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Titre', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'text', title: 'Texte', type: 'text', rows: 3, validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'title'}},
})

export const titledTextImage = defineType({
  name: 'titledTextImage',
  title: 'Bloc titre + texte + image',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Titre', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'text', title: 'Texte', type: 'text', rows: 4, validation: (r) => r.required()}),
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
  ],
  preview: {select: {title: 'title', media: 'image'}},
})

export const namedImpact = defineType({
  name: 'namedImpact',
  title: 'Avantage',
  type: 'object',
  fields: [
    defineField({name: 'name', title: 'Nom', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'impact', title: 'Impact', type: 'text', rows: 3, validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'name'}},
})

export const namedText = defineType({
  name: 'namedText',
  title: 'Nom + texte',
  type: 'object',
  fields: [
    defineField({name: 'name', title: 'Nom', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'text', title: 'Texte', type: 'text', rows: 3, validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'name'}},
})

export const membershipType = defineType({
  name: 'membershipType',
  title: 'Type d’adhésion',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Titre', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'who', title: 'Pour qui', type: 'text', rows: 2}),
    defineField({name: 'access', title: 'Accès', type: 'text', rows: 2}),
    defineField({name: 'note', title: 'Note', type: 'text', rows: 2}),
  ],
  preview: {select: {title: 'title'}},
})

export const serviceCard = defineType({
  name: 'serviceCard',
  title: 'Carte service',
  type: 'object',
  fields: [
    defineField({name: 'slug', title: 'Identifiant', type: 'string'}),
    defineField({name: 'title', title: 'Titre', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'text', title: 'Texte', type: 'text', rows: 3}),
    defineField({name: 'to', title: 'Lien interne', type: 'string'}),
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
  ],
  preview: {select: {title: 'title', media: 'image'}},
})

export const homeStat = defineType({
  name: 'homeStat',
  title: 'Statistique',
  type: 'object',
  fields: [
    defineField({name: 'value', title: 'Valeur', type: 'number', validation: (r) => r.required()}),
    defineField({name: 'suffix', title: 'Suffixe', type: 'string'}),
    defineField({name: 'label', title: 'Libellé', type: 'string', validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'label', subtitle: 'suffix'}},
})

export const stringStat = defineType({
  name: 'stringStat',
  title: 'Indicateur',
  type: 'object',
  fields: [
    defineField({name: 'value', title: 'Valeur', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'label', title: 'Libellé', type: 'string', validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'value', subtitle: 'label'}},
})

export const faqItem = defineType({
  name: 'faqItem',
  title: 'Question',
  type: 'object',
  fields: [
    defineField({name: 'question', title: 'Question', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'answer', title: 'Réponse', type: 'text', rows: 4, validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'question'}},
})

export const partner = defineType({
  name: 'partner',
  title: 'Partenaire',
  type: 'object',
  fields: [
    defineField({name: 'name', title: 'Nom', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'href', title: 'Site web', type: 'url', validation: urlHttpHttps}),
    defineField({
      name: 'src',
      title: 'Logo',
      type: 'image',
      options: {hotspot: false},
      validation: (r) => r.required(),
    }),
    defineField({name: 'onDark', title: 'Fond sombre', type: 'boolean', initialValue: false}),
  ],
  preview: {select: {title: 'name', media: 'src'}},
})

export const priceRow = defineType({
  name: 'priceRow',
  title: 'Ligne de prix',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Libellé', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'survey', title: 'Enquête', type: 'string'}),
    defineField({name: 'training', title: 'Formation', type: 'string'}),
  ],
  preview: {select: {title: 'label', subtitle: 'survey'}},
})

export const timelineItem = defineType({
  name: 'timelineItem',
  title: 'Étape historique',
  type: 'object',
  fields: [
    defineField({name: 'year', title: 'Année', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'text', title: 'Texte', type: 'text', rows: 2, validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'year', subtitle: 'text'}},
})

export const calendarItem = defineType({
  name: 'calendarItem',
  title: 'Étape de calendrier',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Titre', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'when', title: 'Quand', type: 'string', validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'title', subtitle: 'when'}},
})

export const actionItem = defineType({
  name: 'actionItem',
  title: 'Action',
  type: 'object',
  fields: [
    defineField({name: 'date', title: 'Date', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'text', title: 'Texte', type: 'text', rows: 3, validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'date', subtitle: 'text'}},
})

export const offerCard = defineType({
  name: 'offerCard',
  title: 'Offre',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Titre', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'text', title: 'Texte', type: 'text', rows: 4}),
    defineField({name: 'href', title: 'Lien', type: 'url', validation: urlHttpHttps}),
    defineField({name: 'cta', title: 'Libellé du lien', type: 'string'}),
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
  ],
  preview: {select: {title: 'title', media: 'image'}},
})

export const objectTypes = [
  pageCta,
  pageHero,
  titledText,
  titledTextImage,
  namedImpact,
  namedText,
  membershipType,
  serviceCard,
  homeStat,
  stringStat,
  faqItem,
  partner,
  priceRow,
  timelineItem,
  calendarItem,
  actionItem,
  offerCard,
]
