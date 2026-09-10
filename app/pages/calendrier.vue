<script setup lang="ts">
import type { EventType } from '~/types/content'

const content = useSiteContent()
const events = computed(() => content.value.events)

const typeFilter = ref<'tous' | EventType>('tous')
const monthFilter = ref<number | 'tous'>('tous')
const yearFilter = ref<number | 'tous'>('tous')

const years = computed(() => [...new Set(events.value.map(e => e.year))].sort())
const months = [
  { n: 1, l: 'Janvier' }, { n: 2, l: 'Février' }, { n: 3, l: 'Mars' }, { n: 4, l: 'Avril' },
  { n: 5, l: 'Mai' }, { n: 6, l: 'Juin' }, { n: 7, l: 'Juillet' }, { n: 8, l: 'Août' },
  { n: 9, l: 'Septembre' }, { n: 10, l: 'Octobre' }, { n: 11, l: 'Novembre' }, { n: 12, l: 'Décembre' }
]

const typeOptions: { value: 'tous' | EventType, label: string }[] = [
  { value: 'tous', label: 'Tous les types' },
  { value: 'formation', label: 'Formation' },
  { value: 'evenement', label: 'Événement' },
  { value: 'visite', label: 'Visite industrielle' },
  { value: 'webinaire', label: 'Webinaire' }
]

const filtered = computed(() =>
  events.value.filter((e) => {
    if (typeFilter.value !== 'tous' && e.type !== typeFilter.value) return false
    if (monthFilter.value !== 'tous' && e.month !== monthFilter.value) return false
    if (yearFilter.value !== 'tous' && e.year !== yearFilter.value) return false
    return true
  })
)

usePageSeo({
  title: 'Calendrier des activités',
  description: 'Formations, événements, visites industrielles et webinaires de la Maison régionale de l’industrie.'
})
</script>

<template>
  <div>
    <section class="bg-white">
      <div class="shell py-12 lg:py-16">
        <p class="kicker">Calendrier</p>
        <h1 class="mt-3 font-sans text-4xl font-bold tracking-tight sm:text-5xl">
          Calendrier des activités
        </h1>
        <p class="mt-4 max-w-narrow text-lg leading-relaxed text-ink-muted">
          Formations, événements, visites industrielles et webinaires. L’inscription se fait via la fiche de chaque activité.
        </p>

        <h2 class="mt-10 text-sm uppercase tracking-[0.14em] text-ink-muted">Filtrer les activités</h2>
        <div class="mt-4 flex flex-wrap gap-2">
          <button
            v-for="opt in typeOptions"
            :key="opt.value"
            type="button"
            class="rounded-full px-3.5 py-1.5 text-sm font-semibold transition"
            :class="typeFilter === opt.value
              ? 'bg-navy text-white'
              : 'bg-paper text-navy ring-1 ring-navy/15 hover:bg-navy-50'"
            @click="typeFilter = opt.value"
          >
            {{ opt.label }}
          </button>
        </div>
        <div class="mt-4 flex flex-wrap gap-3">
          <label class="text-sm">
            <span class="sr-only">Mois</span>
            <select v-model="monthFilter" class="rounded-full border-0 bg-paper py-2 pl-3 pr-8 ring-1 ring-inset ring-line">
              <option value="tous">Tous les mois</option>
              <option v-for="m in months" :key="m.n" :value="m.n">{{ m.l }}</option>
            </select>
          </label>
          <label class="text-sm">
            <span class="sr-only">Année</span>
            <select v-model="yearFilter" class="rounded-full border-0 bg-paper py-2 pl-3 pr-8 ring-1 ring-inset ring-line">
              <option value="tous">Toutes les années</option>
              <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
            </select>
          </label>
        </div>
      </div>
    </section>

    <section class="bg-paper">
      <div class="shell py-12 lg:py-16">
        <h2 v-reveal class="text-2xl">Activités à venir</h2>
        <p v-if="!filtered.length" class="mt-10 text-ink-muted">Aucune activité ne correspond aux filtres sélectionnés.</p>

        <ul class="mt-8 grid gap-6">
          <li v-for="e in filtered" :key="e.slug">
            <EventCard :event="e" />
          </li>
        </ul>
      </div>
    </section>
    <CtaBand title="Tout savoir sur nos services" cta-label="Nos services" to="/services" />
  </div>
</template>
