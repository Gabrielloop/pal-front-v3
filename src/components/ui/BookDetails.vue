<template>
  <PageTitle backButton>
    <template #title>{{ book.title }}</template>
  </PageTitle>
  <div class="grid w-full grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
    <article class="flex flex-col items-center justify-center gap-4">
      <Cover :book="book" :cover="book.cover ?? ''" :loading="!book.cover" component="details" />
      <div>
        <p class="text-lg font-semibold">Auteur : {{ book.author }}</p>
        <p class="text-sm">ISBN : {{ book.isbn }}</p>
        <p class="text-sm">Editeur : {{ book.publisher }}</p>
        <p class="text-sm">Année : {{ book.year }}</p>
      </div>
    </article>
    <article class="flex flex-col gap-4">
      <div class="flex flex-row gap-2">
        <FavoriteButton :book="book" />
        <WishlistButton :book="book" />
        <Note :book="book" />
      </div>
      <Comment :book="book" />
    </article>
    <article><ReadingProgress :book="book" /></article>
    <article><UserLists :book="book" /></article>
    <article class="overflow-hidden rounded-lg bg-white shadow">
      <pre>{{ book }}</pre>
    </article>
  </div>
</template>

<script setup>
import PageTitle from '@/components/ui/PageTitle.vue'
import Cover from '@/components/ui/Cover.vue'
import FavoriteButton from '@/components/ui/BookActions/FavoriteButton.vue'
import WishlistButton from '@/components/ui/BookActions/WishlistButton.vue'
import Comment from '@/components/ui/BookActions/Comment.vue'
import Note from './BookActions/Note.vue'
import ReadingProgress from '@/components/ui/BookActions/Reading.vue'
import UserLists from '@/components/ui/BookActions/UserLists.vue'

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
})

console.log('BookDetails props:', props)
</script>
