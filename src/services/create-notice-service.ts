import type { Notice, NoticeCreate } from '../models/notice-model'
import { NewsRepository } from '../repositories/news-repository'

export class CreateNoticeService {
  private readonly newsRepository: NewsRepository

  constructor() {
    this.newsRepository = new NewsRepository()
  }

  public async execute(data: NoticeCreate): Promise<Notice> {
    if (!data.title || !data.body || !data.author || !data.userId) {
      throw new Error('Missing required fields')
    }

    const notice = await this.newsRepository.create(data)
    return notice
  }
}
