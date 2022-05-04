const hbs = require('hbs') ;
import * as fs from 'fs';
import { join } from 'path';
export function hbsView(app: 
    {   useStaticAssets: (arg0: string) => void; 
        setBaseViewsDir: (arg0: string) => void; 
        setViewEngine: (arg0: string) => void;
    })
    {
    app.useStaticAssets(join(__dirname, '..', 'public'));
    app.setBaseViewsDir(join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    // 设置hbs模板，局部引用
    hbs.registerHelper('extend', (name: string | number, context: { fn: (arg0: any) => any, hash: any, data:any }) => {
        // options.name: 当前helper的名称, 例如: debug
    // options.hash[hashKey1] === hashValue1
    // options.hash[hashKey2] === hashValue2
    // options.fn(this): 块级helper内部的模板函数
    // options.inverse: else分支的模板函数
    // options.data.root: 当前页面填充的数据对象
    // return 的字符串就是渲染的Markup片段
    
    const { title,article_id,thumbnail } = context.hash
    // return new hbs.SafeString(
    //     `<meta property="og:type" content="article">
    //     <meta id="og-title" property="og:title" content="${title}">
    //     <meta id="og-url" property="og:url" content="https://health-longevity.top/detail/${article_id}">
    //     <meta id="og-image" property="og:image" content="https://health-longevity.top${thumbnail}">
    //     <meta id="t-imgage" name="twitter:image" content="https://health-longevity.top${thumbnail}">`
    // )
    })
    hbs.registerHelper('block', (name: any, context: any) => {
        if(context.hash.article){
            if (context.hash.article.id){
                const { title, article_id, thumbnail } = context.data.root.article
                let url = ''
                if (thumbnail.includes('fileimg')){
                    url = 'https://health-longevity.top'
                }
                return new hbs.SafeString(
                    `<meta property="og:type" content="article">
                    <meta id="og-title" property="og:title" content="${title}">
                    <meta id="og-url" property="og:url" content="https://health-longevity.top/detail/${article_id}">
                    <meta id="og-image" property="og:image" content="${url}${thumbnail}">
                    <meta id="t-imgage" name="twitter:image" content="${url}${thumbnail}">`
                )
            }
        }
    })
    // hbs.registerPartial('partial', fs.readFileSync(join(__dirname, '../views', 'partial.hbs'), 'utf8'))
    // hbs.registerPartials(join(__dirname, '../views', 'partials'))
    
}