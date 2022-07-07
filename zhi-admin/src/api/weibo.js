import { instance } from "../utils/request";

export const list = (p) => instance.get('weibo/list', {params: p})