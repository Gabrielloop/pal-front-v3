import { useAuthStore } from '@/stores/useAuthStore'

export async function apiFetch(path, options = {}) {
  const auth = useAuthStore()
  const baseUrl = import.meta.env.VITE_API_BASE_URL

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }

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

  if (response.status === 401) {
    throw new Error('Session expirée. Veuillez vous reconnecter.')
  }

  if (!data.success || !response.ok) {
    throw new Error(data.message || 'Erreur API')
  }

  return data
}
