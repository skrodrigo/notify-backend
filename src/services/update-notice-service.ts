import type { Notice } from '../models/notice-model'
import { NewsRepository } from '../repositories/news-repository'

export class UpdateNoticeService {
  private readonly newsRepository: NewsRepository

  constructor() {
    this.newsRepository = new NewsRepository()
  }

  public async execute(
    id: number,
    title: string,
    body: string,
    author: string
  ): Promise<Notice | null> {
    const existingNotice = await this.newsRepository.getById(id)
    if (!existingNotice) {
      return null
    }

    const updatedNotice = await this.newsRepository.update(
      id,
      title,
      body,
      author
    )
    return updatedNotice
  }
}
