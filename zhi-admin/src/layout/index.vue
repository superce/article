<template>
    <div class="kf-admin">
      <div class="side-bar">
        <nav-item :isCollapse="isCollapse"></nav-item>
      </div>
      <div class="main-container">
        <div class="header-top">
          <div class="breadcrumb">
            <div class="icon">
              <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" @click="isShowSideBar"></i>
            </div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }" @click="toHome">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{ routerName }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <el-dropdown trigger="click" @command="onOutLogin">
            <span class="el-dropdown-link">
              {{user.username}}
              <!-- <el-avatar :src="user.portrait"></el-avatar> -->
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>退出登錄</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <!-- fade-transform -->
        <div class="container"> 
          <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
              <keep-alive>                
                  <component :is="Component" v-if="pagePath"/>                
              </keep-alive>
            </transition>
            <transition name="fade-transform" mode="out-in">
                <component :is="Component" v-if="!pagePath"/>              
            </transition>
          </router-view>
        </div>
      </div>
    </div>
</template>
<script setup>
  import { computed, onMounted, ref, watch } from 'vue' 
  import navItem from "./navItem.vue";
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from 'vuex'
  const route = useRoute()
  const router = useRouter()
  const store = useStore()
  const isShowLogin = ref(false)
  const routerName = ref('')
  onMounted(() => {
    routerName.value = route.meta.title
  })
  const pagePath = computed(() => route.meta.keepAlive && store.getters.user)
  watch(route, (oldValue, newValue) => {
    routerName.value = newValue.meta.title
    if(newValue.path === '/login'){
      isShowLogin.value = true
    }
  })
  const user = computed(() => store.getters.user)
  const isCollapse = ref(false)
  const isShowSideBar = () => {
    isCollapse.value = !isCollapse.value
  }
  const toHome = () => {
    store.commit("meun/SAVE_ACTIVE", '/')
  }
  // 退出登錄
  const onOutLogin = () => {
    // store.commit("login/SAVE_LOGIN_INFOR", {})
    // store.commit('service/CLEAR_RECORD_LIST')
    // router.replace('/login')
  }
</script>
<style>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>