<template>
  <div class="search-page">
    <h2>Résultats pour "{{ searchQuery }}"</h2>

    <div v-if="loading">Chargement...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <table v-if="results.length">
      <thead>
        <tr>
          <th>Titre</th>
          <th>Auteur</th>
          <th>Date</th>
          <th>Éditeur</th>
          <th>ISBN</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in results" :key="book.isbn + book.title + book.year">
          <td>{{ book.title || '–' }}</td>
          <td>{{ book.author || '–' }}</td>
          <td>{{ book.year || '–' }}</td>
          <td>{{ book.publisher || '–' }}</td>
          <td>{{ book.isbn || '–' }}</td>
        </tr>
      </tbody>
    </table>

    <div v-else-if="!loading && !error">Aucun résultat</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { searchByQuery } from '@/api/bnfApi'

const route = useRoute()
const searchQuery = ref(route.query.q || '')

const results = ref([])
const loading = ref(false)
const error = ref(null)

async function fetchResults() {
  if (!searchQuery.value) return

  loading.value = true
  error.value = null
  try {
    results.value = await searchByQuery(searchQuery.value, 1)
  } catch (err) {
    error.value = err.message || 'Erreur inconnue'
  } finally {
    loading.value = false
  }
}

onMounted(fetchResults)

watch(
  () => route.query.q,
  (newQ) => {
    searchQuery.value = newQ || ''
    fetchResults()
  }
)
</script>

<style scoped>
.search-page {
  padding: 1rem;
  max-width: 800px;
  margin: auto;
}

.error {
  color: red;
  margin-top: 1rem;
}

table {
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 0.5rem;
}

th {
  background-color: #f0f0f0;
}
</style>
