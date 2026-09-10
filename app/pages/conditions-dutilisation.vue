<script setup lang="ts">
import { legalPage } from '~/data/legal'

const content = useSiteContent()
const site = computed(() => content.value.site)

usePageSeo({
  title: 'Conditions d’utilisation',
  description: 'Politique de confidentialité et conditions d’utilisation de la Maison régionale de l’industrie.'
})
</script>

<template>
  <div>
    <PageHero
      compact
      kicker="Légal"
      title="Conditions d’utilisation et confidentialité"
      :lead="`Dernière mise à jour : ${legalPage.updated}`"
    />
    <article class="bg-white">
      <div class="shell max-w-narrow space-y-10 py-16">
        <section v-for="s in legalPage.sections" :key="s.title" v-reveal>
          <h2 class="text-xl">{{ s.title }}</h2>
          <p class="mt-3 leading-relaxed text-ink-muted">{{ s.body }}</p>
        </section>
        <section v-reveal>
          <h2 class="text-xl">Nous joindre</h2>
          <p class="mt-3 leading-relaxed text-ink-muted">
            Pour toute question concernant la présente politique ou une demande liée à vos renseignements personnels, veuillez contacter
            {{ site.email.privacyName }}, {{ site.email.privacyTitle }}, au
            <a :href="`mailto:${site.email.privacy}`" class="text-navy">{{ site.email.privacy }}</a>
            ou au {{ site.email.privacyPhone }}.
          </p>
        </section>
      </div>
    </article>
  </div>
</template>
