<template>
  <div class="search-container">
    <h2>Recherche BNF</h2>

    <input v-model="searchTerm" @keyup.enter="handleSearch" placeholder="Titre ou ISBN" />
    <button @click="handleSearch">Rechercher</button>

    <div v-if="loading">Chargement en cours...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <table v-if="results.length > 0">
      <thead>
        <tr>
          <th>Titre</th>
          <th>Auteur</th>
          <th>Date</th>
          <th>Éditeur</th>
          <th>ISBN</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in results" :key="book.identifier">
          <td>{{ book.title }}</td>
          <td>{{ book.creators }}</td>
          <td>{{ book.date }}</td>
          <td>{{ book.publisher }}</td>
          <td>{{ book.identifier }}</td>
          <td>{{ book.docType || '–' }}</td>
        </tr>
      </tbody>
    </table>

    <div v-else-if="!loading && !error">Aucun résultat</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useBnfSearch } from '@/composables/useBnfSearch'

const searchTerm = ref('')
const { results, loading, error, search } = useBnfSearch()

function handleSearch() {
  if (searchTerm.value.trim()) {
    search(searchTerm.value.trim(), 1)
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
