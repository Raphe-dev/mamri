<script setup lang="ts">
usePageSeo({ title: 'Projets', description: 'Projets collectifs de la Maison régionale de l’industrie.' })

const items = [
  { title: 'DEP en opération d’équipements de production', to: '/projets/dep-operateur', text: 'Former des opérateurs déjà en poste, en alternance travail-études.' },
  { title: 'Lire, compter, cliquer', to: '/projets/lire-compter-cliquer', text: 'Les clés de l’implantation d’un système en entreprise.' },
  { title: 'Travailleurs étrangers temporaires', to: '/projets/travailleurs-etrangers-temporaires', text: 'Mobilisation régionale des manufacturiers de l’Estrie.' },
  { title: 'Tarifs douaniers', to: '/ressources/tarifs-douaniers', text: 'Ressources et programmes d’aide pour les manufacturiers.' }
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
      <div class="shell grid gap-6 py-16 sm:grid-cols-2">
        <NuxtLink
          v-for="(item, i) in items"
          :key="item.to"
          v-reveal="{ delay: i * 80 }"
          :to="item.to"
          class="rounded-xl bg-paper p-6 ring-1 ring-line transition hover:-translate-y-0.5 hover:shadow-lift"
        >
          <h2 class="text-lg">{{ item.title }}</h2>
          <p class="mt-2 text-ink-muted">{{ item.text }}</p>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
