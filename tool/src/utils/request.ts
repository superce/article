import Axios, { Method, ResponseType, AxiosResponse, AxiosRequestConfig } from 'axios'
interface IAxiosData {
  url: string
  method: Method
  headers?: any
  json: boolean
  contentType?: string
  data?: any
  params?: any
  timeout?: number
  responseType?: ResponseType
}
let baseURL = ''
const axios = Axios.create({
  baseURL,
  timeout: 20000
})
// 不允许携带cookie
// axios.defaults.withCredentials = false

// 默认使用 application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 请求拦截器
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    console.log(config)
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
axios.interceptors.response.use(
  (res: any) => {
    return res
  },
  (err) => {
    // if (err.response && err.response.data) {
    //   const code = err.response.status
    //   const msg = err.response.data.msg
    //   console.log('code:', code, 'msg:', msg)
    // } else {
      
    // }
    return Promise.reject(err)
  }
)

/** *
 * axios({url,method,content,params,datas})
 *
 * @param {string}  url，(必填)
 * @param {string}  method,默认post
//  * @param {boolean} json, content-type类型，(必填)
 * @param {object}  params
 * @param {object}  datas  //token在datas中
 *
 */
function request(arr: IAxiosData) {
  return new Promise<any>((resolve, reject) => {
    // arr = requestValidate(arr)
    axios({
      timeout: arr.timeout === undefined ? 20000 : arr.timeout, // 请求超时时间
      url: arr.url,
      method: arr.method || 'POST',
      headers: {
        'content-type': arr.contentType ? arr.contentType : arr.json ? 'application/json; charset=UTF-8' : 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      params: arr.params || '',
      data: arr.data || '',
      responseType: arr.responseType || 'json'
    }).then((res: any) => {
      console.log('封装res', res.status)
      const responseStatus = res.status
      if(res.status === 200){
        resolve(res.data)
      }else{
        reject(res)
      }
        // 状态码2开头的处理逻辑
        // if(res.data.error_code !== 0){
        //   reject(res.data)
        //   return
        // }       
        // if (res.status.charAt(0) === '2') {
        // } else {
        //   reject(res.data)
        // }
    }).catch((err) => {
      console.log('封装err', err)
      reject(err)
    })
  })
}
export const apiPostFunction = async (url:string, data?: any) => {
  const res = await request({ url, method: 'post', json: true, data });
  console.log(res)
  if (res.status === 0) {
      return Promise.resolve(res);
  }
  return Promise.reject(res);
}
export const apiGetFunction = async (url: string, data?: any) => {
  const res = await request({ url,method:'get', json: true,params:data});
  if (res.status === 0) {
    console.log('返回结果', res)
    return Promise.resolve(res);
  }
  console.log('reject结果', res)
  return Promise.reject(res);
}