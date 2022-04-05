import { getLocal } from '@src/utils/storage'

const getters = {
    user:(state) => state.login.user || getLocal('SAVE_LOGIN_INFOR'),
    // msgList:(state) => {
    //     console.log(state.session);
    // }
}
export default getters