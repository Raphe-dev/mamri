<script setup lang="ts">
const content = useSiteContent()
const lirePage = computed(() => content.value.lirePage)

usePageSeo({ title: 'Lire, compter, cliquer', description: lirePage.value.hero.lead })
</script>

<template>
  <div>
    <PageHero
      compact
      :kicker="lirePage.hero.kicker"
      :title="lirePage.hero.title"
      :lead="lirePage.hero.lead"
      :image="lirePage.hero.image"
      :image-alt="lirePage.hero.imageAlt"
    />
    <section class="bg-navy text-white">
      <div v-reveal class="shell py-14">
        <h2 class="text-2xl">Partenaires impliqués</h2>
        <ul class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <li v-for="(p, i) in lirePage.partners" :key="p.name" v-reveal="{ delay: i * 70 }">
            <a :href="p.href" target="_blank" rel="noopener" class="flex h-28 items-center justify-center rounded-lg bg-navy-800 px-4 ring-1 ring-white/15 transition hover:bg-navy-700">
              <SiteImg :src="p.src" :alt="p.name" :width="220" :height="56" class="h-14 w-auto max-w-full object-contain" />
            </a>
          </li>
        </ul>
      </div>
    </section>
    <section class="bg-white">
      <div class="shell py-16">
        <h2 v-reveal class="text-2xl">Ce que votre entreprise y gagne</h2>
        <ul class="mt-8 grid gap-4 sm:grid-cols-2">
          <li v-for="(g, i) in lirePage.gains" :key="g.title" v-reveal="{ delay: i * 70 }" class="rounded-xl bg-paper p-5">
            <h3 class="font-semibold">{{ g.title }}</h3>
            <p class="mt-2 text-sm text-ink-muted">{{ g.text }}</p>
          </li>
        </ul>
        <h2 v-reveal class="mt-14 text-2xl">Ce qui sera livré</h2>
        <ol class="mt-8 grid gap-4 lg:grid-cols-5">
          <li v-for="(d, i) in lirePage.deliverables" :key="d.title" v-reveal="{ delay: i * 70 }">
            <span class="text-sm font-semibold text-navy">0{{ i + 1 }}</span>
            <h3 class="mt-1 font-semibold">{{ d.title }}</h3>
            <p class="mt-2 text-sm text-ink-muted">{{ d.text }}</p>
          </li>
        </ol>
      </div>
    </section>
    <section class="bg-paper">
      <div class="shell py-16">
        <h2 v-reveal class="text-2xl">Indicateurs et cibles</h2>
        <ul class="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-5">
          <li v-for="(s, i) in lirePage.stats" :key="s.label" v-reveal="{ delay: i * 70 }" class="rounded-xl bg-white p-5 text-center ring-1 ring-line">
            <p class="font-sans text-3xl font-bold text-navy">{{ s.value }}</p>
            <p class="mt-1 text-sm text-ink-muted">{{ s.label }}</p>
          </li>
        </ul>
        <h2 v-reveal class="mt-14 text-2xl">Calendrier</h2>
        <ol class="mt-6 space-y-3">
          <li v-for="(c, i) in lirePage.calendar" :key="c.title" v-reveal="{ delay: i * 50 }" class="flex flex-wrap gap-x-6 border-b border-line py-3">
            <span class="w-56 font-semibold">{{ c.title }}</span>
            <span class="text-ink-muted">{{ c.when }}</span>
          </li>
        </ol>
      </div>
    </section>
    <CtaBand
      title="Vous voulez tester les outils avec votre équipe ?"
      text="On valide rapidement l’admissibilité et le niveau d’implication."
      cta-label="Nous écrire"
      :to="lirePage.contactMailto"
    />
    <section class="bg-white">
      <div v-reveal class="shell py-10">
        <p class="text-sm text-ink-muted">Ce projet est réalisé grâce à la participation financière du gouvernement du Québec.</p>
        <SiteImg src="/images/partners/gouvernement-quebec.png" alt="Gouvernement du Québec" class="mt-4 h-14 w-auto" />
      </div>
    </section>
  </div>
</template>
