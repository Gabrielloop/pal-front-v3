export const FAVORITE_FIELDS = ['isbn', 'userId']

export const FAVORITE_COLUMNS = [
  { key: 'isbn', label: 'Isbn', type: 'text' },
  { key: 'userId', label: 'Utilisateur', type: 'number' },
]

export function createFavorite(data) {
  if (!data?.isbn || !data?.userId) {
    throw new Error('Invalid favorite data')
  }
  return {
    isbn: data.isbn,
    userId: data.userId,
    key: `${data.isbn}-${data.userId}`,
  }
}

export const makePayload = (item) =>
  Object.fromEntries(FAVORITE_FIELDS.map((key) => [key, item[key]]))

export const isValidFavorite = ({ isbn, userId }) => !!isbn && !!userId

export const getFavoriteKey = (isbn, userId) => `${isbn}-${userId}`
