import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios'
import { Repository, Entity } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'
import { weibo_img } from './entity/weibo.entity';
import saveItem from './dto/type'

@Injectable()
export class WeiboService {
    constructor(@InjectRepository(weibo_img) private readonly weibo: Repository<weibo_img>) { }
    async onRequesApi(uid: number, page: number, feature: number, since_id: string, cookie: string) {
        return new Promise((resolve, reject) => {
            axios.get('https://weibo.com/ajax/statuses/mymblog', {
                params: { uid, page, feature, since_id },
                headers: { cookie }
            }).then((res:any) => {
                console.log(res.data);
                if(res.data.ok === 1){
                    resolve(res.data)
                }else{
                    reject(res)
                }
            }).catch(err => {
                reject(err)
            })
        })
    }
    async onGetWeiBoAuthor({url, meun_id, cookie}) {
        const urlSplit = url.split('/')
        const uid = Number(urlSplit[urlSplit.length - 1])
        let since_id: string = ''
        let page: number = 0
        do {
            page++
            // console.log(page, since_id);
            try{
                const { data }: any = await this.onRequesApi(uid, page, 0, since_id, cookie)
                since_id = data.since_id
                for (let list of data.list) {
                    try{
                        const group_id = await this.weibo.findOne({where: {group_imgs_id: list.idstr}})
                        console.log('-----', group_id);
                        if(group_id) break                    
                    }catch(err){
    
                    }
                    for (let item of list.pic_ids) {                    
                        const saveItem: saveItem = {
                            meun_id,
                            img_url: list.pic_infos[item].large.url,
                            thumbnail: list.pic_infos[item].thumbnail.url,
                            author_name: list.user.screen_name,
                            author_id: list.user.idstr,
                            group_imgs_id: list.idstr,
                            group_imgs_title: list.text_raw,
                        }
                        console.log(list.pic_ids.length);
                        try{                        
                            const newinsert = this.weibo.create(saveItem)
                            this.weibo.save(newinsert)                    
                        }catch(err){
                            const result = {
                                code: 400,
                                msg: err
                            }
                            since_id = ''
                            // console.log('result',list, item, page, since_id);
                            break
                        }
                    }
                }
                if(page >= 5) since_id = ''
            }catch(err){
                return err
            }
            
        } while (since_id)        
    }
    async onGetList(pageIndex: number, pageSize: number){
        const skip = (pageIndex - 1) * pageSize
        let result = {
            code: 200,
            data: {},
            count: 0,
            msg: ''
        }
        try{
            const res = await this.weibo.createQueryBuilder("weibo_img").orderBy({find_time: 'DESC'}).skip(skip).take(pageSize).getMany()
            const count = await this.weibo.count()
            result = { code: 200, data: res, count, msg: 'ok' }
        }catch(err){
            result = { code: 200, data: {}, count: 0, msg: 'ok' }
        }
        throw new HttpException(result, HttpStatus.OK)
    }
}
