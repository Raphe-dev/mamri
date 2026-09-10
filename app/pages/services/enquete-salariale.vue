<script setup lang="ts">
const content = useSiteContent()
const enquetePage = computed(() => content.value.enquetePage)
const config = useRuntimeConfig()
const zohoEnquete = computed(() => content.value.zohoEnquete || config.public.zohoEnquete)
usePageSeo({ title: 'Enquête salariale 2026', description: enquetePage.value.hero.lead })
</script>

<template>
  <div>
    <PageHero
      compact
      :kicker="enquetePage.hero.kicker"
      :title="enquetePage.hero.title"
      :lead="enquetePage.hero.lead"
      :image="enquetePage.hero.image"
      :image-alt="enquetePage.hero.imageAlt"
      :ctas="[{ label: `Participez avant le ${enquetePage.deadline}`, to: zohoEnquete, external: true, variant: 'primary' }]"
    />
    <section class="bg-white">
      <div class="shell py-16">
        <p v-reveal class="max-w-narrow text-[1.05rem] leading-relaxed text-ink-muted">{{ enquetePage.intro }}</p>
        <h2 v-reveal class="mt-12 text-2xl">Pourquoi participer ?</h2>
        <ol class="mt-6 max-w-narrow space-y-3">
          <li v-for="(w, i) in enquetePage.why" :key="i" v-reveal="{ delay: i * 50 }" class="flex gap-3">
            <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">{{ i + 1 }}</span>
            <span>{{ w }}</span>
          </li>
        </ol>
        <h2 v-reveal class="mt-14 text-2xl">Contenu de l’enquête</h2>
        <ul v-reveal class="mt-6 max-w-narrow list-disc space-y-2 pl-5 text-ink-muted">
          <li v-for="c in enquetePage.contents" :key="c">{{ c }}</li>
        </ul>
        <h2 v-reveal class="mt-14 text-2xl">Grille de prix 2026</h2>
        <div v-reveal class="mt-6 overflow-x-auto">
          <table class="min-w-full overflow-hidden rounded-xl text-left text-sm ring-1 ring-line">
            <thead class="bg-navy text-white">
              <tr>
                <th class="px-4 py-3 font-semibold"></th>
                <th class="px-4 py-3 font-semibold">Enquête salariale</th>
                <th class="px-4 py-3 font-semibold">Formation</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in enquetePage.prices" :key="row.label" :class="i % 2 ? 'bg-paper' : 'bg-white'">
                <th class="px-4 py-3 font-medium text-ink">{{ row.label }}</th>
                <td class="px-4 py-3 font-semibold text-navy">{{ row.survey }}</td>
                <td class="px-4 py-3 font-semibold text-navy">{{ row.training }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <a
          v-reveal
          :href="zohoEnquete"
          class="mt-8 inline-flex rounded-md bg-navy px-5 py-2.5 font-semibold text-white hover:bg-navy-700"
        >
          Participer à l’enquête salariale 2026
        </a>
      </div>
    </section>
  </div>
</template>
