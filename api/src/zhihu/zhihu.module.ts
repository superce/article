import { Module } from '@nestjs/common';
import { ZhihuController } from './zhihu.controller';
import { ZhihuService, zhihu_listServer } from './zhihu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { article, list } from '../entity/article.entity'

@Module({
  imports: [TypeOrmModule.forFeature([article, list])],
  controllers: [ZhihuController],
  providers: [ZhihuService, zhihu_listServer]
})
export class ZhihuModule {}
