import { canonicalUrl, sitemapRoutes } from '~~/app/utils/seo'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const lastmod = new Date().toISOString().slice(0, 10)
  const urls = sitemapRoutes.map((path) => {
    const loc = canonicalUrl(String(config.public.siteUrl), path)
    const priority = path === '/' ? '1.0' : path.split('/').filter(Boolean).length === 1 ? '0.8' : '0.6'
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
  })

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`
})
