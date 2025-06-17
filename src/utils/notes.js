export const NOTE_FIELDS = ['isbn', 'userId', 'noteContent']

export const NOTE_COLUMNS = [
  { key: 'isbn', label: 'Isbn', type: 'text' },
  { key: 'userId', label: 'Utilisateur', type: 'number' },
  { key: 'noteContent', label: 'Note', type: 'text' },
]

export function createNote(data) {
  if (!data?.isbn || !data?.userId) {
    throw new Error('Invalid note data')
  }
  return {
    isbn: data.isbn,
    userId: data.userId,
    noteContent: data.noteContent ?? '',
    key: `${data.isbn}-${data.userId}`,
  }
}

export const makePayload = (note) => Object.fromEntries(NOTE_FIELDS.map((key) => [key, note[key]]))

export const isValidNote = ({ isbn, userId, noteContent }) =>
  !!isbn && !!userId && !!noteContent?.trim()

export const getNoteKey = (isbn, userId) => `${isbn}-${userId}`
