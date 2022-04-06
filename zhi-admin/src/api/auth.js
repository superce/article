import { instance } from "../utils/request";

export const apiAuthList = (p) => instance.post('api/douyin/author', p)

export const apiVideoList = (p) => instance.post('api/douyin/video', p)