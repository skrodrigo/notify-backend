import { PrismaClient } from '@prisma/client'
import type { FastifyInstance } from 'fastify'

interface ITokenResponse {
  accessToken: string
  refreshToken: string
}

export class RefreshTokenService {
  private prisma: PrismaClient
  private app: FastifyInstance

  constructor(app: FastifyInstance) {
    this.prisma = new PrismaClient()
    this.app = app
  }

  async generateTokens(userId: string): Promise<ITokenResponse> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { email: true },
      })

      if (!user) {
        throw new Error('User not found')
      }

      const accessToken = await this.app.jwt.sign(
        { userId, email: user.email },
        { expiresIn: '15m' }
      )

      const refreshToken = await this.app.jwt.sign(
        { userId, email: user.email },
        { expiresIn: '7d' }
      )

      // Clean up old tokens
      await this.prisma.refreshToken.deleteMany({
        where: { userId },
      })

      // Save new refresh token
      await this.prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId,
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      })

      return { accessToken, refreshToken }
    } catch (error) {
      throw new Error('Error generating tokens')
    }
  }

  async refreshAccessToken(refreshToken: string): Promise<string> {
    try {
      const storedToken = await this.prisma.refreshToken.findUnique({
        where: { token: refreshToken },
        include: { user: true },
      })

      if (!storedToken || storedToken.expiresAt < new Date()) {
        throw new Error('Invalid or expired refresh token')
      }

      const decoded = await this.app.jwt.verify(refreshToken)
      if (typeof decoded !== 'object' || !('userId' in decoded)) {
        throw new Error('Invalid token payload')
      }

      const accessToken = await this.app.jwt.sign(
        {
          userId: storedToken.userId,
          email: storedToken.user.email,
        },
        { expiresIn: '15m' }
      )

      return accessToken
    } catch (error) {
      throw new Error('Invalid refresh token')
    }
  }

  async revokeRefreshToken(refreshToken: string): Promise<void> {
    try {
      await this.prisma.refreshToken.delete({
        where: { token: refreshToken },
      })
    } catch (error) {
      throw new Error('Error revoking refresh token')
    }
  }
}
