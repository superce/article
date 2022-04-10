'use strict'
import axios from 'axios'
import { getToken } from '@src/utils/storage'
import router from '@src/router/index'
let baseURL = 'https://api.health-longevity.top'
if (import.meta.env.DEV){
    baseURL = 'http://localhost:3002'
}
export const instance = axios.create({
    baseURL,
    timeout: 50000
})
instance.defaults.headers['Content-Type'] = 'application/json; charset=utf-8'
instance.defaults.headers['accept'] = 'text/plain'

/**
 * 请求拦截器
 */
instance.interceptors.request.use(
    (config) => {
        const userInfor = getToken("SAVE_LOGIN_INFOR")
        if(!userInfor){
            router.replace('/login')
        }else{
            config.headers.token = userInfor
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
