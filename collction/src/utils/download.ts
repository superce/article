import { resolve, join } from "path"
import { guid } from './GUID'
import * as Jimp from 'jimp';
const request = require('request')
const fs = require('fs')
interface info{
    name: string,
    path: string
}
export const downloadImg = (imgurl: string) => {
    return new Promise<any>((resolve, reject) => {
        const splitImg = imgurl.split('/')            
        const name = splitImg[splitImg.length - 1].split('?')[0] 
        console.log('__dirname', __dirname);
        
        var dirPath = join(__dirname, "file");
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
            // console.log("文件夹创建成功");
        } else {
            // console.log("文件夹已存在");
        }           
        request(imgurl).pipe(fs.createWriteStream(`${dirPath}/${name}`)).on('close',function(res){
            // console.log('pic saved!----------', res)
            const obj: info = {
                name,
                path: dirPath,
            }
            resolve(obj)
        })
    })
}
export const crop = async (imgPath:string) => {
        const splitImg = imgPath.split('.')            
        const suffix = splitImg[splitImg.length - 1]
        const img = await Jimp.read(imgPath)
        const name = `${guid()}.${suffix}`
        const width = img.bitmap.width
        const height = img.bitmap.height - 50
        img.crop(0, 0, width, height)        
       // 保存
       var dirPath = join(__dirname, "../../public/fileimg");
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath);
            // console.log("文件夹创建成功");
        } else {
            // console.log("文件夹已存在");
        }  
        const imgName = `${width}_${height}-${name}`
        await img.writeAsync(`${dirPath}/${imgName}`);
        return {
            name: imgName,
            path: dirPath,
        }

}