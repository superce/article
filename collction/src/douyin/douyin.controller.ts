import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, Request } from '@nestjs/common';
import { DouyinService } from './douyin.service'
import { urlDTO, authorListDTO, videoListDTO } from './dto/index'

@Controller('api/douyin')
export class DouyinController {
  constructor(
    private douyin: DouyinService
  ){}
  @Get()
  async dList(@Query() query){
    const { url, categroy_id } = query
    const result = await this.douyin.collectionVideoList(url, categroy_id)    
    throw new HttpException(result, HttpStatus.OK); 
  }  
  @Post('author')
  async getAuthor(@Body() param: authorListDTO) {
    // const { url, categroy_id } = query
    await this.douyin.getAuthorList()    
  }
  @Post('video')
  async getVideo(@Body() param: videoListDTO) {
    const { authId } = param
    await this.douyin.getVideoList(authId)    
  }
}
