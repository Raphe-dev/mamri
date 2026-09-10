<script setup lang="ts">
import { footerNav } from '~/data/nav'

const content = useSiteContent()
const site = computed(() => content.value.site)
const { reopen } = useCookieConsent()
</script>

<template>
  <footer class="relative overflow-hidden bg-navy-900 text-white">
    <div class="grain absolute inset-0 opacity-40" />
    <div v-reveal class="relative shell grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <SiteImg src="/images/logo/mri-blanc.png" alt="Maison régionale de l’industrie" :width="180" :height="115" class="h-14 w-auto" />
        <p class="mt-5 text-sm leading-relaxed text-white/75">
          {{ site.address.line1 }}<br />
          {{ site.address.city }} {{ site.address.postal }}
        </p>
        <p class="mt-3 text-sm text-white/75">
          T :
          <a :href="site.phone.href" class="hover:text-white">{{ site.phone.display }}</a>
          poste {{ site.phone.ext }}
        </p>
        <div class="mt-5 flex gap-3">
          <a
            :href="site.social.linkedin"
            target="_blank"
            rel="noopener"
            class="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-white/20 text-white/80 transition hover:bg-white/10 hover:text-white"
            aria-label="LinkedIn"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.25h4.56V24H.22V8.25zM8.34 8.25h4.37v2.14h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v8.99h-4.56v-7.97c0-1.9-.03-4.34-2.64-4.34-2.65 0-3.05 2.07-3.05 4.2V24H8.34V8.25z" />
            </svg>
          </a>
          <a
            :href="site.social.facebook"
            target="_blank"
            rel="noopener"
            class="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-white/20 text-white/80 transition hover:bg-white/10 hover:text-white"
            aria-label="Facebook"
          >
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.02H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.75 8.43-4.91 8.43-9.93z" />
            </svg>
          </a>
        </div>
      </div>
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">Services</p>
        <ul class="mt-4 space-y-2 text-sm">
          <li v-for="l in footerNav.services" :key="l.to">
            <NuxtLink :to="l.to" class="text-white/80 hover:text-white">{{ l.label }}</NuxtLink>
          </li>
        </ul>
      </div>
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">Projets</p>
        <ul class="mt-4 space-y-2 text-sm">
          <li v-for="l in footerNav.projets" :key="l.to">
            <NuxtLink :to="l.to" class="text-white/80 hover:text-white">{{ l.label }}</NuxtLink>
          </li>
        </ul>
      </div>
      <div>
        <p class="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">À propos</p>
        <ul class="mt-4 space-y-2 text-sm">
          <li v-for="l in footerNav.aPropos" :key="l.to">
            <NuxtLink :to="l.to" class="text-white/80 hover:text-white">{{ l.label }}</NuxtLink>
          </li>
        </ul>
        <p class="mt-6 text-sm text-white/75">
          Restez informé des nouvelles de l’industrie estrienne.
        </p>
        <UiButton to="/bulletin" variant="invert" size="sm" class="mt-3">
          S’abonner au bulletin
        </UiButton>
      </div>
    </div>
    <div class="relative border-t border-white/10">
      <div class="shell flex flex-col gap-2 py-5 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ new Date().getFullYear() }} Maison régionale de l’industrie</p>
        <div class="flex flex-wrap items-center gap-x-4 gap-y-1">
          <NuxtLink to="/conditions-dutilisation" class="hover:text-white">Conditions d’utilisation</NuxtLink>
          <button type="button" class="hover:text-white" aria-label="Gérer les témoins" @click="reopen">Témoins</button>
        </div>
      </div>
    </div>
  </footer>
</template>
