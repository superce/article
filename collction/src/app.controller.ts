import { Controller, Get, HttpException, HttpStatus, Param, Query, Redirect, Render, Res, Response } from '@nestjs/common';
import { listParamDTO } from './zhihu/dto';
import { getZhihuListServer, zhihuDetailServer } from './app.service'

@Controller()
export class AppController {
  constructor(
    private readonly getZhihuList: getZhihuListServer,
    private readonly getZhihuDetail: zhihuDetailServer
  ) {}

  @Get()
  @Render('index')
  async viewsRoot(@Query() param: listParamDTO) {
    const { pageIndex } = param
    const { list, total, currentPageIndex } = await this.getZhihuList.getList(pageIndex)    
    const article ={
      title: '身材管理'
    }
    return { list, article, total, currentPageIndex }
  }
  @Get('list')
  async loadMoreList(@Query() param: listParamDTO) {
    const { pageIndex } = param
    const { list, total } = await this.getZhihuList.getList(pageIndex)    
    const result = { list, total }
    throw new HttpException(result, HttpStatus.OK)
  }
  @Get('/detail/:id')
  @Render('detail')
  async viewsDetail(@Param('id') id: string) {
    const article = await this.getZhihuDetail.detail(id)
    return { article }
  }
}
