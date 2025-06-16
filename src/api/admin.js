import { apiFetch } from './http'

// Endpoints Users

export async function userCollection() {
  return apiFetch('/users', {
    method: 'GET',
  })
}

export async function userUpdate(payload, userId) {
  return apiFetch(`/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export async function userDelete(userId) {
  return apiFetch(`/users/${userId}`, {
    method: 'DELETE',
  })
}
