<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    text?: string
    kicker?: string
    ctaLabel: string
    to: string
    tone?: 'navy' | 'paper'
    image?: string
    imageAlt?: string
  }>(),
  { tone: 'navy' }
)

const isExternal = computed(() => /^(https?:|mailto:|tel:|#)/.test(props.to))
const dark = computed(() => Boolean(props.image) || props.tone === 'navy')
</script>

<template>
  <section
    v-reveal
    class="relative isolate overflow-hidden"
    :class="dark ? 'bg-navy-900 text-white' : 'bg-paper'"
  >
    <div
      v-if="dark && !image"
      class="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      <div class="absolute -right-24 -top-16 h-64 w-64 rounded-full bg-navy/45 blur-3xl" />
      <div class="absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-steel/10 blur-3xl" />
    </div>

    <div
      v-if="image"
      class="shell relative grid items-center gap-10 py-14 lg:grid-cols-12 lg:gap-0 lg:py-0"
    >
      <div class="lg:col-span-5 lg:py-20 lg:pr-10">
        <p v-if="kicker" class="kicker !text-steel">{{ kicker }}</p>
        <h2
          class="text-3xl leading-[1.15] tracking-tight text-white sm:text-4xl"
          :class="kicker ? 'mt-3' : ''"
        >
          {{ title }}
        </h2>
        <p v-if="text" class="mt-4 max-w-md text-[1.05rem] leading-relaxed text-white/70">
          {{ text }}
        </p>
        <UiButton
          class="mt-8 shadow-none hover:shadow-none hover:!translate-y-0"
          :to="isExternal ? undefined : to"
          :href="isExternal ? to : undefined"
          variant="invert"
        >
          {{ ctaLabel }}
          <span aria-hidden="true">→</span>
        </UiButton>
      </div>
      <div class="relative lg:col-span-7 lg:min-h-[28rem] lg:self-stretch">
        <div
          class="overflow-hidden rounded-xl ring-1 ring-white/10 lg:absolute lg:inset-y-0 lg:left-6 lg:right-[calc(-1*(100vw-100%)/2)] lg:rounded-none lg:ring-0"
        >
          <SiteImg
            :src="image"
            :alt="imageAlt || ''"
            :width="1200"
            :height="750"
            eager
            class="aspect-[16/10] w-full object-cover object-center lg:absolute lg:inset-0 lg:h-full lg:aspect-auto"
          />
        </div>
      </div>
    </div>

    <div
      v-else-if="tone === 'paper'"
      class="shell relative flex flex-col items-start justify-between gap-6 pt-8 pb-14 sm:flex-row sm:items-center lg:pt-10 lg:pb-16"
    >
      <div class="max-w-2xl">
        <p v-if="kicker" class="kicker">{{ kicker }}</p>
        <h2 class="text-2xl sm:text-3xl" :class="kicker ? 'mt-3' : ''">{{ title }}</h2>
        <p v-if="text" class="mt-3 text-[1.05rem] leading-relaxed text-ink-muted">
          {{ text }}
        </p>
      </div>
      <UiButton
        :to="isExternal ? undefined : to"
        :href="isExternal ? to : undefined"
        variant="primary"
      >
        {{ ctaLabel }}
      </UiButton>
    </div>

    <div
      v-else
      class="shell relative flex flex-col gap-8 py-16 sm:flex-row sm:items-end sm:justify-between sm:gap-16 lg:py-20"
    >
      <div class="max-w-2xl border-l-2 border-steel pl-6 sm:pl-8">
        <p v-if="kicker" class="kicker !text-steel">{{ kicker }}</p>
        <h2
          class="text-3xl leading-[1.15] tracking-tight text-white sm:text-4xl"
          :class="kicker ? 'mt-3' : ''"
        >
          {{ title }}
        </h2>
        <p v-if="text" class="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-white/70">
          {{ text }}
        </p>
      </div>
      <UiButton
        class="shrink-0 shadow-none hover:shadow-none hover:!translate-y-0"
        :to="isExternal ? undefined : to"
        :href="isExternal ? to : undefined"
        variant="invert"
      >
        {{ ctaLabel }}
        <span aria-hidden="true">→</span>
      </UiButton>
    </div>
  </section>
</template>
