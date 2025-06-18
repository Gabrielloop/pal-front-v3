<template>
  <button
    @click="toggleFavorite"
    :class="book.inFavorites ? 'text-danger' : 'text-disable'"
    class="text-primary transition-colors duration-200 hover:text-danger/50"
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
  if (props.book.inFavorites) {
    await listStore.removeToFavorites(props.book)
    props.book.inFavorites = false
  } else {
    await listStore.addToFavorites(props.book)
    props.book.inFavorites = true
  }
}
</script>
