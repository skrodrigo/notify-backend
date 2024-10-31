import type { FastifyInstance } from 'fastify'
import { NewsController } from '../controllers/news-controller'
import { CreateNoticeService } from '../services/create-notice-service'
import { DeleteNoticeService } from '../services/delete-notice-service'
import { ListNewsService } from '../services/list-news-service'
import { ListNoticeService } from '../services/list-notice-service'
import { UpdateNoticeService } from '../services/update-notice-service'

export async function newsRoutes(app: FastifyInstance) {
  // Instancie cada serviço manualmente
  const createNoticeService = new CreateNoticeService()
  const updateNoticeService = new UpdateNoticeService()
  const deleteNoticeService = new DeleteNoticeService()
  const listNewsService = new ListNewsService()
  const listNoticeService = new ListNoticeService()

  // Passe as dependências para o controlador
  const newsController = new NewsController(
    createNoticeService,
    updateNoticeService,
    deleteNoticeService,
    listNewsService,
    listNoticeService
  )

  // Rotas públicas
  app.get('/news', newsController.listAll.bind(newsController))
  app.get('/news/:id', newsController.getById.bind(newsController))

  // Rotas protegidas
  app.post(
    '/news',
    {
      onRequest: [app.authenticate],
    },
    newsController.create.bind(newsController)
  )

  app.put(
    '/news/:id',
    {
      onRequest: [app.authenticate],
    },
    newsController.update.bind(newsController)
  )

  app.delete(
    '/news/:id',
    {
      onRequest: [app.authenticate],
    },
    newsController.delete.bind(newsController)
  )
}
