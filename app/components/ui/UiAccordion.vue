<script setup lang="ts">
import type { FaqItem } from '~/types/content'

defineProps<{ items: FaqItem[] }>()
</script>

<template>
  <div class="divide-y divide-line border-y border-line">
    <details v-for="(item, i) in items" :key="item.question" v-reveal="{ delay: i * 50 }" class="group py-4">
      <summary class="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-ink marker:content-none">
        <span>{{ item.question }}</span>
        <span class="mt-0.5 text-navy transition group-open:rotate-45">+</span>
      </summary>
      <p class="mt-3 max-w-narrow text-ink-muted leading-relaxed">
        {{ item.answer }}
      </p>
    </details>
  </div>
</template>
