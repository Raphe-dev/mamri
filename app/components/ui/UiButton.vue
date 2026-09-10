<script setup lang="ts">
withDefaults(
  defineProps<{
    to?: string
    href?: string
    variant?: 'primary' | 'secondary' | 'ghost' | 'invert'
    size?: 'sm' | 'md'
  }>(),
  { variant: 'primary', size: 'md' }
)

const variants: Record<string, string> = {
  primary:
    'bg-navy text-white hover:bg-navy-700 focus-visible:outline-navy',
  secondary:
    'bg-white text-navy ring-1 ring-inset ring-navy/20 hover:bg-navy-50',
  ghost:
    'bg-transparent text-navy ring-1 ring-inset ring-navy/25 hover:bg-navy-50',
  invert:
    'bg-white text-navy hover:bg-navy-50'
}

const sizes: Record<string, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-[0.95rem]'
}
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-tight shadow-sm transition duration-200 hover:-translate-y-px hover:shadow-md"
    :class="[variants[variant], sizes[size]]"
  >
    <slot />
  </NuxtLink>
  <a
    v-else-if="href"
    :href="href"
    class="inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-tight shadow-sm transition duration-200 hover:-translate-y-px hover:shadow-md"
    :class="[variants[variant], sizes[size]]"
  >
    <slot />
  </a>
  <button
    v-else
    type="button"
    class="inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-tight shadow-sm transition duration-200 hover:-translate-y-px hover:shadow-md"
    :class="[variants[variant], sizes[size]]"
  >
    <slot />
  </button>
</template>
