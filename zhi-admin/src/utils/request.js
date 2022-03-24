'use strict'
import axios from 'axios'
import { getLocal } from '@src/utils/storage'
import router from '@src/router/index'
let baseURL = ''
export const instance = axios.create({
    baseURL,
    timeout: 20000
})
instance.defaults.headers['Content-Type'] = 'application/json'
instance.defaults.headers['accept'] = 'text/plain'

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
    (config) => {
        const userInfor = getLocal("SAVE_LOGIN_INFOR")
        if(!userInfor){
            router.replace('/login')
        }else{
            config.headers.token = userInfor.token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    (r) => {
        const { status, data, config } = r
        if(data.jumplogin){
            router.replace('/login')
        }
        return Promise.resolve(data)
    },
    (error) => {
        if (error.response) {
            const status = error.response.status
        }
        return Promise.reject(error)
    }
)

export default { instance }
