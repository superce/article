import { Controller, Get, HttpException, Query, HttpStatus, Post, Body, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/')
export class AppController {
  t: string
  constructor(private readonly appService: AppService) { 
    this.t = ''
  }
  @Get()
  @Render('home')
  layout() { 
    const msg = {
      title: '月亮科技工具站',
      keyword: '在线工具站',
      des: '这是一款可实现在线工具站'
    }
    return msg
  }

  @Get('/page/ip')
  @Render('ip')
  pageIp() {
    const t = this.appService.getTime()
    this.t = atob(t)
    const msg = {
      title: 'IP地址查询',
      keyword: 'ip,IP查询,IP地址查询',
      des: '这是一款可实现在线ip,IP查询,IP地址查询,非常简单实用。'
    }
    return {msg, t}
  }
  @Get('/ip')
  async getIp(@Query() param:{ip: string, t: string}) {
    const { ip, t } = param
    const at = atob(t)
    // if(this.t !== at){
    //   throw new HttpException('无权限', HttpStatus.OK);
    // }
    if (ip) {
      const result = await this.appService.getIp(ip)
      throw new HttpException(result, HttpStatus.OK);
    }
  }
  @Get('page/phone')
  @Render('phone')
  pagePhone() {
    const msg = {
      title: '手机号码归属地查询',
      keyword: '手机号,手机号码,所在地,归属地,手机号码所在地查询',
      des: '这是一款可实现在线查询手机号,手机号码,所在地,归属地,手机号码所在地查询。'
    }
    const t = this.appService.getTime()
    this.t = atob(t)
    return {msg,t}
  }
  @Get('/phone')
  async getPhone(@Query() param: { phone: string, t: string}) {
    const { phone, t } = param
    const at = atob(t)
    console.log(at, t)
    // if (this.t !== at) {
    //   throw new HttpException('无权限', HttpStatus.OK);
    // }
    console.log(phone)

    const result = await this.appService.getPhoneLocation(phone)
    throw new HttpException(result, HttpStatus.OK);
  }

  @Get('page/convert')
  @Render('convert')
  pageConvert() { 
    const msg = {
      title: '汉字简体繁体转换_qq个性繁体_火星文',
      keyword: '汉字简体繁体转换,qq个性繁体,火星文',
      des: '这是一款可实现在线汉字简体繁体转换,qq个性繁体,火星文。'
    }
    const t = this.appService.getTime()
    this.t = atob(t)
    return { msg, t }
  }
  @Post('/convert')
  async fontconvert(@Body() param: { content: string, type: string, t: string }) {
    console.log(param)    
    const at = atob(param.t)
    // if (this.t !== at) {
    //   throw new HttpException('无权限', HttpStatus.OK);
    // }
    // 转换类型 2s转成简体 2t转成繁体 2h转成火星文
    const result = await this.appService.fontconvert(param)
    throw new HttpException(result, HttpStatus.OK);
  }

  @Get('page/weight')
  @Render('weight')
  pageWeight() {
    const msg = {
      title: '身高体重计算器_身高体重比例表_身高体重比例计算器',
      keyword: '身高体重计算器,身高体重比例表,成人身高体重自测,健康体重',
      des: '这是一款可实现在线身高体重计算器,身高体重比例表,成人身高体重自测,健康体重。'
    }
    const t = this.appService.getTime()
    this.t = atob(t)
    return { msg, t }
  }
  @Post('/weight')
  async weightBmi(@Body() param: { sex: string, height: string, weight: string, t }) {
    console.log(param)
    // sex	string	是	性别 male female
    // height	string	是	身高 CM
    // weight	string	是	体重 KG
    const at = atob(param.t)
    // if (this.t !== at) {
    //   throw new HttpException('无权限', HttpStatus.OK);
    // }
    const result = await this.appService.weightBmi(param)
    throw new HttpException(result, HttpStatus.OK);
  }

  @Get('page/robort')
  @Render('robort')
  pageRobort() { 
    const msg = {
      title: '智能问答机器人，上知天文，下知地理',
      keyword: '智能问答机器人，上知天文，下知地理',
      des: '这是一款可实现在线智能问答机器人，上知天文，下知地理。'
    }
    const t = this.appService.getTime()
    this.t = atob(t)
    return { msg, t }
  }
  @Post('/robort')
  async robort(@Body() param: { question: string, t: string }) {
    console.log(param)
    const at = atob(param.t)
    // if (this.t !== at) {
    //   throw new HttpException('无权限', HttpStatus.OK);
    // }
    // question	string	是	提问的问题
    const result = await this.appService.robort(param)
    throw new HttpException(result, HttpStatus.OK);
  }

  @Get('page/dearm')
  @Render('dearm')
  pageDream() {
    const msg = {
      title: '周公解梦_在线周公解梦查询工具',
      keyword: '解梦,梦境,征兆,梦境征兆,在线工具,查询工具,在线周公解梦',
      des: '这是一款可实现在线周公解梦_在线周公解梦查询工具。'
    }
    const t = this.appService.getTime()
    this.t = atob(t)
    return { msg, t }
  }
  @Post('/dearm')
  async dearm(@Body() param: { keyword: string, pagenum: number, pagesize: number, t: string }) {
    console.log(param)
    // keyword	string	是	关键词
    // pagenum	int	是	当前页 默认1
    // pagesize	int	是	每页条数 默认10 最大10
    const at = atob(param.t)
    // if (this.t !== at) {
    //   throw new HttpException('无权限', HttpStatus.OK);
    // }
    const result = await this.appService.dream(param)
    throw new HttpException(result, HttpStatus.OK);
  }

  @Get('page/idcard')
  @Render('idcard')
  pageIdCard() { 
    const msg = {
      title: '身份证查询_身份证号码查询_身份证号大全和真实姓名_身份证归属地查询',
      keyword: '身份证查询,身份证号码查询,身份证号码和姓名,身份证号大全,身份证号码大全,身份证归属地验证,身份证号码和真实姓名',
      des: '这是一款可实现在线身份证号码查询系统提供身份证号码查询,身份证查询系统,身份证号码和姓名,居民身份证号码大全,验证身份证真实性和照片对比。'
    }
    const t = this.appService.getTime()
    this.t = atob(t)
    return { msg, t }
  }
  @Post('/idcard')
  async idcard(@Body() param: { idcard: string, t }) {
    console.log(param)
    const at = atob(param.t)
    // if (this.t !== at) {
    //   throw new HttpException('无权限', HttpStatus.OK);
    // }
    // idcard	string	是	身份证或身份证前6位
    const result = await this.appService.idCard(param)
    throw new HttpException(result, HttpStatus.OK);
  }

  @Get('page/xhy')
  @Render('xhy')
  pagexhy() { 
    const msg = {
      title: '各种经典歇后语大全',
      keyword: '各种经典歇后语大全，5万多数据，节气、季节、动物、昆虫、人物、谐音、经典应有尽有，定期更新。',
      des: '这是一款可实现在线各种经典歇后语大全，5万多数据，节气、季节、动物、昆虫、人物、谐音、经典应有尽有，定期更新。'
    }
    const t = this.appService.getTime()
    this.t = atob(t)
    return { msg, t }
    
  }
  @Post('/xhy')
  async xhy(@Body() param: { keyword: string, pagenum: number, pagesize: number, t: string }) {
    console.log(param)
    // keyword	string	是	关键词
    // pagenum	int	是	当前页
    // pagesize	int	是	每页数据 最大为2
    const at = atob(param.t)
    // if (this.t !== at) {
    //   throw new HttpException('无权限', HttpStatus.OK);
    // }
    const result = await this.appService.xhy(param)
    throw new HttpException(result, HttpStatus.OK);
  }

  @Get('page/zipcode')
  @Render('zipcode')
  pagezipcode() { 
    const msg = {
      title: '全国30多个省市县的邮编号码查询',
      keyword: '邮编号码查询,区域地址查询邮编 。',
      des: '这是一款可实现在线全国30多个省市县的邮编号码查询，数据权威准确，数百万条数据，精确到区、县、街道。支持按模糊地址、指定区域地址查询邮编。'
    }
    const t = this.appService.getTime()
    this.t = atob(t)
    return { msg, t }   
  }
  @Post('/zipcode')
  async zipcode(@Body() param: { zipcode:string, t: string }) {
    console.log(param)
    // zipcode	string	是	邮编
    const at = atob(param.t)
    // if (this.t !== at) {
    //   throw new HttpException('无权限', HttpStatus.OK);
    // }
    const result = await this.appService.zipcode(param)
    throw new HttpException(result, HttpStatus.OK);
  }
  @Get('page/addresscode')
  @Render('addrCode')
  pageaddrCode() { 
    const msg = {
      title: '全国30多个省市县的邮编号码查询',
      keyword: '邮编号码查询,区域地址查询邮编 。',
      des: '这是一款可实现在线全国30多个省市县的邮编号码查询，数据权威准确，数百万条数据，精确到区、县、街道。支持按模糊地址、指定区域地址查询邮编。'
    }
    const t = this.appService.getTime()
    this.t = atob(t)
    return { msg, t }
  }
  @Post('/addrcode')
  async addrCode(@Body() param: { address: string, areaid: number, t: string }) {
    console.log(param)
    // address	string	是	地址
    // areaid	int	是	区域ID
    const at = atob(param.t)
    // if (this.t !== at) {
    //   throw new HttpException('无权限', HttpStatus.OK);
    // }
    const result = await this.appService.addrcode(param)
    throw new HttpException(result, HttpStatus.OK);
  }

  @Get('page/password')
  @Render('password')
  pagePassword(){
    const msg = {
      title: '在线随机字符串/安全密码生成工具',
      keyword: '随机数,随机字符串,安全密码,在线工具,生成工具,随机字符串/安全密码生成工具',
      des: '这是一款可实现在线生成随机字符串/安全密码的工具，增加了结果的复制、清空等功能。用户根据界面选项勾选所需要生成的随机字符串/安全密码类型、长度，即可一键生成所需要的随机字符串。还可根据需要自定义安全字符与密码位数，非常简单实用。'
    }
    return msg
  }

  @Get('page/encrypt')
  @Render('encrypt')
  pageEncrypt() { 
    const msg = {
      title: '加密解密',
      keyword: '字符串加密,解密,JS,算法,混淆,密钥,解码,编码,在线,安全,保护,隐私',
      des: '这是一款可实现在线生成字符串加密,解密,JS,算法,混淆,密钥,解码,编码,在线,安全,保护,隐私，增加了结果的复制、清空等功能。用户根据界面选项勾选所需要生成的随机字符串/安全密码类型、长度，即可一键生成所需要的随机字符串。还可根据需要自定义安全字符与密码位数，非常简单实用。'
    }
    return msg
  }  
}
