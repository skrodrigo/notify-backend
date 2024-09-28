import type { FastifyReply, FastifyRequest } from 'fastify'

import { CreateNoticeService } from '../services/create-notice-service'
import { DeleteNoticeService } from '../services/delete-notice-service'
import { ListNewsService } from '../services/list-news-service'
import { ListNoticeService } from '../services/list-notice-service'
import { UpdateNoticeService } from '../services/update-notice-service'

export class NewsController {
  private createNoticeService = new CreateNoticeService()
  private listNewsService = new ListNewsService()
  private listNoticeService = new ListNoticeService()
  private deleteNoticeService = new DeleteNoticeService()
  private updateNoticeService = new UpdateNoticeService()

  public async create(request: FastifyRequest, reply: FastifyReply) {
    const { title, body, author } = request.body as {
      title: string
      body: string
      author: string
    }

    try {
      const notice = await this.createNoticeService.execute(title, body, author)
      return reply.status(201).send(notice)
    } catch (error) {
      return reply.status(400).send({ error: (error as Error).message }) // Usar `error.message` para resposta clara
    }
  }

  public async listAll(request: FastifyRequest, reply: FastifyReply) {
    try {
      const news = await this.listNewsService.execute()
      return reply.send(news)
    } catch (error) {
      return reply.status(500).send({ error: 'Failed to fetch news list' })
    }
  }

  public async getById(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: number }

    try {
      const notice = await this.listNoticeService.execute(id)
      return reply.send(notice)
    } catch (error) {
      return reply.status(404).send({ error: 'Notice not found' }) // Retornar mensagem mais específica
    }
  }

  public async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: number }
    const { title, body, author } = request.body as {
      title: string
      body: string
      author: string
    }

    try {
      const updatedNotice = await this.updateNoticeService.execute(
        id,
        title,
        body,
        author
      )

      if (!updatedNotice) {
        return reply.status(404).send({ error: 'Notice not found' })
      }

      return reply.send(updatedNotice)
    } catch (error) {
      return reply.status(400).send({ error: (error as Error).message }) // Retornar mensagem apropriada
    }
  }

  public async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: number }

    try {
      const deleted = await this.deleteNoticeService.execute(id)

      if (!deleted) {
        return reply.status(404).send({ error: 'Notice not found' }) // Usar 404 se o item não existir
      }

      return reply.status(204).send()
    } catch (error) {
      return reply.status(400).send({ error: (error as Error).message }) // Resposta clara para falhas no delete
    }
  }
}
