import {CogIcon} from '@sanity/icons/Cog'
import {defineField, defineType} from 'sanity'
import {urlHttpHttps} from './url'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'bandeau', title: 'Bandeau d’annonce'},
    {name: 'coordonnees', title: 'Coordonnées'},
    {name: 'zoho', title: 'Liens Zoho'},
  ],
  fields: [
    defineField({
      name: 'announcement',
      title: 'Bandeau',
      type: 'object',
      group: 'bandeau',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Afficher le bandeau',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'label',
          title: 'Étiquette',
          type: 'string',
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'text',
          title: 'Texte',
          type: 'text',
          rows: 2,
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'to',
          title: 'Lien interne',
          type: 'string',
          description: 'Chemin du site, ex. /services/enquete-salariale',
          validation: (r) =>
            r.required().custom((v) =>
              typeof v === 'string' && v.startsWith('/') ? true : 'Doit commencer par /',
            ),
        }),
      ],
    }),
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      group: 'coordonnees',
      validation: (r) => r.required(),
    }),
    defineField({name: 'shortName', title: 'Nom court', type: 'string', group: 'coordonnees'}),
    defineField({name: 'tagline', title: 'Accroche', type: 'string', group: 'coordonnees'}),
    defineField({name: 'description', title: 'Description', type: 'text', group: 'coordonnees'}),
    defineField({
      name: 'founded',
      title: 'Année de fondation',
      type: 'number',
      group: 'coordonnees',
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'object',
      group: 'coordonnees',
      fields: [
        defineField({name: 'line1', title: 'Ligne 1', type: 'string'}),
        defineField({name: 'city', title: 'Ville', type: 'string'}),
        defineField({name: 'postal', title: 'Code postal', type: 'string'}),
        defineField({name: 'display', title: 'Adresse affichée', type: 'string'}),
      ],
    }),
    defineField({
      name: 'geo',
      title: 'Cartographie',
      type: 'object',
      group: 'coordonnees',
      fields: [
        defineField({name: 'lat', type: 'number'}),
        defineField({name: 'lng', type: 'number'}),
        defineField({name: 'maps', type: 'url', validation: urlHttpHttps}),
        defineField({name: 'google', type: 'url', validation: urlHttpHttps}),
        defineField({name: 'embed', type: 'url', validation: urlHttpHttps}),
      ],
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone',
      type: 'object',
      group: 'coordonnees',
      fields: [
        defineField({name: 'display', type: 'string'}),
        defineField({name: 'href', type: 'string', description: 'tel:+18195665235'}),
        defineField({name: 'ext', title: 'Poste', type: 'string'}),
      ],
    }),
    defineField({
      name: 'email',
      title: 'Courriels',
      type: 'object',
      group: 'coordonnees',
      fields: [
        defineField({name: 'general', type: 'string', validation: (r) => r.email()}),
        defineField({name: 'projects', type: 'string', validation: (r) => r.email()}),
        defineField({name: 'privacy', type: 'string', validation: (r) => r.email()}),
        defineField({name: 'privacyName', type: 'string'}),
        defineField({name: 'privacyTitle', type: 'string'}),
        defineField({name: 'privacyPhone', type: 'string'}),
        defineField({name: 'communication', type: 'string', validation: (r) => r.email()}),
      ],
    }),
    defineField({
      name: 'social',
      type: 'object',
      group: 'coordonnees',
      fields: [
        defineField({name: 'facebook', type: 'url', validation: urlHttpHttps}),
        defineField({name: 'linkedin', type: 'url', validation: urlHttpHttps}),
      ],
    }),
    defineField({
      name: 'emploisCompetences',
      title: 'Emplois Compétences',
      type: 'object',
      group: 'coordonnees',
      fields: [
        defineField({name: 'name', type: 'string'}),
        defineField({name: 'url', type: 'url', validation: urlHttpHttps}),
        defineField({name: 'phone', type: 'string'}),
        defineField({name: 'phoneHref', type: 'string'}),
        defineField({name: 'email', type: 'string', validation: (r) => r.email()}),
      ],
    }),
    defineField({
      name: 'zohoEnquete',
      title: 'URL formulaire enquête salariale',
      type: 'url',
      group: 'zoho',
      validation: urlHttpHttps,
    }),
    defineField({
      name: 'zohoBulletin',
      title: 'URL bulletin (héritage)',
      type: 'url',
      group: 'zoho',
      validation: urlHttpHttps,
      description: 'Aujourd’hui inutilisée par Vue ; 301 WordPress vers /bulletin.',
    }),
  ],
  preview: {prepare: () => ({title: 'Paramètres du site'})},
})
