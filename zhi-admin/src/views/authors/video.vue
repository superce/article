<template>
  <div class="video-list">
    <el-table :data="videoList.list" style="width: 100%;overflow-y:scroll" height="calc(100% - 30px)">
      <el-table-column prop="缩略图" label="Date" width="180" >
        <template #default="{row}">
          <el-image style="width: 100px; height: 100px" :src="row.cover_url" fit="cover" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div>
</template>
<script setup>
  import { onMounted, reactive, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { apiVideoList } from '@src/api/auth'
  const route = useRoute()
  const videoList = reactive({
    list: [],
    id:route.query.authId
  })
  onMounted(() => {
    list()
  })
  const list = () => {
    apiVideoList({id: videoList.id}).then(res => {
      if(res.code === 200){
        videoList.list = res.data
      }
    })
  }
</script>
