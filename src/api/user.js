import { apiFetch } from './http'

export async function switchIsDarkMode(value) {
  console.log('[API] switchIsDarkMode called with:', value)
  return apiFetch('/users/me', {
    method: 'PUT',
    body: JSON.stringify({ isDarkMode: value }),
  })
}

export async function updateUser(payload) {
  console.log('[API] updateUser called with:', payload)
  return apiFetch('/users/me', {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}
