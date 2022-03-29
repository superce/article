import { Module } from '@nestjs/common';
// 引入数据库的及配置文件
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { getZhihuListServer, zhihuDetailServer } from './app.service';
import { ZhihuModule } from './zhihu/zhihu.module';
import { UserModule } from './user/user.module';
import { zhihu_article, zhihu_list } from './zhihu/entity/zhihu.entity'
import connectMysql from './connectMysql';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectMysql),
    ConfigModule.forRoot(),
    ZhihuModule,
    UserModule,
    TypeOrmModule.forFeature([zhihu_list, zhihu_article])
  ],
  controllers: [AppController],
  providers: [getZhihuListServer, zhihuDetailServer],
})
export class AppModule {}
