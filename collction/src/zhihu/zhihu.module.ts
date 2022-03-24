import { Module } from '@nestjs/common';
import { ZhihuController } from './zhihu.controller';
import { ZhihuService, zhihu_listServer, getZhihuListServer, zhihuDetailServer } from './zhihu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { zhihu_article, zhihu_list } from './entity/zhihu.entity'

@Module({
  imports: [TypeOrmModule.forFeature([zhihu_article, zhihu_list])],
  controllers: [ZhihuController],
  providers: [ZhihuService, zhihu_listServer, getZhihuListServer, zhihuDetailServer]
})
export class ZhihuModule {}
