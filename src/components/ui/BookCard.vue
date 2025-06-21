<template>
  <div
    class="flex cursor-pointer flex-col gap-2 rounded-xl bg-white p-4 shadow transition-all duration-200 hover:shadow-md dark:bg-ivory/5"
    @click="handleClick"
  >
    <div class="flex items-start gap-3">
      <Cover :cover="cover" :loading="!cover" component="card" />
      <div class="flex-grow">
        <h3 class="truncate text-lg font-semibold">{{ displayTitle }}</h3>
        <p class="truncate text-sm text-gray-600">{{ displayAuthor }}</p>
        <p class="text-xs text-gray-500">ISBN : {{ displayIsbn }}</p>
      </div>
      <FavoriteButton :book="book" />
    </div>

    <p class="line-clamp-2 text-sm text-primary dark:text-ivory">
      {{ displayDescription }}
    </p>

    <span class="badge-primary item-right text-right text-xs">
      Éditeur : {{ displayPublisher }} – {{ displayYear }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBookStore } from '@/stores/useBookStore'
import FavoriteButton from '@/components/ui/BookActions/FavoriteButton.vue'
import Cover from '@/components/ui/Cover.vue'

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const bookStore = useBookStore()
const book = props.book

// TODO : a retirer : Fallbacks pour compatibilité entre les formats (BnF, DB, etc.)
const displayTitle = computed(() => book.title || 'Titre inconnu')
const displayAuthor = computed(() => book.author || 'Auteur inconnu')
const displayIsbn = computed(() => book.isbn || 'ISBN inconnu')
const displayPublisher = computed(() => book.publisher || 'Inconnu')
const displayYear = computed(() => book.year || 'Date inconnue')
const displayDescription = computed(() => book.description || '')
const cover = computed(() => book.cover || null)

function handleClick() {
  bookStore.storeBook(book)
  router.push('/book/' + book.isbn)
}
</script>
