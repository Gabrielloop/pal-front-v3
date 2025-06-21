export const BOOK_FIELDS = ['isbn', 'title', 'author', 'publisher', 'year']

export const BOOK_COLUMNS = [
  { key: 'isbn', label: 'Isbn', type: 'text' },
  { key: 'title', label: 'Titre', type: 'text' },
  { key: 'author', label: 'Auteur', type: 'text' },
  { key: 'publisher', label: 'Éditeur', type: 'text' },
  { key: 'year', label: 'Année', type: 'number' },
]

// Fabrique un livre enrichi
export function createBook(data) {
  if (!data?.isbn) {
    throw new Error('Invalid book data')
  }
  return {
    isbn: data.isbn,
    title: data.title ?? '',
    author: data.author ?? '',
    publisher: data.publisher ?? '',
    year: data.year ?? null,
    key: `${data.isbn}`,
  }
}

// Prépare le payload pour l’API
export const makePayload = (book) => Object.fromEntries(BOOK_FIELDS.map((key) => [key, book[key]]))

// Vérifie si un livre est valide
export const isValidBook = ({ isbn, title, author, publisher, year }) =>
  !!isbn && !!title && !!author && !!publisher && !!year

// Clé unique
export const getBookKey = (isbn) => `${isbn}`
