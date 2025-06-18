import { apiFetch } from './http'

export async function fetchUserLists() {
  return apiFetch('/userlists', {
    method: 'GET',
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
  return apiFetch('/reading/all', {
    method: 'GET',
  })
}

// export async function fetchUserComments() {
//   return apiFetch('/comments', {
//     method: 'GET',
//   })
// }

// export async function fetchUserNotes() {
//   return apiFetch('/notes', {
//     method: 'GET',
//   })
// }

// export async function addToUserList(listId, bookId) {
//   return apiFetch(`/userlists/${listId}/books/${bookId}`, {
//     method: 'POST',
//   })
// }
export async function addToFavorites(bookId) {
  return apiFetch(`/favorites/isbn/${bookId}`, {
    method: 'POST',
  })
}
export async function removeToFavorites(bookId) {
  return apiFetch(`/favorites/isbn/${bookId}`, {
    method: 'DELETE',
  })
}

export async function addToWishlists(bookId) {
  return apiFetch(`/wishlists/isbn/${bookId}`, {
    method: 'POST',
  })
}
export async function removeToWishlists(bookId) {
  return apiFetch(`/wishlists/isbn/${bookId}`, {
    method: 'DELETE',
  })
}
