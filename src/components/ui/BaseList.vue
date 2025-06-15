<template>
  <ul class="space-y-2">
    <!-- Loading state -->
    <template v-if="loading">
      <li v-for="n in skeletonCount" :key="n">
        <Skeleton />
      </li>
    </template>

    <!-- Loaded state -->
    <template v-else-if="items && items.length">
      <li
        v-for="item in items"
        :key="item.id || item.userlist_id"
        @click="$emit('select', item)"
        class="cursor-pointer rounded-xl px-4 py-2 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <slot v-bind="{ item }">
          {{ item.label || item.name || item.userlist_name || 'Élément' }}
        </slot>
      </li>
    </template>

    <!-- Empty state -->
    <template v-else>
      <li class="px-4 py-2 text-sm italic text-gray-500">Aucun élément trouvé.</li>
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
