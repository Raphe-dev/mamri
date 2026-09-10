<script setup lang="ts">
const sent = ref(false)

async function onSubmit(e: Event) {
  const form = e.target as HTMLFormElement
  const data = new FormData(form)
  const body = new URLSearchParams()
  for (const [k, v] of data.entries()) body.append(k, String(v))
  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString()
    })
  } catch { /* netlify forms */ }
  sent.value = true
  form.reset()
}

usePageSeo({
  title: 'Bulletin de l’industrie',
  description: 'Recevez chaque mois nos nouvelles, nos événements à venir et des occasions de formation exclusives.'
})
</script>

<template>
  <div>
    <PageHero
      kicker="Bulletin"
      title="Abonnement au Bulletin de l’industrie"
      lead="Restez connecté à l’industrie manufacturière estrienne. Recevez chaque mois nos nouvelles, nos événements à venir et des occasions de formation exclusives, directement dans votre boîte courriel."
    />
    <section class="bg-white">
      <div v-reveal class="shell max-w-xl py-16">
        <p v-if="sent" class="rounded-md bg-navy-50 px-4 py-3 text-navy">
          Merci. Votre inscription au Bulletin de l’industrie a bien été reçue.
        </p>
        <form
          v-else
          name="bulletin"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          class="space-y-4 rounded-xl bg-paper p-6 ring-1 ring-line sm:p-8"
          @submit.prevent="onSubmit"
        >
          <input type="hidden" name="form-name" value="bulletin" />
          <p class="hidden"><label>Ne pas remplir <input name="bot-field" /></label></p>
          <label class="block text-sm font-medium">Prénom *
            <input required name="prenom" class="mt-1 w-full rounded-md border-0 px-3 py-2.5 ring-1 ring-inset ring-line focus:ring-2 focus:ring-navy" />
          </label>
          <label class="block text-sm font-medium">Nom *
            <input required name="nom" class="mt-1 w-full rounded-md border-0 px-3 py-2.5 ring-1 ring-inset ring-line focus:ring-2 focus:ring-navy" />
          </label>
          <label class="block text-sm font-medium">Fonction *
            <input required name="fonction" class="mt-1 w-full rounded-md border-0 px-3 py-2.5 ring-1 ring-inset ring-line focus:ring-2 focus:ring-navy" />
          </label>
          <label class="block text-sm font-medium">Nom de l’entreprise *
            <input required name="entreprise" class="mt-1 w-full rounded-md border-0 px-3 py-2.5 ring-1 ring-inset ring-line focus:ring-2 focus:ring-navy" />
          </label>
          <label class="block text-sm font-medium">Courriel *
            <input required name="courriel" type="email" class="mt-1 w-full rounded-md border-0 px-3 py-2.5 ring-1 ring-inset ring-line focus:ring-2 focus:ring-navy" />
          </label>
          <p class="text-xs text-ink-muted">
            En vous inscrivant, vous acceptez les
            <NuxtLink to="/conditions-dutilisation" class="underline">conditions d’utilisation</NuxtLink>.
          </p>
          <button type="submit" class="rounded-md bg-navy px-5 py-2.5 font-semibold text-white hover:bg-navy-700">
            S’abonner
          </button>
        </form>
      </div>
    </section>
  </div>
</template>
