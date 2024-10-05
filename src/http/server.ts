import fastify from 'fastify'
import { newsRoutes } from '../routes/news-routes'

const app = fastify()
app.register(newsRoutes)

const port = process.env.PORT || 3333
app
  .listen({ port: Number(port), host: '0.0.0.0' })
  .then(() => console.log(`Servidor rodando na porta ${port}!`))
