import { PrismaClient } from '@prisma/client'

export class NewsRepository {
  private prisma: PrismaClient = new PrismaClient()
}
