import { NewsRepository } from '../repositories/news-repository'
export class DeleteNoticeService {
  private readonly newsRepository: NewsRepository

  constructor() {
    this.newsRepository = new NewsRepository()
  }

  public async execute(id: number): Promise<boolean> {
    const notice = await this.newsRepository.getById(id)
    if (!notice) {
      return false
    }

    await this.newsRepository.delete(id)
    return true
  }
}
