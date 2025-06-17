export const READING_FIELDS = [
  'isbn',
  'userId',
  'readingContent',
  'isStarted',
  'isFinished',
  'isAbandoned',
  'isReading',
]

export const READING_COLUMNS = [
  { key: 'isbn', label: 'Isbn', type: 'text' },
  { key: 'userId', label: 'Utilisateur', type: 'number' },
  { key: 'readingContent', label: 'Avancement', type: 'text' },
  { key: 'isStarted', label: 'Commencé', type: 'checkbox' },
  { key: 'isFinished', label: 'Terminé', type: 'checkbox' },
  { key: 'isAbandoned', label: 'Abandonné', type: 'checkbox' },
  { key: 'isReading', label: 'En cours', type: 'checkbox' },
]

export function createReading(data) {
  if (!data?.isbn || !data?.userId) {
    throw new Error('Invalid reading data')
  }
  return {
    isbn: data.isbn,
    userId: data.userId,
    readingContent: data.readingContent ?? '',
    isStarted: !!data.isStarted,
    isFinished: !!data.isFinished,
    isAbandoned: !!data.isAbandoned,
    isReading: !!data.isReading,
    key: `${data.isbn}-${data.userId}`,
  }
}

export const makePayload = (reading) =>
  Object.fromEntries(READING_FIELDS.map((key) => [key, reading[key]]))

export const isValidReading = ({ isbn, userId }) => !!isbn && !!userId

export const getReadingKey = (isbn, userId) => `${isbn}-${userId}`
