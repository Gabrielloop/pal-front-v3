import { defineStore } from 'pinia'
import { fetchUserLists } from '@/api/list'
import { useToastStore } from '@/stores/toast'

const toast = useToastStore()

export const useListStore = defineStore('listStore', {
  state: () => ({
    lists: [],
    isLoading: false,
  }),

  actions: {
    async fetchLists() {
      this.isLoading = true
      try {
        const json = await fetchUserLists()
        if (json.success) {
          this.lists = json.data
        }
      } catch (err) {
        toast.error(json.message || 'Erreur lors de la récupération des listes')
        console.error('Erreur fetchLists :', err)
      } finally {
        this.isLoading = false
      }
    },
  },
})
