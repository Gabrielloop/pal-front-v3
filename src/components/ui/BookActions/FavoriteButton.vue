<template>
  <button
    @click="toggleFavorite"
    :class="book.isFavorite ? 'bg-danger text-white' : 'bg-primary text-white'"
    class="rounded-full p-2 transition-colors duration-200 hover:text-danger/50"
  >
    <AppIcon name="heart" class="h-5 w-5" />
  </button>
</template>

<script setup>
import AppIcon from '@/components/AppIcon.vue'
import { defineProps } from 'vue'
import { useListStore } from '@/stores/useListStore'

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
})

const listStore = useListStore()

const toggleFavorite = async () => {
  if (props.book.isFavorite) {
    await listStore.removeToFavorites(props.book)
    await listStore.fetchFavorites()
    props.book.isFavorite = false
  } else {
    await listStore.addToFavorites(props.book)
    await listStore.fetchFavorites()
    props.book.isFavorite = true
  }
}
</script>
