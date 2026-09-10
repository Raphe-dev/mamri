import imageUrlBuilder from '@sanity/image-url'

export type SanityImage =
  | {
      asset?: { _ref?: string; _id?: string } | null
      hotspot?: unknown
      crop?: unknown
    }
  | null
  | undefined

/** Browser-facing prefix. Proxied to cdn.sanity.io so images stay first-party. */
const FIRST_PARTY_CDN = '/cdn/sanity'

function builder() {
  const projectId = process.env.SANITY_PROJECT_ID || process.env.NUXT_SANITY_PROJECT_ID
  const dataset = process.env.SANITY_DATASET || 'production'
  if (!projectId) throw new Error('SANITY_PROJECT_ID missing')
  return imageUrlBuilder({
    projectId,
    dataset,
    baseUrl: FIRST_PARTY_CDN
  })
}

function hasAsset(image: SanityImage): image is NonNullable<SanityImage> {
  return Boolean(image && image.asset)
}

export function photoUrl(image: SanityImage, label: string) {
  if (!hasAsset(image)) throw new Error(`[content] photo missing asset (${label})`)
  return builder().image(image).width(1200).fit('crop').url()
}

export function photoUrlOpt(image: SanityImage) {
  if (!hasAsset(image)) return undefined
  return builder().image(image).width(1200).fit('crop').url()
}

export function logoUrl(image: SanityImage, label: string) {
  if (!hasAsset(image)) throw new Error(`[content] logo missing asset (${label})`)
  return builder().image(image).width(400).url()
}
