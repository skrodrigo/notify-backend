import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { loginSchema, userSchema } from '../schemas/auth-schema'
import { AuthService } from '../services/auth-service'
import { RefreshTokenService } from '../services/refresh-token-service'

export class AuthController {
  private authService: AuthService
  refreshTokenService: RefreshTokenService

  constructor(app: FastifyInstance) {
    this.authService = new AuthService()
    this.refreshTokenService = new RefreshTokenService(app)
  }

  async register(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userData = userSchema.parse(request.body)
      const user = await this.authService.register(userData)
      const tokens = await this.refreshTokenService.generateTokens(user.id)

      return reply.status(201).send(tokens)
    } catch (error) {
      return reply.status(400).send({ error: (error as Error).message })
    }
  }

  async login(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = loginSchema.parse(request.body)
      const user = await this.authService.login(email, password)
      const tokens = await this.refreshTokenService.generateTokens(user.id)

      return reply.send(tokens)
    } catch (error) {
      return reply.status(401).send({ error: 'Invalid credentials' })
    }
  }
}
