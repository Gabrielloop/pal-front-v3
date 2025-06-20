<template>
  <div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
    <article>
      <PageTitle>
        <template #title>{{ book.bookTitle }}</template>
      </PageTitle>

      <img
        v-if="book.bookCover"
        :src="book.bookCover"
        alt="cover"
        class="h-20 w-14 flex-none rounded-sm object-cover shadow-sm"
      />
    </article>
    <article>
      <p class="text-lg font-semibold">Auteur : {{ book.bookAuthor }}</p>
      <p class="text-gray-600">{{ book.bookDescription }}</p>
      <p class="text-sm text-gray-500">ISBN: {{ book.isbn }}</p>
      <p class="text-sm text-gray-500">Publisher: {{ book.bookPublisher }}</p>
      <p class="text-sm text-gray-500">Year: {{ book.bookYear }}</p>
    </article>
    <article>
      <FavoriteButton :book="book" />
    </article>
  </div>
</template>

<script setup>
import PageTitle from '@/components/ui/PageTitle.vue'
import { defineProps } from 'vue'
import FavoriteButton from './FavoriteButton.vue'

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
})

const book = props.book

console.log('BookDetails props:', props)
</script>
