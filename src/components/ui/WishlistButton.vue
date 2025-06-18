<template>
  <button
    @click="toggleWishlist"
    :class="book.inWishlists ? 'text-warning' : 'text-disable'"
    class="text-primary transition-colors duration-200 hover:text-warning/50"
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
  if (props.book.inWishlists) {
    await listStore.removeToWishlists(props.book)
    props.book.inWishlists = false
  } else {
    await listStore.addToWishlists(props.book)
    props.book.inWishlists = true
  }
}
</script>
