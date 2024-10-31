export type User = {
  id: string
  name: string
  email: string
  password: string
  createdAt: Date
}

export type UserCreate = Omit<User, 'id' | 'createdAt'>
