<script setup lang="ts">
const content = useSiteContent()
const formationsPage = computed(() => content.value.formationsPage)
const memberLogos = computed(() => content.value.memberLogos)

usePageSeo({ title: 'Formations', description: formationsPage.value.hero.lead })
</script>

<template>
  <div>
    <PageHero
      compact
      :kicker="formationsPage.hero.kicker"
      :title="formationsPage.hero.title"
      :lead="formationsPage.hero.lead"
      :image="formationsPage.hero.image"
      :image-alt="formationsPage.hero.imageAlt"
      :ctas="[{ label: 'Voir le calendrier des formations', to: '/calendrier', variant: 'primary' }]"
    />
    <section class="bg-white">
      <div class="shell py-16">
        <p v-reveal class="max-w-narrow text-[1.05rem] leading-relaxed text-ink-muted">{{ formationsPage.body }}</p>
        <div v-reveal class="mt-8 rounded-xl bg-navy-50 px-6 py-5 text-navy">
          <p class="font-semibold">Tarif préférentiel membres</p>
          <p class="mt-1">{{ formationsPage.discount }}</p>
        </div>
        <h2 v-reveal class="mt-14 text-2xl">Pourquoi choisir la MRI pour vos formations ?</h2>
        <ul class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="(r, i) in formationsPage.reasons" :key="r.title" v-reveal="{ delay: i * 80 }" class="rounded-xl bg-paper p-6">
            <h3 class="font-semibold">{{ r.title }}</h3>
            <p class="mt-2 text-sm text-ink-muted">{{ r.text }}</p>
          </li>
        </ul>
      </div>
    </section>
    <LogoGrid title="Ils ont suivi des formations avec la MRI" :logos="memberLogos.slice(0, 16)" />
    <CtaBand
      title="Vous aimeriez obtenir plus de détails avant de vous inscrire ?"
      text="Vous souhaiteriez nous suggérer une formation ?"
      cta-label="Contactez-nous"
      to="/contact"
    />
  </div>
</template>
