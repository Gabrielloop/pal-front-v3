export const BOOK_FIELDS = ['isbn', 'bookTitle', 'bookAuthor', 'bookPublisher', 'bookYear']

export const BOOK_COLUMNS = [
  { key: 'isbn', label: 'Isbn', type: 'text' },
  { key: 'bookTitle', label: 'Titre', type: 'text' },
  { key: 'bookAuthor', label: 'Auteur', type: 'text' },
  { key: 'bookPublisher', label: 'Éditeur', type: 'text' },
  { key: 'bookYear', label: 'Année', type: 'number' },
]

// Fabrique un livre enrichi
export function createBook(data) {
  if (!data?.isbn) {
    throw new Error('Invalid book data')
  }
  return {
    isbn: data.isbn,
    bookTitle: data.bookTitle ?? '',
    bookAuthor: data.bookAuthor ?? '',
    bookPublisher: data.bookPublisher ?? '',
    bookYear: data.bookYear ?? null,
    key: `${data.isbn}`,
  }
}

// Prépare le payload pour l’API
export const makePayload = (book) => Object.fromEntries(BOOK_FIELDS.map((key) => [key, book[key]]))

// Vérifie si un livre est valide
export const isValidBook = ({ isbn, bookTitle, bookAuthor, bookPublisher, bookYear }) =>
  !!isbn && !!bookTitle && !!bookAuthor && !!bookPublisher && !!bookYear

// Clé unique
export const getBookKey = (isbn) => `${isbn}`
