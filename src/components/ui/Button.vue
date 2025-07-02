<template>
  <button
    :class="['btn', `btn-${variant}`, disabled || loading ? 'btn-disabled' : '']"
    :disabled="disabled || loading"
    :aria-disabled="disabled || loading ? 'true' : undefined"
    :aria-busy="loading ? 'true' : undefined"
    :type="type"
  >
    <!-- TODO : vérifier le loader -->
    <span v-if="loading" class="loader" aria-hidden="true"></span>
    <slot name="icon" />
    <slot />
  </button>
</template>

<script setup>
defineProps({
  variant: { type: String, default: 'primary' },
  loading: Boolean,
  disabled: Boolean,
  type: { type: String, default: 'button' },
})
</script>
