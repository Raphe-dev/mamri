import { loadSiteContent } from '~~/app/content/load.server'
import type { SiteContent } from '~/types/content'

export default defineNuxtPlugin(async () => {
  const state = useState<SiteContent | null>('site-content', () => null)
  if (!state.value) {
    state.value = await loadSiteContent()
  }
})
