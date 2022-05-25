import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/baijiahao')
export class BaijiahaoController {
  constructor() { }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async dList() {
    return 'ddd'
  }
}
