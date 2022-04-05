import { instance } from "../utils/request";

export const apiAuthList = (p) => instance.post('api/douyin/author', p)