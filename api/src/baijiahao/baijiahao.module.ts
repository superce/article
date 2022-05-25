import { Module } from '@nestjs/common';
import { BaijiahaoController } from './baijiahao.controller';
import { BaijiahaoService } from './baijiahao.service';

@Module({
  controllers: [BaijiahaoController],
  providers: [BaijiahaoService]
})
export class BaijiahaoModule {}
