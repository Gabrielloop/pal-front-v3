import { apiFetch } from './http'

// GET USERS COLLECTION
export async function usersCollection() {
  return apiFetch('/users', {
    method: 'GET',
  })
}

// PUT USER UPDATE
export async function userUpdate(payload, userId) {
  return apiFetch(`/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

// DELETE USER
export async function userDelete(userId) {
  return apiFetch(`/users/${userId}`, {
    method: 'DELETE',
  })
}

// GET BOOKS COLLECTION
export async function booksCollection() {
  return apiFetch('/books/all', {
    method: 'GET',
  })
}

// POST BOOK CREATE
export async function bookCreate(payload) {
  return apiFetch('/books', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

// PUT BOOK UPDATE
export async function bookUpdate(payload, bookId) {
  return apiFetch(`/books/isbn/${bookId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

// DELETE BOOK
export async function bookDelete(bookId) {
  return apiFetch(`/books/isbn/${bookId}`, {
    method: 'DELETE',
  })
}

// GET COMMENTS COLLECTION
export async function commentsCollection() {
  return apiFetch('/comments/all', {
    method: 'GET',
  })
}

// PUT COMMENT UPDATE
export async function commentUpdate(payload, userId, bookId) {
  return apiFetch(`/comments/userid/${userId}/${bookId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

// DELETE COMMENT
export async function commentDelete(userId, bookId) {
  return apiFetch(`/comments/userid/${userId}/${bookId}`, {
    method: 'DELETE',
  })
}

// GET FAVORITE COLLECTION
export async function favoritesCollection() {
  return apiFetch('/favorites/all', {
    method: 'GET',
  })
}

// DELETE FAVORITE
export async function favoriteDelete(userId, bookId) {
  return apiFetch(`/favorites/userid/${userId}/${bookId}`, {
    method: 'DELETE',
  })
}

// GET WISHLIST COLLECTION
export async function wishlistCollection() {
  return apiFetch('/wishlists/all', {
    method: 'GET',
  })
}

// DELETE WISHLIST ITEM
export async function wishlistDelete(userId, bookId) {
  return apiFetch(`/wishlists/userid/${userId}/${bookId}`, {
    method: 'DELETE',
  })
}

// GET USERLISTS COLLECTION
export async function userlistsCollection() {
  return apiFetch('/userlists/all', {
    method: 'GET',
  })
}

// PUT USERLIST UPDATE
export async function userlistUpdate(payload, userId, userlistid) {
  return apiFetch(`/userlists/userid/${userId}/${userlistid}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

// DELETE USERLIST
export async function userlistDelete(userId, bookId) {
  return apiFetch(`/userlists/userid/${userId}/${bookId}`, {
    method: 'DELETE',
  })
}

// GET USERLISTBOOK COLLECTION
export async function userlistbooksCollection() {
  return apiFetch('/userlistbooks/all', {
    method: 'GET',
  })
}

// PUT USERLISTBOOK UPDATE
export async function userlistbookUpdate(payload, userId, userlistid) {
  return apiFetch(`/userlistbooks/userid/${userId}/${userlistid}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

// DELETE USERLISTBOOK
export async function userlistbookDelete(userId, bookId) {
  return apiFetch(`/userlistbooks/userid/${userId}/${bookId}`, {
    method: 'DELETE',
  })
}

// GET NOTES COLLECTION
export async function notesCollection() {
  return apiFetch('/notes/all', {
    method: 'GET',
  })
}
// DELETE NOTE
export async function noteDelete(userId, bookId) {
  return apiFetch(`/notes/userid/${userId}/${bookId}`, {
    method: 'DELETE',
  })
}

// GET READING COLLECTION
export async function readingCollection() {
  return apiFetch('/readings/all', {
    method: 'GET',
  })
}

// PUT READING UPDATE
export async function readingUpdate(payload, userId, bookId) {
  return apiFetch(`/readings/userid/${userId}/${bookId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

// DELETE READING
export async function readingDelete(userId, bookId) {
  return apiFetch(`/readings/userid/${userId}/${bookId}`, {
    method: 'DELETE',
  })
}
