import { instance } from "../utils/request";

export const apiGetZhihu = (p) => instance.post('api/home', p)

export const apiGetDouyin = (p) => instance.get('api/douyin', {params:p}) 