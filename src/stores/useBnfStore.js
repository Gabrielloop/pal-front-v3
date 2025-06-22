import { defineStore } from 'pinia'
import { searchByQuery } from '@/api/bnfApi'
import { useListStore } from '@/stores/useListStore'

export const useBnfStore = defineStore('bnf', {
  state: () => ({
    query: '',
    page: 1,
    results: [],
    loading: false,
    error: null,
  }),

  getters: {
    totalResults: (state) => state.results.length > 0,
  },

  actions: {
    async fetchResults(query, page = 1) {
      this.query = query
      this.page = page
      this.loading = true
      this.error = null

      try {
        const listStore = useListStore()
        const raw = await searchByQuery(query, page)

        this.results = raw
        console.log('Résultats de recherche BNF :', this.results)
      } catch (e) {
        this.error = e.message || 'Erreur API'
      } finally {
        this.loading = false
      }
    },

    getCoverImage(book) {
      const isbn = book.isbn?.replace(/[^0-9X]/g, '')
      if (!isbn || isbn === 'inconnu') return null

      return `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`
    },
  },
})
{
  /* <img
              :src="'https://couverture.geobib.fr/api/v1/' + book.isbn + '/medium'"
              alt="Couverture du livre"
              class="h-24 w-16 object-cover"
            /> */
}
