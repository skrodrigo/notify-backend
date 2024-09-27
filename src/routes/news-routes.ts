import type { FastifyInstance } from 'fastify'
import { NewsController } from '../controllers/news-controller'

const newsController = new NewsController()

export async function newsRoutes(app: FastifyInstance) {
  app.get('/news', newsController.listAll.bind(newsController))
  app.get('/news/:id', newsController.getById.bind(newsController))
  app.post('/news', newsController.create.bind(newsController))
  app.put('/news/:id', newsController.update.bind(newsController))
  app.delete('/news/:id', newsController.delete.bind(newsController))
}
