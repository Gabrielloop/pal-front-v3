<script setup>
import { useBookStore } from '@/stores/useBookStore'
import AddBookToList from '@/components/forms/AddBookToList.vue'
import { useRoute } from 'vue-router'

const bookStore = useBookStore()
const path = useRoute().path
const isbn = path.split('/').pop()

if (!bookStore.book) {
  bookStore.fetchBookByIsbn(isbn)
}
</script>

<template>
  <div v-if="bookStore.book">
    <h1 class="text-xl font-bold">{{ bookStore.book.bookTitle }}</h1>
    <img :src="bookStore.coverImage" alt="Couverture" />
    <p v-if="bookStore.book.bookAuthor">Auteur : {{ bookStore.book.bookAuthor }}</p>
    <AddBookToList :isbn="bookStore.book.isbn" :userlistId="bookStore.book.userlistId" />
  </div>

  <div v-else>
    <p>Livre non chargé.</p>
  </div>
  <pre>{{ bookStore.book }}</pre>
</template>
