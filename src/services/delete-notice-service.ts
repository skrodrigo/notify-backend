import { PrismaClient } from '@prisma/client'

export class DeleteNoticeService {
  private prisma: PrismaClient = new PrismaClient()

  public async execute(id: number): Promise<boolean> {
    try {
      await this.prisma.notice.delete({
        where: { id },
      })
      return true
    } catch (error) {
      console.error('Error deleting notice:', error)
      return false
    }
  }
}
