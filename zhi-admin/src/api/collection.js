import { instance } from "../utils/request";

export const apiGetZhihu = (p) => instance.post('api/home', p) 