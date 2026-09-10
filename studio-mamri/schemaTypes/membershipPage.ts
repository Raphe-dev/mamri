import {UserIcon} from '@sanity/icons/User'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const membershipPage = defineType({
  name: 'membershipPage',
  title: 'Devenir membre',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({name: 'hero', title: 'En-tête', type: 'pageHero', validation: (r) => r.required()}),
    defineField({
      name: 'bullets',
      title: 'Puces',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
    }),
    defineField({name: 'intro', title: 'Introduction', type: 'text', rows: 4}),
    defineField({
      name: 'benefits',
      title: 'Avantages',
      type: 'array',
      of: [defineArrayMember({type: 'namedImpact'})],
    }),
    defineField({name: 'dues', title: 'Cotisation', type: 'text', rows: 2}),
    defineField({
      name: 'roi',
      title: 'Retours mesurables',
      type: 'array',
      of: [defineArrayMember({type: 'namedText'})],
    }),
    defineField({
      name: 'types',
      title: 'Types d’adhésion',
      type: 'array',
      of: [defineArrayMember({type: 'membershipType'})],
    }),
  ],
  preview: {prepare: () => ({title: 'Devenir membre'})},
})
