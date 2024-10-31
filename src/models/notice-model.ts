export type Notice = {
  id: string
  title: string
  body: string
  author: string
  imageUrl?: string
  userId: string
  createdAt: Date
}

export type NoticeCreate = Omit<Notice, 'id' | 'createdAt'>
