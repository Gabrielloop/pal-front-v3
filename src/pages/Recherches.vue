<template>
  <BookGrid :cols="{ base: 1, sm: 2, md: 3, lg: 4 }">
    <BookCard v-for="book in bnfStore.results" :key="book.isbn" :book="book" />
  </BookGrid>
</template>

<script setup>
import FavoriteButton from '@/components/ui/FavoriteButton.vue'
import WishlistButton from '@/components/ui/WishlistButton.vue'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBnfStore } from '@/stores/useBnfStore'
import BookCard from '../components/ui/BookCard.vue'
import BookGrid from '../components/ui/BookGrid.vue'

const route = useRoute()
const bnfStore = useBnfStore()
const searchQuery = ref(route.query.q || '')

onMounted(() => {
  if (route.query.q) {
    bnfStore.fetchResults(route.query.q, 1)
  }
})

watch(
  () => route.query.q,
  (newQ) => {
    if (newQ) {
      searchQuery.value = newQ
      bnfStore.fetchResults(newQ, 1)
    }
  }
)
</script>
