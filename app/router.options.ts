import type { RouterConfig } from '@nuxt/schema'

export default {
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return { ...savedPosition, behavior: 'auto' }
    }
    if (to.hash) {
      const samePage = from.path === to.path
      return { el: to.hash, top: 88, behavior: samePage ? 'smooth' : 'auto' }
    }
    return { top: 0, left: 0, behavior: 'auto' }
  }
} satisfies RouterConfig
