import type { Notice } from '../models/notice-model'
import { NewsRepository } from '../repositories/news-repository'

export class ListNoticeService {
  private readonly newsRepository: NewsRepository

  constructor() {
    this.newsRepository = new NewsRepository()
  }

  public async execute(id: number): Promise<Notice> {
    const notice = await this.newsRepository.getById(id)
    if (!notice) {
      throw new Error('Notice not found')
    }
    return notice
  }
}
