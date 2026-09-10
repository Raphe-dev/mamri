<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    text?: string
    ctaLabel: string
    to: string
    tone?: 'navy' | 'paper'
    image?: string
    imageAlt?: string
  }>(),
  { tone: 'navy' }
)

const isExternal = computed(() => /^(https?:|mailto:|tel:|#)/.test(props.to))
</script>

<template>
  <section
    v-reveal
    class="relative isolate overflow-hidden"
    :class="image ? 'text-white' : tone === 'navy' ? 'bg-navy text-white' : 'bg-paper'"
  >
    <template v-if="image">
      <SiteImg :src="image" :alt="imageAlt || ''" class="absolute inset-0 h-full w-full object-cover" />
      <div class="absolute inset-0 bg-navy-900/78" />
      <div class="grain absolute inset-0" />
    </template>
    <div class="shell relative flex flex-col items-start justify-between gap-6 py-14 sm:flex-row sm:items-center lg:py-16">
      <div class="max-w-2xl">
        <h2 class="text-2xl sm:text-3xl" :class="image || tone === 'navy' ? 'text-white' : ''">
          {{ title }}
        </h2>
        <p v-if="text" class="mt-3 text-[1.05rem] leading-relaxed" :class="image || tone === 'navy' ? 'text-white/80' : 'text-ink-muted'">
          {{ text }}
        </p>
      </div>
      <UiButton
        :to="isExternal ? undefined : to"
        :href="isExternal ? to : undefined"
        :variant="image || tone === 'navy' ? 'invert' : 'primary'"
      >
        {{ ctaLabel }}
      </UiButton>
    </div>
  </section>
</template>
