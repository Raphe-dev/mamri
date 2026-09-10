<script setup lang="ts">
const content = useSiteContent()
const aboutPage = computed(() => content.value.aboutPage)
const team = computed(() => content.value.team)

usePageSeo({ title: 'Qui nous sommes', description: aboutPage.value.hero.lead })
</script>

<template>
  <div>
    <PageHero :kicker="aboutPage.hero.kicker" :title="aboutPage.hero.title" :lead="aboutPage.hero.lead" />
    <section class="bg-white">
      <div v-reveal class="shell py-16">
        <p class="max-w-narrow text-[1.05rem] leading-relaxed text-ink-muted">{{ aboutPage.intro }}</p>
        <div class="mt-14 grid items-center gap-10 lg:grid-cols-2">
          <div class="media-zoom rounded-xl">
            <SiteImg :src="aboutPage.history.image" :alt="aboutPage.history.title" class="aspect-[16/9] w-full rounded-xl object-cover" />
          </div>
          <div>
            <h2 class="text-2xl">{{ aboutPage.history.title }}</h2>
            <p class="mt-4 text-ink-muted leading-relaxed">{{ aboutPage.history.text }}</p>
          </div>
        </div>
        <div class="mt-16 grid gap-8 lg:grid-cols-2">
          <article v-for="(block, i) in [aboutPage.mission, aboutPage.vision]" :key="block.title" v-reveal="{ delay: i * 90 }" class="group overflow-hidden rounded-xl ring-1 ring-line">
            <div class="media-zoom">
              <SiteImg :src="block.image" :alt="block.title" class="aspect-[16/9] w-full object-cover" />
            </div>
            <div class="p-6">
              <h2 class="text-xl">{{ block.title }}</h2>
              <p class="mt-3 text-ink-muted">{{ block.text }}</p>
            </div>
          </article>
        </div>
        <div class="mt-12 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 class="text-2xl">{{ aboutPage.implication.title }}</h2>
            <p class="mt-4 text-ink-muted leading-relaxed">{{ aboutPage.implication.text }}</p>
          </div>
          <div class="media-zoom rounded-xl">
            <SiteImg :src="aboutPage.implication.image" :alt="aboutPage.implication.title" class="aspect-[16/9] w-full rounded-xl object-cover" />
          </div>
        </div>
      </div>
    </section>
    <section class="bg-paper">
      <div v-reveal class="shell py-16">
        <h2 class="text-2xl">Notre historique</h2>
        <ol class="mt-10 space-y-0">
          <li v-for="(item, i) in aboutPage.timeline" :key="item.year" v-reveal="{ delay: Math.min(i * 30, 240) }" class="relative grid grid-cols-[5.5rem_1fr] gap-6 border-l-2 border-navy/20 py-3 pl-6 first:pt-0">
            <span class="absolute -left-[5px] top-5 h-2.5 w-2.5 rounded-full bg-navy ring-4 ring-paper" />
            <span class="font-sans font-bold text-navy">{{ item.year }}</span>
            <span class="text-ink">{{ item.text }}</span>
          </li>
        </ol>
      </div>
    </section>
    <section class="bg-white">
      <div v-reveal class="shell py-16">
        <h2 class="text-2xl">Nos valeurs</h2>
        <ul class="mt-8 grid gap-6 lg:grid-cols-3">
          <li v-for="(v, i) in aboutPage.values" :key="v.title" v-reveal="{ delay: i * 90 }" class="group overflow-hidden rounded-xl ring-1 ring-line">
            <div class="media-zoom">
              <SiteImg :src="v.image" :alt="v.title" class="aspect-[16/9] w-full object-cover" />
            </div>
            <div class="p-6">
              <h3 class="font-semibold">{{ v.title }}</h3>
              <p class="mt-2 text-sm text-ink-muted">{{ v.text }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <section class="bg-paper">
      <div v-reveal class="shell py-16">
        <h2 class="text-2xl">Notre équipe</h2>
        <p class="mt-3 max-w-narrow text-ink-muted">Nous collaborons au quotidien pour offrir les meilleurs services aux entreprises manufacturières de l’Estrie.</p>
        <ul class="mt-10 grid gap-8 sm:grid-cols-2 lg:max-w-3xl">
          <li v-for="(m, i) in team" :key="m.name" v-reveal="{ delay: i * 90 }" class="rounded-xl bg-white p-6 ring-1 ring-line">
            <SiteImg :src="m.image" :alt="m.name" class="aspect-square w-full rounded-lg object-cover object-top" />
            <h3 class="mt-4 text-lg font-semibold">{{ m.name }}</h3>
            <p class="text-ink-muted">{{ m.title }}</p>
            <a :href="m.linkedin" class="mt-2 inline-block text-sm font-semibold text-navy" target="_blank" rel="noopener">LinkedIn</a>
          </li>
        </ul>
      </div>
    </section>
    <CtaBand title="Rejoignez le réseau des manufacturiers estriens" cta-label="Devenez membre" to="/membres/devenir-membre" />
  </div>
</template>
