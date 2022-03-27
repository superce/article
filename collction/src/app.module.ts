import { Module } from '@nestjs/common';
// 引入数据库的及配置文件
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { getZhihuListServer, zhihuDetailServer } from './app.service';
import { ZhihuModule } from './zhihu/zhihu.module';
import { UserModule } from './user/user.module';
import { zhihu_article, zhihu_list } from './zhihu/entity/zhihu.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '119.13.87.28',
      port: 3305,
      username: 'zhihu',
      password: '123456',
      database: 'database',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      // type: 'mysql',
      // host: 'localhost',
      // port: 3305,
      // username: 'root',
      // password: '123456',
      // database: 'zhihu',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: true,
    }),
    ZhihuModule,
    UserModule,
    TypeOrmModule.forFeature([zhihu_list, zhihu_article])
  ],
  controllers: [AppController],
  providers: [getZhihuListServer, zhihuDetailServer],
})
export class AppModule {}
