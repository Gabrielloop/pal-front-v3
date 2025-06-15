import { defineStore } from 'pinia'
import { fetchUserLists } from '@/api/list'
import { useToastStore } from '@/stores/toast'

export const useListStore = defineStore('listStore', {
  state: () => ({
    lists: [],
    isLoading: false,
  }),

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
  },
})
