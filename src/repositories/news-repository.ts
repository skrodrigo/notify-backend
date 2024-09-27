import { PrismaClient } from '@prisma/client'
import type { Notice } from '../models/notice-model'

export class NewsRepository {
  private prisma: PrismaClient = new PrismaClient()

  public async listAll(): Promise<Notice[]> {
    const news = await this.prisma.notice.findMany()
    return news
  }

  public async getById(id: number): Promise<Notice | null> {
    const news = await this.prisma.notice.findUnique({
      where: { id },
    })
    return news
  }

  public async create(
    title: string,
    body: string,
    author: string
  ): Promise<Notice> {
    const notice = await this.prisma.notice.create({
      data: { title, body, author },
    })
    return notice
  }

  public async update(
    id: number,
    Newtitle: string,
    Newbody: string,
    Newauthor: string
  ): Promise<Notice | null> {
    const updatedNotice = await this.prisma.notice.update({
      where: { id },
      data: { title: Newtitle, body: Newbody, author: Newauthor },
    })
    return updatedNotice
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.notice.delete({
      where: { id },
    })
  }
}
