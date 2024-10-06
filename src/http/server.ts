import fastify from 'fastify'
import { newsRoutes } from '../routes/news-routes'

const app = fastify()

// Registrar as rotas.
app.register(newsRoutes)

// Definir a porta e o host a partir das variáveis de ambiente.
const PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : 3333
const HOST = '0.0.0.0'

// Iniciar o servidor no host e porta corretos.
app
  .listen({ port: PORT, host: HOST })
  .then(() => console.log(`Server up and running on http://${HOST}:${PORT}`))
  .catch(err => {
    console.error('Error starting server:', err)
    process.exit(1)
  })
