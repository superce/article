import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Render, UseGuards } from '@nestjs/common';
import { ZhihuService, zhihu_listServer, getZhihuListServer, zhihuDetailServer } from './zhihu.service'
import { zhihuDTO, listParamDTO } from './dto/index'
import { AuthGuard } from '@nestjs/passport';
@Controller('/zhihu')
export class ZhihuController {
    constructor(
        private ZhihuService:ZhihuService, 
        private zhihu_list: zhihu_listServer,
        private getZhihuList: getZhihuListServer,
        private getZhihuDetail: zhihuDetailServer
    ){}
    @UseGuards(AuthGuard('jwt'))
    @Post()
    @HttpCode(200)
    async postGetZhihu(@Body() zhihuDTO: zhihuDTO){
        const { url } = zhihuDTO
        if(!url) throw new HttpException("url不能为空", HttpStatus.OK)
        const { title, article_id, articleThumbnail } = await this.ZhihuService.collection(url)        
        const result = await this.zhihu_list.list(article_id, articleThumbnail, title)
        let data = {
            state: false,
            msg: '采集失败',
            data:{}
        }
        if(result.id > 0){
            data = {
                state: true,
                data: result,
                msg: '采集成功'
            }
        }
        throw new HttpException('采集成功', HttpStatus.OK)
    }

    @Get('/index')
    @Render('index')
    async viewsRoot(@Param() param: listParamDTO){
        console.log(param);
        const { pageSize, pageIndex } = param
        const list = await this.getZhihuList.getList(pageSize, pageIndex)
        return { list }
    }
    @Get('/detail/:id')
    @Render('detail')
    async viewsDetail(@Param('id') id){
        const article = await this.getZhihuDetail.detail(id)
        return { article }
    }
    // @Get('/list')
    // @Render('list')
    // async viewsList(){
    //     const list = await this.getZhihuList.getList()
    //     return { list }
    // }
}
