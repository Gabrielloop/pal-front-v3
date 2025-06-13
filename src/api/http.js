import { useAuthStore } from '@/store/auth'

// Construction de la requete



export async function apiFetch(path, options = {}) {
    // Vérification des paramètres
    const auth = useAuthStore()
    console.log('Token actuel:', auth.token)
    // Lien de l'API
    const baseUrl = import.meta.env.VITE_API_BASE_URL

    // Définition du header
    const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    }

    // Ajout du token dans la requete
    if (auth.token) {
        headers['Authorization'] = `Bearer ${auth.token}`
    }

    const response = await fetch(`${baseUrl}${path}`, {
        ...options,
        headers,
    })

    let data = {}

    try {
        data = await response.json()
      } catch (e) {
        throw new Error('Erreur de parsing JSON')
      }
    
      if (!data.success || !response.ok) {
        throw new Error(data.message || 'Erreur API')
      }
    
      return data
}
