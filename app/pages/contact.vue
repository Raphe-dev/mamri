<script setup lang="ts">
const content = useSiteContent()
const site = computed(() => content.value.site)

usePageSeo({
  title: 'Contact',
  description: 'Joindre l’équipe de la Maison régionale de l’industrie à Sherbrooke.'
})
</script>

<template>
  <div>
    <PageHero
      kicker="Contact"
      title="Vous avez des questions sur nos services ?"
      lead="Nous sommes situés à Sherbrooke. Écrivez-nous ou téléphonez — un membre de l’équipe vous répondra."
    />
    <section class="bg-white">
      <div v-reveal class="shell grid gap-10 py-16 lg:grid-cols-2">
        <div>
          <div class="flex flex-wrap gap-3">
            <UiButton :href="site.phone.href">Joindre notre équipe par téléphone</UiButton>
            <UiButton :href="`mailto:${site.email.general}`" variant="ghost">Soumettre une demande par courriel</UiButton>
          </div>
          <dl class="mt-10 space-y-4 text-[1.05rem]">
            <div>
              <dt class="text-xs font-semibold uppercase tracking-wider text-ink-muted">Adresse</dt>
              <dd class="mt-1">
                {{ site.address.line1 }}<br />
                {{ site.address.city }} {{ site.address.postal }}
              </dd>
            </div>
            <div>
              <dt class="text-xs font-semibold uppercase tracking-wider text-ink-muted">Téléphone</dt>
              <dd class="mt-1">
                <a :href="site.phone.href" class="text-navy">{{ site.phone.display }}</a>
                poste {{ site.phone.ext }}
              </dd>
            </div>
            <div>
              <dt class="text-xs font-semibold uppercase tracking-wider text-ink-muted">Courriel</dt>
              <dd class="mt-1">
                <a :href="`mailto:${site.email.general}`" class="text-navy">{{ site.email.general }}</a>
              </dd>
            </div>
            <div class="flex gap-4 pt-2">
              <a :href="site.social.facebook" class="font-semibold text-navy" target="_blank" rel="noopener">Facebook</a>
              <a :href="site.social.linkedin" class="font-semibold text-navy" target="_blank" rel="noopener">LinkedIn</a>
            </div>
          </dl>
        </div>
        <div>
          <div class="overflow-hidden rounded-xl ring-1 ring-line">
            <iframe
              :src="site.geo.embed"
              title="Carte — 1520, rue King Ouest, Sherbrooke"
              class="h-80 w-full border-0"
              loading="lazy"
            />
          </div>
          <p class="mt-3 text-sm text-ink-muted">
            <a :href="site.geo.google" class="text-navy" target="_blank" rel="noopener">Ouvrir dans Google Maps</a>
            ·
            <a :href="site.geo.maps" class="text-navy" target="_blank" rel="noopener">OpenStreetMap</a>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
