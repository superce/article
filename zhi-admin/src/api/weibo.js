import { instance } from "../utils/request";

export const list = (p) => instance.get('weibo/list', {params: p})

export const collection = (p) => instance.get('weibo/collection', {params: p})