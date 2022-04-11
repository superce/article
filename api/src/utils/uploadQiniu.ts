const qiniu = require('qiniu')

//需要填写你的 Access Key 和 Secret Key
const accessKey = 'bsYXFiDiOIoLScpoM7iovSbtwD0ApV94thjWUHXL';
const secretKey = 'KLqctMxI6XJMex4FdEFp0LZt6MlLAn5c_WyObPjt';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)


//构建上传策略函数
function uptoken(bucket: string, key: string) {
    console.log('uptoken');
    
    var putPolicy = new qiniu.rs.PutPolicy({scope: bucket+":"+key});
    console.log(putPolicy);
    
    return putPolicy.uploadToken(mac);
  }


//构造上传函数
function uploadFile(uptoken, key, localFile) {
    console.log('uploadFile');
    
    return new Promise<any>((resolve, reject) => {
        const extra = new qiniu.form_up.PutExtra();
        const config = new qiniu.conf.Config();
        const formUploader = new qiniu.form_up.FormUploader(config);
        console.log('formUploader', formUploader);
        
        formUploader.putFile(uptoken, key, localFile, extra, (err: any, body:any, res:any) => {
            console.log(uptoken, key, localFile);
            console.log('err------', err, 'res---', res);
            
            if(err) {
                reject(err)
                throw err
            }
            if(res.statusCode === 200){
                console.log(body);
                resolve(res)
            }else{
                console.log(res.statusCode);
            }
        })
    })
}
export const uploadQiniu = async (info:{name: string, path: string} ) => {
    //要上传的空间
    let bucket = 'health-img-save'; 
    // if(process.env.NODE_ENV === 'development'){
    //     bucket = 'zhihu-img-save';
    // }   
    console.log('存储的空间',bucket);    
    //上传到七牛后保存的文件名
    const key =info.name;
    //要上传文件的本地路径
    const filePath = info.path + '/' + key
    // console.log('qiniu', qiniu);
    
    //生成上传 Token
    const token = uptoken(bucket, key);
    //调用uploadFile上传
    let body = await uploadFile(token, key, filePath);    
    return Promise.resolve(body)
}