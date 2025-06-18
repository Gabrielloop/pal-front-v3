<template>
  <h2 v-if="title" class="col-span-full mb-4 text-xl font-bold">{{ title }}</h2>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <div v-if="loading" class="col-span-full text-center">Chargement...</div>
    <div v-else-if="error" class="col-span-full text-red-500">{{ error }}</div>
    <div v-else-if="books.length === 0" class="col-span-full text-gray-500">{{ emptyMessage }}</div>

    <div
      v-for="book in books"
      :key="book.isbn + book.title"
      :book="book"
      class="flex flex-col rounded-lg bg-white p-4 shadow-md"
    />
  </div>
</template>
<script setup>
const props = defineProps({
  books: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  emptyMessage: {
    type: String,
    default: 'Aucun livre trouvé',
  },
})
</script>
