<script setup lang="ts">
const content = useSiteContent()
const membershipPage = computed(() => content.value.membershipPage)
const memberLogos = computed(() => content.value.memberLogos)
const site = computed(() => content.value.site)

usePageSeo({ title: 'Devenir membre', description: membershipPage.value.hero.lead })
</script>

<template>
  <div>
    <PageHero
      :kicker="membershipPage.hero.kicker"
      :title="membershipPage.hero.title"
      :lead="membershipPage.hero.lead"
      :image="membershipPage.hero.image"
      :ctas="[{ label: 'Remplir le formulaire', to: '#formulaire', variant: 'primary' }]"
    />
    <section class="bg-white">
      <div v-reveal class="shell py-16">
        <ul class="max-w-narrow space-y-2">
          <li v-for="b in membershipPage.bullets" :key="b" class="flex gap-3">
            <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-navy" />
            <span>{{ b }}</span>
          </li>
        </ul>
        <p class="mt-8 max-w-narrow text-ink-muted leading-relaxed">{{ membershipPage.intro }}</p>
        <h2 class="mt-14 text-2xl">Des avantages concrets, utilisables dès votre adhésion</h2>
        <div class="mt-6 overflow-x-auto">
          <table class="min-w-full text-left text-sm ring-1 ring-line">
            <thead class="bg-navy text-white">
              <tr>
                <th class="px-4 py-3">Avantages membres</th>
                <th class="px-4 py-3">Impacts concrets pour votre entreprise</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in membershipPage.benefits" :key="row.name" :class="i % 2 ? 'bg-paper' : 'bg-white'">
                <th class="px-4 py-3 align-top font-semibold">{{ row.name }}</th>
                <td class="px-4 py-3 text-ink-muted">{{ row.impact }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <section class="bg-paper">
      <div class="shell py-16">
        <h2 v-reveal class="text-2xl">Des retours mesurables</h2>
        <p v-reveal class="mt-3 max-w-narrow text-ink-muted">{{ membershipPage.dues }}</p>
        <ul class="mt-8 grid gap-4 lg:grid-cols-2">
          <li v-for="(r, i) in membershipPage.roi" :key="r.name" v-reveal="{ delay: i * 70 }" class="rounded-xl bg-white p-5 ring-1 ring-line">
            <h3 class="font-semibold">{{ r.name }}</h3>
            <p class="mt-2 text-sm text-ink-muted">{{ r.text }}</p>
          </li>
        </ul>
      </div>
    </section>
    <LogoGrid title="Des manufacturiers de l’Estrie déjà impliqués" :logos="memberLogos" />
    <section class="bg-white">
      <div class="shell py-16">
        <h2 v-reveal class="text-2xl">Deux types d’adhésion</h2>
        <div class="mt-8 grid gap-6 lg:grid-cols-2">
          <article v-for="(t, i) in membershipPage.types" :key="t.title" v-reveal="{ delay: i * 90 }" class="rounded-xl bg-paper p-6">
            <h3 class="text-lg font-semibold">{{ t.title }}</h3>
            <p class="mt-3 text-sm"><span class="font-medium">Pour qui — </span>{{ t.who }}</p>
            <p class="mt-2 text-sm"><span class="font-medium">Accès — </span>{{ t.access }}</p>
            <p class="mt-2 text-sm text-ink-muted">{{ t.note }}</p>
          </article>
        </div>
      </div>
    </section>
    <section id="formulaire" class="bg-paper">
      <div class="shell grid gap-10 py-16 lg:grid-cols-12">
        <div v-reveal class="lg:col-span-4">
          <h2 class="text-2xl">Remplir le formulaire d’adhésion</h2>
          <p class="mt-4 text-ink-muted">
            Transmettez vos informations directement à l’équipe de la MRI. Nous pourrons ensuite confirmer les prochaines étapes selon votre type d’adhésion.
          </p>
          <a :href="`mailto:${site.email.general}?subject=Question%20sur%20l%27adhésion%20à%20la%20MRI`" class="mt-4 inline-block font-semibold text-navy">
            Parler à notre équipe
          </a>
        </div>
        <div v-reveal class="lg:col-span-8">
          <MembershipForm />
        </div>
      </div>
    </section>
  </div>
</template>
