<template>
  <div
    role="button"
    tabindex="0"
    @keydown.enter.prevent="handleClick"
    @keydown.space.prevent="handleClick"
    :aria-label="`Voir la fiche du livre ${displayTitle}`"
    class="flex cursor-pointer flex-col gap-2 overflow-hidden rounded-xl bg-white shadow transition-all duration-200 hover:shadow-md dark:bg-ivory/5"
    @click="handleClick"
  >
    <div>
      <h3 class="truncate text-lg font-semibold">{{ displayTitle }}</h3>
    </div>
    <div class="flex flex-row gap-2">
      <Cover :book="book" :cover="cover" :loading="!cover" component="card" />
      <div class="flex w-full flex-col justify-between p-2">
        <div class="flex h-full flex-col justify-between">
          <span class="truncate text-sm">{{ displayAuthor }}</span>
          <span class="truncate text-xs">ISBN : {{ displayIsbn }}</span>
          <span class="truncate text-xs">Éditeur : {{ displayPublisher }} – {{ displayYear }}</span>
          <div class="flex flex-row gap-1">
            <Note :book="book" @click.stop />
          </div>
          <div class="flex flex-row gap-1">
            <FavoriteButton :book="book" @click.stop /><WishlistButton :book="book" @click.stop />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBookStore } from '@/stores/useBookStore'
import FavoriteButton from '@/components/ui/BookActions/FavoriteButton.vue'
import Cover from '@/components/ui/Cover.vue'
import WishlistButton from '@/components/ui/BookActions/WishlistButton.vue'
import Note from '@/components/ui/BookActions/Note.vue'

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const bookStore = useBookStore()
const book = props.book

const displayTitle = computed(() => book.title || 'Titre inconnu')
const displayAuthor = computed(() => book.author || 'Auteur inconnu')
const displayIsbn = computed(() => book.isbn || 'ISBN inconnu')
const displayPublisher = computed(() => book.publisher || 'Inconnu')
const displayYear = computed(() => book.year || 'Date inconnue')
const cover = computed(() => book.cover || null)

function handleClick() {
  bookStore.storeBook(book)
  router.push('/book/' + book.isbn)
}
</script>
