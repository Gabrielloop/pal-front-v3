import { defineStore } from 'pinia'
import {
  addBookToUserList,
  removeBookFromUserList,
  addOrUpdateComment,
  addOrUpdateNote,
  postReadingAdd,
  postReadingSet,
  postReadingAbandon,
} from '@/api/book'
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

        if (!Array.isArray(results) || results.length === 0) {
          toast.error('Livre non trouvé')
          this.book = null
          return
        }
        this.book = results[0]
      } catch (error) {
        console.error('Erreur lors de la récupération du livre:', error)
        toast.error(error.message || 'Erreur lors de la récupération du livre')
      }
    },
    async postComment(comment) {
      const listStore = useListStore()
      const toast = useToastStore()
      try {
        const response = await addOrUpdateComment(comment)
        listStore.fetchComments()
        toast.success(response.message)
      } catch (error) {
        console.error("Erreur lors de l'ajout du commentaire :", error)
        toast.error(error?.message || 'Erreur inconnue')
      }
    },
    async postNote(note) {
      const listStore = useListStore()
      const toast = useToastStore()
      try {
        const response = await addOrUpdateNote(note, note.isbn)
        listStore.fetchNotes()
        toast.success(response.message)
      } catch (error) {
        console.error("Erreur lors de l'ajout de la note :", error)
        toast.error(error?.message || 'Erreur inconnue')
      }
    },
    async saveReadingProgress(isbn, payload) {
      const toast = useToastStore()
      try {
        const response = await postReadingSet(isbn, payload)
        toast.success(response.message || 'Lecture mise à jour')
        return response
      } catch (err) {
        console.error('Erreur lecture :', err)
        toast.error('Erreur lors de la mise à jour de la lecture')
      }
    },

    async abandonReading(isbn) {
      const toast = useToastStore()
      try {
        const response = await postReadingAbandon(isbn)
        toast.success(response.message || 'Lecture abandonnée')
        return response
      } catch (err) {
        console.error('Erreur abandon :', err)
        toast.error("Erreur lors de l'abandon")
      }
    },
  },
})
