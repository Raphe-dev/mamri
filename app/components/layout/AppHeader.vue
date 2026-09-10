<script setup lang="ts">
import { mainNav } from '~/data/nav'

const open = ref(false)
const desktopMenu = ref<string | null>(null)
const compact = ref(false)
const route = useRoute()

function isActive(item: (typeof mainNav)[number]) {
  if (item.to === '/') return route.path === '/'
  if (item.to && route.path.startsWith(item.to)) return true
  return Boolean(item.children?.some(c => route.path === c.to || route.path.startsWith(`${c.to}/`)))
}

function onScroll() {
  compact.value = window.scrollY > 12
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
function closeDesktopMenu() {
  desktopMenu.value = null
  const active = document.activeElement
  if (active instanceof HTMLElement && active.closest('nav[aria-label="Navigation principale"]')) {
    active.blur()
  }
}

function onDesktopFocusOut(label: string, event: FocusEvent) {
  const next = event.relatedTarget
  if (next instanceof Node && (event.currentTarget as Node).contains(next)) return
  if (desktopMenu.value === label) desktopMenu.value = null
}

watch(open, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
})
watch(() => route.path, () => {
  open.value = false
  closeDesktopMenu()
  document.body.style.overflow = ''
})
</script>

<template>
  <header
    class="sticky top-0 z-50 h-[4.5rem] bg-navy text-white shadow-[0_8px_24px_rgba(10,36,64,0)] transition-[box-shadow] duration-200"
    :class="compact ? 'shadow-header' : ''"
  >
    <a href="#contenu" class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:text-navy">
      Aller au contenu
    </a>
    <div class="shell flex h-full items-center justify-between gap-6">
      <NuxtLink to="/" class="flex shrink-0 items-center" aria-label="Accueil — Maison régionale de l’industrie">
        <SiteImg src="/images/logo/mri-blanc.png" alt="" eager :width="180" :height="115" class="h-11 w-auto sm:h-12" />
      </NuxtLink>

      <nav class="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
        <div
          v-for="item in mainNav"
          :key="item.label"
          class="relative"
          @mouseenter="item.children ? desktopMenu = item.label : undefined"
          @mouseleave="item.children && desktopMenu === item.label ? desktopMenu = null : undefined"
          @focusin="item.children ? desktopMenu = item.label : undefined"
          @focusout="item.children ? onDesktopFocusOut(item.label, $event) : undefined"
        >
          <NuxtLink
            v-if="item.to && !item.children"
            :to="item.to"
            class="group relative inline-flex items-center px-3 py-2 text-[0.95rem] font-medium transition"
            :class="isActive(item) ? 'text-white' : 'text-white/80 hover:text-white'"
          >
            {{ item.label }}
            <span
              class="absolute inset-x-3 bottom-0 h-0.5 origin-left bg-white transition"
              :class="isActive(item) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'"
            />
          </NuxtLink>
          <template v-else>
            <NuxtLink
              v-if="item.to"
              :to="item.to"
              class="group relative inline-flex items-center gap-1 px-3 py-2 text-[0.95rem] font-medium transition"
              :class="isActive(item) ? 'text-white' : 'text-white/80 hover:text-white'"
              @click="closeDesktopMenu"
            >
              {{ item.label }}
              <svg class="h-3.5 w-3.5 opacity-70" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
              </svg>
              <span
                class="absolute inset-x-3 bottom-0 h-0.5 origin-left bg-white transition"
                :class="isActive(item) || desktopMenu === item.label ? 'scale-x-100' : 'scale-x-0'"
              />
            </NuxtLink>
            <button
              v-else
              type="button"
              class="relative inline-flex items-center gap-1 px-3 py-2 text-[0.95rem] font-medium transition"
              :class="isActive(item) ? 'text-white' : 'text-white/80 hover:text-white'"
              aria-haspopup="true"
              :aria-expanded="desktopMenu === item.label"
              @click="desktopMenu = desktopMenu === item.label ? null : item.label"
            >
              {{ item.label }}
              <svg class="h-3.5 w-3.5 opacity-70" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
              </svg>
              <span
                class="absolute inset-x-3 bottom-0 h-0.5 origin-left bg-white transition"
                :class="isActive(item) || desktopMenu === item.label ? 'scale-x-100' : 'scale-x-0'"
              />
            </button>
            <div
              class="absolute left-0 top-full z-20 min-w-[17rem] pt-2 transition"
              :class="desktopMenu === item.label ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'"
            >
              <ul class="rounded-md bg-white py-2 text-ink shadow-lift ring-1 ring-navy/10">
                <li v-for="child in item.children" :key="child.to">
                  <NuxtLink
                    :to="child.to"
                    class="block px-4 py-2.5 text-sm hover:bg-paper"
                    :class="route.path === child.to ? 'bg-paper font-semibold text-navy' : ''"
                    @click="closeDesktopMenu"
                  >
                    {{ child.label }}
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </template>
        </div>
      </nav>

      <div class="flex items-center gap-3">
        <UiButton to="/membres/devenir-membre" variant="invert" size="sm" class="hidden sm:inline-flex">
          Devenir membre
        </UiButton>
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-md ring-1 ring-white/20 lg:hidden"
          :aria-expanded="open"
          aria-controls="menu-mobile"
          aria-label="Ouvrir le menu"
          @click="open = !open"
        >
          <span class="sr-only">Menu</span>
          <svg v-if="!open" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-width="1.8" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-width="1.8" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>
    </div>

    <div
      v-if="open"
      id="menu-mobile"
      class="fixed inset-0 top-[4.5rem] z-40 overflow-y-auto bg-navy lg:hidden"
    >
      <nav class="shell space-y-2 py-6" aria-label="Navigation mobile">
        <template v-for="item in mainNav" :key="item.label">
          <NuxtLink
            v-if="item.to && !item.children"
            :to="item.to"
            class="block border-b border-white/10 py-3 text-lg"
            @click="open = false"
          >
            {{ item.label }}
          </NuxtLink>
          <div v-else class="border-b border-white/10 py-3">
            <p class="text-sm font-semibold uppercase tracking-wider text-white/55">{{ item.label }}</p>
            <div class="mt-2 space-y-1">
              <NuxtLink
                v-if="item.to"
                :to="item.to"
                class="block py-1.5 text-lg"
                @click="open = false"
              >
                Vue d’ensemble
              </NuxtLink>
              <NuxtLink
                v-for="child in item.children"
                :key="child.to"
                :to="child.to"
                class="block py-1.5 text-lg"
                @click="open = false"
              >
                {{ child.label }}
              </NuxtLink>
            </div>
          </div>
        </template>
        <UiButton to="/membres/devenir-membre" variant="invert" class="mt-4 w-full" @click="open = false">
          Devenir membre
        </UiButton>
      </nav>
    </div>
  </header>
</template>
