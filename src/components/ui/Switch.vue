<template>
  <button
    @click="$emit('update:modelValue', !modelValue)"
    :disabled="disabled || loading"
    :class="[
      'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
      `switch-${variant}`,
      disabled || loading ? 'btn-disabled cursor-not-allowed opacity-50' : '',
    ]"
  >
    <span
      v-if="!loading"
      :class="[
        'inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200',
        modelValue ? 'translate-x-5' : 'translate-x-1',
      ]"
    />
    <span v-else class="loader absolute left-1 top-1 h-4 w-4" />
    <slot name="icon" />
    <slot />
  </button>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
  variant: { type: String, default: 'primary' },
  loading: Boolean,
  disabled: Boolean,
})
defineEmits(['update:modelValue'])
</script>
