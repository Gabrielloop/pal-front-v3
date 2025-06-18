import { defineStore } from 'pinia'
import {
  fetchUserLists,
  fetchUserFavorites,
  fetchUserWishlists,
  fetchUserReadings,
} from '@/api/list'
import { useToastStore } from '@/stores/toast'
import { addToFavorites, removeToFavorites, addToWishlists, removeToWishlists } from '@/api/list'

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
    hasLists: (state) => state.lists.length > 0,
    hasFavorites: (state) => state.favorites.length > 0,
    hasWishlists: (state) => state.wishlists.length > 0,
    hasReadings: (state) => state.readings.length > 0,
    countHasNotStartedReadings: (state) => {
      return state.readings.filter((reading) => !reading.isFinished).length
    },
    countHasStartedReadings: (state) => {
      return state.readings.filter((reading) => reading.isReading).length
    },
    countHasFinishedReadings: (state) => {
      return state.readings.filter((reading) => reading.isFinished === true).length
    },
    countHasNotFinishedReadings: (state) => {
      return state.readings.filter((reading) => !reading.isFinished).length
    },
    countHasAbandonedReadings: (state) => {
      return state.readings.filter((reading) => reading.isAbandoned).length
    },
    countHasNotAbandonedReadings: (state) => {
      return state.readings.filter((reading) => !reading.isAbandoned).length
    },

    hasComments: (state) => state.comments.length > 0,
    hasNotes: (state) => state.notes.length > 0,
    hasStars: (state) => (stars) => {
      return state.notes.some((note) => note.stars === stars)
    },
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
    async fetchAll() {
      await this.fetchLists()
      await this.fetchFavorites()
      await this.fetchWishlists()
      await this.fetchReadings()
    },
    decorateBooks(books) {
      return books.map((book) => {
        const isbn = book.isbn

        return {
          ...book,
          inFavorites: this.favorites.some((fav) => fav.isbn === isbn),
          inWishlist: this.wishlists.some((wish) => wish.isbn === isbn),
          // inUserLists: this.lists.some((list) => list.books?.some((b) => b.isbn === isbn)),
          inNotStarted: this.readings.some((r) => !r.isStarted && r.isbn === isbn),
          inReading: this.readings.some((r) => r.isReading && r.isbn === isbn),
          inFinished: this.readings.some((r) => r.isFinished && r.isbn === isbn),
          inAbandoned: this.readings.some((r) => r.isAbandoned && r.isbn === isbn),
        }
      })
    },
    async addToFavorites(book) {
      const toast = useToastStore()
      try {
        const response = await addToFavorites(book.isbn)

        if (!response.success) {
          throw new Error("Erreur lors de l'ajout du livre au favoris :")
        }

        toast.success(response.message)
        this.fetchLists()
        this.fetchFavorites()
      } catch (error) {
        console.error("Erreur lors de l'ajout du livre au favoris :", error)
        toast.error(error.message || "Erreur lors de l'ajout du livre au favoris :")
      }
    },
    async removeToFavorites(book) {
      const toast = useToastStore()
      try {
        const response = await removeToFavorites(book.isbn)

        if (!response.success) {
          throw new Error('Erreur lors de la suppression du livre au favoris')
        }

        toast.success(response.message)
        this.fetchLists()
        this.fetchFavorites()
      } catch (error) {
        console.error('Erreur lors de la suppression du livre au favoris:', error)
        toast.error(error.message || 'Erreur lors de la suppression du livre au favoris')
      }
    },
    async addToWishlists(book) {
      const toast = useToastStore()
      try {
        const response = await addToWishlists(book.isbn)

        if (!response.success) {
          throw new Error("Erreur lors de l'ajout du livre en wishlist :")
        }

        toast.success(response.message)
        this.fetchLists()
        this.fetchWishlists()
      } catch (error) {
        console.error("Erreur lors de l'ajout du livre en wishlist :", error)
        toast.error(error.message || "Erreur lors de l'ajout du livre en wishlist :")
      }
    },
    async removeToWishlists(book) {
      const toast = useToastStore()
      try {
        const response = await removeToWishlists(book.isbn)

        if (!response.success) {
          throw new Error('Erreur lors de la suppression du livre en wishlist')
        }

        toast.success(response.message)
        this.fetchLists()
        this.fetchWishlists()
      } catch (error) {
        console.error('Erreur lors de la suppression du livre en wishlist:', error)
        toast.error(error.message || 'Erreur lors de la suppression du livre en wishlist')
      }
    },
  },
})
