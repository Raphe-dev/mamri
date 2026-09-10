<script setup lang="ts">
const content = useSiteContent()
const tetPage = computed(() => content.value.tetPage)

usePageSeo({ title: 'Mobilisation régionale TET', description: tetPage.value.hero.lead })
</script>

<template>
  <div>
    <PageHero
      compact
      :kicker="tetPage.hero.kicker"
      :title="tetPage.hero.title"
      :lead="tetPage.hero.lead"
      :image="tetPage.hero.image"
      :image-alt="tetPage.hero.imageAlt"
    />
    <section class="bg-white">
      <div class="shell py-16">
        <h2 v-reveal class="text-2xl">Objectifs</h2>
        <ol class="mt-6 max-w-narrow space-y-3">
          <li v-for="(o, i) in tetPage.objectives" :key="i" v-reveal="{ delay: i * 60 }" class="flex gap-3">
            <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">{{ i + 1 }}</span>
            <span>{{ o }}</span>
          </li>
        </ol>
        <h2 v-reveal class="mt-14 text-2xl">Actions réalisées</h2>
        <ol class="mt-8 space-y-0">
          <li v-for="(a, i) in tetPage.actions" :key="a.date" v-reveal="{ delay: Math.min(i * 40, 280) }" class="grid gap-2 border-l-2 border-navy/20 py-4 pl-6 sm:grid-cols-[11rem_1fr]">
            <span class="font-semibold text-navy">{{ a.date }}</span>
            <span class="text-ink">{{ a.text }}</span>
          </li>
        </ol>
        <p v-reveal class="mt-10 max-w-narrow text-ink-muted leading-relaxed">{{ tetPage.next }}</p>
        <div v-reveal class="mt-8 flex flex-wrap gap-3">
          <a :href="tetPage.survey" class="rounded-md bg-navy px-5 py-2.5 font-semibold text-white" target="_blank" rel="noopener">Participer à l’enquête</a>
          <a :href="tetPage.report" class="rounded-md px-5 py-2.5 font-semibold text-navy ring-1 ring-navy/20" target="_blank" rel="noopener">Lire le rapport</a>
          <a :href="tetPage.letter" class="rounded-md px-5 py-2.5 font-semibold text-navy ring-1 ring-navy/20" target="_blank" rel="noopener">Gabarit de lettre</a>
        </div>
        <p class="mt-8 text-sm text-ink-muted">
          Des questions ? Contactez Vincent Camiré :
          <a href="mailto:vcamire@mamri.ca" class="text-navy">vcamire@mamri.ca</a>
        </p>
      </div>
    </section>
  </div>
</template>
