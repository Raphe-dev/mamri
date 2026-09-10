<script setup lang="ts">
const content = useSiteContent()
const depPage = computed(() => content.value.depPage)

usePageSeo({ title: 'DEP en opération d’équipements de production', description: depPage.value.hero.lead })
</script>

<template>
  <div>
    <PageHero
      compact
      :kicker="depPage.hero.kicker"
      :title="depPage.hero.title"
      :lead="depPage.hero.lead"
      :image="depPage.hero.image"
      :image-alt="depPage.hero.imageAlt"
      :ctas="[{ label: 'Voir la vidéo', to: '#video', variant: 'primary' }]"
    />

    <section id="video" class="bg-white">
      <div v-reveal class="shell grid items-center gap-10 py-16 lg:grid-cols-2">
        <div>
          <h2 class="text-2xl">{{ depPage.video.title }}</h2>
          <p class="mt-4 text-ink-muted leading-relaxed">{{ depPage.video.lead }}</p>
          <p class="mt-6 text-sm text-ink-muted">
            <a :href="depPage.video.creditHref" class="text-navy" target="_blank" rel="noopener">{{ depPage.video.credit }}</a>
          </p>
        </div>
        <div class="overflow-hidden rounded-xl bg-navy-900 ring-1 ring-line">
          <iframe
            :src="depPage.video.src"
            title="Vidéo de présentation du projet DEP Opération d’équipements de production"
            class="aspect-video w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </div>
      </div>
    </section>

    <section class="bg-navy text-white">
      <div v-reveal class="shell py-14">
        <h2 class="text-2xl">Partenaires impliqués</h2>
        <p class="mt-2 text-white/75">Ce projet est réalisé avec des partenaires régionaux mobilisés.</p>
        <ul class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <li v-for="(p, i) in depPage.partners" :key="p.name" v-reveal="{ delay: i * 70 }">
            <a
              :href="p.href"
              target="_blank"
              rel="noopener"
              class="flex h-28 items-center justify-center rounded-lg px-4 ring-1 transition"
              :class="p.onDark ? 'bg-navy-800 ring-white/15 hover:bg-navy-700' : 'bg-white ring-line hover:bg-navy-50'"
            >
              <SiteImg :src="p.src" :alt="p.name" :width="220" :height="56" class="h-14 w-auto max-w-full object-contain" />
            </a>
          </li>
        </ul>
      </div>
    </section>

    <section class="bg-white">
      <div v-reveal class="shell grid items-center gap-10 py-16 lg:grid-cols-2">
        <div>
          <h2 class="text-2xl">Développez votre relève à partir de vos employés actuels</h2>
          <ul class="mt-6 space-y-2">
            <li v-for="w in depPage.whyNow" :key="w" class="flex gap-3">
              <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-navy" />
              <span>{{ w }}</span>
            </li>
          </ul>
        </div>
        <SiteImg :src="depPage.whyImage || depPage.hero.image" :alt="depPage.hero.imageAlt" class="aspect-[16/10] w-full rounded-xl object-cover" />
      </div>
    </section>

    <section class="bg-paper">
      <div class="shell py-16">
        <h2 v-reveal class="text-2xl">Un DEP conçu autour du travail réel de vos opérateurs</h2>
        <ul class="mt-8 grid gap-4 sm:grid-cols-2">
          <li v-for="(f, i) in depPage.formula" :key="f" v-reveal="{ delay: i * 70 }" class="rounded-xl bg-white p-5 ring-1 ring-line">{{ f }}</li>
        </ul>
        <ol class="mt-12 grid gap-6 lg:grid-cols-4">
          <li v-for="(s, i) in depPage.steps" :key="s.title" v-reveal="{ delay: i * 80 }">
            <span class="text-sm font-semibold text-navy">0{{ i + 1 }}</span>
            <h3 class="mt-1 font-semibold">{{ s.title }}</h3>
            <p class="mt-2 text-sm text-ink-muted">{{ s.text }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section class="bg-white">
      <div class="shell py-16">
        <h2 v-reveal class="text-2xl">Pourquoi former un opérateur déjà en poste</h2>
        <ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="(b, i) in depPage.benefits" :key="b.title" v-reveal="{ delay: i * 70 }" class="rounded-xl bg-paper p-5">
            <h3 class="font-semibold">{{ b.title }}</h3>
            <p class="mt-2 text-sm text-ink-muted">{{ b.text }}</p>
          </li>
        </ul>
        <SiteImg v-if="depPage.learningImage" v-reveal :src="depPage.learningImage" alt="Participants en apprentissage dans un contexte professionnel" class="mt-10 aspect-[16/8] w-full rounded-xl object-cover" />
      </div>
    </section>

    <section class="bg-paper">
      <div v-reveal class="shell py-16">
        <h2 class="text-2xl">À quelles entreprises s’adresse la formule</h2>
        <ul class="mt-6 max-w-narrow space-y-2">
          <li v-for="a in depPage.audience" :key="a" class="flex gap-3">
            <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-navy" />
            <span>{{ a }}</span>
          </li>
        </ul>
        <h2 class="mt-14 text-2xl">Questions fréquentes</h2>
        <UiAccordion class="mt-6" :items="depPage.faq" />
      </div>
    </section>

    <CtaBand
      title="Votre entreprise pourrait-elle former un opérateur avec cette formule ?"
      text="Validez l’admissibilité, le fonctionnement du DEP et le remboursement salarial."
      cta-label="Vérifier l’admissibilité"
      to="mailto:vcamire@mamri.ca"
    />
  </div>
</template>
