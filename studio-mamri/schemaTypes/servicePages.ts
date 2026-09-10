import {CaseIcon} from '@sanity/icons/Case'
import {ClipboardIcon} from '@sanity/icons/Clipboard'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'
import {EarthGlobeIcon} from '@sanity/icons/EarthGlobe'
import {HelpCircleIcon} from '@sanity/icons/HelpCircle'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({name: 'hero', title: 'En-tête', type: 'pageHero', validation: (r) => r.required()}),
    defineField({
      name: 'body',
      title: 'Introduction',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 3})],
    }),
    defineField({
      name: 'items',
      title: 'Services',
      type: 'array',
      of: [defineArrayMember({type: 'serviceCard'})],
    }),
  ],
  preview: {prepare: () => ({title: 'Services'})},
})

export const reseauxPage = defineType({
  name: 'reseauxPage',
  title: 'Réseaux professionnels',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
    defineField({name: 'hero', title: 'En-tête', type: 'pageHero', validation: (r) => r.required()}),
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 3})],
    }),
    defineField({
      name: 'networks',
      title: 'Réseaux',
      type: 'array',
      of: [defineArrayMember({type: 'titledTextImage'})],
    }),
    defineField({name: 'closing', title: 'Clôture', type: 'text', rows: 3}),
  ],
  preview: {prepare: () => ({title: 'Réseaux professionnels'})},
})

export const formationsPage = defineType({
  name: 'formationsPage',
  title: 'Formations',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({name: 'hero', title: 'En-tête', type: 'pageHero', validation: (r) => r.required()}),
    defineField({name: 'body', title: 'Texte', type: 'text', rows: 4}),
    defineField({name: 'discount', title: 'Rabais membres', type: 'text', rows: 2}),
    defineField({
      name: 'reasons',
      title: 'Raisons',
      type: 'array',
      of: [defineArrayMember({type: 'titledText'})],
    }),
  ],
  preview: {prepare: () => ({title: 'Formations'})},
})

export const enquetePage = defineType({
  name: 'enquetePage',
  title: 'Enquête salariale',
  type: 'document',
  icon: ClipboardIcon,
  fields: [
    defineField({name: 'hero', title: 'En-tête', type: 'pageHero', validation: (r) => r.required()}),
    defineField({name: 'deadline', title: 'Date limite', type: 'string'}),
    defineField({name: 'intro', title: 'Introduction', type: 'text', rows: 4}),
    defineField({
      name: 'why',
      title: 'Pourquoi participer',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 2})],
    }),
    defineField({
      name: 'contents',
      title: 'Contenu de l’enquête',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 2})],
    }),
    defineField({
      name: 'prices',
      title: 'Grille de prix',
      type: 'array',
      of: [defineArrayMember({type: 'priceRow'})],
    }),
  ],
  preview: {prepare: () => ({title: 'Enquête salariale'})},
})

export const recrutementPage = defineType({
  name: 'recrutementPage',
  title: 'Recrutement',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({name: 'hero', title: 'En-tête', type: 'pageHero', validation: (r) => r.required()}),
    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 3})],
    }),
    defineField({
      name: 'offers',
      title: 'Offres',
      type: 'array',
      of: [defineArrayMember({type: 'offerCard'})],
    }),
  ],
  preview: {prepare: () => ({title: 'Recrutement'})},
})
