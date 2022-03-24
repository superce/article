import { Body, Controller, Get, HttpCode, Param, Post, Render } from '@nestjs/common';
import { ZhihuService, zhihu_listServer, getZhihuListServer, zhihuDetailServer } from './zhihu.service'
import { zhihuDTO } from './dto/index'
@Controller('/zhihu')
export class ZhihuController {
    constructor(
        private ZhihuService:ZhihuService, 
        private zhihu_list: zhihu_listServer,
        private getZhihuList: getZhihuListServer,
        private getZhihuDetail: zhihuDetailServer
    ){}
    @Post()
    @HttpCode(200)
    async postGetZhihu(@Body() zhihuDTO: zhihuDTO){
        const { url } = zhihuDTO
        console.log('url', zhihuDTO)
        const { title, article_id, articleThumbnail } = await this.ZhihuService.collection(url)        
        const result = await this.zhihu_list.list(article_id, articleThumbnail, title)
        console.log(result)
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
        return data
    }

    @Get('/index')
    @Render('index')
    async viewsRoot(){
        const list = await this.getZhihuList.getList()
        return { list }
    }
    @Get('/detail/:id')
    @Render('detail')
    async viewsDetail(@Param('id') id){
        const article = await this.getZhihuDetail.detail(id)
        return { article }
    }
    @Get('/list')
    @Render('list')
    async viewsList(){
        const list = await this.getZhihuList.getList()
        return { list }
    }
}
