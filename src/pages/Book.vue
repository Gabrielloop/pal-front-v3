<template>
  <section v-if="loading">
    <LoadingLogo />
  </section>
  <section v-else>
    <BookDetails :book="bookStore.book" />
  </section>
</template>
<script setup>
import { useBookStore } from '@/stores/useBookStore'
import LoadingLogo from '@/components/ui/LoadingLogo.vue'
import BookDetails from '@/components/ui/BookDetails.vue'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { ref } from 'vue'

const loading = ref(true)

const bookStore = useBookStore()
const path = useRoute().path
const isbn = path.split('/').pop()

onMounted(async () => {
  if (!bookStore.book || bookStore.book.isbn !== isbn) {
    try {
      await bookStore.fetchBookByIsbn(isbn)
    } catch (error) {
      console.error('Erreur lors du chargement du livre:', error)
    } finally {
      loading.value = false
    }
  } else {
    loading.value = false
  }
})
</script>
