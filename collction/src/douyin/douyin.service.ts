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
        console.log('保存博主')
        const save = this.authorInfor.create({ avatar, fans, likes, author, account, authId, categroy_id })
        let saveAuth = await this.authorInfor.save(save)
        console.log('保存成功')
        // 采集视频信息
        let status = {
          code: 200,
          data:{},
          message: '采集成功'
        }
        const list = $('.FeJSrpNN').eq(0).find('ul[class=ARNw21RN] li').length // ul[class=ARNw21RN] li').length
        let douyinList = []
        console.log(`----共${list}条视频---`);
        
        for(var i = 0;i < list;i ++){
          try{
            console.log(`第${i}条视频`)
            const href = $('.FeJSrpNN').eq(0).find('ul[class=ARNw21RN] li').eq(i).find('a').attr('href')
            console.log(href);
            if(!href){
              continue
            }
            const cover = $('ul[class=ARNw21RN] li').eq(i).find('img').attr('src')
            const cover_url: string = 'https:' + cover
            const like = $('ul[class=ARNw21RN] li').eq(i).find('.jjKJTf4P span').text()
            const {video_url, title} = await this.getVideoItem(href)
            const time = '0'            
            let param = {title, authId, cover_url, video_url, like, time }
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
    return new Promise<any>(async (resove, reject) =>{
      let option = {
        //使用无头模式，默认为有头(true为无界面模式)
        headless: false,
        //设置打开页面在浏览器中的宽高
        defaultViewport: {
          width: 1200,
          height: 800
        }
      }
      const optionsLaunch = {
          headless: false,
          devtools: false,
          defaultViewport: {
              width: 1200,
              height: 900
          },
          slowMo: 250,
          timeout: 0,
          // product: "chrome",
          ignoreHTTPSErrors: true,
          ignoreDefaultArgs: ["--enable-automation"],
          // channel: "chrome",
          // executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
      };
      // { 
      //   headless: false,  
      //   args: ['--use-gl=egl', '--no-sandbox']
      // }
      try{
        const browser = await puppeteer.launch({ 
            headless: false,  
            args: ['--use-gl=egl', '--no-sandbox']
          });
        const page = await browser.newPage();
        console.log('打开窗口');
        await page.goto(u, { waitUntil: 'networkidle0', timeout: 0 });
        await page.content()
        const domNode = await page.$('video source:nth-child(3)')
        let msg = {
          video_url: '', title: ''
        }
        if(domNode){
          let video_url = await page.evaluate(body => body.getAttribute('src'), domNode)
          const title = await page.$eval('.z8_VexPf .Nu66P_ba', el => el.textContent)
          video_url = video_url.replace('//www.douyin.com/','https://aweme.snssdk.com/') //https://aweme.snssdk.com/aweme/v1/play/?video_id=v0200fg10000c96p2q3c77u06sc033rg&line=0&file_id=2ab43362149f484d8af4f00aac88be0f&sign=45a54d85108f7b22014dce376b5ec984&is_play_url=1&source=PackSourceEnum_AWEME_DETAIL&aid=6383
          msg = {
            video_url, title
          }
        }
        console.log('关闭窗口');    
        await page.close()    
        await browser.close()
        resove(msg)
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
  }
  // 视频列表
  async getVideoList(authId: string, pageIndex: number, pageSize:number){
    let result = {
      code: 200,
      data:[],
      message: 'ok',
      count: 0
    }
    pageIndex = pageIndex - 1
    const skip = pageIndex * pageSize
    const list = await this.videoListInfor.createQueryBuilder("video_list").andWhere({authId}).orderBy({create_date: 'DESC'}).skip(skip).take(pageSize).getMany()
    const count = await this.videoListInfor.createQueryBuilder("video_list").andWhere({authId}).getCount()
    console.log(list);
    result.count = count
    result.data = list
    throw new HttpException(result, HttpStatus.OK)
  }
}
