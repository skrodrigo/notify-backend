import type { Notice } from '../models/notice-model'
import { NewsRepository } from '../repositories/news-repository'

export class CreateNoticeService {
  private readonly newsRepository: NewsRepository

  constructor() {
    this.newsRepository = new NewsRepository()
  }

  public async execute(
    title: string,
    body: string,
    author: string
  ): Promise<Notice> {
    if (!title || !body || !author) {
      throw new Error(
        'title, body and author are required for creating a notice'
      )
    }

    const notice = await this.newsRepository.create(title, body, author)
    return notice
  }
}
