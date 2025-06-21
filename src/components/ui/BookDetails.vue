<template>
  <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
    <article>
      <PageTitle>
        <template #title>{{ book.title }}</template>
      </PageTitle>
      <Cover :cover="book.cover" :loading="!book.cover" component="details" />
    </article>
    <article>
      <p class="text-lg font-semibold">Auteur : {{ book.author }}</p>
      <p class="text-gray-600">{{ book.description }}</p>
      <p class="text-sm text-gray-500">ISBN: {{ book.isbn }}</p>
      <p class="text-sm text-gray-500">Publisher: {{ book.publisher }}</p>
      <p class="text-sm text-gray-500">Year: {{ book.year }}</p>
    </article>
    <article>
      <div class="flex flex-row gap-2">
        <FavoriteButton :book="book" />
        <WishlistButton :book="book" />
      </div>
    </article>
    <pre>{{ book }}</pre>
  </div>
</template>

<script setup>
import PageTitle from '@/components/ui/PageTitle.vue'
import Cover from './Cover.vue'
import FavoriteButton from '@/components/ui/BookActions/FavoriteButton.vue'
import WishlistButton from '@/components/ui/BookActions/WishlistButton.vue'

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
})

const book = props.book

console.log('BookDetails props:', props)
</script>
