export const WISHLIST_FIELDS = ['isbn', 'userId']

export const WISHLIST_COLUMNS = [
  { key: 'isbn', label: 'Isbn', type: 'text' },
  { key: 'userId', label: 'Utilisateur', type: 'number' },
]

export function createWishlist(data) {
  if (!data?.isbn || !data?.userId) {
    throw new Error('Invalid wishlist data')
  }
  return {
    isbn: data.isbn,
    userId: data.userId,
    key: `${data.isbn}-${data.userId}`,
  }
}

export const makePayload = (item) =>
  Object.fromEntries(WISHLIST_FIELDS.map((key) => [key, item[key]]))

export const isValidWishlist = ({ isbn, userId }) => !!isbn && !!userId

export const getWishlistKey = (isbn, userId) => `${isbn}-${userId}`
