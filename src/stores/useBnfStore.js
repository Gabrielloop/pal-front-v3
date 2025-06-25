import { defineStore } from 'pinia'
import { searchByQuery } from '@/api/bnfApi'

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
        const raw = await searchByQuery(query, page)

        this.results = raw
      } catch (e) {
        this.error = e.message || 'Erreur API'
      } finally {
        this.loading = false
      }
    },

    async resolveBestCover(book) {
      const isbn = book.isbn?.replace(/[^0-9X]/g, '')
      if (!isbn || isbn === 'inconnu') return null

      const openLibraryURL = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`
      const fallbackURL = `${import.meta.env.VITE_API_BASE_URL}/cover/${isbn}?t=${Date.now()}`

      try {
        const res = await fetch(openLibraryURL)
        const blob = await res.blob()

        const isValidImage = res.ok && blob.size > 500

        if (isValidImage) {
          return openLibraryURL
        } else {
        }
      } catch (e) {}

      return fallbackURL
    },
  },
})
