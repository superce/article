import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getIndex(){
    return 'dd'
  }
  @Get('/index')
  @Render("index")
  getHello() {      
    const gg = '6789'      
    return {layout: null, gg}
  }
}
