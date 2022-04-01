import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Render, UseGuards, Header } from '@nestjs/common';
import { ZhihuService, zhihu_listServer } from './zhihu.service'
import { zhihuDTO } from './dto/index'
import { AuthGuard } from '@nestjs/passport';
@Controller('/api/home')
export class ZhihuController {
    constructor(
        private ZhihuService:ZhihuService, 
        private zhihu_list: zhihu_listServer,
    ){}
    // @Header('Access-Control-Allow-Origin', '*')
    // @Header('Access-Control-Allow-Methods', 'POST, GET, PUT, OPTIONS, DELETE')
    @UseGuards(AuthGuard('jwt'))
    @Post()
    @HttpCode(200)
    async postGetZhihu(@Body() zhihuDTO: zhihuDTO){
        const { url } = zhihuDTO            
        if(!url) throw new HttpException("url不能为空", HttpStatus.OK)        
        const {article_id, articleThumbnail, title} = await this.ZhihuService.collection(url) 
        const result = await this.zhihu_list.list(article_id, articleThumbnail, title) 
        throw new HttpException(result, HttpStatus.OK);
    }


}
