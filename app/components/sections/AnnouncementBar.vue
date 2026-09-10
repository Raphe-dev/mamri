<script setup lang="ts">
defineProps<{
  label: string
  text: string
  to: string
}>()
</script>

<template>
  <div class="bg-navy-800 text-white">
    <NuxtLink :to="to" class="shell flex items-center justify-between gap-4 py-2.5 text-sm transition hover:bg-navy-900/40">
      <p class="flex min-w-0 items-center gap-3">
        <span class="shrink-0 rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em]">{{ label }}</span>
        <span class="truncate text-white/85">{{ text }}</span>
      </p>
      <span class="hidden shrink-0 font-semibold sm:inline">En savoir plus →</span>
    </NuxtLink>
  </div>
</template>
