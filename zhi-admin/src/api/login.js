import { instance } from "../utils/request";

export const apiLogin = (p) => instance.post('/user/login', p) 