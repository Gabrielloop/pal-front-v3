import { defineStore } from 'pinia'
import { loginRequest, logoutRequest } from '@/api/auth'
import { fetchUserLists } from '@/api/list'
import { useToastStore } from '@/stores/toast'

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
      try {
        const data = await loginRequest(credentials)

        this.token = data.access_token
        this.user = data.user

        localStorage.setItem('token', data.access_token)
        localStorage.setItem('user', JSON.stringify(data.user))

        const toast = useToastStore()
        toast.success('Bonjour ' + this.user.name)

        // Charger les données utilisateur
        await fetchUserLists()
      } catch (err) {
        const toast = useToastStore()
        toast.warn('Connexion échoué')
        console.error(err)
        throw err
      }
    },
    logout: async function () {
      try {
        await logoutRequest()
      } catch (err) {
        const toast = useToastStore()
        toast.warn('Déconnexion impossible')
        console.error('Erreur logout :', err)
      } finally {
        const toast = useToastStore()
        toast.success('À bientôt ' + (this.user?.name ?? ''))

        this.token = null
        this.user = null
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      }
    },
    restore() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')

      console.log('[AUTH RESTORE]', { token, user })

      if (token && user) {
        this.token = token
        this.user = JSON.parse(user)
        // Charger les données utilisateur
        fetchUserLists()
      }
    },
  },
})
