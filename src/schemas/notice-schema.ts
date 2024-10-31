import { z } from 'zod'

const imageUrlSchema = z
  .string()
  .url('Image URL must be a valid URL')
  .refine(
    url => {
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
      return imageExtensions.some(ext => url.toLowerCase().endsWith(ext))
    },
    {
      message:
        'URL must end with a valid image extension (.jpg, .jpeg, .png, .gif, .webp)',
    }
  )

export const createNoticeSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  body: z.string().min(10, 'Body must be at least 10 characters'),
  author: z.string().min(2, 'Author must be at least 2 characters'),
  imageUrl: imageUrlSchema.optional(),
})

export const updateNoticeSchema = createNoticeSchema.partial()
