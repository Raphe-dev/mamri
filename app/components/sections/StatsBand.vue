<script setup lang="ts">
export interface StatItem {
  value: number
  suffix?: string
  label: string
}

const props = defineProps<{ items: StatItem[] }>()

const reduced = ref(false)
const visible = ref(false)
const shown = ref<number[]>(props.items.map(i => i.value))
const root = ref<HTMLElement | null>(null)

function animate() {
  if (visible.value) return
  visible.value = true
  shown.value = props.items.map(() => 0)
  const start = performance.now()
  const duration = 1100
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / duration)
    const eased = 1 - (1 - t) ** 3
    shown.value = props.items.map(i => Math.round(i.value * eased))
    if (t < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

onMounted(() => {
  reduced.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced.value) return

  const io = new IntersectionObserver(
    (entries) => {
      if (!entries.some(e => e.isIntersecting)) return
      io.disconnect()
      animate()
    },
    { threshold: 0.2 }
  )
  if (root.value) io.observe(root.value)
})
</script>

<template>
  <section ref="root" class="relative z-10 -mt-10 pb-4">
    <div class="shell">
      <ul class="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-line shadow-lift ring-1 ring-line lg:grid-cols-4">
        <li
          v-for="(item, i) in items"
          :key="item.label"
          class="bg-white px-5 py-6 sm:px-7 sm:py-8"
        >
          <p class="font-sans text-3xl font-bold tabular-nums text-navy sm:text-4xl">
            {{ shown[i] }}<span class="text-heading">{{ item.suffix }}</span>
          </p>
          <p class="mt-1.5 max-w-[14rem] text-sm leading-snug text-ink-muted">{{ item.label }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
