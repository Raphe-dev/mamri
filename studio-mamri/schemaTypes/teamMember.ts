import {UserIcon} from '@sanity/icons/User'
import {defineField, defineType} from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Membre de l’équipe',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'title',
      title: 'Titre',
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
      name: 'linkedin',
      title: 'LinkedIn',
      type: 'url',
      validation: (r) => r.uri({scheme: ['http', 'https']}),
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
    select: {title: 'name', subtitle: 'title', media: 'image'},
  },
})
