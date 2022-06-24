import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios'
import * as request from 'request'
import { downloadImg, crop } from '../utils/download'
import { uploadQiniu } from '../utils/uploadQiniu'
import * as cheerio from 'cheerio';
import { Repository, Entity } from 'typeorm';
import  { InjectRepository } from '@nestjs/typeorm'
import { article, list } from '../entity/article.entity';
import { guid } from '../utils/GUID'
import { translate } from 'src/utils/opencc';
import { categroy } from '../utils/categroy'
@Injectable()

export class ZhihuService {
    constructor(@InjectRepository(article) private readonly zhihuRepos: Repository<article>){}
    async collection(param:{url: string, meun_id: number} ){
        const { url, meun_id } = param //`https://www.zhihu.com/${param}`        
        const { data } = await axios.get(url)
        const $ = cheerio.load(data) 
        let openccTitle = $('.QuestionHeader-title').text()
        const title = await translate(openccTitle)
        const figureLength =  $('figure').length  
              
        let articleThumbnail: string = ''
        // 处理图片
        articleThumbnail =  await this.setImgs($, figureLength, 'qs')
        let time = $('.ContentItem-time').text()        
        let splitDate = time.split(' ')
        let splitDate2 = splitDate[2]
        if (splitDate[2].includes('・')){
            splitDate2 = splitDate[2].split('・')[0]
        }
        let toDate: string = splitDate[1] + ' ' + splitDate2
        let date = new Date(toDate)
        let html = $('.RichContent-inner').eq(0).find('.RichText').html()
        let text = $('.RichContent-inner').eq(0).find('.RichText').text()
        html = await translate(html)
        const article_id = guid()
        let introduction:string = ''
        if (text.length > 48){
            introduction = text.substring(0, 48)
        }else{
            introduction = text
        }
        introduction = await translate(introduction)
        introduction += '...'
        await this.saveZhi(title, html, article_id, articleThumbnail, date)    
        let result = {
            title,
            articleThumbnail,
            meun_id,
            article_id,
            introduction, 
            date
        }
        return result
    }
    // 知乎专栏
    async zhuanlan(param: { url: string, meun_id: number }): Promise<any>{
        const { url, meun_id } = param
        return new Promise((resove, reject) => {
            request(url, async (err: any, res: any, body: any) => {
                const $ = cheerio.load(body)  
                const img = $('.App-main .Post-content .TitleImage').attr('src')
                const openccTitle = $('.Post-Main .Post-Title').text()
                const title = await translate(openccTitle)
                let articleThumbnail: string = ''
                const figureLength = $('figure').length 
                let thumbnail = await this.setImgs($, figureLength, 'zhuanlan')
                if(img){
                    articleThumbnail = img
                }else{
                    articleThumbnail = thumbnail
                }
                let time = $('.ContentItem-time').text()              
                let splitDate = time.split(' ') 
                let toDate: string = splitDate[1] + ' ' + splitDate[2]
                console.log(toDate)
                let date = new Date(toDate)
                console.log('时间', date)
                let html:any = $('.Post-Main .RichText').html()
                let text = $('.Post-Main .RichText').text()
                html = await translate(html)
                
                const article_id = guid()
                let introduction: string | any = ''
                if (text.length > 60) {
                    introduction = text.substring(0, 60)
                } else {
                    introduction = text
                }
                introduction = await translate(introduction)
                introduction += '...'
                await this.saveZhi(title, html, article_id, articleThumbnail, date)
                let result = {
                    title,
                    articleThumbnail,
                    meun_id,
                    article_id,
                    introduction,
                    date
                }
                console.log('result', result)
                resove(result)
            })
        })
    }
    async saveZhi(title: string, content: string, article_id: string, thumbnail: string, date: Date){        
        const newinsert = this.zhihuRepos.create({ title, content, article_id, thumbnail, date })
        const zhi = await this.zhihuRepos.save(newinsert)    
        return zhi
    }
    //    处理图片
    async setImgs($: any, figureLength: number, zl:string): Promise<string>{
        let articleThumbnail: string;
        for (var i = 0; i < figureLength; i++) {
            let img = $('figure').eq(i).find('img').attr('data-actualsrc')
            $('figure noscript').remove()
            console.log('img.split', img)
            if (!img) {
                $('figure').eq(i).remove()
                continue
            }
            const imgurl = img.split('?')[0]
            if (imgurl.includes('.gif')) {
                $('figure').eq(i).remove()
                continue
            }

            // const a:{name:string,path:string} = await downloadImg(imgurl)
            const a: { name: string, path: string } = await crop(imgurl)
            const { data } = await uploadQiniu(a)
            let ossUrl = 'https://img.health-longevity.top'
            if (process.env.NODE_ENV === 'development') {
                ossUrl = 'http://rajgtbfsj.hb-bkt.clouddn.com';
            }
            const qnImgUrl = `${ossUrl}/${data.key}`
            $('figure').eq(i).find('img').removeAttr('data-actualsrc')
            $('figure').eq(i).find('img').removeAttr('src')
            $('figure').eq(i).find('img').removeAttr('data-src')
            $('figure').eq(i).find('img').addClass('lazy')
            $('figure').eq(i).find('img').removeAttr("data-default-watermark-src")
            $('figure').eq(i).find('img').attr("data-original", qnImgUrl)
            $('figure').eq(i).find('img').removeAttr("data-actualsrc")
            if(zl === 'zhuanlan'){
                if (i === 1) {
                    articleThumbnail = qnImgUrl
                }
            }else{
                if (figureLength > 1) {
                    if (i === 1) {
                        articleThumbnail = qnImgUrl
                    }
                } else {
                    articleThumbnail = qnImgUrl
                }
            }
        }
        return articleThumbnail
    }
}

export class zhihu_listServer {
    constructor(
        @InjectRepository(list) private readonly zhihuList: Repository<list>,
        @InjectRepository(article) private readonly zhihuArticle: Repository<article>        
    ) { }
    async list(param: { thumbnail: string, title: string, meun_id: number, article_id: string, introduction: string, date: Date}) {        
        const { thumbnail, title, meun_id, article_id, introduction, date } = param
        // const categroy_name = categroy(categroy_id)
        const newinsert = this.zhihuList.create({ title, introduction, thumbnail, meun_id, article_id, date })
        const list = await this.zhihuList.save(newinsert)
        let code = 400
        let message = '采集失败'
        if(list.id > 0){
            code = 200
            message = '采集成功'
        }
        let retsult = {
            code,
            data:list,
            message
        }
        return retsult
    }
    async edit(id: number, meun_id: number){
        let result = {
            code:200,
            data:{},
            message: '修改成功'
        }
        try{
            const item = await this.zhihuList.findOne({where: {id}})
            if(!item){
                result = {
                    code:400,
                    data:{},
                    message: '没有此条数据'
                }
            }else{
                item.meun_id = meun_id
                result.data = await this.zhihuList.save(item)
                console.log(result);
            }
        }catch(err){
            result = {
                code:400,
                data:{},
                message: '修改失败'
            }
        }
        throw new HttpException(result, HttpStatus.OK)
    }
    async lists(){
        const list = await this.zhihuList.find()
        let result = {
            code: 200,
            data: list,
            message: 'ok'
        }
        throw new HttpException(result, HttpStatus.OK)
    }
    // 文章详情
    async articleDetail(article_id: string){
        let result = {
            code: 200,
            data: {},
            message: 'null'
        }
        if(!article_id) throw new HttpException(result, HttpStatus.OK)
        try{
            const item = await this.zhihuArticle.findOne({where:{article_id}})
            result = {
                code: 200,
                data: item,
                message: 'ok'
            }
        }catch(err){
            throw new HttpException(err, HttpStatus.BAD_REQUEST)
        }
        throw new HttpException(result, HttpStatus.OK)            
    }
    async onDelete(id: number){
        let result = {
            code: 200,
            message: 'ok'
        }
        try{
            let articleRemove = await this.zhihuList.findOne({where:{id}});
            if(articleRemove){
                const { article_id } = articleRemove
                const article = await this.zhihuArticle.findOne({where: {article_id}})
                if(article){
                    const {id} = await this.zhihuList.remove(articleRemove);
                    await this.zhihuArticle.remove(article)
                    if(id){
                        result.code = 400
                        result.message = '删除失败'
                    }
                }
            }else{
                result.code = 400
                result.message = '没有此条数据'
            }
        }catch(err){
            result.code = 400
            result.message = err
        }
        throw new HttpException(result, HttpStatus.OK)
        // return result
    }
}