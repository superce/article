import { Module } from '@nestjs/common';
import { BaijiahaoController } from './baijiahao.controller';
import { BaijiahaoService } from './baijiahao.service';
import { article, list } from '../entity/article.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([article, list])],
  controllers: [BaijiahaoController],
  providers: [BaijiahaoService]
})
export class BaijiahaoModule {}
