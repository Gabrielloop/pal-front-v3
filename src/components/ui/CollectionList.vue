<template>
  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <RouterLink v-for="item in items" :key="item.userlistId" :to="`/listes/${item.userlistId}`">
      <CardList
        :name="item.userlistName || item.label || 'Liste sans nom'"
        :description="item.userlistDescription || item.description || 'Aucune description'"
        :count="item.books?.length || item.count || 0"
        :icon="item.icon || item.userlistType || 'bookmark'"
      />
    </RouterLink>
  </div>
</template>

<script setup>
import CardList from '@/components/ui/CardList.vue'

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
})
</script>
