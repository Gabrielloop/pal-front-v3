import { apiFetch } from './http'

export async function fetchUserLists() {
  return apiFetch('/userlists', {
    method: 'GET',
  })
}

export async function createNewList(list) {
  return apiFetch('/userlists', {
    method: 'POST',
    body: JSON.stringify(list),
  })
}

export async function updateUserList(listId, data) {
  return apiFetch(`/userlists/id/${listId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export async function deleteUserList(listId) {
  return apiFetch(`/userlists/id/${listId}`, {
    method: 'DELETE',
  })
}

export async function fetchUserFavorites() {
  return apiFetch('/favorites', {
    method: 'GET',
  })
}

export async function fetchUserWishlists() {
  return apiFetch('/wishlists', {
    method: 'GET',
  })
}

export async function fetchUserReadings() {
  return apiFetch('/reading/collection', {
    method: 'GET',
  })
}

export async function fetchUserComments() {
  return apiFetch('/comments', {
    method: 'GET',
  })
}

export async function fetchUserNotes() {
  return apiFetch('/notes', {
    method: 'GET',
  })
}
