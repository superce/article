import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { zhihu_article, zhihu_list } from './zhihu/entity/zhihu.entity';

@Injectable()

export class getZhihuListServer {
  constructor(@InjectRepository(zhihu_list) private readonly getZhihuList: Repository<any>) { }
  async getList(pageSize = 10, pageParam = 1) {
    // let db = await this.getZhihuList.createQueryBuilder('h').skip(pageSize * (pageParam - 1)).take(pageSize).getRawMany()
    // console.log(db)
    // return db
    return await this.getZhihuList.find()
  }
}

export class zhihuDetailServer {
  constructor(@InjectRepository(zhihu_article) private readonly getDetail: Repository<any>) { }
  async detail(article_id: string) {
    return await this.getDetail.findOneByOrFail({ article_id })
  }
}
