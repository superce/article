import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/cai')
  async getHello() {    
    return this.appService.getCai();
  }
  @Get('/jok')
  async getjok() {    
    return this.appService.jok();
  }
}
