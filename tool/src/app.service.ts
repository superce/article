import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { apiGetFunction, apiPostFunction } from './utils/request'

@Injectable()
export class AppService {
  apiUrl: string;
  appkey: string;
  constructor(){
    this.apiUrl = 'https://api.jisuapi.com'
    this.appkey = "f480c3bdf019fe5f"
  }
  async getIp(ip: string) {
    try {
      const url = this.apiUrl + '/ip/location'      
      const result = await apiGetFunction(url, { appkey: this.appkey, ip })
      console.log('result', result)
      return result
    } catch (err) {
      console.log('err', err)
      throw new HttpException(err, HttpStatus.BAD_REQUEST)
    }
  }
  async getPhoneLocation(shouji: string){
    try {
      const url = this.apiUrl + '/shouji/query'
      const result = await apiGetFunction(url, { appkey: this.appkey, shouji })
      console.log('result', result)
      return result
    } catch (err) {
      console.log('err', err)
      throw new HttpException(err, HttpStatus.BAD_REQUEST)
    }
  }
  async fontconvert({ content, type }) {
    try {
      const url = this.apiUrl + '/fontconvert/convert'
      const result = await apiGetFunction(url, { appkey: this.appkey, content, type })
      console.log('result', result)
      return result
    } catch (err) {
      console.log('err', err)
      throw new HttpException(err, HttpStatus.BAD_REQUEST)
    }
  }
  // 身高體重計算
  async weightBmi({ sex, height, weight }) {
    try {
      const url = this.apiUrl + '/weight/bmi'
      console.log(url)
      const result = await apiGetFunction(url, { appkey: this.appkey, sex, height, weight })
      console.log('result', result)
      return result
    } catch (err) {
      console.log('err', err)
      throw new HttpException(err, HttpStatus.BAD_REQUEST)
    }
  }
  // 智能問答機器人
  async robort({ question }) {
    try {
      const url = this.apiUrl + '/iqa/query'
      console.log(url)
      const result = await apiGetFunction(url, { appkey: this.appkey, question })
      console.log('result', result)
      return result
    } catch (err) {
      console.log('err', err)
      throw new HttpException(err, HttpStatus.BAD_REQUEST)
    }
  }
  // 周公解夢
  async dream({ keyword, pagenum, pagesize }) {
    try {
      const url = this.apiUrl + '/dream/search'
      const result = await apiGetFunction(url, { appkey: this.appkey, keyword, pagenum, pagesize })
      return result
    } catch (err) {
      console.log('err', err)
      throw new HttpException(err, HttpStatus.BAD_REQUEST)
    }
  }
  // 身份證號查詢
  async idCard({ idcard }){
    try {
      const url = this.apiUrl + '/idcard/query'
      const result = await apiGetFunction(url, { appkey: this.appkey, idcard })
      return result
    } catch (err) {
      console.log('err', err)
      throw new HttpException(err, HttpStatus.BAD_REQUEST)
    }
  }
  // 歇後語
  async xhy({ keyword, pagenum, pagesize }) {
    try {
      const url = this.apiUrl + '/xhy/search'
      const result = await apiGetFunction(url, { appkey: this.appkey, keyword, pagenum, pagesize })
      return result
    } catch (err) {
      console.log('err', err)
      throw new HttpException(err, HttpStatus.BAD_REQUEST)
    }
  }
}
