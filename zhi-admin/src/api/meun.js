import { instance } from "../utils/request";

export const apiCreateMeun = (p) => instance.post('api/user/create/meun', p)

export const apiMeunList = (p) => instance.get('api/user/meun/list', p)