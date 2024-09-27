import type { Notice } from '../models/notice-model'
import { NewsRepository } from '../repositories/news-repository'

export class ListNewsService {
  private readonly newsRepository: NewsRepository

  constructor() {
    this.newsRepository = new NewsRepository()
  }

  public async execute(): Promise<Notice[]> {
    const news = await this.newsRepository.listAll()
    return news
  }
}
