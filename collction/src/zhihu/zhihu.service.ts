import { Injectable } from '@nestjs/common';
import axios from 'axios'
import { downloadImg, crop } from '../utils/download'
import { uploadQiniu } from '../utils/uploadQiniu'
const cheerio = require('cheerio')
import { Repository, Entity } from 'typeorm';
import  { InjectRepository } from '@nestjs/typeorm'
import { zhihu_article, zhihu_list } from './entity/zhihu.entity';
import { guid } from '../utils/GUID'
import { translate } from 'src/utils/opencc';
@Injectable()

export class ZhihuService {
    constructor(@InjectRepository(zhihu_article) private readonly zhihuRepos: Repository<any>){}
    async collection(param: string){
        const url = `https://www.zhihu.com/${param}`
        const { data } = await axios.get(url)
        const $ = cheerio.load(data) 
        let openccTitle = $('.QuestionHeader-title').text()
        const title = await translate(openccTitle)
        console.log('title', title, openccTitle)
        const figureLength =  $('figure').length        
        let articleThumbnail: string = ''
        for(var i = 0;i < figureLength;i++){
            console.log(i)
            let img = $('figure').eq(i).find('img').attr('data-actualsrc')
            $('figure noscript').remove()
            const imgurl = img.split('?')[0]
            if (imgurl.includes('.gif')) {
                $('figure').eq(i).remove()
                continue
            }
            
            // const a:{name:string,path:string} = await downloadImg(imgurl)
            const a: { name: string, path: string } = await crop(imgurl)
            console.log(a)
            await uploadQiniu(a)
            console.log('存储七牛成功');
            
            const qnImgUrl = `http://r8q5v9tvi.hb-bkt.clouddn.com/${a.name}`
            $('figure').eq(i).find('img').attr('data-actualsrc', "")
            $('figure').eq(i).find('img').attr('src', qnImgUrl)
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
        const success = await this.saveZhi(title, html)    
        let result = {
            title,
            article_id: success.article_id,
            articleThumbnail,
        }
        return result
    }
    async saveZhi(title: string, content: string){
        const article_id = guid()
        const newinsert = await this.zhihuRepos.create({ title, content, article_id })
        const zhi = await this.zhihuRepos.save(newinsert)        
        return zhi
    }
   
}

export class zhihu_listServer{
    constructor(@InjectRepository(zhihu_list) private readonly zhihuRepos: Repository<any>) { }
    async list(article_id: string, thumbnail: string, title: string) {
        const newinsert = await this.zhihuRepos.create({ title, thumbnail, article_id })
        const list = await this.zhihuRepos.save(newinsert) 
        return list
    }
}

export class getZhihuListServer {
    constructor ( @InjectRepository(zhihu_list) private readonly getZhihuList: Repository<any> ){}
    async getList(pageSize = 10, pageParam = 1) {
        // let db = await this.getZhihuList.createQueryBuilder('h').skip(pageSize * (pageParam - 1)).take(pageSize).getRawMany()
        // console.log(db)
        // return db
        return await this.getZhihuList.find()
    }
}

export class zhihuDetailServer {
    constructor(@InjectRepository(zhihu_article) private readonly getDetail: Repository<any>){}
    async detail (article_id: string) {
        return await this.getDetail.findOneByOrFail({article_id})
    }
}