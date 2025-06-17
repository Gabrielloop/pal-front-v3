import { apiFetch } from './http'

export async function usersCollection() {
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

export async function booksCollection() {
  return apiFetch('/books/all', {
    method: 'GET',
  })
}

export async function bookCreate(payload) {
  return apiFetch('/books', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function bookUpdate(payload, bookIsbn) {
  return apiFetch(`/books/isbn/${bookIsbn}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export async function bookDelete(bookId) {
  return apiFetch(`/books/isbn/${bookId}`, {
    method: 'DELETE',
  })
}

export async function commentsCollection() {
  return apiFetch('/comments/all', {
    method: 'GET',
  })
}

export async function commentUpdate(payload, userId, bookId) {
  return apiFetch(`/comments/userid/${userId}/${bookId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export async function commentDelete(userId, bookId) {
  return apiFetch(`/comments/userid/${userId}/${bookId}`, {
    method: 'DELETE',
  })
}

export async function favoritesCollection() {
  return apiFetch('/favorites/collection', {
    method: 'GET',
  })
}

export async function favoriteDelete(userId, bookId) {
  return apiFetch(`/favorites/userid/${userId}/${bookId}`, {
    method: 'DELETE',
  })
}

export async function wishlistsCollection() {
  return apiFetch('/wishlists/collection', {
    method: 'GET',
  })
}

export async function wishlistDelete(userId, bookId) {
  return apiFetch(`/wishlists/userid/${userId}/${bookId}`, {
    method: 'DELETE',
  })
}

export async function userlistsCollection() {
  return apiFetch('/userlists/all', {
    method: 'GET',
  })
}

export async function userlistUpdate(payload, userlistid) {
  return apiFetch(`/userlists/userlistid/${userlistid}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export async function userlistDelete(userlistid) {
  return apiFetch(`/userlists/userlistid/${userlistid}`, {
    method: 'DELETE',
  })
}

export async function userlistBooksCollection() {
  return apiFetch('/userlistBooks/collection', {
    method: 'GET',
  })
}

export async function userlistBookDelete(userlistId, bookId) {
  return apiFetch(`/userlistBooks/userlistid/${userlistId}/${bookId}`, {
    method: 'DELETE',
  })
}

export async function notesCollection() {
  return apiFetch('/notes/all', {
    method: 'GET',
  })
}

export async function noteUpdate(payload, userId, bookId) {
  return apiFetch(`/notes/userid/${userId}/${bookId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export async function noteDelete(userId, bookId) {
  return apiFetch(`/notes/userid/${userId}/${bookId}`, {
    method: 'DELETE',
  })
}

export async function readingsCollection() {
  return apiFetch('/readings/all', {
    method: 'GET',
  })
}

export async function readingUpdate(payload, userId, bookId) {
  return apiFetch(`/readings/userid/${userId}/${bookId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export async function readingDelete(userId, bookId) {
  return apiFetch(`/readings/userid/${userId}/${bookId}`, {
    method: 'DELETE',
  })
}
