import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post, Render, UseGuards, Header, Query } from '@nestjs/common';
import { ZhihuService, zhihu_listServer } from './zhihu.service'
import { zhihuDTO, editCategroyDTO, deleteArticleDTO, returnData } from './dto/index'
import { AuthGuard } from '@nestjs/passport';
@Controller('/api/home')
export class ZhihuController {    
    constructor(
        private ZhihuService:ZhihuService, 
        private zhihu_list: zhihu_listServer,
    ){}
    @UseGuards(AuthGuard('jwt'))
    @Post()
    async postGetZhihu(@Body() zhihuDTO: zhihuDTO){
        const { url } = zhihuDTO  
        if(!url) throw new HttpException("url不能为空", HttpStatus.OK)  
        let param = {
            thumbnail: '',
            title: '',
            meun_id: 0,
            article_id: '',
            introduction: '',
            date: new Date() as Date
        }  
        if (url.includes('zhuanlan.zhihu')) {
            //const { articleThumbnail, title, meun_id, article_id, introduction } = 
            const { articleThumbnail, title, meun_id, article_id, introduction, date } = await this.ZhihuService.zhuanlan(zhihuDTO)             
            param = { thumbnail: articleThumbnail, title, meun_id, article_id, introduction, date }
        }else{
            // const { articleThumbnail, title, meun_id, article_id, introduction, date } = await this.ZhihuService.collection(zhihuDTO) 
            // param = { thumbnail: articleThumbnail, title, meun_id, article_id, introduction, date }
        }
        const result = await this.zhihu_list.list(param) 
        throw new HttpException(result, HttpStatus.OK);
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('/editcategroy')
    async editCategroy(@Body() editCategroy: editCategroyDTO){
        const { id, meun_id } = editCategroy
        await this.zhihu_list.edit(id, meun_id)        
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('list')
    async getList(){
        await this.zhihu_list.lists()
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('detail')
    async getDetail(@Query('id') id: string){  
        console.log(id);      
        await this.zhihu_list.articleDetail(id)
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('delete/:id')
    async deleteListItem(@Param() Param: deleteArticleDTO){
        const { id } = Param
        await this.zhihu_list.onDelete(id)        
    }
}
