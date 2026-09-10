import {UsersIcon} from '@sanity/icons/Users'
import {defineField, defineType} from 'sanity'

export const memberSpotlight = defineType({
  name: 'memberSpotlight',
  title: 'Portrait membre',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'imageAlt',
      title: 'Texte alternatif',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'body',
      title: 'Texte',
      type: 'text',
      rows: 8,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'href',
      title: 'Site web',
      type: 'url',
      validation: (r) => r.required().uri({scheme: ['http', 'https']}),
    }),
    defineField({name: 'credit', title: 'Crédit photo', type: 'string'}),
    defineField({
      name: 'featured',
      title: 'Mettre en avant sur l’accueil',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({name: 'sortIndex', title: 'Ordre', type: 'number', initialValue: 0}),
    defineField({
      name: 'importKey',
      title: 'Clé d’import',
      type: 'string',
      hidden: true,
      readOnly: true,
    }),
  ],
  preview: {
    select: {title: 'name', media: 'image', subtitle: 'href'},
  },
})
