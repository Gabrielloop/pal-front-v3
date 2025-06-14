import { apiFetch } from './http'

export async function fetchUserLists() {
  return apiFetch('/userlists', {
    method: 'GET',
  })
}
