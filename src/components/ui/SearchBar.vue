<template>
  <form @submit.prevent="goToSearch">
    <input v-model="searchTerm" placeholder="Rechercher un livre..." />
    <button type="submit">🔍</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const searchTerm = ref('')
const router = useRouter()

function goToSearch() {
  if (searchTerm.value.trim()) {
    router.push({ path: '/recherches', query: { q: searchTerm.value.trim() } })
  }
}
</script>

<style scoped>
form {
  display: flex;
  gap: 0.5rem;
}
input {
  padding: 0.5rem;
  flex: 1;
}
button {
  padding: 0.5rem 1rem;
}
</style>
