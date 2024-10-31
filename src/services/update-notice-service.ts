import type { Notice, NoticeCreate } from '../models/notice-model'
import { NewsRepository } from '../repositories/news-repository'

export class UpdateNoticeService {
  private readonly newsRepository: NewsRepository

  constructor() {
    this.newsRepository = new NewsRepository()
  }

  public async execute(
    id: string,
    data: Partial<NoticeCreate>,
    userId: string
  ): Promise<Notice | null> {
    const existingNotice = await this.newsRepository.getById(id)

    if (!existingNotice) {
      return null
    }

    if (existingNotice.userId !== userId) {
      throw new Error('Unauthorized')
    }

    return this.newsRepository.update(id, data)
  }
}
