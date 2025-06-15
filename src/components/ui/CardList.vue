<template>
  <div
    class="flex cursor-pointer flex-col gap-2 rounded-xl bg-white p-4 shadow transition-all duration-200 hover:shadow-md"
  >
    <div class="flex items-center gap-3">
      <AppIcon :name="icon" class="h-6 w-6 text-primary" />
      <h3 class="truncate text-lg font-semibold">{{ name }}</h3>
    </div>
    <p class="line-clamp-2 text-sm text-primary">
      {{ description || 'Aucune description' }}
    </p>
    <span class="badge-primary item-right text-right text-xs"
      >{{ count }} livre<span v-if="count > 1">s</span></span
    >
  </div>
</template>

<script setup>
import AppIcon from '@/components/AppIcon.vue'

defineProps({
  name: String,
  description: String,
  count: {
    type: Number,
    default: 0,
  },
  icon: {
    type: String,
    default: 'book',
  },
})
</script>
