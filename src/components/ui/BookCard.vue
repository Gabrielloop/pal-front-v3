<template>
  <div
    class="flex cursor-pointer flex-col gap-2 rounded-xl bg-white p-4 shadow transition-all duration-200 hover:shadow-md dark:bg-ivory/5"
    @click="handleClick"
  >
    <div class="flex items-start gap-3">
      <img
        v-if="cover"
        :src="cover"
        alt="cover"
        class="h-20 w-14 flex-none rounded-sm object-cover shadow-sm"
      />
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
import FavoriteButton from '@/components/ui/FavoriteButton.vue'

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const bookStore = useBookStore()
const book = props.book

// ✅ Fallbacks pour compatibilité entre les formats (BnF, DB, etc.)
const displayTitle = computed(() => book.title || book.bookTitle || 'Titre inconnu')
const displayAuthor = computed(() => book.author || book.bookAuthor || 'Auteur inconnu')
const displayIsbn = computed(() => book.isbn || book.bookIsbn || 'ISBN inconnu')
const displayPublisher = computed(() => book.publisher || book.bookPublisher || 'Inconnu')
const displayYear = computed(() => book.year || book.bookYear || 'Date inconnue')
const displayDescription = computed(() => book.description || book.bookDescription || '')
const cover = computed(() => book.cover || null)

function handleClick() {
  bookStore.storeBook(book)
  router.push('/book/' + book.isbn)
}
</script>
