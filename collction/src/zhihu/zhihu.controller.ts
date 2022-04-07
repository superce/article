import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Render, UseGuards, Header } from '@nestjs/common';
import { ZhihuService, zhihu_listServer } from './zhihu.service'
import { zhihuDTO, editCategroyDTO, deleteArticleDTO } from './dto/index'
import { AuthGuard } from '@nestjs/passport';
@Controller('/api/home')
export class ZhihuController {
    constructor(
        private ZhihuService:ZhihuService, 
        private zhihu_list: zhihu_listServer,
    ){}
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
    @UseGuards(AuthGuard('jwt'))
    @Post('/editcategroy')
    async editCategroy(@Body() editCategroy: editCategroyDTO){
        const { id, categroy_id } = editCategroy
        await this.zhihu_list.edit(id, categroy_id)        
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('list')
    async getList(){
        await this.zhihu_list.lists()
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('delete/:id')
    async deleteListItem(@Param() Param: deleteArticleDTO){
        const { id } = Param
        await this.zhihu_list.onDelete(id)        
    }
}
