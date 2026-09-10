<script setup lang="ts">
const content = useSiteContent()
const memberSpotlights = computed(() => content.value.memberSpotlights)

usePageSeo({
  title: 'Connaissez-vous nos membres ?',
  description: 'Cette section est dédiée aux entreprises membres qui propulsent l’industrie manufacturière en Estrie.'
})
</script>

<template>
  <div>
    <PageHero
      kicker="Membres"
      title="Connaissez-vous nos membres ?"
      lead="Cette section met en lumière les réalisations, innovations et projets de nos membres, acteurs incontournables de notre communauté. Découvrez leurs histoires et connectez-vous avec ceux qui façonnent l’avenir de l’industrie estrienne."
    />
    <section class="bg-white">
      <div class="shell space-y-16 py-16">
        <article
          v-for="(m, i) in memberSpotlights"
          :key="m.name"
          v-reveal
          class="grid items-center gap-8 lg:grid-cols-12"
        >
          <div class="lg:col-span-6" :class="i % 2 ? 'lg:order-2' : ''">
            <div class="media-zoom rounded-xl">
              <SiteImg :src="m.image" :alt="m.imageAlt" class="aspect-[16/9] w-full rounded-xl object-cover" />
            </div>
            <p v-if="m.credit" class="mt-2 text-xs text-ink-muted">{{ m.credit }}</p>
          </div>
          <div class="lg:col-span-6">
            <p class="kicker">Membre</p>
            <h2 class="mt-2 text-2xl lg:text-3xl">{{ m.name }}</h2>
            <p class="mt-4 text-ink-muted leading-relaxed">{{ m.body }}</p>
            <a :href="m.href" class="mt-5 inline-flex font-semibold text-navy" target="_blank" rel="noopener noreferrer">Visiter le site de {{ m.name }} →</a>
          </div>
        </article>
      </div>
    </section>
    <CtaBand title="Rejoignez le réseau des manufacturiers" cta-label="Devenez membre" to="/membres/devenir-membre" />
  </div>
</template>
