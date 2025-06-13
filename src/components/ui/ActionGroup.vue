<template>

    <div :class="direction === 'row' ? 'flex gap-2' : 'flex flex-col gap-2'">
      <slot />
    </div>

  </template>

<script setup>

defineProps({
  direction: { type: String, default: 'row' },
})

</script>
