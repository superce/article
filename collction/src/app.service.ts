import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { article, list, meun } from './entity/zhihu.entity';

@Injectable()

export class getZhihuListServer {
  constructor(@InjectRepository(list) private readonly getZhihuList: Repository<any>) { }
  async getList(pageIndex = 1) {
    let db = await this.getZhihuList.createQueryBuilder().skip(15 * (pageIndex - 1)).take(15).getRawMany()
    let total = await this.getZhihuList.createQueryBuilder().getCount()
    const currentPageIndex = pageIndex
    const lists = {
      list: db, 
      total,
      // currentPageIndex
    }
    return lists//await this.getZhihuList.find()
  }
  async getMeunItemList(id:number){
    const list = await this.getZhihuList.find({where: {meun_id: id}})
    return list
  }
}

export class zhihuDetailServer {
  constructor(@InjectRepository(article) private readonly getDetail: Repository<any>) { }
  async detail(article_id: string) {
    return await this.getDetail.findOneByOrFail({ article_id })
  }
}

export class meunService{
  constructor(@InjectRepository(meun) private readonly getMeunList: Repository<any>){}
  async findList(){
    return await this.getMeunList.find()
  }
}
