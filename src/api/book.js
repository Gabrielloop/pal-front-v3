import { apiFetch } from './http'

export async function postFavorites(bookId) {
  return apiFetch(`/favorites/isbn/${bookId}`, {
    method: 'POST',
  })
}
export async function deleteFavorites(bookId) {
  return apiFetch(`/favorites/isbn/${bookId}`, {
    method: 'DELETE',
  })
}

export async function postWishlists(bookId) {
  return apiFetch(`/wishlists/isbn/${bookId}`, {
    method: 'POST',
  })
}
export async function deleteWishlists(bookId) {
  return apiFetch(`/wishlists/isbn/${bookId}`, {
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

export async function addOrUpdateComment(payload) {
  return apiFetch(`/comments`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function addOrUpdateNote(payload, isbn) {
  return apiFetch(`/notes/isbn/${isbn}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function postReadingAdd(isbn, payload) {
  return apiFetch(`/reading/add/${isbn}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function postReadingSet(isbn, payload) {
  return apiFetch(`/reading/set/${isbn}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function postReadingAbandon(isbn) {
  return apiFetch(`/reading/abandon/${isbn}`, {
    method: 'POST',
  })
}
