import { revealTransform } from './app/reveal-transform'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  vue: {
    compilerOptions: {
      nodeTransforms: [revealTransform]
    }
  },
  ignore: ['Current/**', 'dist/**', '.netlify/**', 'studio-mamri/**'],
  watchers: {
    chokidar: {
      usePolling: true,
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/Current/**',
        '**/dist/**',
        '**/.netlify/**',
        '**/.nuxt/**',
        '**/.output/**',
        '**/studio-mamri/**'
      ]
    }
  },
  components: [
    { path: '~/components', pathPrefix: false }
  ],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image'],
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 300,
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/Current/**',
          '**/dist/**',
          '**/.netlify/**',
          '**/.nuxt/**',
          '**/.output/**',
          '**/studio-mamri/**'
        ]
      }
    }
  },
  css: ['~/assets/css/tailwind.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'fr-CA' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Maison régionale de l’industrie',
      titleTemplate: '%s · Maison régionale de l’industrie',
      meta: [
        { name: 'description', content: 'La Maison régionale de l’industrie soutient les entreprises manufacturières de l’Estrie dans la concrétisation de leurs projets stratégiques et générateurs de croissance.' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'Maison régionale de l’industrie' },
        { name: 'theme-color', content: '#0F5C7A' },
        { property: 'og:site_name', content: 'Maison régionale de l’industrie' },
        { property: 'og:locale', content: 'fr_CA' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: 'https://mamri.ca/images/og.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Maison régionale de l’industrie' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      noscript: [
        { innerHTML: '<style>.reveal{opacity:1!important;transform:none!important}</style>' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'apple-touch-icon', href: '/images/logo/favicon.png' }
      ]
    }
  },
  runtimeConfig: {
    sanityProjectId: '',
    sanityDataset: 'production',
    sanityApiVersion: '2025-02-19',
    sanityReadToken: '',
    public: {
      siteUrl: 'https://mamri.ca',
      zohoEnquete: 'https://forms.zoho.com/emploiscomptences/form/EnqutesalarialeMRIParticipantlenqute',
      zohoBulletin: 'https://mamri.ca/abonnement-au-bulletin-de-lindustrie/',
      depVideo: 'https://drive.google.com/file/d/1vTjTnV4d0TdCkyjQ9r4VdU4ck8VKH3rk/preview'
    }
  },
  nitro: {
    preset: 'netlify',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/sitemap.xml'],
      ignore: ['/admin', '/admin/**']
    },
    watchOptions: {
      usePolling: true,
      interval: 300,
      ignored: ['**/Current/**', '**/dist/**', '**/.netlify/**', '**/node_modules/**', '**/studio-mamri/**']
    }
  },
  image: {
    quality: 80,
    format: ['webp']
  },
  routeRules: {
    '/admin': { prerender: false, index: false },
    '/admin/**': { prerender: false, index: false },
    '/reseaux-professionnels': { redirect: { to: '/services/reseaux-professionnels', statusCode: 301 } },
    '/reseaux-professionnels/': { redirect: { to: '/services/reseaux-professionnels', statusCode: 301 } },
    '/formations': { redirect: { to: '/services/formations', statusCode: 301 } },
    '/formations/': { redirect: { to: '/services/formations', statusCode: 301 } },
    '/participez-enquete-salariale': { redirect: { to: '/services/enquete-salariale', statusCode: 301 } },
    '/participez-enquete-salariale/': { redirect: { to: '/services/enquete-salariale', statusCode: 301 } },
    '/enquete-salariale-2025': { redirect: { to: '/services/enquete-salariale', statusCode: 301 } },
    '/enquete-salariale-2025/': { redirect: { to: '/services/enquete-salariale', statusCode: 301 } },
    '/emplois-competences': { redirect: { to: '/services/recrutement', statusCode: 301 } },
    '/emplois-competences/': { redirect: { to: '/services/recrutement', statusCode: 301 } },
    '/dep-operateur-alternance-travail-etudes-estrie': { redirect: { to: '/projets/dep-operateur', statusCode: 301 } },
    '/dep-operateur-alternance-travail-etudes-estrie/': { redirect: { to: '/projets/dep-operateur', statusCode: 301 } },
    '/lire-compter-cliquer-les-cles-de-limplantation-dun-systeme-en-entreprise': { redirect: { to: '/projets/lire-compter-cliquer', statusCode: 301 } },
    '/lire-compter-cliquer-les-cles-de-limplantation-dun-systeme-en-entreprise/': { redirect: { to: '/projets/lire-compter-cliquer', statusCode: 301 } },
    '/actualites/mobilisation-regionale-sur-les-travailleurs-etrangers-temporaires-tet': { redirect: { to: '/projets/travailleurs-etrangers-temporaires', statusCode: 301 } },
    '/actualites/mobilisation-regionale-sur-les-travailleurs-etrangers-temporaires-tet/': { redirect: { to: '/projets/travailleurs-etrangers-temporaires', statusCode: 301 } },
    '/tarifs-douaniers-ressources-manufacturiers-estrie': { redirect: { to: '/ressources/tarifs-douaniers', statusCode: 301 } },
    '/tarifs-douaniers-ressources-manufacturiers-estrie/': { redirect: { to: '/ressources/tarifs-douaniers', statusCode: 301 } },
    '/calendrier-des-activites-en-estrie': { redirect: { to: '/calendrier', statusCode: 301 } },
    '/calendrier-des-activites-en-estrie/': { redirect: { to: '/calendrier', statusCode: 301 } },
    '/devenir-membre': { redirect: { to: '/membres/devenir-membre', statusCode: 301 } },
    '/devenir-membre/': { redirect: { to: '/membres/devenir-membre', statusCode: 301 } },
    '/devenir-membre-de-la-mri': { redirect: { to: '/membres/devenir-membre', statusCode: 301 } },
    '/devenir-membre-de-la-mri/': { redirect: { to: '/membres/devenir-membre', statusCode: 301 } },
    '/avantages-des-membres': { redirect: { to: '/membres/devenir-membre', statusCode: 301 } },
    '/avantages-des-membres/': { redirect: { to: '/membres/devenir-membre', statusCode: 301 } },
    '/connaissez-vous-nos-membres': { redirect: { to: '/membres', statusCode: 301 } },
    '/connaissez-vous-nos-membres/': { redirect: { to: '/membres', statusCode: 301 } },
    '/abonnement-au-bulletin-de-lindustrie': { redirect: { to: '/bulletin', statusCode: 301 } },
    '/abonnement-au-bulletin-de-lindustrie/': { redirect: { to: '/bulletin', statusCode: 301 } },
    '/a-propos-entreprise': { redirect: { to: '/a-propos', statusCode: 301 } },
    '/a-propos-entreprise/': { redirect: { to: '/a-propos', statusCode: 301 } },
    '/joindre-equipe': { redirect: { to: '/contact', statusCode: 301 } },
    '/joindre-equipe/': { redirect: { to: '/contact', statusCode: 301 } },
    '/nous-joindre': { redirect: { to: '/contact', statusCode: 301 } },
    '/nous-joindre/': { redirect: { to: '/contact', statusCode: 301 } },
    '/formulaire-de-contact': { redirect: { to: '/contact', statusCode: 301 } },
    '/formulaire-de-contact/': { redirect: { to: '/contact', statusCode: 301 } },
    '/politiques-de-confidentialite': { redirect: { to: '/conditions-dutilisation', statusCode: 301 } },
    '/politiques-de-confidentialite/': { redirect: { to: '/conditions-dutilisation', statusCode: 301 } }
  }
})
