import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { article, list, meun } from './entity/zhihu.entity';

@Injectable()

export class getZhihuListServer {
  constructor(@InjectRepository(list) private readonly getZhihuList: Repository<any>) { }
  async getList(pageIndex = 1) {
    let db = await this.getZhihuList.createQueryBuilder().skip(15 * (pageIndex - 1)).take(30).getRawMany()
    let total = await this.getZhihuList.createQueryBuilder().getCount()
    const currentPageIndex = pageIndex
    const lists = {
      list: db,
      total,
      // currentPageIndex
    }
    return lists//await this.getZhihuList.find()
  }
  async getFiveArticle() {
    let list = await this.getZhihuList.createQueryBuilder().skip(0).take(12).getRawMany()
    return { list }
  }
  async getMeunItemList(id: number) {
    const list = await this.getZhihuList.find({ where: { meun_id: id } })
    return list
  }
}

export class zhihuDetailServer {
  constructor(@InjectRepository(article) private readonly getDetail: Repository<any>) { }
  async detail(article_id: string) {
    return await this.getDetail.findOneByOrFail({ article_id })
  }
  // 上一篇下一篇
  async nextArticle(article_id: string) {
    const thisArticle = await this.getDetail.findOneByOrFail({ article_id })
    const preId = thisArticle.id - 1
    const nextId = thisArticle.id + 1
    const preArticle = await this.getDetail.findOne({ where: { id: preId } })
    const nextArticle = await this.getDetail.findOne({ where: { id: nextId } })
    let article = {
      pre: {},
      next: {}
    }
    if (preArticle) article.pre = preArticle
    if (nextArticle) article.next = nextArticle
    return article
  }
}

export class meunService {
  constructor(@InjectRepository(meun) private readonly getMeunList: Repository<any>) { }
  async findList() {
    return await this.getMeunList.find()
  }
}
