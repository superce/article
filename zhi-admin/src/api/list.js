import { instance } from "../utils/request";

export const apiGetArticleList = () => instance.get('/api/home/list') 

export const apiEditArticleTag = (p) => instance.post('/api/home/editcategroy', p) 

export const apiDeleteItem = (p) => instance.get('/api/home/delete/' + p) 

export const apiGetArticleItem = (p) => instance.get('/api/home/detail/', {params: p}) 