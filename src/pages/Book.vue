<template>
  <section v-if="loading">
    <LoadingLogo />
  </section>
  <section v-else>
    <BookDetails v-if="bookStore.book" :book="bookStore.book" />
    <div v-else class="p-4 text-center text-red-500">Livre introuvable ou inexistant.</div>
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
    } finally {
      loading.value = false
    }
  } else {
    loading.value = false
  }
})
</script>
