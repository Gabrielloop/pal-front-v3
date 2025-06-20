import { defineStore } from 'pinia'
import { addBookToUserList, removeBookFromUserList } from '@/api/list'
import { useListStore } from '@/stores/useListStore'
import { useToastStore } from '@/stores/toast'
import { searchByISBNs } from '@/api/bnfApi'

export const useBookStore = defineStore('bookStore', {
  state: () => ({
    book: null,
  }),

  getters: {
    hasBook: (state) => !!state.book,
    coverImage: (state) => {
      const isbn = state.book?.isbn?.replace(/[^0-9X]/g, '')
      return isbn ? `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg` : null
    },
  },

  actions: {
    storeBook(book) {
      this.book = book
    },
    clearBook() {
      this.book = null
    },
    async addBookToList(listId, isbn) {
      const listStore = useListStore()
      const toast = useToastStore()
      if (!this.book || !listId) return
      try {
        const response = await addBookToUserList(listId, isbn)
        toast.success(response.message)
        listStore.fetchLists()
      } catch (error) {
        console.error("Erreur lors de l'ajout :", error)
        toast.error(error?.message || 'Erreur inconnue')
      }
    },
    async removeBookFromList(listId, isbn) {
      const listStore = useListStore()
      const toast = useToastStore()
      if (!this.book || !listId) return
      try {
        const response = await removeBookFromUserList(listId, isbn)
        toast.success(response.message)
        listStore.fetchLists()
      } catch (error) {
        console.error("Erreur lors de l'ajout :", error)
        toast.error(error?.message || 'Erreur inconnue')
      }
    },
    async fetchBookByIsbn(isbn) {
      const toast = useToastStore()
      try {
        const results = await searchByISBNs([isbn])

        if (results.length > 0) {
          this.storeBook(results[0])
        } else {
          toast.error('Livre non trouvé')
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du livre:', error)
        toast.error(error.message || 'Erreur lors de la récupération du livre')
      }
    },
  },
})
