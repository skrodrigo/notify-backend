import { NewsRepository } from '../repositories/news-repository'

export class DeleteNoticeService {
  private readonly newsRepository: NewsRepository

  constructor() {
    this.newsRepository = new NewsRepository()
  }

  public async execute(id: string, userId: string): Promise<boolean> {
    const notice = await this.newsRepository.getById(id)
    if (!notice) {
      return false
    }

    if (notice.userId !== userId) {
      throw new Error('Unauthorized')
    }

    await this.newsRepository.delete(id)
    return true
  }
}
