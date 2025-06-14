<template>
  <div
    :class="[
      'animate-pulse rounded bg-gray-200 dark:bg-gray-700',
      fullWidth ? 'w-full' : width,
      height,
      extraClasses,
    ]"
  ></div>
</template>

<script setup>
defineProps({
  width: { type: String, default: 'w-32' },
  height: { type: String, default: 'h-4' },
  fullWidth: { type: Boolean, default: false },
  extraClasses: { type: String, default: '' },
})
</script>
