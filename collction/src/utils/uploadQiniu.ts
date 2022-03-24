const qiniu = require('qiniu')

//需要填写你的 Access Key 和 Secret Key
const accessKey = 'CyRYOVvZ5G4hA1DVRMo48CcHOoJZOXBhMUvj4HUt';
const secretKey = 'SXRqeeIhiPfHXcOJN6_piV3kq6uUteLvrvRDKp5P';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)


//构建上传策略函数
function uptoken(bucket: string, key: string) {
    var putPolicy = new qiniu.rs.PutPolicy({scope: bucket+":"+key});
    return putPolicy.uploadToken(mac);
  }


//构造上传函数
function uploadFile(uptoken, key, localFile) {
    return new Promise<any>((resolve, reject) => {
        const extra = new qiniu.form_up.PutExtra();
        const config = new qiniu.conf.Config();
        const formUploader = new qiniu.form_up.FormUploader(config);
        formUploader.putFile(uptoken, key, localFile, extra, (err: any, body:any, res:any) => {
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
    const bucket = 'zhihu-img-save';
    //上传到七牛后保存的文件名
    const key =info.name;
    //要上传文件的本地路径
    const filePath = info.path + '\\' + key
    // console.log('qiniu', qiniu);
    
    //生成上传 Token
    const token = uptoken(bucket, key);
    //调用uploadFile上传
    let body = await uploadFile(token, key, filePath);    
    return Promise.resolve(body)
}