import { Controller, Get, Query, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @Render('index')
  getHello(@Res() res: any, @Query('s') param: string): string {    
    console.log(param)
    res.render('index')
    // console.log(res);
    return res
    // return this.appService.getHello();
  }
}
