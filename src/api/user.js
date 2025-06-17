import { apiFetch } from './http'

export async function switchIsDarkMode(value) {
  return apiFetch('/users/me', {
    method: 'PUT',
    body: JSON.stringify({ isDarkMode: value }),
  })
}

export async function updateUser(payload) {
  return apiFetch('/users/me', {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}
