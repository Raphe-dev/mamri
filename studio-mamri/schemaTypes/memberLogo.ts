import {ImageIcon} from '@sanity/icons/Image'
import {defineField, defineType} from 'sanity'

export const memberLogo = defineType({
  name: 'memberLogo',
  title: 'Logo membre',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'href',
      title: 'Site web',
      type: 'url',
      validation: (r) => r.required().uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: false},
      validation: (r) => r.required(),
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
    select: {title: 'name', media: 'logo', subtitle: 'href'},
  },
})
