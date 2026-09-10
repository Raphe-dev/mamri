import { createClient } from '@sanity/client'

export function sanityClient() {
  const projectId = process.env.SANITY_PROJECT_ID || process.env.NUXT_SANITY_PROJECT_ID
  if (!projectId) throw new Error('SANITY_PROJECT_ID missing')
  return createClient({
    projectId,
    dataset: process.env.SANITY_DATASET || 'production',
    apiVersion: process.env.SANITY_API_VERSION || '2025-02-19',
    useCdn: false,
    perspective: 'published',
    token: process.env.SANITY_READ_TOKEN || undefined
  })
}
