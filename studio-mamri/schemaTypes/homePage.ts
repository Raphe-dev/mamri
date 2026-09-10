import {HomeIcon} from '@sanity/icons/Home'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {urlHttpHttps} from './url'

export const homePage = defineType({
  name: 'homePage',
  title: 'Accueil',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({name: 'hero', title: 'En-tête', type: 'pageHero', validation: (r) => r.required()}),
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 3})],
    }),
    defineField({
      name: 'services',
      title: 'Services (cartes)',
      type: 'array',
      of: [defineArrayMember({type: 'serviceCard'})],
    }),
    defineField({
      name: 'stats',
      title: 'Chiffres',
      type: 'array',
      of: [defineArrayMember({type: 'homeStat'})],
    }),
    defineField({
      name: 'years',
      title: 'Bloc anniversaire',
      type: 'object',
      fields: [
        defineField({name: 'title', title: 'Titre', type: 'string'}),
        defineField({name: 'text', title: 'Texte', type: 'text', rows: 4}),
        defineField({name: 'cta', title: 'Bouton', type: 'pageCta'}),
        defineField({
          name: 'anniversary',
          title: 'Événement',
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Étiquette', type: 'string'}),
            defineField({name: 'title', title: 'Titre', type: 'string'}),
            defineField({name: 'href', title: 'Lien', type: 'url', validation: urlHttpHttps}),
          ],
        }),
        defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
        defineField({name: 'imageAlt', title: 'Texte alternatif', type: 'string'}),
      ],
    }),
    defineField({
      name: 'networkCta',
      title: 'Bandeau réseau',
      type: 'object',
      fields: [
        defineField({name: 'kicker', title: 'Sur-titre', type: 'string'}),
        defineField({name: 'title', title: 'Titre', type: 'string'}),
        defineField({name: 'text', title: 'Texte', type: 'text', rows: 3}),
        defineField({name: 'cta', title: 'Bouton', type: 'pageCta'}),
        defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}}),
        defineField({name: 'imageAlt', title: 'Texte alternatif', type: 'string'}),
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Accueil'})},
})
