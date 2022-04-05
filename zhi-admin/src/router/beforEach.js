import router from './index'
import { getToken } from '@src/utils/storage'
router.beforeEach((to, from, next) => {
  const userInfor = getToken("SAVE_LOGIN_INFOR")
  if (!userInfor && to.name !== 'Login') {
    next({ path: '/login' })
  }else{
    next()
  }
})