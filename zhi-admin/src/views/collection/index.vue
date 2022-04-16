<template>
  <div class="collection">
    <zhihu :list="list"></zhihu>
    <el-divider />
    <douyin :list="list"></douyin>
  </div>
</template>
<script setup>
  import { onMounted, ref } from 'vue'
  import zhihu from './component/zhihu.vue'
  import douyin from './component/douyin.vue'
  import { apiMeunList } from '@src/api/meun'
  const list = ref([])
  onMounted(() => {
    getList()
  })
  const getList = () => {
    apiMeunList().then(res => {
      if(res.code === 200){
        list.value = res.data
      }
    })
  }
</script>