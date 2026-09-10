import { DEFAULT_DESCRIPTION } from '~/utils/seo'

export function usePageSeo(input: { title: string; description?: string | null }) {
  const description = (input.description || '').trim() || DEFAULT_DESCRIPTION

  useSeoMeta({
    title: input.title,
    description,
    ogTitle: input.title,
    ogDescription: description,
    twitterTitle: input.title,
    twitterDescription: description
  })
}
