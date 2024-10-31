import type { FastifyReply, FastifyRequest } from 'fastify'
import {
  createNoticeSchema,
  updateNoticeSchema,
} from '../schemas/notice-schema'
import type { CreateNoticeService } from '../services/create-notice-service'
import type { DeleteNoticeService } from '../services/delete-notice-service'
import type { ListNewsService } from '../services/list-news-service'
import type { ListNoticeService } from '../services/list-notice-service'
import type { UpdateNoticeService } from '../services/update-notice-service'

export class NewsController {
  constructor(
    private readonly createNoticeService: CreateNoticeService,
    private readonly updateNoticeService: UpdateNoticeService,
    private readonly deleteNoticeService: DeleteNoticeService,
    private readonly listNewsService: ListNewsService,
    private readonly listNoticeService: ListNoticeService
  ) {}

  public async listAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const news = await this.listNewsService.execute()
      return reply.send(news)
    } catch (error) {
      return reply.status(400).send({ error: (error as Error).message })
    }
  }

  public async getById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }

    try {
      const notice = await this.listNoticeService.execute(id)
      return reply.send(notice)
    } catch (error) {
      return reply.status(404).send({ error: 'Notice not found' })
    }
  }

  public async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const data = createNoticeSchema.parse(request.body)

      const notice = await this.createNoticeService.execute({
        ...data,
        userId: request.userId,
      })

      return reply.status(201).send(notice)
    } catch (error) {
      return reply.status(400).send({ error: (error as Error).message })
    }
  }

  public async update(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string }
      const data = updateNoticeSchema.parse(request.body)

      console.log('Update attempt:', {
        noticeId: id,
        userId: request.userId,
        updateData: data,
      })

      const updatedNotice = await this.updateNoticeService.execute(
        id,
        data,
        request.userId
      )

      return reply.send(updatedNotice)
    } catch (error) {
      return reply.status(400).send({ error: 'Invalid request' })
    }
  }

  public async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }

    try {
      const deleted = await this.deleteNoticeService.execute(id, request.userId)

      if (!deleted) {
        return reply.status(404).send({ error: 'Notice not found' })
      }

      return reply.status(204).send()
    } catch (error) {
      if ((error as Error).message === 'Unauthorized') {
        return reply.status(403).send({ error: 'Unauthorized' })
      }
      return reply.status(400).send({ error: (error as Error).message })
    }
  }
}
