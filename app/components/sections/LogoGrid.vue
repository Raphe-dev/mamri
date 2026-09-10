<script setup lang="ts">
import type { MemberLogo } from '~/types/content'

withDefaults(
  defineProps<{
    logos: MemberLogo[]
    title?: string
    tone?: 'light' | 'dark'
  }>(),
  { tone: 'light' }
)
</script>

<template>
  <section v-reveal :class="tone === 'dark' ? 'bg-navy text-white' : 'bg-white'">
    <div class="py-14 lg:py-16">
      <div v-if="title" class="shell">
        <h2 class="text-2xl sm:text-3xl" :class="tone === 'dark' ? 'text-white' : ''">
          {{ title }}
        </h2>
      </div>

      <div
        class="mt-8 overflow-x-hidden py-2"
        role="region"
        aria-label="Logos des membres"
      >
        <div class="flex w-max animate-marquee py-0.5 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
          <div
            v-for="copy in 2"
            :key="copy"
            class="flex gap-4 pr-4"
            :aria-hidden="copy === 2"
          >
            <a
              v-for="logo in logos"
              :key="`${copy}-${logo.name}`"
              :href="logo.href"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-24 w-40 shrink-0 items-center justify-center rounded-lg bg-white px-4 ring-1 ring-line sm:h-28 sm:w-44"
              :title="logo.name"
              :tabindex="copy === 2 ? -1 : 0"
            >
              <SiteImg :src="logo.src" :alt="copy === 2 ? '' : logo.name" :width="160" :height="48" class="max-h-12 max-w-full object-contain" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
