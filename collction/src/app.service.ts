import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { zhihu_article, zhihu_list } from './zhihu/entity/zhihu.entity';

@Injectable()

export class getZhihuListServer {
  constructor(@InjectRepository(zhihu_list) private readonly getZhihuList: Repository<any>) { }
  async getList(pageIndex = 1) {
    let db = await this.getZhihuList.createQueryBuilder().skip(15 * (pageIndex - 1)).take(15).getRawMany()
    let total = await this.getZhihuList.createQueryBuilder().getCount()
    // console.log(db)
    // return db
    const currentPageIndex = pageIndex
    const lists = {
      list: db,
      total,
      currentPageIndex
    }
    return lists//await this.getZhihuList.find()
  }
}

export class zhihuDetailServer {
  constructor(@InjectRepository(zhihu_article) private readonly getDetail: Repository<any>) { }
  async detail(article_id: string) {
    return await this.getDetail.findOneByOrFail({ article_id })
  }
}
