<script setup lang="ts">
const content = useSiteContent()
const home = computed(() => content.value.home)
const upcoming = computed(() => content.value.events.slice(0, 3))
const memberLogos = computed(() => content.value.memberLogos)
const featuredMember = computed(() => {
  const spots = content.value.memberSpotlights
  return spots.find((s) => s.featured) ?? spots[0]
})
const memberExcerpt = computed(() => {
  const body = featuredMember.value?.body
  if (!body) return ''
  return body.split('. ').slice(0, 2).join('. ') + '.'
})

usePageSeo({
  title: 'Accueil',
  description:
    'La Maison régionale de l’industrie soutient les entreprises manufacturières de l’Estrie dans la concrétisation de leurs projets stratégiques et générateurs de croissance.'
})
</script>

<template>
  <div>
    <AnnouncementBar
      v-if="content.announcement.enabled"
      :label="content.announcement.label"
      :text="content.announcement.text"
      :to="content.announcement.to"
    />
    <PageHero
      cinematic
      :kicker="home.hero.kicker"
      :title="home.hero.title"
      :lead="home.hero.lead"
      :image="home.hero.image"
      :image-alt="home.hero.imageAlt"
      :ctas="home.hero.ctas"
    />
    <StatsBand :items="home.stats" />

    <section id="accueil-contenu" class="scroll-mt-24 bg-white">
      <div class="shell py-16 lg:py-20">
        <div v-reveal class="flex items-end justify-between gap-6">
          <div>
            <p class="kicker">Nos services</p>
            <h2 class="mt-2 text-3xl lg:text-4xl">Quatre leviers pour vos équipes</h2>
          </div>
          <UiButton to="/services" variant="ghost" class="hidden sm:inline-flex">Tout savoir sur nos services</UiButton>
        </div>
        <ul class="mt-10 grid items-stretch gap-6 sm:grid-cols-2">
          <li
            v-for="(s, i) in home.services"
            :key="s.title"
            v-reveal="{ delay: i * 90 }"
            class="h-full"
          >
            <NuxtLink :to="s.to" class="group flex h-full flex-col overflow-hidden rounded-xl bg-paper ring-1 ring-line transition hover:-translate-y-0.5 hover:shadow-lift">
              <div class="media-zoom relative">
                <SiteImg :src="s.image" :alt="s.title" class="aspect-[16/9] w-full shrink-0 object-cover" />
                <span class="absolute left-4 top-4 rounded-full bg-navy/75 px-2.5 py-1 font-sans text-sm font-semibold text-white backdrop-blur-sm">0{{ i + 1 }}</span>
              </div>
              <div class="flex flex-1 flex-col p-6">
                <h3 class="font-sans text-lg font-semibold group-hover:text-navy">{{ s.title }}</h3>
                <p class="mt-2 flex-1 text-ink-muted">{{ s.text }}</p>
                <p class="mt-4 text-sm font-semibold text-navy">
                  En savoir plus
                  <span aria-hidden="true" class="inline-block transition group-hover:translate-x-0.5">→</span>
                </p>
              </div>
            </NuxtLink>
          </li>
        </ul>
        <div class="mt-8 sm:hidden">
          <UiButton to="/services" variant="ghost">Tout savoir sur nos services</UiButton>
        </div>
      </div>
    </section>

    <section class="bg-paper">
      <div class="shell py-16 lg:py-20">
        <div v-reveal class="flex items-end justify-between gap-6">
          <div>
            <p class="kicker">Calendrier</p>
            <h2 class="mt-2 text-3xl lg:text-4xl">Prochaines activités</h2>
          </div>
          <UiButton to="/calendrier" variant="ghost" class="hidden sm:inline-flex">Voir le calendrier</UiButton>
        </div>
        <ul class="mt-10 grid items-stretch gap-6 lg:grid-cols-3">
          <li v-for="(e, i) in upcoming" :key="e.slug" v-reveal="{ delay: i * 80 }" class="h-full">
            <EventTeaser :event="e" />
          </li>
        </ul>
        <div class="mt-8 sm:hidden">
          <UiButton to="/calendrier" variant="ghost">Voir le calendrier</UiButton>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden bg-white">
      <div v-reveal class="shell grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-20">
        <div class="relative">
          <p class="pointer-events-none absolute -left-2 -top-16 hidden font-sans text-[9rem] font-bold leading-none text-navy/[0.06] lg:block" aria-hidden="true">45</p>
          <p class="kicker">Depuis 1981</p>
          <h2 class="relative mt-2 text-3xl lg:text-4xl">{{ home.years.title }}</h2>
          <p class="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-ink-muted">{{ home.years.text }}</p>
          <a
            :href="home.years.anniversary.href"
            target="_blank"
            rel="noopener"
            class="mt-6 flex items-start gap-4 rounded-xl bg-paper p-4 ring-1 ring-line transition hover:shadow-lift"
          >
            <span class="mt-0.5 hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-white sm:inline-flex" aria-hidden="true">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8 7V3m8 4V3M4 11h16M5 21h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z" />
              </svg>
            </span>
            <span>
              <span class="block text-xs font-semibold uppercase tracking-[0.14em] text-navy">{{ home.years.anniversary.label }}</span>
              <span class="mt-1 block font-semibold text-ink">{{ home.years.anniversary.title }}</span>
            </span>
          </a>
          <UiButton :to="home.years.cta.to" class="mt-6">{{ home.years.cta.label }}</UiButton>
        </div>
        <div class="media-zoom rounded-xl">
          <SiteImg :src="home.years.image" :alt="home.years.imageAlt" class="aspect-[4/3] w-full rounded-xl object-cover" />
        </div>
      </div>
    </section>

    <section v-if="featuredMember" class="bg-paper">
      <div v-reveal class="shell grid items-center gap-10 py-16 lg:grid-cols-12 lg:py-20">
        <div class="media-zoom rounded-xl lg:col-span-6">
          <SiteImg :src="featuredMember.image" :alt="featuredMember.imageAlt" class="aspect-[16/10] w-full rounded-xl object-cover" />
        </div>
        <div class="lg:col-span-6">
          <p class="kicker">Connaissez-vous nos membres ?</p>
          <h2 class="mt-2 text-3xl lg:text-4xl">{{ featuredMember.name }}</h2>
          <p class="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-ink-muted">{{ memberExcerpt }}</p>
          <div class="mt-6 flex flex-wrap gap-3">
            <UiButton :href="featuredMember.href">Visiter le site</UiButton>
            <UiButton to="/membres" variant="ghost">Toutes les entreprises</UiButton>
          </div>
        </div>
      </div>
    </section>

    <CtaBand
      :title="home.networkCta.title"
      :cta-label="home.networkCta.cta.label"
      :to="home.networkCta.cta.to"
      :image="home.networkCta.image"
      :image-alt="home.networkCta.imageAlt"
    />

    <LogoGrid title="Ils nous font confiance" :logos="memberLogos" />

    <CtaBand
      tone="paper"
      title="S’abonner au Bulletin de l’industrie"
      text="Recevez chaque mois nos nouvelles, nos événements à venir et des occasions de formation exclusives."
      cta-label="S’abonner"
      to="/bulletin"
    />
  </div>
</template>
