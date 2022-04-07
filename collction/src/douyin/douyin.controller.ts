import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { DouyinService } from './douyin.service'
import { urlDTO, authorListDTO, videoListDTO } from './dto/index'
import { AuthGuard } from '@nestjs/passport';
@Controller('api/douyin')
export class DouyinController {
  constructor(
    private douyin: DouyinService
  ){}
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async dList(@Query() query){
    const { url, categroy_id } = query
    const result = await this.douyin.collectionVideoList(url, categroy_id)    
    throw new HttpException(result, HttpStatus.OK); 
  }  
  @UseGuards(AuthGuard('jwt'))
  @Post('author')
  async getAuthor(@Body() param: authorListDTO) {
    // const { url, categroy_id } = query
    await this.douyin.getAuthorList()    
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('video')
  async getVideo(@Body() param: videoListDTO) {
    const { authId, pageIndex, pageSize } = param  
    await this.douyin.getVideoList(authId, pageIndex, pageSize)    
  }
}
