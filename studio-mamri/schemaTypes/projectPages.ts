import {BoltIcon} from '@sanity/icons/Bolt'
import {BookIcon} from '@sanity/icons/Book'
import {CommentIcon} from '@sanity/icons/Comment'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {urlHttpHttps} from './url'

export const depPage = defineType({
  name: 'depPage',
  title: 'DEP opérateur',
  type: 'document',
  icon: BoltIcon,
  fields: [
    defineField({name: 'hero', title: 'En-tête', type: 'pageHero', validation: (r) => r.required()}),
    defineField({
      name: 'video',
      title: 'Vidéo',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'Titre', type: 'string'}),
        defineField({name: 'lead', title: 'Texte', type: 'text', rows: 3}),
        defineField({
          name: 'src',
          title: 'URL d’intégration',
          type: 'url',
          validation: urlHttpHttps,
        }),
        defineField({name: 'creditHref', title: 'Lien crédit', type: 'url', validation: urlHttpHttps}),
        defineField({name: 'credit', title: 'Crédit', type: 'string'}),
      ],
    }),
    defineField({
      name: 'partners',
      title: 'Partenaires',
      type: 'array',
      of: [defineArrayMember({type: 'partner'})],
    }),
    defineField({
      name: 'whyNow',
      title: 'Pourquoi maintenant',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 2})],
    }),
    defineField({
      name: 'whyImage',
      title: 'Image (pourquoi maintenant)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'formula',
      title: 'Formule',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 2})],
    }),
    defineField({
      name: 'steps',
      title: 'Étapes',
      type: 'array',
      of: [defineArrayMember({type: 'titledText'})],
    }),
    defineField({
      name: 'benefits',
      title: 'Avantages',
      type: 'array',
      of: [defineArrayMember({type: 'titledText'})],
    }),
    defineField({
      name: 'learningImage',
      title: 'Image (apprentissage)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'audience',
      title: 'Public visé',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 2})],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [defineArrayMember({type: 'faqItem'})],
    }),
  ],
  preview: {prepare: () => ({title: 'DEP opérateur'})},
})

export const lirePage = defineType({
  name: 'lirePage',
  title: 'Lire, compter, cliquer',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({name: 'hero', title: 'En-tête', type: 'pageHero', validation: (r) => r.required()}),
    defineField({
      name: 'partners',
      title: 'Partenaires',
      type: 'array',
      of: [defineArrayMember({type: 'partner'})],
    }),
    defineField({
      name: 'gains',
      title: 'Gains',
      type: 'array',
      of: [defineArrayMember({type: 'titledText'})],
    }),
    defineField({
      name: 'deliverables',
      title: 'Livrables',
      type: 'array',
      of: [defineArrayMember({type: 'titledText'})],
    }),
    defineField({
      name: 'stats',
      title: 'Indicateurs',
      type: 'array',
      of: [defineArrayMember({type: 'stringStat'})],
    }),
    defineField({
      name: 'calendar',
      title: 'Calendrier',
      type: 'array',
      of: [defineArrayMember({type: 'calendarItem'})],
    }),
    defineField({
      name: 'contactMailto',
      title: 'Lien courriel (cta)',
      type: 'string',
      description: 'mailto:…',
    }),
  ],
  preview: {prepare: () => ({title: 'Lire, compter, cliquer'})},
})

export const tetPage = defineType({
  name: 'tetPage',
  title: 'Travailleurs étrangers temporaires',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({name: 'hero', title: 'En-tête', type: 'pageHero', validation: (r) => r.required()}),
    defineField({
      name: 'objectives',
      title: 'Objectifs',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 2})],
    }),
    defineField({
      name: 'actions',
      title: 'Actions réalisées',
      type: 'array',
      of: [defineArrayMember({type: 'actionItem'})],
    }),
    defineField({name: 'next', title: 'Suite', type: 'text', rows: 4}),
    defineField({name: 'survey', title: 'URL sondage', type: 'url', validation: urlHttpHttps}),
    defineField({name: 'report', title: 'URL rapport', type: 'url', validation: urlHttpHttps}),
    defineField({name: 'letter', title: 'URL lettre', type: 'url', validation: urlHttpHttps}),
  ],
  preview: {prepare: () => ({title: 'Travailleurs étrangers temporaires'})},
})
