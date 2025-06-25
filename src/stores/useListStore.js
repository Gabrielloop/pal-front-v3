import { defineStore } from 'pinia'
import {
  fetchUserLists,
  fetchUserFavorites,
  fetchUserWishlists,
  fetchUserReadings,
  fetchUserComments,
  fetchUserNotes,
  createNewList,
  updateUserList,
  deleteUserList,
} from '@/api/list'
import { useToastStore } from '@/stores/toast'
import {
  postFavorites,
  deleteFavorites,
  postWishlists,
  deleteWishlists,
  addBookToUserList,
  removeBookFromUserList,
} from '@/api/book'

export const useListStore = defineStore('listStore', {
  state: () => ({
    lists: [],
    favorites: [],
    wishlists: [],
    readings: [],
    comments: [],
    notes: [],
    isLoading: false,
  }),
  getters: {
    getListbyId: (state) => (id) => {
      return state.lists.find((list) => list.userlistId === id)
    },
    hasLists: (state) => state.lists.length > 0,
    hasFavorites: (state) => state.favorites.length > 0,
    hasWishlists: (state) => state.wishlists.length > 0,
    hasReadings: (state) => state.readings.length > 0,
    countHasNotStartedReadings: (state) => {
      return state.readings.filter((book) => !book.reading.isStarted && !book.reading.isAbandoned)
        .length
    },
    countHasStartedReadings: (state) => {
      return state.readings.filter((book) => book.reading.isReading).length
    },
    countHasFinishedReadings: (state) => {
      return state.readings.filter((book) => book.reading.isFinished === true).length
    },
    countHasAbandonedReadings: (state) => {
      return state.readings.filter((book) => book.reading.isAbandoned).length
    },

    countStarsByValue: (state) => {
      const counts = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }

      state.notes.forEach((note) => {
        const stars = parseInt(note.noteContent)
        if (!isNaN(stars) && stars >= 0 && stars <= 5) {
          counts[stars]++
        }
      })

      return counts
    },

    hasComments: (state) => state.comments.length > 0,
  },

  actions: {
    async fetchLists() {
      this.isLoading = true
      const toast = useToastStore()
      try {
        const res = await fetchUserLists()
        if (res.success) {
          this.lists = res.data
          console.log('fetchLists :', this.lists)
        } else {
          toast.error(res.message || 'Échec récupération des listes')
        }
      } catch (err) {
        toast.error(err.message || 'Erreur lors de la récupération des listes')
        console.error('Erreur fetchLists :', err)
      } finally {
        this.isLoading = false
      }
    },
    async fetchFavorites() {
      this.isLoading = true
      const toast = useToastStore()
      try {
        const res = await fetchUserFavorites('favorites')
        if (res.success) {
          this.favorites = res.data
          console.log('fetchFavorites :', this.favorites)
        } else {
          toast.error(res.message || 'Échec récupération des favoris')
        }
      } catch (err) {
        toast.error(err.message || 'Erreur lors de la récupération des favoris')
        console.error('Erreur fetchFavorites :', err)
      } finally {
        this.isLoading = false
      }
    },
    async fetchWishlists() {
      this.isLoading = true
      const toast = useToastStore()
      try {
        const res = await fetchUserWishlists('wishlists')
        if (res.success) {
          this.wishlists = res.data
          console.log('fetchWishlists :', this.wishlists)
        } else {
          toast.error(res.message || 'Échec récupération des wishlists')
        }
      } catch (err) {
        toast.error(err.message || 'Erreur lors de la récupération des wishlists')
        console.error('Erreur fetchWishlists :', err)
      } finally {
        this.isLoading = false
      }
    },
    async fetchReadings() {
      this.isLoading = true
      const toast = useToastStore()
      try {
        const res = await fetchUserReadings('readings')
        if (res.success) {
          this.readings = res.data
          console.log('fetchReadings :', this.readings)
        } else {
          toast.error(res.message || 'Échec récupération des lectures')
        }
      } catch (err) {
        toast.error(err.message || 'Erreur lors de la récupération des lectures')
        console.error('Erreur fetchReadings :', err)
      } finally {
        this.isLoading = false
      }
    },
    async fetchComments() {
      this.isLoading = true
      const toast = useToastStore()
      try {
        const res = await fetchUserComments('comments')
        if (res.success) {
          this.comments = res.data
          console.log('fetchComments :', this.comments)
        } else {
          toast.error(res.message || 'Échec récupération de vos avis')
        }
      } catch (err) {
        toast.error(err.message || 'Erreur lors de la récupération de vos avis')
        console.error('Erreur fetchComments :', err)
      } finally {
        this.isLoading = false
      }
    },
    async fetchNotes() {
      this.isLoading = true
      const toast = useToastStore()
      try {
        const res = await fetchUserNotes('notes')
        if (res.success) {
          this.notes = res.data
          console.log('fetchNotes :', this.notes)
        } else {
          toast.error(res.message || 'Échec récupération des notes')
        }
      } catch (err) {
        toast.error(err.message || 'Erreur lors de la récupération des notes')
        console.error('Erreur fetchNotes :', err)
      } finally {
        this.isLoading = false
      }
    },
    async fetchAll() {
      await this.fetchLists()
      await this.fetchFavorites()
      await this.fetchWishlists()
      await this.fetchReadings()
      await this.fetchComments()
      await this.fetchNotes()
    },
    async addToFavorites(book) {
      const toast = useToastStore()
      try {
        const response = await postFavorites(book.isbn)

        if (!response.success) {
          throw new Error("Erreur lors de l'ajout du livre au favoris :")
        }

        toast.success(response.message)
        await this.fetchFavorites()
      } catch (error) {
        console.error("Erreur lors de l'ajout du livre au favoris :", error)
        toast.error(error.message || "Erreur lors de l'ajout du livre au favoris :")
      }
    },
    async removeToFavorites(book) {
      const toast = useToastStore()
      try {
        const response = await deleteFavorites(book.isbn)

        if (!response.success) {
          throw new Error('Erreur lors de la suppression du livre au favoris')
        }

        toast.success(response.message)
        await this.fetchFavorites()
      } catch (error) {
        console.error('Erreur lors de la suppression du livre au favoris:', error)
        toast.error(error.message || 'Erreur lors de la suppression du livre au favoris')
      }
    },
    async addToWishlist(book) {
      const toast = useToastStore()
      try {
        const response = await postWishlists(book.isbn)

        if (!response.success) {
          throw new Error("Erreur lors de l'ajout du livre en wishlist :")
        }

        toast.success(response.message)
        await this.fetchWishlists()
      } catch (error) {
        console.error("Erreur lors de l'ajout du livre en wishlist :", error)
        toast.error(error.message || "Erreur lors de l'ajout du livre en wishlist :")
      }
    },
    async removeToWishlist(book) {
      const toast = useToastStore()
      try {
        const response = await deleteWishlists(book.isbn)

        if (!response.success) {
          throw new Error('Erreur lors de la suppression du livre en wishlist')
        }

        toast.success(response.message)
        await this.fetchWishlists()
      } catch (error) {
        console.error('Erreur lors de la suppression du livre en wishlist:', error)
        toast.error(error.message || 'Erreur lors de la suppression du livre en wishlist')
      }
    },
    async createList(list) {
      const toast = useToastStore()
      try {
        const response = await createNewList(list)
        if (!response.success) {
          throw new Error('Erreur lors de la création de la liste')
        }

        toast.success(response.message)
        await this.fetchLists()
        return true
      } catch (error) {
        console.error('Erreur lors de la création de la liste:', error)
        toast.error(error.message || 'Erreur lors de la création de la liste')
        return false
      }
    },
    async deleteList(listId) {
      const toast = useToastStore()
      try {
        const response = await deleteUserList(listId)
        if (!response.success) {
          throw new Error('Erreur lors de la suppression de la liste')
        }
        toast.success(response.message)
        await this.fetchLists()
      } catch (error) {
        console.error('Erreur suppression liste :', error)
        toast.error(error.message || 'Erreur lors de la suppression de la liste')
      }
    },
    async updateList(listId, { userlistName, userlistDescription }) {
      const toast = useToastStore()
      try {
        const response = await updateUserList(listId, {
          userlistName,
          userlistDescription,
        })

        if (!response.success) {
          throw new Error('Erreur lors de la mise à jour de la liste')
        }

        toast.success(response.message || 'Liste mise à jour avec succès')
        await this.fetchLists()
        return true
      } catch (error) {
        console.error('Erreur updateList :', error)
        toast.error(error.message || 'Erreur lors de la mise à jour de la liste')
        return false
      }
    },

    async addToList(book, userlistId) {
      const toast = useToastStore()
      const payload = {
        userlistId: userlistId,
        isbn: book.isbn,
      }
      try {
        const response = await addBookToUserList(payload)
        if (!response.success) {
          throw new Error("Erreur lors de l'ajout du livre à la liste")
        }
        toast.success(response.message)
        this.fetchLists()
      } catch (error) {
        console.error('Erreur ajout livre à la liste :', error)
        toast.error(error.message || "Erreur lors de l'ajout du livre à la liste")
      }
    },
    async removeFromList(userlistId, isbn) {
      const toast = useToastStore()
      try {
        const response = await removeBookFromUserList(userlistId, isbn)
        if (!response.success) {
          throw new Error('Erreur lors de la suppression du livre de la liste')
        }
        toast.success(response.message)
        this.fetchLists()
      } catch (error) {
        console.error('Erreur suppression livre de la liste :', error)
        toast.error(error.message || 'Erreur lors de la suppression du livre de la liste')
      }
    },
  },
})
