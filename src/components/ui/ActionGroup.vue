<template>
  <div
    :class="direction === 'row' ? 'flex justify-center gap-2' : 'flex flex-col gap-2'"
    role="group"
  >
    <slot />
  </div>
</template>

<script setup>
defineProps({
  direction: { type: String, default: 'row' },
})
</script>
