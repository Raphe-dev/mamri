<script setup lang="ts">
const content = useSiteContent()
const reseauxPage = computed(() => content.value.reseauxPage)

usePageSeo({ title: 'Réseaux professionnels', description: reseauxPage.value.hero.lead })
</script>

<template>
  <div>
    <PageHero
      compact
      :kicker="reseauxPage.hero.kicker"
      :title="reseauxPage.hero.title"
      :lead="reseauxPage.hero.lead"
      :image="reseauxPage.hero.image"
      :image-alt="reseauxPage.hero.imageAlt"
    />
    <section class="bg-white">
      <div class="shell py-16">
        <div v-reveal class="prose-mri">
          <p v-for="p in reseauxPage.intro" :key="p">{{ p }}</p>
        </div>
        <ul class="mt-12 grid gap-8 lg:grid-cols-3">
          <li v-for="(n, i) in reseauxPage.networks" :key="n.title" v-reveal="{ delay: i * 90 }" class="group overflow-hidden rounded-xl ring-1 ring-line">
            <div class="media-zoom">
              <SiteImg :src="n.image" :alt="n.title" class="aspect-[16/9] w-full object-cover" />
            </div>
            <div class="p-6">
              <h2 class="text-lg">{{ n.title }}</h2>
              <p class="mt-2 text-ink-muted">{{ n.text }}</p>
            </div>
          </li>
        </ul>
        <p v-reveal class="mt-10 max-w-narrow text-ink-muted">{{ reseauxPage.closing }}</p>
        <UiButton v-reveal to="/membres/devenir-membre" class="mt-6">Inscrivez-vous</UiButton>
      </div>
    </section>
    <CtaBand title="Rejoignez le réseau des manufacturiers estriens" cta-label="Devenez membre" to="/membres/devenir-membre" />
  </div>
</template>
