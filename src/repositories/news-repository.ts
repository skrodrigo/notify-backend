import { PrismaClient } from '@prisma/client'
import type { Notice, NoticeCreate } from '../models/notice-model'

export class NewsRepository {
  private prisma: PrismaClient = new PrismaClient()

  public async listAll(): Promise<Notice[]> {
    const news = await this.prisma.notice.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })
    return news as Notice[]
  }

  public async getById(id: string): Promise<Notice | null> {
    const news = await this.prisma.notice.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })
    return news as Notice | null
  }

  public async create(data: NoticeCreate): Promise<Notice> {
    const notice = await this.prisma.notice.create({
      data,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })
    return notice as Notice
  }

  public async update(
    id: string,
    data: Partial<NoticeCreate>
  ): Promise<Notice | null> {
    const updatedNotice = await this.prisma.notice.update({
      where: { id },
      data,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })
    return updatedNotice as Notice
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.notice.delete({
      where: { id },
    })
  }
}
