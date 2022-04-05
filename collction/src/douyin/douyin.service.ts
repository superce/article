import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { video_list } from './entity/videoList.entity';
import { auth_infor } from './entity/bozhu.entity';
import * as cheerio from 'cheerio'
import * as request from 'request'
import * as puppeteer from 'puppeteer'
import { guid } from '../utils/GUID'
@Injectable()
export class DouyinService {
  constructor(
    @InjectRepository(auth_infor) private readonly authorInfor: Repository<auth_infor>,
    @InjectRepository(video_list) private readonly videoListInfor: Repository<video_list> 
  ){}
  collectionVideoList(url: string, categroy_id: string){ 
    return new Promise((resove, reject) => {
      request(url, async (err: any, res: any, body: any) =>{
        const $ = cheerio.load(body)      
        // 博主信息
        // const auth = this.getAuthInfor($)
        const avatar = ""//$('._1mISMfK2').html()
        const fans: string = $('._1mISMfK2 .ueM2zQtG').eq(1).find('.hjwDKpez').text()
        const likes: string = $('._1mISMfK2 .ueM2zQtG').eq(2).find('.hjwDKpez').text() 
        const author = $('._1mISMfK2 ._EYw0j54 span span span span span').html()
        const account = $('._1mISMfK2 .nLpBdOIE').text()
        const authId = guid()
        console.log(avatar, fans, likes, account, authId, author);
        
        const save = this.authorInfor.create({ avatar, fans, likes, author, account, authId, categroy_id })
        let saveAuth = await this.authorInfor.save(save)
        // 采集视频信息
        let status = {
          code: 200,
          data:{},
          message: '采集成功'
        }
        const list = $('ul[class=ARNw21RN] li').length
        let douyinList = []
        console.log(`----共${list}条视频---`);
        
        for(var i = 0;i < list;i ++){
          try{
            console.log(`第${i}条视频`)
            const href = $('ul[class=ARNw21RN] li').eq(i).find('a').attr('href')
            console.log(href);
            
            const cover = $('ul[class=ARNw21RN] li').eq(i).find('img').attr('src')
            const cover_url: string = 'https:' + cover
            const like = $('ul[class=ARNw21RN] li').eq(i).find('.jjKJTf4P span').text()
            const video_url = await this.getVideoItem(href)
            const time = '0'
            let param = { authId, cover_url, video_url, like, time }
            const infor = this.videoListInfor.create(param)
            await this.videoListInfor.save(infor)
            douyinList.push(param)
          }catch(err){
            reject(err)
            break
          }
        }
        const data = {
          auth: saveAuth,
          list: douyinList
        }
        status.data = data
        resove(status) 
      })
    })   
  }
  getVideoItem(url: string){
    const u = 'https:' + url
    return new Promise<string>(async (resove, reject) =>{
      let option = {
        //使用无头模式，默认为有头(true为无界面模式)
        headless: false,
        //设置打开页面在浏览器中的宽高
        defaultViewport: {
          width: 1200,
          height: 800
        }
      }
      try{
        const browser = await puppeteer.launch(option);
        const page = await browser.newPage();
        console.log('打开窗口');
        await page.goto(u, { waitUntil: 'load', timeout: 0 });
        const link = await page.$eval('#root video source', el => el.getAttribute('src'))
        console.log(link);
        console.log('关闭窗口');        
        await browser.close()
        resove('https:'+link)
      }catch(e){
        reject(e)        
      }
    })
  }
  // 账号信息
  getAuthInfor($: any){
    const avatar = ''//$('._1mISMfK2').html()
    const fans: string = $('._1mISMfK2 .ueM2zQtG').eq(1).find('.hjwDKpez').text()
    const likes: string = $('._1mISMfK2 .ueM2zQtG').eq(2).find('.hjwDKpez').text()
    const account: string = $('._1mISMfK2 ._EYw0j54 span').text()
    let result = { avatar, fans, likes, account }
    return result
  }
  // 获取博主列表
  async getAuthorList(){
    let result = {
      code: 200,
      data:[],
      message: 'ok'
    }
    const list = await this.authorInfor.find()
    result.data = list
    throw new HttpException(result, HttpStatus.OK); 
    // try{
    // }catch(err){
    //   console.log('err', err);
      
    //   throw new HttpException(err, HttpStatus.BAD_REQUEST);
    // }
  }
}
