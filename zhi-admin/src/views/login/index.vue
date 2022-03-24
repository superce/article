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
const userInfo = reactive({
  username: '',
  password: ''
})
const onLogin = () => {

}
</script>