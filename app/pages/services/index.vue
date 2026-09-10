<script setup lang="ts">
const content = useSiteContent()
const servicesPage = computed(() => content.value.servicesPage)

usePageSeo({
  title: 'Nos services',
  description: servicesPage.value.hero.lead
})
</script>

<template>
  <div>
    <PageHero
      compact
      :kicker="servicesPage.hero.kicker"
      :title="servicesPage.hero.title"
      :lead="servicesPage.hero.lead"
      :image="servicesPage.hero.image"
      :image-alt="servicesPage.hero.imageAlt"
    />
    <section class="bg-white">
      <div class="shell py-16 lg:py-20">
        <div v-reveal class="prose-mri">
          <p v-for="p in servicesPage.body" :key="p">{{ p }}</p>
        </div>
        <ul class="mt-12 grid items-stretch gap-6 lg:grid-cols-2">
          <li
            v-for="(item, i) in servicesPage.items"
            :key="item.slug"
            v-reveal="{ delay: i * 90 }"
            class="h-full"
          >
            <NuxtLink :to="item.to" class="group flex h-full overflow-hidden rounded-xl bg-paper ring-1 ring-line transition hover:-translate-y-0.5 hover:shadow-lift">
              <div class="media-zoom hidden w-40 shrink-0 sm:block">
                <SiteImg :src="item.image" :alt="item.title" class="h-full w-40 object-cover" />
              </div>
              <div class="p-6">
                <h2 class="text-xl group-hover:text-navy">{{ item.title }}</h2>
                <p class="mt-2 text-ink-muted">{{ item.text }}</p>
                <p class="mt-4 text-sm font-semibold text-navy">En savoir plus →</p>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>
    <CtaBand
      title="Rejoignez le réseau des manufacturiers estriens"
      cta-label="Devenez membre"
      to="/membres/devenir-membre"
    />
  </div>
</template>
