<script setup lang="ts">
const content = useSiteContent()
const recrutementPage = computed(() => content.value.recrutementPage)
const site = computed(() => content.value.site)

usePageSeo({ title: 'Recrutement', description: recrutementPage.value.hero.lead })
</script>

<template>
  <div>
    <PageHero
      compact
      :kicker="recrutementPage.hero.kicker"
      :title="recrutementPage.hero.title"
      :lead="recrutementPage.hero.lead"
      :image="recrutementPage.hero.image"
      :image-alt="recrutementPage.hero.imageAlt"
    />
    <section class="bg-white">
      <div class="shell py-16">
        <div v-reveal class="prose-mri">
          <p v-for="p in recrutementPage.intro" :key="p">{{ p }}</p>
        </div>
        <a v-reveal :href="site.emploisCompetences.url" class="mt-6 inline-flex font-semibold text-navy" target="_blank" rel="noopener">
          Visitez le site d’Emplois Compétences →
        </a>
        <ul class="mt-12 grid gap-8 lg:grid-cols-3">
          <li v-for="(o, i) in recrutementPage.offers" :key="o.title" v-reveal="{ delay: i * 90 }" class="group overflow-hidden rounded-xl ring-1 ring-line">
            <div class="media-zoom">
              <SiteImg :src="o.image" :alt="o.title" class="aspect-square w-full object-cover" />
            </div>
            <div class="p-6">
              <h2 class="text-lg">{{ o.title }}</h2>
              <p class="mt-2 text-sm text-ink-muted">{{ o.text }}</p>
              <a :href="o.href" class="mt-4 inline-block text-sm font-semibold text-navy" target="_blank" rel="noopener">{{ o.cta }} →</a>
            </div>
          </li>
        </ul>
        <p v-reveal class="mt-12 text-ink-muted">
          Contactez nos spécialistes au
          <a :href="site.emploisCompetences.phoneHref" class="font-semibold text-navy">{{ site.emploisCompetences.phone }}</a>
          ou par courriel à
          <a :href="`mailto:${site.emploisCompetences.email}`" class="font-semibold text-navy">{{ site.emploisCompetences.email }}</a>.
        </p>
      </div>
    </section>
    <CtaBand title="Rejoignez le réseau des manufacturiers estriens" cta-label="Devenez membre" to="/membres/devenir-membre" />
  </div>
</template>
