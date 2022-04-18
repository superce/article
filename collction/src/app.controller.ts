import { Controller, Get, HttpException, HttpStatus, Param, Post, Query, Redirect, Render, Res, Response } from '@nestjs/common';
import { listParamDTO } from './DTO/index';
import { getZhihuListServer, zhihuDetailServer, meunService } from './app.service'

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
    let recommend = []    
    let newArticle = []
    let topArticle = []
    list.forEach((item, index) => {
      if(index < 2){
        recommend.push(item)
      }else if(index < 8){
        newArticle.push(item)
      }else{
        topArticle.push(item)
      }
    })
    return { meunList, recommend, topArticle, newArticle }
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
    console.log('---', fiveList);
    
    return { list, meunList, fiveList }
  }

  @Get('/detail/:id')
  @Render('detail')
  async viewsDetail(@Param('id') id: string) {
    const article = await this.getZhihuDetail.detail(id)
    const meunList = await this.meun.findList()
    console.log(article)
    const { list } = await this.getZhihuList.getList(1)
    let recommend = []
    let topArticle = []
    list.forEach((item, index) => {
      if (index < 5) {
        recommend.push(item)
      } else {
        topArticle.push(item)
      }
    })
    console.log(recommend, topArticle)
    return { article, meunList, recommend, topArticle }
  }

}
