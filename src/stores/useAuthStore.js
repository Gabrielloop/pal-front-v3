import { defineStore } from 'pinia'
import { loginRequest, logoutRequest } from '@/api/auth'
import { switchIsDarkMode, updateUser } from '@/api/user'
import { useToastStore } from '@/stores/toast'
import { useListStore } from '@/stores/useListStore'
import { useSectionsStore } from '@/stores/useSectionsStore'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
  },
  actions: {
    async login(credentials) {
      const listStore = useListStore()
      const toast = useToastStore()

      try {
        const data = await loginRequest(credentials)

        this.token = data.accessToken
        this.user = data.user

        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('user', JSON.stringify(data.user))

        toast.success('Bonjour ' + this.user.name)

        // Charger les données utilisateur
        await listStore.fetchLists()

        console.log('User connecté :', this.user)
      } catch (err) {
        toast.warn('Connexion échoué')
        console.error(err)
        throw err
      }
    },
    async updateDarkMode(value) {
      console.log('[updateDarkMode] called with:', value)

      // appliquer immédiatement pour éviter le flash
      document.documentElement.classList.toggle('dark', value)

      // mise à jour locale
      if (this.user) {
        this.user = { ...this.user, isDarkMode: value }
        localStorage.setItem('user', JSON.stringify(this.user))
      }

      try {
        const data = await switchIsDarkMode(value)

        this.user = { ...this.user, isDarkMode: data.data.isDarkMode }
        document.documentElement.classList.toggle('dark', data.data.isDarkMode)
        localStorage.setItem('user', JSON.stringify(this.user))
      } catch (err) {
        console.error('Erreur API dark mode :', err)
        this.user = { ...this.user, isDarkMode: !value }
        document.documentElement.classList.toggle('dark', !value)
        localStorage.setItem('user', JSON.stringify(this.user))
      }
    },
    async updateProfile(payload) {
      try {
        const response = await updateUser(payload)

        const updatedUser = response.data
        this.user = updatedUser
        localStorage.setItem('user', JSON.stringify(this.user))

        console.log('[updateProfile] Profil mis à jour :', updatedUser)
      } catch (err) {
        console.error('[updateProfile] Échec de la mise à jour :', err)
        throw err
      }
    },
    logout: async function () {
      const router = useRouter()
      const toast = useToastStore()
      try {
        await logoutRequest()
      } catch (err) {
        toast.warn('Déconnexion impossible')
        console.error('Erreur logout :', err)
      } finally {
        toast.success('À bientôt ' + (this.user?.name ?? ''))

        // Vider les données utilisateur
        const listStore = useListStore()
        const sectionsStore = useSectionsStore()
        listStore.$reset()
        sectionsStore.$reset()

        // Réinitialiser l'état
        this.token = null
        this.user = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    },
    restore: async function () {
      const listStore = useListStore()

      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')

      if (token && user) {
        this.token = token
        this.user = JSON.parse(user)
        // Charger les données utilisateur
        await listStore.fetchLists()
      }
    },
  },
})
