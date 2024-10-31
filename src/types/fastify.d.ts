import type { FastifyReply, FastifyRequest } from 'fastify'

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: (
      request: FastifyRequest,
      reply: FastifyReply
    ) => Promise<void>
  }
}
