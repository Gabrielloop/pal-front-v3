export const COMMENT_FIELDS = ['isbn', 'userId', 'commentContent']

export const COMMENT_COLUMNS = [
  { key: 'isbn', label: 'Isbn', type: 'text' },
  { key: 'userId', label: 'Utilisateur', type: 'number' },
  { key: 'commentContent', label: 'Commentaire', type: 'text' },
]

// Fabrique un commentaire enrichi
export function createComment(data) {
  if (!data?.isbn || !data?.userId) {
    throw new Error('Invalid comment data')
  }
  return {
    isbn: data.isbn,
    userId: data.userId,
    commentContent: data.commentContent ?? '',
    key: `${data.isbn}-${data.userId}`,
  }
}

// Prépare le payload pour l’API
export const makePayload = (comment) =>
  Object.fromEntries(COMMENT_FIELDS.map((key) => [key, comment[key]]))

// Vérifie si un commentaire est valide
export const isValidComment = ({ isbn, userId, commentContent }) =>
  !!isbn && !!userId && !!commentContent?.trim()

// Clé unique
export const getCommentKey = (isbn, userId) => `${isbn}-${userId}`
