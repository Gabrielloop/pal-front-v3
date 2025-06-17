export const USERLIST_FIELDS = [
  'userlistId',
  'userId',
  'userlistName',
  'userlistDescription',
  'userlistType',
]

export const USERLIST_COLUMNS = [
  { key: 'userlistId', label: 'ID', type: 'number' },
  { key: 'userId', label: 'Utilisateur', type: 'number' },
  { key: 'userlistName', label: 'Nom', type: 'text' },
  { key: 'userlistDescription', label: 'Description', type: 'text' },
  { key: 'userlistType', label: 'Type', type: 'text' },
]

export function createUserlist(data) {
  if (!data?.userlistId) {
    throw new Error('Invalid userlist data')
  }
  return {
    userlistId: data.userlistId,
    userId: data.userId ?? null,
    userlistName: data.userlistName ?? '',
    userlistDescription: data.userlistDescription ?? '',
    userlistType: data.userlistType ?? '',
    key: `${data.userlistId}`,
  }
}

export const makePayload = (userlist) =>
  Object.fromEntries(USERLIST_FIELDS.map((key) => [key, userlist[key]]))

export const isValidUserlist = ({ userlistId, userlistName }) =>
  !!userlistId && !!userlistName?.trim()

export const getUserlistKey = (userlistId) => `${userlistId}`
