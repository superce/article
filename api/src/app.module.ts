import { Module } from '@nestjs/common';
// 引入数据库的及配置文件
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { ZhihuModule } from './zhihu/zhihu.module';
import { UserModule } from './user/user.module';
import { article, list } from './entity/article.entity'
import { DouyinModule } from './douyin/douyin.module';
import { BaijiahaoModule } from './baijiahao/baijiahao.module';
import { WeiboModule } from './weibo/weibo.module';
import connectMysql from './connectMysql';

console.log(connectMysql)

@Module({
  imports: [
    TypeOrmModule.forRoot(connectMysql),
    ConfigModule.forRoot(),
    ZhihuModule,
    UserModule,
    TypeOrmModule.forFeature([list, article]),
    DouyinModule,
    BaijiahaoModule,
    WeiboModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
