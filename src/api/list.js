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

export async function createNewList(list) {
  return apiFetch('/userlists', {
    method: 'POST',
    body: JSON.stringify(list),
  })
}

export async function deleteUserList(listId) {
  return apiFetch(`/userlists/id/${listId}`, {
    method: 'DELETE',
  })
}

export async function addBookToUserList(payload) {
  return apiFetch(`/userlistBooks`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function removeBookFromUserList(userlist, bookId) {
  return apiFetch(`/userlistBooks/${userlist}/${bookId}`, {
    method: 'DELETE',
  })
}
