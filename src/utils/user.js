export const USER_FIELDS = ['id', 'name', 'email', 'password', 'role', 'isDarkMode']

export const USER_COLUMNS = [
  { key: 'id', label: 'ID', type: 'number' },
  { key: 'name', label: 'Nom', type: 'text' },
  { key: 'email', label: 'Email', type: 'email' },
  { key: 'password', label: 'Mot de passe', type: 'password' },
  { key: 'role', label: 'Rôle', type: 'text' },
  { key: 'isDarkMode', label: 'Dark Mode', type: 'checkbox' },
]

export function createUser(data) {
  if (!data?.id) {
    throw new Error('Invalid user data')
  }
  return {
    id: data.id,
    name: data.name ?? '',
    email: data.email ?? '',
    password: data.password ?? '',
    role: data.role ?? '',
    isDarkMode: !!data.isDarkMode,
    key: `${data.id}`,
  }
}

export const makePayload = (user) => Object.fromEntries(USER_FIELDS.map((key) => [key, user[key]]))

export const isValidUser = ({ id, name, email }) => !!id && !!name?.trim() && !!email?.trim()

export const getUserKey = (id) => `${id}`
