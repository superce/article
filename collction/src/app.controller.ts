import { Controller, Get, HttpException, HttpStatus, Param, Post, Query, Redirect, Render, Res, Response } from '@nestjs/common';
import { listParamDTO } from './DTO/index';
import { getZhihuListServer, zhihuDetailServer, meunService } from './app.service'
import { timestampToTime } from './utils/time'

@Controller()
export class AppController {
  constructor(
    private readonly getZhihuList: getZhihuListServer,
    private readonly getZhihuDetail: zhihuDetailServer,
    private readonly meun: meunService,
  ) { }

  // @Get()
  // @Render('layout')
  // @Render('index')
  // async viewsLayout(){
  //   const meunList = await this.meun.findList()
  //   console.log(meunList)
  //   return { meunList }
  // }

  @Get()
  @Render('index')
  async viewsRoot(@Query() param: listParamDTO) {
    const { pageIndex } = param
    const meunList = await this.meun.findList()
    const { list } = await this.getZhihuList.getList(pageIndex)
    const title = '知識百科'
    let lunbo = []
    let recommend = []
    let newArticle = []
    let topArticle = []
    let hotArticle = []
    list.forEach((item, index) => {
      if(index < 3){
        lunbo.push(item)
      }
      if(index >=3 && index < 9){
        recommend.push(item)
      }
      if(index >= 9 && index < 20){
        const meun = meunList.find(m => m.id === item.list_meun_id)
        item.meunName = meun.name
        let t = item.list_date
        item.list_date = timestampToTime(t)
        newArticle.push(item)
      }
      if(index >= 20 && index < 28){
        topArticle.push(item)
      }
      if(index >= 28 && index < 33){
        hotArticle.push(item)
      }
    })
    return { meunList, lunbo, recommend, topArticle, newArticle, title, hotArticle }
  }
  @Get('home')
  async loadMoreList(@Query() param: listParamDTO) {
    const { pageIndex } = param
    const { list, total } = await this.getZhihuList.getList(pageIndex)
    const result = { list, total }
    throw new HttpException(result, HttpStatus.OK)
  }

  @Get('list/:id')
  @Render('list')
  async viewsList(@Param('id') id: number) {
    const list = await this.getZhihuList.getMeunItemList(id)
    const meunList = await this.meun.findList()
    const fiveList = await this.getZhihuList.getFiveArticle()
    let clicks = []
    let loves = []
    let title = ''
    const paramId = Number(id)    
    let item = meunList.find(m => m.id === paramId)
    fiveList.list.forEach((item, index) => {
      if(index < 6){
        clicks.push(item)
      }else{        
        loves.push(item)
      }
    })
    list.forEach(item => {
      let t = item.date
      item.date = timestampToTime(t)
    })
    title = item.name
    return { list, meunList, clicks, loves, title }
  }

  @Get('/detail/:id')
  @Render('detail')
  async viewsDetail(@Param('id') id: string) {
    const article = await this.getZhihuDetail.detail(id)
    const meunList = await this.meun.findList()
    const { list } = await this.getZhihuList.getList(1)
    const takePage = await this.getZhihuDetail.nextArticle(id)
    let hotArticle = []
    let topArticle = []
    let matchArticle = []
    list.forEach((item, index) => {
      if(index > 10 && index < 15){
        matchArticle.push(item)
      }
      if (index >= 15 && index < 23) {
        topArticle.push(item)
      }
      if (index >= 23 && index < 29) {
        hotArticle.push(item)
      }
    })
    let title = article.title
    article.date = timestampToTime(article.date)
    return { article, meunList, hotArticle, topArticle, takePage, title, matchArticle }
  }
  @Get('/about')
  @Render('about')
  aboutPage(){}
  @Get('/policy')
  @Render('policy')
  policyPage() { }
  @Get('/privacy')
  @Render('privacy')
  privacyPage() { }
  @Get('/terms')
  @Render('terms')
  termsPage() { }
  @Get('/copyright')
  @Render('copyright')
  copyrightPage() { }
}
