import { apiFetch } from '@/api/http'

export async function searchByQuery(query, page = 1) {
  try {
    const response = await apiFetch(`/bnf?query=${encodeURIComponent(query)}&page=${page}`)
    return Array.isArray(response.data) ? response.data : []
  } catch (error) {
    return []
  }
}

export async function searchByISBNs(isbns) {
  const books = []
  for (const isbn of isbns) {
    const result = await searchByQuery(isbn, 1)
    books.push(...result)
  }
  return books
}
