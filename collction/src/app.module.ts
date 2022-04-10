import { Module } from '@nestjs/common';
// 引入数据库的及配置文件
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { getZhihuListServer, zhihuDetailServer } from './app.service';
import { zhihu_article, zhihu_list } from './entity/zhihu.entity'
import connectMysql from './connectMysql';

console.log(connectMysql)

@Module({
  imports: [
    TypeOrmModule.forRoot(connectMysql),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([zhihu_list, zhihu_article]),
  ],
  controllers: [AppController],
  providers: [getZhihuListServer, zhihuDetailServer],
})
export class AppModule {}
