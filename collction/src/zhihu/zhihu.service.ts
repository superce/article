import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios'
import { downloadImg, crop } from '../utils/download'
import { uploadQiniu } from '../utils/uploadQiniu'
const cheerio = require('cheerio')
import { Repository, Entity } from 'typeorm';
import  { InjectRepository } from '@nestjs/typeorm'
import { zhihu_article, zhihu_list } from './entity/zhihu.entity';
import { guid } from '../utils/GUID'
import { translate } from 'src/utils/opencc';
import { categroy } from '../utils/categroy'
@Injectable()

export class ZhihuService {
    constructor(@InjectRepository(zhihu_article) private readonly zhihuRepos: Repository<any>){}
    async collection(param:{url: string, categroy_id: number} ){
        const { url, categroy_id } = param //`https://www.zhihu.com/${param}`
        const { data } = await axios.get(url)
        const $ = cheerio.load(data) 
        let openccTitle = $('.QuestionHeader-title').text()
        const title = await translate(openccTitle)
        console.log('title------', title, openccTitle)
        const figureLength =  $('figure').length  
        console.log('figureLength', figureLength);
              
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
            console.log(a)
            // await uploadQiniu(a)
            // console.log('存储七牛成功');
            
            const qnImgUrl = `/fileimg/${a.name}`
            $('figure').eq(i).find('img').attr('data-actualsrc', "")
            $('figure').eq(i).find('img').attr('src', qnImgUrl)
            $('figure').eq(i).find('img').attr('data-src', qnImgUrl)
            $('figure').eq(i).find('img').addClass('lazy')
            $('figure').eq(i).find('img').attr("data-default-watermark-src", "")
            $('figure').eq(i).find('img').attr("data-original", "")
            $('figure').eq(i).find('img').attr("data-actualsrc", "")
            if (figureLength > 1) {
                if (i === 1) {
                    articleThumbnail = qnImgUrl
                }
            } else {
                articleThumbnail = qnImgUrl
            }
        }
        let html = $('.RichContent-inner').eq(0).find('.RichText').html()
        html = await translate(html)
        const success = await this.saveZhi(title, html, articleThumbnail)    
        let result = {
            title,
            article_id: success.article_id,
            articleThumbnail,
            categroy_id
        }
        return result
    }
    async saveZhi(title: string, content: string, thumbnail: string){
        const article_id = guid()
        const newinsert = await this.zhihuRepos.create({ title, content, article_id, thumbnail })
        const zhi = await this.zhihuRepos.save(newinsert)    
        return zhi
    }
   
}

export class zhihu_listServer {
    constructor(@InjectRepository(zhihu_list) private readonly zhihuRepos: Repository<zhihu_list>) { }
    async list(article_id: string, thumbnail: string, title: string, categroy_id: number) {
        const categroy_name = categroy(categroy_id)
        const newinsert = await this.zhihuRepos.create({ title, thumbnail, article_id, categroy_id, categroy_name })
        const list = await this.zhihuRepos.save(newinsert)
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
    async edit(id: number, categroy_id: number){
        let result = {
            code:200,
            data:{},
            message: '修改成功'
        }
        try{
            const item = await this.zhihuRepos.findOne({where: {id}})
            if(!item){
                result = {
                    code:400,
                    data:{},
                    message: '没有此条数据'
                }
            }else{
                const categroy_name = categroy(categroy_id)
                item.categroy_id = categroy_id
                item.categroy_name = categroy_name
                result.data = await this.zhihuRepos.save(item)
                console.log(result);
            }
        }catch{
            result = {
                code:400,
                data:{},
                message: '修改失败'
            }
        }
        return result
    }
    async lists(){
        const list = await this.zhihuRepos.find()
        let result = {
            code: 200,
            data: list,
            message: 'ok'
        }
        return result
    }
}