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
  import { getMeunList } from '@src/utils/meun'
  const list = ref([])
  onMounted(() => {
    getList()
  })
  const getList = async () => {
    list.value = await getMeunList()
  }
</script>