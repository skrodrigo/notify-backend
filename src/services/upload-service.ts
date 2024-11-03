import { supabase } from '../config/supabase'

export class UploadService {
  private readonly bucketName = 'notify'
  private readonly allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
  ]

  async generatePresignedUrl(
    fileName: string,
    contentType: string
  ): Promise<{
    uploadUrl: string
    publicUrl: string
  }> {
    if (!this.allowedMimeTypes.includes(contentType)) {
      throw new Error('Invalid content type')
    }

    const fileExt = fileName.split('.').pop()?.toLowerCase()
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `public/${uniqueFileName}`

    const { data, error } = await supabase.storage
      .from(this.bucketName)
      .createSignedUploadUrl(filePath)

    if (error) {
      throw new Error(`Error generating upload URL: ${error.message}`)
    }

    if (!data) {
      throw new Error('No data returned from Supabase')
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(this.bucketName).getPublicUrl(filePath)

    return {
      uploadUrl: data.signedUrl,
      publicUrl,
    }
  }
}
