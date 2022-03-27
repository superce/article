import router from './index'
import { getLocal } from '@src/utils/storage'
router.beforeEach((to, from, next) => {
  const userInfor = getLocal("SAVE_LOGIN_INFOR")
  if (!userInfor && to.name !== 'Login') {
    next({ path: '/login' })
  }else{
    next()
  }
})