<template>
  <div class="collection">
    <zhihu :list="list"></zhihu>
    <el-divider />
    <douyin :list="list"></douyin>
    <el-divider />
    <weibo :list="list"></weibo>
  </div>
</template>
<script setup>
  import { onMounted, ref } from 'vue'
  import zhihu from './component/zhihu.vue'
  import douyin from './component/douyin.vue'
  import weibo from './component/weibo.vue'
  import { getMeunList } from '@src/utils/meun'
  const list = ref([])
  onMounted(() => {
    getList()
  })
  const getList = async () => {
    list.value = await getMeunList()
  }
</script>