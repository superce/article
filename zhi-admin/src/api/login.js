import { instance } from "../utils/request";

export const apiLogin = (p) => instance.post('api/user/login', p) 