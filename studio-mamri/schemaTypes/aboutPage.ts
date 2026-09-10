import {UsersIcon} from '@sanity/icons/Users'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'À propos',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({name: 'hero', title: 'En-tête', type: 'pageHero', validation: (r) => r.required()}),
    defineField({name: 'intro', title: 'Introduction', type: 'text', rows: 4}),
    defineField({name: 'history', title: 'Histoire', type: 'titledTextImage'}),
    defineField({name: 'mission', title: 'Mission', type: 'titledTextImage'}),
    defineField({name: 'vision', title: 'Vision', type: 'titledTextImage'}),
    defineField({name: 'implication', title: 'Implication', type: 'titledTextImage'}),
    defineField({
      name: 'timeline',
      title: 'Historique',
      type: 'array',
      of: [defineArrayMember({type: 'timelineItem'})],
    }),
    defineField({
      name: 'values',
      title: 'Valeurs',
      type: 'array',
      of: [defineArrayMember({type: 'titledTextImage'})],
    }),
  ],
  preview: {prepare: () => ({title: 'À propos'})},
})
