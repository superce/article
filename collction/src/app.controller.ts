import { Controller, Get, Param, Redirect, Render, Res, Response } from '@nestjs/common';
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
  async viewsRoot(@Param() param: listParamDTO) {
    const { pageSize, pageIndex } = param
    const list = await this.getZhihuList.getList(pageSize, pageIndex)
    const article ={
      title: '身材管理'
    }
    return { list, article }
  }
  @Get('/detail/:id')
  @Render('detail')
  async viewsDetail(@Param('id') id: string) {
    const article = await this.getZhihuDetail.detail(id)
    return { article }
  }
}
