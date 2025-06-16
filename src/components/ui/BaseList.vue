<template>
  <ul class="space-y-0">
    <!-- Loading state -->
    <template v-if="loading">
      <li v-for="n in skeletonCount" :key="n">
        <Skeleton height="h-8" />
      </li>
    </template>

    <!-- Loaded state -->
    <template v-else-if="items && items.length">
      <li
        v-for="item in items"
        :key="item.id || item.userlistId"
        @click="$emit('select', item)"
        class="flex h-8 cursor-pointer items-center overflow-hidden rounded py-2 text-primary hover:bg-background dark:hover:bg-ivory/10"
      >
        <slot v-bind="{ item }">
          {{ item.label || item.name || item.userlistName || 'Élément' }}
        </slot>
      </li>
    </template>

    <!-- Empty state -->
    <template v-else>
      <li class="px-4 py-2 text-sm italic text-primary dark:text-ivory">Aucun élément trouvé.</li>
    </template>
  </ul>
</template>

<script setup>
import Skeleton from '@/components/ui/Skeleton.vue'

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  skeletonCount: {
    type: Number,
    default: 5,
  },
})

defineEmits(['select'])
</script>
