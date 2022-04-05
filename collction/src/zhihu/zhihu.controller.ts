import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Render, UseGuards, Header } from '@nestjs/common';
import { ZhihuService, zhihu_listServer } from './zhihu.service'
import { zhihuDTO, editCategroyDTO } from './dto/index'
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
        const {article_id, articleThumbnail, title, categroy_id} = await this.ZhihuService.collection(zhihuDTO) 
        const result = await this.zhihu_list.list(article_id, articleThumbnail, title, categroy_id) 
        throw new HttpException(result, HttpStatus.OK);
    }

    @Post('/editcategroy')
    async editCategroy(@Body() editCategroy: editCategroyDTO){
        const { id, categroy_id } = editCategroy
        const result = await this.zhihu_list.edit(id, categroy_id)        
        throw new HttpException(result, HttpStatus.OK)
    }
    @Get('/list')
    async getList(){
        const result = await this.zhihu_list.lists()
        throw new HttpException(result, HttpStatus.OK)
    }

}
