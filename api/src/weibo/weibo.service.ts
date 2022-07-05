import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios'
import { Repository, Entity } from 'typeorm';
import  { InjectRepository } from '@nestjs/typeorm'
import { weibo_img } from './entity/weibo.entity';
@Injectable()
export class WeiboService {
    constructor(@InjectRepository(weibo_img) private readonly weibo: Repository<weibo_img>){}
   async onGetWeiBoAuthor(url: string) {
    console.log(url);
        const reg = /[0-9]/g
        // // axios.get()
        const id = url.match(reg)
        console.log(id);
        throw new HttpException(id, HttpStatus.OK)
   }
}
