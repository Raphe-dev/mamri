<script setup lang="ts">
const { visible, accept, refuse } = useCookieConsent()
</script>

<template>
  <ClientOnly>
    <div
      v-if="visible"
      class="pointer-events-none fixed inset-x-0 bottom-0 z-[60] p-3 sm:p-4"
    >
      <aside
        class="pointer-events-auto mx-auto flex max-w-content flex-col gap-3 rounded-lg bg-white/95 p-4 shadow-lift ring-1 ring-navy/10 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:gap-6"
        role="region"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-text"
      >
        <div class="min-w-0 text-sm leading-relaxed text-ink">
          <p id="cookie-consent-title" class="font-semibold text-navy">
            Témoins — Loi 25
          </p>
          <p id="cookie-consent-text" class="mt-1 text-ink-muted">
            Les témoins essentiels assurent le fonctionnement du site. Les témoins optionnels de mesure d’audience ne sont déposés qu’avec votre accord.
            <NuxtLink
              to="/conditions-dutilisation"
              class="font-semibold text-navy underline-offset-2 hover:underline"
            >
              Politique de confidentialité
            </NuxtLink>
          </p>
        </div>
        <div class="flex shrink-0 items-center gap-2">
          <button
            type="button"
            class="inline-flex min-h-11 min-w-[6.5rem] items-center justify-center rounded-md px-4 py-2 text-sm font-semibold text-navy ring-1 ring-inset ring-navy/25 transition hover:bg-navy-50"
            @click="refuse"
          >
            Refuser
          </button>
          <button
            type="button"
            class="inline-flex min-h-11 min-w-[6.5rem] items-center justify-center rounded-md bg-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-700"
            @click="accept"
          >
            Accepter
          </button>
        </div>
      </aside>
    </div>
  </ClientOnly>
</template>
