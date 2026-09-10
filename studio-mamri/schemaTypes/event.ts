import {CalendarIcon} from '@sanity/icons/Calendar'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Activité',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Identifiant',
      type: 'slug',
      options: {source: 'title'},
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'importKey',
      title: 'Clé d’import',
      type: 'string',
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Formation', value: 'formation'},
          {title: 'Événement', value: 'evenement'},
          {title: 'Visite industrielle', value: 'visite'},
          {title: 'Webinaire', value: 'webinaire'},
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'startLabel',
      title: 'Date affichée',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'timeLabel',
      title: 'Horaire affiché',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({name: 'location', title: 'Lieu', type: 'string'}),
    defineField({name: 'memberPrice', title: 'Tarif membre', type: 'string'}),
    defineField({name: 'nonMemberPrice', title: 'Tarif non-membre', type: 'string'}),
    defineField({
      name: 'priceNote',
      title: 'Note de prix',
      type: 'string',
      description: 'Si renseignée, remplace les deux tarifs sur la carte.',
    }),
    defineField({
      name: 'tags',
      title: 'Étiquettes',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      initialValue: [],
    }),
    defineField({
      name: 'excerpt',
      title: 'Résumé',
      type: 'text',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'href',
      title: 'Lien d’inscription (Zoho Backstage ou page partenaire)',
      type: 'url',
      validation: (r) => r.required().uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'month',
      title: 'Mois (1–12)',
      type: 'number',
      validation: (r) => r.required().min(1).max(12),
    }),
    defineField({
      name: 'year',
      title: 'Année',
      type: 'number',
      validation: (r) => r.required(),
    }),
    defineField({name: 'sortIndex', title: 'Ordre dans le mois', type: 'number', initialValue: 0}),
    defineField({name: 'hidden', title: 'Masquer du site', type: 'boolean', initialValue: false}),
  ],
  preview: {
    select: {title: 'title', type: 'type', start: 'startLabel'},
    prepare: ({title, type, start}) => ({
      title,
      subtitle: [type, start].filter(Boolean).join(' · '),
    }),
  },
})
