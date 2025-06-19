<template>
  <div class="grid gap-4" :class="gridColsClass">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  cols: {
    type: Object,
    default: () => ({
      base: 1,
      sm: 2,
      md: 3,
      lg: 4,
    }),
  },
})

const gridColsClass = computed(() => {
  const cols = props.cols
  const classes = [`grid-cols-${cols.base}`]
  if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`)
  if (cols.md) classes.push(`md:grid-cols-${cols.md}`)
  if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`)
  return classes.join(' ')
})
</script>
