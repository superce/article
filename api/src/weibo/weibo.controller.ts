import { Controller, Get, HttpException, Query, HttpStatus, UseGuards } from '@nestjs/common';
import { WeiboService } from './weibo.service';
import { weibo_list } from './dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('weibo')
export class WeiboController {
    constructor(private WeiboService: WeiboService){}
    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getWeiBoAuthor(@Query('url') url: string){
        this.WeiboService.onGetWeiBoAuthor(url)        
        const result = {
            code: 200,
            message: 'ok'
        }
        throw new HttpException(result, HttpStatus.OK)
    }
    @UseGuards(AuthGuard('jwt'))
    @Get('/list')
    async getWeiBoAuthorList(@Query() param: weibo_list){
        const { pageIndex, pageSize } = param
        await this.WeiboService.onGetList(pageIndex, pageSize)        
    }
}

