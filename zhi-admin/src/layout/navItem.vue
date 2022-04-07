<template>
  <el-menu router :default-active="defaultActive" :collapse="isCollapse" class="el-menu-vertical-demo">
      <el-menu-item index="/instantchat" class="header-title">
        <el-avatar :src="icon" fit="none"></el-avatar>
        <template #title>
          助手
        </template>
      </el-menu-item>
      <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path">
        <i :class="item.meta.icon"></i>
        <template #title>{{item.meta.title}}</template>
      </el-menu-item>
  </el-menu>
</template>
<script setup>
  import { computed, onMounted, ref, watch } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { useStore } from 'vuex'
  import { getSession,getLocal } from '@src/utils/storage'
  import icon from '/image/logo.png'
  const router = useRouter()
  const route = useRoute()
  const store = useStore()
  const userInfor = computed(() =>  getLocal("SAVE_LOGIN_INFOR")) 
  const routerList = () => {
    let list = router.getRoutes()
    let c = list.filter(item => item.name && item.meta.show && item.path !== '/login' && item.name !== '404'); 
    return c
  }
  const menuList = ref(routerList())
  const props = defineProps({
    isCollapse:{
      type:Boolean
    }
  })
  const defaultActive = ref('')
  const getActive = computed(() => route.path)
  onMounted(() => {
    defaultActive.value = getActive.value
  })
  watch(getActive, (oldV,newV) =>{
    defaultActive.value = oldV
  })
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 160px;
  min-height: 400px;
}
.header-title{padding-left: 20px !important;}
</style>