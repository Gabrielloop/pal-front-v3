<template>
  <div class="search-page">
    <h2>Résultats pour "{{ searchQuery }}"</h2>

    <div v-if="bnfStore.loading">Chargement...</div>
    <div v-else-if="bnfStore.error">{{ bnfStore.error }}</div>
    <div v-else-if="bnfStore.results.length === 0">Aucun résultat</div>

    <table v-else>
      <tr v-for="book in bnfStore.results" :key="book.isbn + book.title">
        <td>
          <img :src="bnfStore.getCoverImage(book)" alt="" v-if="bnfStore.getCoverImage(book)" />
        </td>
        <td>{{ book.title }} {{ book.isbn }}</td>
        <td>
          <FavoriteButton :book="book" />
        </td>
        <td>
          <WishlistButton :book="book" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import FavoriteButton from '@/components/ui/FavoriteButton.vue'
import WishlistButton from '@/components/ui/WishlistButton.vue'
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useBnfStore } from '@/stores/useBnfStore'

const route = useRoute()
const bnfStore = useBnfStore()
const searchQuery = ref(route.query.q || '')

onMounted(() => {
  if (route.query.q) {
    bnfStore.fetchResults(route.query.q, 1)
  }
})

watch(
  () => route.query.q,
  (newQ) => {
    if (newQ) {
      searchQuery.value = newQ
      bnfStore.fetchResults(newQ, 1)
    }
  }
)
</script>
