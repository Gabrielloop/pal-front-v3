<template>
  <div class="inline-flex cursor-pointer items-center gap-2">
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue.toString()"
      aria-label="switch"
      @click="$emit('update:modelValue', !modelValue)"
      :disabled="disabled || loading"
      :class="[
        'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
        modelValue ? 'bg-primary dark:bg-ivory/10' : 'bg-disabled/50 dark:bg-disabled/80',
        disabled || loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
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
    </button>
    <span><slot /></span>
  </div>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
  loading: Boolean,
  disabled: Boolean,
})
defineEmits(['update:modelValue'])
</script>
