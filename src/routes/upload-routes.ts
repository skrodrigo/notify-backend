import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { uploadSchema } from '../schemas/upload-schema'
import { UploadService } from '../services/upload-service'

export async function uploadRoutes(app: FastifyInstance) {
  const uploadService = new UploadService()

  app.post(
    '/presigned-url',
    {
      onRequest: [app.authenticate],
      schema: {
        body: {
          type: 'object',
          required: ['fileName', 'fileSize', 'contentType'],
          properties: {
            fileName: { type: 'string' },
            fileSize: { type: 'number' },
            contentType: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const uploadData = uploadSchema.parse(request.body)
        const urls = await uploadService.generatePresignedUrl(
          uploadData.fileName,
          uploadData.contentType
        )
        return reply.send(urls)
      } catch (error) {
        if (error instanceof z.ZodError) {
          return reply.status(400).send({
            error: 'Validation error',
            details: error.errors,
          })
        }
        return reply.status(400).send({ error: 'Invalid request' })
      }
    }
  )
}
