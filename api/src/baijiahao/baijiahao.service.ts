import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { article, list } from '../entity/article.entity';
import * as cheerio from 'cheerio'
import * as request from 'request'
@Injectable()
export class BaijiahaoService {
    constructor(@InjectRepository(article) private readonly baijiahao: Repository<article>){}
    async collection(param: {url: string, meun_id: number}){
        console.log(param.url, param.meun_id)
        return new Promise((resolve, reject) => {
            request(param.url, async (err: any, res: any, body: any) => {
                console.log(body)
                resolve(body)
            })
        })
    }
}