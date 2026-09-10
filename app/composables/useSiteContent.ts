import type { SiteContent } from '~/types/content'

export function useSiteContent() {
  const content = useState<SiteContent | null>('site-content')
  if (!content.value) {
    throw createError({ statusCode: 500, statusMessage: 'site-content missing' })
  }
  return content as Ref<SiteContent>
}
