<script setup lang="ts">
usePageSeo({
  title: 'Projets',
  description: 'Projets collectifs de la Maison régionale de l’industrie pour les manufacturiers de l’Estrie.'
})

const intro = [
  'Certaines avancées — former une relève, implanter un système, défendre un enjeu réglementaire — dépassent le cadre d’une seule entreprise.',
  'La MRI rassemble les manufacturiers, les partenaires et les leviers pour structurer ces dossiers, puis les rendre utiles à l’ensemble du réseau.'
]

const pillars = [
  {
    title: 'Porter ensemble',
    text: 'Un dossier trop lourd pour une usine devient possible quand les manufacturiers de l’Estrie s’y mettent à plusieurs.'
  },
  {
    title: 'Agir sur le terrain',
    text: 'Formation, implantation de systèmes, représentations : des actions ancrées dans la réalité des opérations.'
  },
  {
    title: 'Laisser des traces',
    text: 'Outils, parcours et apprentissages réutilisables d’une entreprise à l’autre, au-delà du projet initial.'
  }
]

const items = [
  {
    title: 'DEP en opération d’équipements de production',
    to: '/projets/dep-operateur',
    tag: 'Formation',
    text: 'Former des opérateurs déjà en poste, en alternance travail-études, jusqu’à l’obtention d’un DEP reconnu.',
    image: '/images/photos/dep-operateur.jpg',
    imageAlt: 'Employées en production devant un équipement industriel'
  },
  {
    title: 'Lire, compter, cliquer',
    to: '/projets/lire-compter-cliquer',
    tag: 'Numérique',
    text: 'Les clés de l’implantation d’un système en entreprise : outils concrets pour l’adhésion des équipes.',
    image: '/images/photos/paysage-6.jpg',
    imageAlt: 'Poignée de main en milieu industriel'
  },
  {
    title: 'Travailleurs étrangers temporaires',
    to: '/projets/travailleurs-etrangers-temporaires',
    tag: 'Mobilisation',
    text: 'Mobilisation régionale des manufacturiers de l’Estrie pour défendre leur capacité d’exploitation.',
    image: '/images/photos/dejeuner-2.jpg',
    imageAlt: 'Rencontre de manufacturiers autour d’un équipement'
  },
  {
    title: 'Tarifs douaniers',
    to: '/ressources/tarifs-douaniers',
    tag: 'Ressources',
    text: 'Mesures d’aide, programmes et personnes-ressources pour les manufacturiers touchés par les tarifs.',
    image: '/images/photos/partage.jpg',
    imageAlt: 'Rencontre de travail autour de ressources pour les manufacturiers'
  }
]
</script>

<template>
  <div>
    <PageHero
      compact
      kicker="Projets"
      title="Des projets collectifs pour l’industrie estrienne"
      lead="La MRI porte des initiatives que les entreprises ne pourraient pas structurer seules."
      image="/images/photos/hero-projets.jpg"
      image-alt="Équipe manufacturière autour d’un équipement de production"
    />

    <section class="bg-white">
      <div class="shell py-16 lg:py-20">
        <div v-reveal class="max-w-narrow">
          <p class="kicker">Pourquoi des projets collectifs</p>
          <div class="prose-mri mt-4">
            <p v-for="p in intro" :key="p">{{ p }}</p>
          </div>
        </div>
        <ul class="mt-12 grid gap-6 sm:grid-cols-3">
          <li
            v-for="(pillar, i) in pillars"
            :key="pillar.title"
            v-reveal="{ delay: i * 80 }"
            class="rounded-xl bg-paper p-6 ring-1 ring-line"
          >
            <p class="font-sans text-sm font-semibold text-navy">0{{ i + 1 }}</p>
            <h3 class="mt-3 text-lg font-sans font-bold text-heading">{{ pillar.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-ink-muted">{{ pillar.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="bg-paper">
      <div class="shell py-16 lg:py-20">
        <div v-reveal>
          <p class="kicker">En cours</p>
          <h2 class="mt-2 text-3xl lg:text-4xl">Quatre dossiers portés par la MRI</h2>
        </div>
        <ul class="mt-10 grid items-stretch gap-6 sm:grid-cols-2">
          <li
            v-for="(item, i) in items"
            :key="item.to"
            v-reveal="{ delay: i * 80 }"
            class="h-full"
          >
            <NuxtLink
              :to="item.to"
              class="group flex h-full flex-col overflow-hidden rounded-xl bg-white ring-1 ring-line transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <div class="media-zoom relative">
                <SiteImg :src="item.image" :alt="item.imageAlt" class="aspect-[16/9] w-full object-cover" />
                <span class="absolute left-4 top-4 rounded-full bg-navy/80 px-2.5 py-1 font-sans text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">{{ item.tag }}</span>
              </div>
              <div class="flex flex-1 flex-col p-6">
                <h3 class="font-sans text-lg font-semibold group-hover:text-navy">{{ item.title }}</h3>
                <p class="mt-2 flex-1 text-ink-muted">{{ item.text }}</p>
                <p class="mt-4 text-sm font-semibold text-navy">
                  En savoir plus
                  <span aria-hidden="true" class="inline-block transition group-hover:translate-x-0.5">→</span>
                </p>
              </div>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <CtaBand
      title="Un enjeu collectif à structurer ?"
      text="Parlez-nous-en. La MRI peut rassembler les entreprises, les partenaires et les leviers pour le porter."
      cta-label="Nous joindre"
      to="/contact"
    />
  </div>
</template>
