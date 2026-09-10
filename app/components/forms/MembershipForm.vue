<script setup lang="ts">
const sent = ref(false)
const sending = ref(false)

async function onSubmit(e: Event) {
  const form = e.target as HTMLFormElement
  sending.value = true
  try {
    const data = new FormData(form)
    const body = new URLSearchParams()
    for (const [k, v] of data.entries()) body.append(k, String(v))
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString()
    })
    sent.value = true
    form.reset()
  } catch {
    sent.value = true
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <form
    name="adhesion"
    method="POST"
    data-netlify="true"
    netlify-honeypot="bot-field"
    class="rounded-xl bg-white p-6 shadow-lift ring-1 ring-line sm:p-8"
    v-reveal
    @submit.prevent="onSubmit"
  >
    <input type="hidden" name="form-name" value="adhesion" />
    <p class="hidden">
      <label>Ne pas remplir <input name="bot-field" /></label>
    </p>

    <p v-if="sent" class="rounded-md bg-navy-50 px-4 py-3 text-navy">
      Merci. Votre demande d’adhésion a bien été transmise. L’équipe de la MRI communiquera avec vous.
    </p>

    <fieldset class="space-y-4">
      <legend class="text-xl font-bold text-heading">Entreprise</legend>
      <label class="block text-sm font-medium">
        Nom de l’entreprise *
        <input required name="entreprise" class="mt-1 w-full rounded-md border-0 px-3 py-2.5 ring-1 ring-inset ring-line focus:ring-2 focus:ring-navy" />
      </label>
      <label class="block text-sm font-medium">
        Adresse de l’entreprise *
        <input required name="adresse" class="mt-1 w-full rounded-md border-0 px-3 py-2.5 ring-1 ring-inset ring-line focus:ring-2 focus:ring-navy" />
      </label>
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="block text-sm font-medium">
          Ville
          <input name="ville" class="mt-1 w-full rounded-md border-0 px-3 py-2.5 ring-1 ring-inset ring-line focus:ring-2 focus:ring-navy" />
        </label>
        <label class="block text-sm font-medium">
          Code postal
          <input name="code_postal" class="mt-1 w-full rounded-md border-0 px-3 py-2.5 ring-1 ring-inset ring-line focus:ring-2 focus:ring-navy" />
        </label>
      </div>
      <label class="block text-sm font-medium">
        Site Web de l’entreprise
        <input name="site_web" type="url" class="mt-1 w-full rounded-md border-0 px-3 py-2.5 ring-1 ring-inset ring-line focus:ring-2 focus:ring-navy" />
      </label>
      <label class="block text-sm font-medium">
        Nombre d’employés dans l’entreprise
        <input name="employes" class="mt-1 w-full rounded-md border-0 px-3 py-2.5 ring-1 ring-inset ring-line focus:ring-2 focus:ring-navy" />
      </label>
    </fieldset>

    <fieldset class="mt-8 space-y-4">
      <legend class="text-xl font-bold text-heading">Contact principal</legend>
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="block text-sm font-medium">
          Prénom *
          <input required name="prenom" class="mt-1 w-full rounded-md border-0 px-3 py-2.5 ring-1 ring-inset ring-line focus:ring-2 focus:ring-navy" />
        </label>
        <label class="block text-sm font-medium">
          Nom de famille *
          <input required name="nom" class="mt-1 w-full rounded-md border-0 px-3 py-2.5 ring-1 ring-inset ring-line focus:ring-2 focus:ring-navy" />
        </label>
      </div>
      <label class="block text-sm font-medium">
        Titre ou poste occupé *
        <input required name="titre" class="mt-1 w-full rounded-md border-0 px-3 py-2.5 ring-1 ring-inset ring-line focus:ring-2 focus:ring-navy" />
      </label>
      <label class="block text-sm font-medium">
        Adresse courriel du contact *
        <input required name="courriel" type="email" class="mt-1 w-full rounded-md border-0 px-3 py-2.5 ring-1 ring-inset ring-line focus:ring-2 focus:ring-navy" />
      </label>
      <label class="block text-sm font-medium">
        Numéro de téléphone du contact *
        <input required name="telephone" type="tel" class="mt-1 w-full rounded-md border-0 px-3 py-2.5 ring-1 ring-inset ring-line focus:ring-2 focus:ring-navy" />
      </label>
      <label class="block text-sm font-medium">
        Courriel marketing (pour obtenir le logo)
        <input name="courriel_marketing" type="email" class="mt-1 w-full rounded-md border-0 px-3 py-2.5 ring-1 ring-inset ring-line focus:ring-2 focus:ring-navy" />
      </label>
    </fieldset>

    <button
      type="submit"
      class="mt-8 inline-flex items-center rounded-md bg-navy px-5 py-2.5 font-semibold text-white hover:bg-navy-700 disabled:opacity-60"
      :disabled="sending"
    >
      {{ sending ? 'Envoi…' : 'Envoyer ma demande d’adhésion' }}
    </button>
    <p class="mt-3 text-sm text-ink-muted">Les champs marqués d’un astérisque sont obligatoires.</p>
  </form>
</template>
