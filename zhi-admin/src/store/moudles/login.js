import { setLocal } from '@src/utils/storage'

const state = {
    user:''
}
const mutations = {
    SAVE_LOGIN_INFOR(state,value){
        state.user = value
        setLocal('SAVE_LOGIN_INFOR', value)
    }
}
export default {namespaced: true,state,mutations}