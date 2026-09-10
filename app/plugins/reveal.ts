import type { Directive } from 'vue'

let clientNav = false
let navSettled = false
const pending: Array<() => void> = []

function delayMs(value: number | { delay?: number } | undefined) {
  return typeof value === 'number' ? value : Number(value?.delay ?? 0)
}

function dirClass(modifiers: Record<string, boolean>) {
  if (modifiers.left) return 'reveal-left'
  if (modifiers.right) return 'reveal-right'
  return ''
}

function isInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight || document.documentElement.clientHeight
  return rect.top < vh * 0.92 && rect.bottom > 8
}

function play(el: HTMLElement) {
  void el.offsetWidth
  el.classList.add('is-revealed')
}

function afterPaint(fn: () => void) {
  if (typeof requestAnimationFrame !== 'function') {
    fn()
    return
  }
  requestAnimationFrame(() => requestAnimationFrame(fn))
}

function flushPending() {
  navSettled = true
  const fns = pending.splice(0)
  for (const fn of fns) fn()
}

function runWhenSettled(fn: () => void) {
  if (!clientNav || navSettled) {
    afterPaint(fn)
    return
  }
  pending.push(fn)
}

const reveal: Directive<HTMLElement, number | { delay?: number } | false | undefined> = {
  mounted(el, binding) {
    if (binding.value === false) {
      el.classList.add('is-revealed')
      return
    }
    el.style.setProperty('--reveal-delay', `${delayMs(binding.value)}ms`)
    const extra = dirClass(binding.modifiers)
    if (extra) el.classList.add(extra)

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-revealed')
      return
    }

    runWhenSettled(() => {
      if (isInViewport(el)) {
        play(el)
        return
      }

      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            play(el)
            io.disconnect()
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
      )
      io.observe(el)
    })
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', reveal)
  if (import.meta.server) return

  const router = useRouter()
  router.beforeEach((_to, from) => {
    clientNav = from.matched.length > 0
    navSettled = false
  })
  const settle = () => {
    if (!clientNav) return
    nextTick(() => afterPaint(flushPending))
  }
  router.afterEach(settle)
  nuxtApp.hook('page:finish', settle)
})
