import { defineStore } from 'pinia'

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
        // Remplace cette URL par celle de ton backend
        const response = await fetch('http://127.0.0.1:8000/api/user/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials),
        })

        const data = await response.json()
        
        if (!response.ok) throw new Error(data.message || 'Échec de la connexion')

        this.token = data.token
        this.user = data.user

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    logout: async function () {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/user/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.token}`,
            },
          })
      
          const data = await response.json()
      
          if (!response.ok) {
            throw new Error(data.message || 'Échec de la déconnexion')
          }
      
        } catch (err) {
          console.error('Erreur logout :', err)
          // on peut choisir d'ignorer l'erreur ici pour forcer la déconnexion locale
        } finally {
          this.token = null
          this.user = null
          localStorage.removeItem('token')
          localStorage.removeItem('user')
        }
      },
    restore() {
      const token = localStorage.getItem('token')
      const user = localStorage.getItem('user')
      if (token && user) {
        this.token = token
        this.user = JSON.parse(user)
      }
    },
  },
})
