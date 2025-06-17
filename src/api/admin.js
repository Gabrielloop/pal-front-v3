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
