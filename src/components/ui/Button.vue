<template>
    <button
      :class="[
        'btn',
        `btn-${variant}`,
        disabled || loading ? 'btn-disabled' : ''
      ]"
      :disabled="disabled || loading"
      :type="type"
    >
      <span v-if="loading" class="loader mr-2"></span>
      <slot name="icon" />
      <slot />
    </button>
  </template>

<script setup>

defineProps({
  variant: { type: String, default: 'valider' },
  loading: Boolean,
  disabled: Boolean,
  type: { type: String, default: 'button' }
})

</script>