import { z } from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export const uploadSchema = z.object({
  fileName: z
    .string()
    .min(1, 'File name is required')
    .regex(
      /\.(jpg|jpeg|png|gif|webp)$/i,
      'File must be a valid image (jpg, jpeg, png, gif, webp)'
    ),
  fileSize: z
    .number()
    .max(
      MAX_FILE_SIZE,
      `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`
    ),
  contentType: z
    .string()
    .regex(
      /^image\/(jpeg|png|gif|webp)$/i,
      'Invalid image type. Must be jpeg, png, gif or webp'
    ),
})

export type UploadSchemaType = z.infer<typeof uploadSchema>
