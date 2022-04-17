import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios'
import { downloadImg, crop } from '../utils/download'
import { uploadQiniu } from '../utils/uploadQiniu'
import * as cheerio from 'cheerio';
import { Repository, Entity } from 'typeorm';
import  { InjectRepository } from '@nestjs/typeorm'
import { article, list } from './entity/zhihu.entity';
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
        for(var i = 0;i < figureLength;i++){
            console.log(i)
            let img = $('figure').eq(i).find('img').attr('data-actualsrc')
            $('figure noscript').remove()
            console.log('img.split', img)
            if(!img) {
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
            const {data} = await uploadQiniu(a)
            let ossUrl = 'https://img.health-longevity.top'
            if(process.env.NODE_ENV === 'development'){
                ossUrl = 'http://r8q5v9tvi.hb-bkt.clouddn.com';
            }
            const qnImgUrl = `${ossUrl}/${data.key}`
            $('figure').eq(i).find('img').removeAttr('data-actualsrc')
            $('figure').eq(i).find('img').removeAttr('src')
            $('figure').eq(i).find('img').removeAttr('data-src')
            $('figure').eq(i).find('img').addClass('lazy')
            $('figure').eq(i).find('img').removeAttr("data-default-watermark-src")
            $('figure').eq(i).find('img').attr("data-original", qnImgUrl)
            $('figure').eq(i).find('img').removeAttr("data-actualsrc")
            if (figureLength > 1) {
                if (i === 1) {
                    articleThumbnail = qnImgUrl
                }
            } else {
                articleThumbnail = qnImgUrl
            }
        }
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
        const success = await this.saveZhi(title, html, article_id, articleThumbnail)    
        let result = {
            title,
            articleThumbnail,
            meun_id,
            article_id,
            introduction
        }
        return result
    }
    async saveZhi(title: string, content: string, article_id: string, thumbnail: string){
        const newinsert = this.zhihuRepos.create({ title, content, article_id, thumbnail })
        const zhi = await this.zhihuRepos.save(newinsert)    
        return zhi
    }
   
}

export class zhihu_listServer {
    constructor(
        @InjectRepository(list) private readonly zhihuList: Repository<list>,
        @InjectRepository(article) private readonly zhihuArticle: Repository<article>        
    ) { }
    async list(thumbnail: string, title: string, meun_id: number, article_id: string, introduction: string) {
        // const categroy_name = categroy(categroy_id)
        const newinsert = this.zhihuList.create({ title, introduction, thumbnail, meun_id, article_id })
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