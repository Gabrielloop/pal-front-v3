export const USERLIST_BOOK_FIELDS = ['userlistId', 'isbn']

export const USERLIST_BOOK_COLUMNS = [
  { key: 'userlistId', label: 'Liste Id', type: 'number' },
  { key: 'isbn', label: 'ISBN', type: 'text' },
]

export function createUserlistBook(data) {
  if (!data?.userlistId || !data?.isbn) {
    throw new Error('Invalid userlist-book data')
  }
  return {
    userlistId: data.userlistId,
    isbn: data.isbn,
    key: `${data.userlistId}-${data.isbn}`,
  }
}

export const makePayload = (item) =>
  Object.fromEntries(USERLIST_BOOK_FIELDS.map((key) => [key, item[key]]))

export const isValidUserlistBook = ({ userlistId, isbn }) => !!userlistId && !!isbn

export const getUserlistBookKey = (userlistId, isbn) => `${userlistId}-${isbn}`
