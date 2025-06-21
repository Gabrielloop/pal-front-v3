<template>
  <Grid>
    <BookCard v-for="book in bnfStore.results" :key="book.isbn" :book="book" />
  </Grid>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBnfStore } from '@/stores/useBnfStore'
import BookCard from '@/components/ui/BookCard.vue'
import Grid from '@/components/ui/Grid.vue'

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
