import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { apiGetFunction } from './utils/request'

@Injectable()
export class AppService {
  async getCai() {    
    try{
      const url = 'http://v.juhe.cn/toutiao/index'
      const result = await apiGetFunction(url, {key: "6e13e581ebf069f4ea2b736ff3969582", 		type: 'top', page: 1, page_size: 30,	is_filter: 0 })
      console.log('result', result)
      throw new HttpException(result, HttpStatus.OK);
    }catch(err){
      console.log('err', err)
      throw new HttpException(err, HttpStatus.BAD_REQUEST)
    }
  }
  async jok() {    
    try{
      const url = 'http://web.juhe.cn/constellation/getAll'
      const result = await apiGetFunction(url, {key: "aededeb3fca37223b0cd75f410e49663", consName: '双鱼座', type: 'today'})
      console.log('result', result)
      throw new HttpException(result, HttpStatus.OK);
    }catch(err){
      console.log('err', err)
      throw new HttpException(err, HttpStatus.BAD_REQUEST)
    }
  }
}
