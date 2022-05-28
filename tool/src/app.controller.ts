import { Controller, Get, HttpException, Query, HttpStatus, Post, Body, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get()
  @Render('home')
  layout() { }

  @Get('/page/ip')
  @Render('ip')
  pageIp() { }
  @Get('/ip')
  async getIp(@Query('ip') ip: string) {
    console.log(ip)
    if (ip) {
      const result = await this.appService.getIp(ip)
      throw new HttpException(result, HttpStatus.OK);
    }
  }
  @Get('page/phone')
  @Render('phone')
  pagePhone() { }
  @Get('/phone')
  async getPhone(@Query('phone') phone: string) {
    console.log(phone)
    const result = await this.appService.getPhoneLocation(phone)
    throw new HttpException(result, HttpStatus.OK);
  }

  @Get('page/convert')
  @Render('convert')
  pageConvert() { }
  @Post('/convert')
  async fontconvert(@Body() param: { content: string, type: string }) {
    console.log(param)
    // 转换类型 2s转成简体 2t转成繁体 2h转成火星文
    const result = await this.appService.fontconvert(param)
    throw new HttpException(result, HttpStatus.OK);
  }

  @Get('page/weight')
  @Render('weight')
  pageWeight() { }
  @Post('/weight')
  async weightBmi(@Body() param: { sex: string, height: string, weight: string }) {
    console.log(param)
    // sex	string	是	性别 male female
    // height	string	是	身高 CM
    // weight	string	是	体重 KG
    const result = await this.appService.weightBmi(param)
    throw new HttpException(result, HttpStatus.OK);
  }

  @Get('page/robort')
  @Render('robort')
  pageRobort() { }
  @Post('/robort')
  async robort(@Body() param: { question: string }) {
    console.log(param)
    // question	string	是	提问的问题
    const result = await this.appService.robort(param)
    throw new HttpException(result, HttpStatus.OK);
  }

  @Get('page/dearm')
  @Render('dearm')
  pageDream() { }
  @Post('/dearm')
  async dearm(@Body() param: { keyword: string, pagenum: number, pagesize: number }) {
    console.log(param)
    // keyword	string	是	关键词
    // pagenum	int	是	当前页 默认1
    // pagesize	int	是	每页条数 默认10 最大10
    const result = await this.appService.dream(param)
    throw new HttpException(result, HttpStatus.OK);
  }

  @Get('page/idcard')
  @Render('idcard')
  pageIdCard() { }
  @Post('/idcard')
  async idcard(@Body() param: { idcard: string }) {
    console.log(param)
    // idcard	string	是	身份证或身份证前6位
    const result = await this.appService.idCard(param)
    throw new HttpException(result, HttpStatus.OK);
  }

  @Get('page/xhy')
  @Render('xhy')
  pagexhy() { }
  @Post('/xhy')
  async xhy(@Body() param: { keyword: string, pagenum: number, pagesize: number }) {
    console.log(param)
    // keyword	string	是	关键词
    // pagenum	int	是	当前页
    // pagesize	int	是	每页数据 最大为2
    const result = await this.appService.xhy(param)
    throw new HttpException(result, HttpStatus.OK);
  }
}
