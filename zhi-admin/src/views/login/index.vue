<template>
  <div class="login">
    <div class="info">
      <h4>登录</h4>
      <div class="user-name">
        <input type="text" v-model="userInfo.username" placeholder="用户名"/>
      </div>
      <div class="user-password">
        <input type="password" v-model="userInfo.password" placeholder="密码"/>
      </div>
      <div class="login-commit">
        <button @click="onLogin">登录</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import { apiLogin } from '@src/api/login'
import { useRouter } from 'vue-router'
import { setLocal } from '@src/utils/storage'
const router = useRouter()
const userInfo = reactive({
  username: '',
  password: ''
})
const onLogin = () => {
  apiLogin(userInfo).then(res => {
    console.log('res', res)
    setLocal("SAVE_LOGIN_INFOR", res.token)
    router.replace('/')
  }).catch(err => {
    console.log('err',err)
  })
}
</script>