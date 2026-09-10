<script setup lang="ts">
import type { EventItem } from '~/types/content'
import { eventTypeLabels } from '~/data/events'

defineProps<{ event: EventItem }>()
</script>

<template>
  <a
    :href="event.href"
    target="_blank"
    rel="noopener"
    class="group flex h-full flex-col rounded-xl bg-white p-6 ring-1 ring-line transition hover:-translate-y-0.5 hover:shadow-lift"
  >
    <p class="kicker">{{ eventTypeLabels[event.type] }}</p>
    <p class="mt-3 text-sm font-semibold text-navy">
      {{ event.startLabel }}
      <span class="font-normal text-navy/35">·</span>
      {{ event.timeLabel }}
    </p>
    <h3 class="mt-2 font-sans text-lg font-semibold leading-snug text-ink group-hover:text-navy">
      {{ event.title }}
    </h3>
    <p class="mt-2 flex-1 text-sm leading-relaxed text-ink-muted line-clamp-3">
      {{ event.excerpt }}
    </p>
    <span class="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-navy">
      Voir les détails
      <span aria-hidden="true" class="transition group-hover:translate-x-0.5">→</span>
    </span>
  </a>
</template>
