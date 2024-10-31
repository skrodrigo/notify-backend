import jwt from '@fastify/jwt'
import fastify, { type FastifyRequest, type FastifyReply } from 'fastify'
import { authRoutes } from '../routes/auth-routes'
import { newsRoutes } from '../routes/news-routes'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { userId: string; email: string }
    user: {
      userId: string
      email: string
    }
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    userId: string
  }
}

const app = fastify()

app.register(jwt, {
  secret: process.env.JWT_SECRET || 'your-secret-key',
})

app.decorate(
  'authenticate',
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const token = await request.jwtVerify<{ userId: string; email: string }>()
      request.userId = token.userId
    } catch (err) {
      reply.status(401).send({ error: 'Unauthorized' })
    }
  }
)

app.register(authRoutes)
app.register(newsRoutes)

const PORT = process.env.PORT ? Number.parseInt(process.env.PORT) : 3333
const HOST = '0.0.0.0'

app
  .listen({ port: PORT, host: HOST })
  .then(() => console.log(`Server up and running on http://${HOST}:${PORT}`))
  .catch(err => {
    console.error('Error starting server:', err)
    process.exit(1)
  })
