import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BaijiahaoService } from './baijiahao.service'

@Controller('api/baijia')
export class BaijiahaoController {
  constructor(private baijia: BaijiahaoService){}
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getBaijia(@Query() query) {
    // this.baijia.collection(query)
    return this.baijia.collection(query)
  }
}
