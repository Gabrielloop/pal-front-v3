<template>
  <div class="search-container">
    <h2>Recherche BNF</h2>

    <input v-model="searchTerm" @keyup.enter="handleSearch" placeholder="Titre ou ISBN" />
    <button @click="handleSearch">Rechercher</button>

    <div v-if="loading">Chargement en cours...</div>
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
          <td>{{ book.title }}</td>
          <td>{{ book.author || 'Auteur inconnu' }}</td>
          <td>{{ book.year || 'Date inconnue' }}</td>
          <td>{{ book.publisher || 'Éditeur inconnu' }}</td>
          <td>{{ book.isbn || 'ISBN inconnu' }}</td>
        </tr>
      </tbody>
    </table>

    <div v-else-if="!loading && !error">Aucun résultat</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { searchByQuery } from '@/api/bnfApi'

const searchTerm = ref('')
const results = ref([])
const loading = ref(false)
const error = ref(null)

async function handleSearch() {
  const query = searchTerm.value.trim()
  if (!query) return

  loading.value = true
  error.value = null
  results.value = []

  try {
    const data = await searchByQuery(query, 1)
    results.value = data
  } catch (e) {
    error.value = e.message || 'Erreur inconnue'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.search-container {
  padding: 1rem;
  max-width: 800px;
  margin: auto;
}

input {
  margin-right: 0.5rem;
  padding: 0.5rem;
  width: 300px;
}

button {
  padding: 0.5rem 1rem;
}

table {
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 0.5rem;
}

th {
  background-color: #f2f2f2;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
