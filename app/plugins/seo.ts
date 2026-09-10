import { site as fallbackSite } from '~/data/site'
import type { SiteContent } from '~/types/content'
import {
  DEFAULT_DESCRIPTION,
  OG_IMAGE_PATH,
  SITE_NAME,
  absoluteUrl,
  breadcrumbItems,
  canonicalUrl,
  originFromSiteUrl
} from '~/utils/seo'

export default defineNuxtPlugin(() => {
  const route = useRoute()
  const config = useRuntimeConfig()
  const content = useState<SiteContent | null>('site-content')

  const origin = computed(() => String(config.public.siteUrl || 'https://mamri.ca'))
  const canonical = computed(() => canonicalUrl(origin.value, route.path))
  const ogImage = computed(() => absoluteUrl(origin.value, OG_IMAGE_PATH))
  const site = computed(() => content.value?.site ?? fallbackSite)

  useSeoMeta({
    ogUrl: () => canonical.value,
    ogImage: () => ogImage.value,
    ogImageAlt: SITE_NAME,
    ogImageType: 'image/jpeg',
    ogImageWidth: 1200,
    ogImageHeight: 630,
    twitterCard: 'summary_large_image',
    twitterImage: () => ogImage.value
  })

  useHead({
    link: () => [
      { rel: 'canonical', href: canonical.value, key: 'canonical' }
    ],
    script: () => {
      const current = site.value
      const pageUrl = canonical.value
      const crumbs = breadcrumbItems(origin.value, route.path)
      const graph: Record<string, unknown>[] = [
        {
          '@type': ['NGO', 'LocalBusiness', 'Organization'],
          '@id': `${originFromSiteUrl(origin.value)}/#organization`,
          name: current.name,
          alternateName: current.shortName,
          url: originFromSiteUrl(origin.value) + '/',
          logo: absoluteUrl(origin.value, '/images/logo/mri-2026.png'),
          image: ogImage.value,
          description: current.description || DEFAULT_DESCRIPTION,
          foundingDate: String(current.founded),
          email: current.email.general,
          telephone: current.phone.href.replace('tel:', ''),
          address: {
            '@type': 'PostalAddress',
            streetAddress: current.address.line1,
            addressLocality: 'Sherbrooke',
            addressRegion: 'QC',
            postalCode: current.address.postal,
            addressCountry: 'CA'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: current.geo.lat,
            longitude: current.geo.lng
          },
          sameAs: [current.social.facebook, current.social.linkedin],
          areaServed: {
            '@type': 'AdministrativeArea',
            name: 'Estrie'
          }
        },
        {
          '@type': 'WebSite',
          '@id': `${originFromSiteUrl(origin.value)}/#website`,
          url: originFromSiteUrl(origin.value) + '/',
          name: current.name,
          inLanguage: 'fr-CA',
          description: current.description || DEFAULT_DESCRIPTION,
          publisher: { '@id': `${originFromSiteUrl(origin.value)}/#organization` }
        },
        {
          '@type': 'WebPage',
          '@id': `${pageUrl}#webpage`,
          url: pageUrl,
          name: current.name,
          inLanguage: 'fr-CA',
          isPartOf: { '@id': `${originFromSiteUrl(origin.value)}/#website` },
          about: { '@id': `${originFromSiteUrl(origin.value)}/#organization` }
        }
      ]

      if (crumbs.length > 1) {
        graph.push({
          '@type': 'BreadcrumbList',
          itemListElement: crumbs.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: item.url
          }))
        })
      }

      return [
        {
          key: 'schema-org',
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': graph
          })
        }
      ]
    }
  })
})
