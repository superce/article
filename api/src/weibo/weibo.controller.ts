import { Controller, Get, Query } from '@nestjs/common';
import { WeiboService } from './weibo.service';
@Controller('weibo')
export class WeiboController {
    constructor(private WeiboService: WeiboService){}
    @Get()
    async getWeiBoAuthor(@Query('url') url: string){
        console.log(url);
        await this.WeiboService.onGetWeiBoAuthor(url)        
    }
}

