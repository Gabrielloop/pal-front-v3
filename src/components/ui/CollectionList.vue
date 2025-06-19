<template>
  <RouterLink v-for="item in items" :key="item.userlistId" :to="`/listes/list/${item.userlistId}`">
    <CardList
      :name="item.userlistName || item.label || 'Liste sans nom'"
      :description="item.userlistDescription || item.description || 'Aucune description'"
      :count="item.count || item.books?.length || 0"
      :icon="item.icon || item.userlistType || 'bookmark'"
    />
  </RouterLink>
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
