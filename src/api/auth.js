import { apiFetch } from './http'

export async function loginRequest(credentials) {
  return apiFetch('/user/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}

export async function logoutRequest() {
  return apiFetch('/users/logout', {
    method: 'POST',
  })
}
