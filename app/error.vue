<script setup lang="ts">
defineProps<{ error: { statusCode?: number; message?: string } }>()

useSeoMeta({
  title: 'Page introuvable',
  description: 'La page demandée n’existe pas ou a été déplacée.',
  robots: 'noindex, nofollow'
})
</script>

<template>
  <NuxtLayout>
    <div v-reveal class="shell py-24 text-center">
      <p class="kicker">Erreur {{ error.statusCode || 404 }}</p>
      <h1 class="mt-3 font-sans text-4xl font-bold">Page introuvable</h1>
      <p class="mt-4 text-ink-muted">La page demandée n’existe pas ou a été déplacée.</p>
      <UiButton to="/" class="mt-8">Retour à l’accueil</UiButton>
    </div>
  </NuxtLayout>
</template>
