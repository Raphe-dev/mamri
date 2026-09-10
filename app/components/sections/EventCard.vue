<script setup lang="ts">
import type { EventItem } from '~/types/content'
import { eventTypeLabels } from '~/data/events'

defineProps<{ event: EventItem }>()
</script>

<template>
  <article v-reveal class="overflow-hidden rounded-2xl bg-white font-roboto shadow-sm ring-1 ring-line">
    <div class="h-1.5 bg-navy" />
    <div class="px-6 py-6 sm:px-8 sm:py-7">
      <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span class="rounded-full bg-navy-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-navy">
          {{ eventTypeLabels[event.type] }}
        </span>
        <p class="text-[0.95rem] font-semibold text-navy">
          {{ event.startLabel }}
          <span class="font-normal text-navy/40">|</span>
          {{ event.timeLabel }}
        </p>
      </div>

      <h3 class="mt-4 text-2xl font-bold leading-snug text-navy sm:text-[1.7rem]">
        <a :href="event.href" class="hover:underline" target="_blank" rel="noopener">
          {{ event.title }}
        </a>
      </h3>

      <p class="mt-3 max-w-3xl text-[1.05rem] leading-relaxed text-ink">
        {{ event.excerpt }}
      </p>

      <div v-if="event.tags.length" class="mt-5 flex flex-wrap gap-2">
        <span
          v-for="t in event.tags"
          :key="t"
          class="rounded-full bg-paper px-3 py-1 text-sm text-ink-muted ring-1 ring-line"
        >
          {{ t }}
        </span>
      </div>

      <div class="mt-6 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-[0.95rem] text-ink">
          <template v-if="event.priceNote">
            {{ event.priceNote }}
          </template>
          <template v-else>
            <template v-if="event.memberPrice">
              <span class="font-semibold">Membre :</span> {{ event.memberPrice }}
            </template>
            <template v-if="event.memberPrice && event.nonMemberPrice">
              <span class="mx-1.5 text-ink-muted">·</span>
            </template>
            <template v-if="event.nonMemberPrice">
              <span class="font-semibold">Non-membre :</span> {{ event.nonMemberPrice }}
            </template>
          </template>
        </p>
        <a
          :href="event.href"
          target="_blank"
          rel="noopener"
          class="inline-flex shrink-0 items-center gap-2 rounded-full bg-steel px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-steel-600"
        >
          Voir les détails
          <span class="sr-only"> de {{ event.title }}</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </article>
</template>
