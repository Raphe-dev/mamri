<script setup lang="ts">
import type { Cta } from '~/types/content'

const props = withDefaults(
  defineProps<{
    kicker?: string
    title: string
    lead?: string
    image?: string
    imageAlt?: string
    ctas?: Cta[]
    compact?: boolean
    cinematic?: boolean
  }>(),
  { compact: false, cinematic: false }
)

const bleed = computed(() => Boolean(props.image && !props.compact && !props.cinematic))

function isOffsite(cta: Cta) {
  return Boolean(cta.external || /^(https?:|mailto:|tel:|#)/.test(cta.to))
}

useHead(() => {
  if (!props.image) return {}
  return {
    link: [
      {
        rel: 'preload',
        as: 'image',
        href: props.image,
        fetchpriority: 'high',
        key: 'lcp-image'
      }
    ]
  }
})
</script>

<template>
  <header
    class="relative isolate overflow-hidden bg-navy text-white"
    :class="cinematic ? 'min-h-[28rem] sm:min-h-[36rem] lg:min-h-[44rem]' : ''"
  >
    <template v-if="cinematic && image">
      <div class="absolute inset-0 overflow-hidden">
        <SiteImg
          :src="image"
          :alt="imageAlt || ''"
          eager
          priority
          :width="1600"
          :height="900"
          class="h-full w-full origin-center object-cover object-center animate-kenburns"
        />
      </div>
      <div class="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/55 to-navy-900/15" />
      <div class="absolute inset-0 bg-gradient-to-t from-navy-900/50 via-transparent to-navy-900/15" />
      <div class="grain absolute inset-0" />
    </template>

    <div
      class="shell relative z-10"
      :class="cinematic
        ? 'flex min-h-[28rem] flex-col justify-center py-16 sm:min-h-[36rem] lg:min-h-[44rem] lg:justify-end lg:pb-32 lg:pt-20'
        : bleed
          ? 'grid items-center gap-10 py-12 lg:grid-cols-12 lg:gap-0 lg:py-0'
          : image
            ? 'grid items-center gap-8 py-12 lg:grid-cols-12 lg:py-14'
            : compact ? 'py-14 lg:py-16' : 'py-16 lg:py-24'"
    >
      <div
        :class="cinematic
          ? 'max-w-3xl [text-shadow:0_2px_24px_rgba(8,26,40,0.45)]'
          : image
            ? (bleed ? 'lg:col-span-5 lg:py-16 xl:py-20' : 'lg:col-span-6')
            : 'max-w-3xl'"
      >
        <p
          v-if="kicker"
          class="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/80 sm:text-base"
        >
          <span class="hidden h-px w-8 bg-white/50 sm:block" aria-hidden="true" />
          {{ kicker }}
        </p>
        <h1
          class="mt-4 font-sans font-bold leading-[1.12] tracking-tight"
          :class="cinematic
            ? 'text-4xl sm:text-5xl lg:text-[3.35rem]'
            : bleed
              ? 'text-3xl sm:text-4xl lg:text-[2.65rem]'
              : 'text-3xl sm:text-4xl lg:text-[2.5rem]'"
        >
          {{ title }}
        </h1>
        <p v-if="lead" class="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
          {{ lead }}
        </p>
        <div v-if="ctas?.length" class="mt-8 flex flex-wrap gap-3">
          <UiButton
            v-for="cta in ctas"
            :key="cta.label"
            :to="isOffsite(cta) ? undefined : cta.to"
            :href="isOffsite(cta) ? cta.to : undefined"
            :variant="cta.variant === 'primary' ? 'invert' : 'ghost'"
            :class="cta.variant === 'ghost' || cta.variant === 'secondary' ? 'bg-white/10 text-white ring-white/40 hover:bg-white/20' : ''"
          >
            {{ cta.label }}
          </UiButton>
        </div>
      </div>

      <div
        v-if="image && !cinematic"
        class="relative"
        :class="bleed ? 'lg:col-span-7 lg:self-stretch' : 'lg:col-span-6'"
      >
        <div
          class="overflow-hidden rounded-xl ring-1 ring-white/10"
          :class="bleed
            ? 'aspect-[4/3] sm:aspect-[16/10] lg:absolute lg:inset-y-0 lg:left-8 lg:right-[calc(-1*(100vw-100%)/2)] lg:rounded-none lg:ring-0 lg:aspect-auto lg:min-h-[32rem] xl:min-h-[38rem]'
            : 'aspect-[16/10]'"
        >
          <SiteImg
            :src="image"
            :alt="imageAlt || ''"
            priority
            :width="1200"
            :height="750"
            class="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </div>

  </header>
</template>
