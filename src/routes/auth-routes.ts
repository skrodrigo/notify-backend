import type { FastifyInstance } from 'fastify'
import { AuthController } from '../controllers/auth-controller'
import { refreshTokenSchema } from '../schemas/auth-schema'

export async function authRoutes(app: FastifyInstance) {
  const authController = new AuthController(app)

  app.post('/register', authController.register.bind(authController))
  app.post('/login', authController.login.bind(authController))

  app.post(
    '/refresh-token',
    {
      schema: {
        body: {
          type: 'object',
          required: ['refreshToken'],
          properties: {
            refreshToken: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { refreshToken } = refreshTokenSchema.parse(request.body)
        const newAccessToken =
          await authController.refreshTokenService.refreshAccessToken(
            refreshToken
          )
        return reply.send({ accessToken: newAccessToken })
      } catch (error) {
        return reply.status(401).send({ error: 'Invalid refresh token' })
      }
    }
  )

  app.post(
    '/logout',
    {
      schema: {
        body: {
          type: 'object',
          required: ['refreshToken'],
          properties: {
            refreshToken: { type: 'string' },
          },
        },
      },
    },
    async (request, reply) => {
      try {
        const { refreshToken } = request.body as { refreshToken: string }
        await authController.refreshTokenService.revokeRefreshToken(
          refreshToken
        )
        return reply.send({ message: 'Logged out successfully' })
      } catch (error) {
        return reply.status(400).send({ error: 'Error during logout' })
      }
    }
  )
}
