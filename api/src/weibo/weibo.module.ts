import { Module } from '@nestjs/common';
import { WeiboController } from './weibo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { weibo_img } from './entity/weibo.entity';
import { WeiboService } from './weibo.service';

@Module({
  imports: [TypeOrmModule.forFeature([weibo_img])],
  controllers: [WeiboController],
  providers: [WeiboService]
})
export class WeiboModule {}
