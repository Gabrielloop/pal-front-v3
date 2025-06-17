import { ref } from 'vue'
import { searchByQuery } from '@/api/bnfApi'

export function useBnfSearch() {
  const results = ref([])
  const loading = ref(false)
  const error = ref(null)

  const search = async (query, page = 1) => {
    loading.value = true
    error.value = null
    try {
      const books = await searchByQuery(query, page)
      results.value = books
    } catch (e) {
      error.value = e.message || 'Erreur inconnue'
    } finally {
      loading.value = false
    }
  }

  return {
    results,
    loading,
    error,
    search,
  }
}
