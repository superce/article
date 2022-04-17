import { Module } from '@nestjs/common';
// 引入数据库的及配置文件
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { getZhihuListServer, zhihuDetailServer, meunService } from './app.service';
import { article, list, meun } from './entity/zhihu.entity'
import connectMysql from './connectMysql';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectMysql),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([list, article, meun]),
  ],
  controllers: [AppController],
  providers: [getZhihuListServer, zhihuDetailServer, meunService],
})
export class AppModule {}
