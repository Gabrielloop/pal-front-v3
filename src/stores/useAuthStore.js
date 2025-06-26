import { defineStore } from 'pinia'
import { loginRequest, logoutRequest } from '@/api/auth'
import { switchIsDarkMode, updateUser } from '@/api/user'
import { useToastStore } from '@/stores/toast'
import { useListStore } from '@/stores/useListStore'
import { useSectionsStore } from '@/stores/useSectionsStore'

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
      const toast = useToastStore()

      try {
        const data = await loginRequest(credentials)

        this.token = data.accessToken
        this.user = data.user

        localStorage.setItem('token', data.accessToken)
        localStorage.setItem('user', JSON.stringify(data.user))

        toast.success('Bonjour ' + this.user.name)
      } catch (err) {
        toast.warn('Connexion échouée')

        throw err
      }
    },
    async updateDarkMode(value) {
      const toast = useToastStore()
      document.documentElement.classList.toggle('dark', value)

      if (this.user) {
        this.user = { ...this.user, isDarkMode: value }

        localStorage.setItem('user', JSON.stringify(this.user))
      }

      try {
        const data = await switchIsDarkMode(value)

        this.user = { ...this.user, isDarkMode: data.data.isDarkMode }
        document.documentElement.classList.toggle('dark', data.data.isDarkMode)
        toast.success('Changement de mode enregistré')
        localStorage.setItem('user', JSON.stringify(this.user))
      } catch (err) {
        console.error('Erreur API dark mode :', err)
        this.user = { ...this.user, isDarkMode: !value }
        document.documentElement.classList.toggle('dark', !value)
        toast.warn('Erreur lors du changement de mode')
        localStorage.setItem('user', JSON.stringify(this.user))
      }
    },
    async updateProfile(payload) {
      const toast = useToastStore()
      try {
        const response = await updateUser(payload)

        const updatedUser = response.data
        this.user = updatedUser
        localStorage.setItem('user', JSON.stringify(this.user))
        toast.success('Profil mis à jour avec succès')
      } catch (err) {
        console.error('[updateProfile] Échec de la mise à jour :', err)
        toast.warn('Échec de la mise à jour du profil')
        throw err
      }
    },
    logout: async function () {
      const toast = useToastStore()
      try {
        await logoutRequest()
      } catch (err) {
        toast.warn('Déconnexion impossible')
      } finally {
        toast.success('À bientôt ' + (this.user?.name ?? ''))

        const listStore = useListStore()
        const sectionsStore = useSectionsStore()
        listStore.$reset()
        sectionsStore.$reset()

        this.token = null
        this.user = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    },
    restore: async function () {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')

      if (token && user) {
        this.token = token
        this.user = JSON.parse(user)
      }
    },
  },
})
