<script setup lang="ts">
import { mrcs, tariffPrograms } from '~/data/tariffs'

const mrc = ref('')

usePageSeo({
  title: 'Tarifs douaniers',
  description: 'Ressources et programmes d’aide pour les manufacturiers de l’Estrie touchés par les tarifs douaniers.'
})
</script>

<template>
  <div>
    <PageHero
      compact
      kicker="Tarifs douaniers"
      title="Ressources et programmes d’aide pour les manufacturiers de l’Estrie"
      lead="À la suite des échanges avec les entreprises de la région, nous avons regroupé les principales mesures d’aide et personnes-ressources actuellement disponibles."
      image="/images/photos/hero-projets.jpg"
      image-alt="Équipe manufacturière autour d’un équipement de production"
    />
    <section class="bg-white">
      <div class="shell py-16">
        <div v-reveal class="rounded-xl bg-paper px-5 py-4 text-sm text-ink-muted">
          Les programmes, critères d’admissibilité, modalités et personnes-ressources peuvent évoluer. L’admissibilité finale est déterminée par l’organisme responsable. Pour une mise à jour :
          <a href="mailto:vcamire@mamri.ca" class="text-navy">vcamire@mamri.ca</a>.
        </div>
        <label v-reveal class="mt-8 block max-w-sm text-sm font-medium">
          Sélectionnez votre MRC
          <select v-model="mrc" class="mt-1 w-full rounded-md border-0 py-2.5 pl-3 ring-1 ring-inset ring-line">
            <option value="">Toutes les MRC</option>
            <option v-for="m in mrcs" :key="m" :value="m">{{ m }}</option>
          </select>
        </label>
        <p v-if="mrc" class="mt-3 text-sm text-navy">
          Ressources affichées pour la MRC de {{ mrc }}. Les programmes provinciaux et fédéraux s’appliquent à l’ensemble du territoire.
        </p>

        <h2 v-reveal class="mt-14 text-2xl">Mesures du gouvernement provincial</h2>
        <ul class="mt-6 grid gap-4 lg:grid-cols-3">
          <li v-for="(p, i) in tariffPrograms.provincial" :key="p.title" v-reveal="{ delay: i * 80 }" class="rounded-xl bg-paper p-5">
            <p class="text-xs font-semibold uppercase tracking-wide text-navy">{{ p.tag }}</p>
            <h3 class="mt-2 font-semibold">{{ p.title }}</h3>
            <ul class="mt-3 list-disc space-y-1 pl-4 text-sm text-ink-muted">
              <li v-for="pt in p.points" :key="pt">{{ pt }}</li>
            </ul>
            <p v-if="p.contact" class="mt-4 text-sm">
              <span v-if="p.contact.name" class="block font-medium">{{ p.contact.name }}</span>
              <span v-if="p.contact.title" class="block text-ink-muted">{{ p.contact.title }}</span>
              <a v-if="p.contact.email" :href="`mailto:${p.contact.email}`" class="text-navy">{{ p.contact.email }}</a>
              <span v-if="p.contact.phone" class="block">{{ p.contact.phone }}</span>
            </p>
          </li>
        </ul>

        <h2 v-reveal class="mt-14 text-2xl">Programmes fédéraux</h2>
        <ul class="mt-6 grid gap-4 lg:grid-cols-3">
          <li v-for="(p, i) in tariffPrograms.federal" :key="p.title" v-reveal="{ delay: i * 80 }" class="rounded-xl bg-paper p-5">
            <p class="text-xs font-semibold uppercase tracking-wide text-navy">{{ p.tag }}</p>
            <h3 class="mt-2 font-semibold">{{ p.title }}</h3>
            <ul class="mt-3 list-disc space-y-1 pl-4 text-sm text-ink-muted">
              <li v-for="pt in p.points" :key="pt">{{ pt }}</li>
            </ul>
            <p v-if="p.contact" class="mt-4 text-sm">
              <span v-if="p.contact.name" class="block font-medium">{{ p.contact.name }}</span>
              <span v-if="p.contact.title" class="block text-ink-muted">{{ p.contact.title }}</span>
              <a v-if="p.contact.email" :href="`mailto:${p.contact.email}`" class="text-navy">{{ p.contact.email }}</a>
              <span v-if="p.contact.phone" class="block">{{ p.contact.phone }}</span>
            </p>
            <a v-if="p.href" :href="p.href" class="mt-3 inline-block text-sm font-semibold text-navy" target="_blank" rel="noopener noreferrer">Consulter {{ p.title }} →</a>
          </li>
        </ul>

        <h2 v-reveal class="mt-14 text-2xl">Autres ressources fédérales</h2>
        <ul class="mt-6 space-y-4">
          <li v-for="(p, i) in tariffPrograms.other" :key="p.title" v-reveal="{ delay: i * 80 }" class="rounded-xl ring-1 ring-line p-5">
            <h3 class="font-semibold">{{ p.title }}</h3>
            <p class="mt-1 text-sm text-ink-muted">{{ p.text }}</p>
            <a :href="p.href" class="mt-2 inline-block text-sm font-semibold text-navy" target="_blank" rel="noopener noreferrer">Consulter {{ p.title }} →</a>
          </li>
        </ul>
        <p v-reveal class="mt-8 text-sm text-ink-muted">
          Outil fédéral pour identifier les programmes :
          <a href="https://innovation.ised-isde.canada.ca/s/?language=fr_CA" class="text-navy" target="_blank" rel="noopener">Rechercher une aide aux entreprises</a>.
        </p>
      </div>
    </section>
  </div>
</template>
