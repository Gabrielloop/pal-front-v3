<template>
  <button
    @click="toggleWishlist"
    :title="book.isWished ? 'Retirer de la liste d’envies' : 'Ajouter à la liste d’envies'"
    :aria-label="book.isWished ? 'Retirer de la liste d’envies' : 'Ajouter à la liste d’envies'"
    :class="
      book.isWished
        ? 'bg-danger text-white hover:text-white/50'
        : 'bg-primary text-white hover:bg-danger/50'
    "
    class="rounded-full p-2 transition-colors duration-200 hover:text-danger/50"
  >
    <AppIcon name="cart" class="h-5 w-5" />
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

const toggleWishlist = async () => {
  if (props.book.isWished) {
    await listStore.removeToWishlist(props.book)
    props.book.isWished = false
  } else {
    await listStore.addToWishlist(props.book)
    props.book.isWished = true
  }
}
</script>
