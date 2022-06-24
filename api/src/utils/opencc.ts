const cnchars = require('simplebig');
import axios from 'axios'
import qs from 'qs'

function wycApi(html: any) {
    console.log('html---', html);
    return new Promise((resolve, reject) => {        
        axios({
            method: 'post',
            url: 'http://www.wzwyc.com/api.php',
            data:{ 
                info: html              
            },
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Cookie': 'Hm_lvt_9960d24030b0982050171c77fbf2669f=1655706640; Hm_lpvt_9960d24030b0982050171c77fbf2669f=1655712885',
                'Host': 'www.wzwyc.com',
                "Origin": "http://www.wzwyc.com",
                "Referer": "http://www.wzwyc.com/",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36"
            }
        }).then((res: any) => {
            const data = JSON.parse(res.config.data)
            resolve(data.info)
        }).catch(err => {
            console.log(err);
        })
    })
}
export async function translate(html: string) {
    const text = await wycApi(html)
    console.log('text', text);
    // const result = cnchars.s2t(html);
    // return result
}