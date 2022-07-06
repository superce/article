import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios'
import { Repository, Entity } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'
import { weibo_img } from './entity/weibo.entity';
import saveItem from './dto/type'
@Injectable()
export class WeiboService {
    constructor(@InjectRepository(weibo_img) private readonly weibo: Repository<weibo_img>) { }
    async onRequesApi(uid: number, page: number, feature: number, since_id: string) {
        return new Promise((resolve, reject) => {
            axios.get('https://weibo.com/ajax/statuses/mymblog', {
                params: { uid, page, feature, since_id },
                headers: {
                    cookie: "SINAGLOBAL=3748657699474.4424.1655737832520; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WhRTNKHf4z3LxDu2I5DxRSe5JpX5KMhUgL.Fo-ceonXeo27ehM2dJLoI0YLxKnLB.qLBoMLxKBLBonL1h5LxKqLBK5LBoMLxKML1-2L1hBLxKML1KBLBoMLxKBLB.2LB.2LxK-L1K-L122t; ULV=1656941816043:3:2:2:6520104527124.835.1656941815948:1656837108038; PC_TOKEN=c9901a7a7d; ALF=1688646084; SSOLoginState=1657110085; SCF=AtNrTHk5Xly9ixus90Nd28HsHH3euCOj6ufgM3osKHZU03BaK_fZgLiah74ZTB2-_606S5C3B8JbXxagiivENiw.; SUB=_2A25PwQ4VDeRhGeNI6VoV8i_MyzuIHXVst3jdrDV8PUNbmtANLWWikW9NSJzb2nN1ZA2wucIzVwaImabzJByGHX8h; XSRF-TOKEN=RWemsLh6F6XekmVAtX4kcCb5; WBPSESS=JumwdUtFZkRyTfQsz1wirfZkCpXzK7fV8VQ8h6PvzivzV70a53Fuk680qR1i8aZmW3DkQ8qgfn4bL3GGn2otojYV7XHkKpGKsZljfsorj_HJn2pgt0ZuVjFAnQO1tYwI0pBDi4RfDUNZRXgajr3gDA=="
                }
            }).then(res => {
                resolve(res.data)
            }).catch(err => {

            })
        })
    }
    async onGetWeiBoAuthor(url: string) {
        const urlSplit = url.split('/')
        const uid = Number(urlSplit[urlSplit.length - 1])
        let since_id: string = ''
        let page: number = 0
        let stopWhile: boolean = false;
        do {
            page++
            console.log(page, since_id);
            const { data }: any = await this.onRequesApi(uid, page, 0, since_id)
            since_id = data.since_id
            for (let list of data.list) {
                for (let item of list.pic_ids) {
                    const saveItem: saveItem = {
                        img_url: list.pic_infos[item].large.url,
                        thumbnail: list.pic_infos[item].thumbnail.url,
                        author_name: list.user.screen_name,
                        author_id: list.user.idstr,
                        group_imgs_id: list.idstr,
                        group_imgs_title: list.text_raw
                    }
                    try{
                        const newinsert = this.weibo.create(saveItem)
                        await this.weibo.save(newinsert)                    
                    }catch(err){
                        const result = {
                            code: 400,
                            msg: err
                        }
                        since_id = ''
                        console.log('result',list, item, page, since_id);
                        break
                    }
                }
            }
            stopWhile = page >= 5 || !since_id ? true : false
        } while (stopWhile)
        const result = {
            code: 200,
            message: 'ok'
        }
        throw new HttpException(result, HttpStatus.OK)
    }
}
