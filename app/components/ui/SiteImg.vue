<script setup lang="ts">
withDefaults(
  defineProps<{
    src?: string | null
    alt?: string
    eager?: boolean
    priority?: boolean
    width?: number
    height?: number
  }>(),
  { alt: '', eager: false, priority: false }
)
</script>

<template>
  <img
    v-if="src"
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="eager || priority ? 'eager' : 'lazy'"
    :fetchpriority="priority ? 'high' : undefined"
    decoding="async"
  >
</template>
