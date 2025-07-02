<template>
  <button
    @click="toggleFavorite"
    :class="
      isFavorite
        ? 'bg-danger text-white hover:text-white/50'
        : 'bg-primary text-white hover:bg-danger/50'
    "
    class="rounded-full p-2 transition-colors duration-200"
    :aria-pressed="isFavorite ? 'true' : 'false'"
    :aria-label="isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'"
    :title="isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'"
  >
    <AppIcon :name="isFavorite ? 'heartSolid' : 'heart'" class="h-5 w-5" />
  </button>
</template>

<script setup>
import AppIcon from '@/components/AppIcon.vue'
import { defineProps, ref } from 'vue'
import { useListStore } from '@/stores/useListStore'

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
})

const isFavorite = ref(props.book.isFavorite)
const listStore = useListStore()

const toggleFavorite = async () => {
  if (isFavorite.value) {
    await listStore.removeToFavorites(props.book)
    isFavorite.value = false
  } else {
    await listStore.addToFavorites(props.book)
    isFavorite.value = true
  }
}
</script>
