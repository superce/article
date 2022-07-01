const cnchars = require('simplebig');
import * as request from 'request'

function wycApi(html: any) {
    return new Promise((resolve, reject) => {
        request({
            url: 'http://www.wzwyc.com/api.php',
            method: "POST",
            json: true,
            headers: {
              "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            form: {
              info: html
            }
          }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log(body) // 请求成功的处理逻辑
              resolve(body)
            }
          }); 
    })
}
export async function translate(html: string) {
    // const text = await wycApi(html)
    const result = cnchars.s2t(html);
    return result
}