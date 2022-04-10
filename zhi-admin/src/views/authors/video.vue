<template>
  <div class="video-list">
    <el-table v-loading="videoList.loading" :data="videoList.list" style="width: 100%;overflow-y:scroll" height="calc(100% - 45px)">
      <el-table-column prop="缩略图" label="Date" width="180" >
        <template #default="{row}">
          <el-image @click="openVideo(row)" style="width: 100px; height: 100px" :src="row.cover_url" fit="cover" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="like" label="点赞数" />
      <el-table-column prop="time" label="视频时长" />
    </el-table>
    <!-- 分页 -->
    <page-nations :total="videoList.total" :page-size="videoList.param.pageSize" @currenChage="onCurrentChange"></page-nations>
    <!-- 视频 -->
    <el-drawer v-model="drawerVideo.dialog" :title="drawerVideo.title" append-to-body @closed="closedDrawer" size="450px">
      <div>
        <video autoplay controls style="width: 100%;" v-if="drawerVideo.video_url">
          <source :src="drawerVideo.video_url" type="video/mp4" />
        </video>
      </div>
    </el-drawer>    
  </div>
</template>
<script setup>
  import { onMounted, reactive, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { apiVideoList } from '@src/api/auth'
  import pageNations from '@src/components/pagination.vue'
  const route = useRoute()
  const videoList = reactive({
    list: [],
    total: 0,
    loading: false,
    param:{
      authId:route.query.authId,
      pageIndex: 1,
      pageSize: 20
    }
  })
  onMounted(() => {
    list()
  })
  const list = () => {
    videoList.loading = true
    apiVideoList(videoList.param).then(res => {
      if(res.code === 200){
        videoList.list = res.data
        videoList.total = res.count
      }
    }).catch(err => {}).finally(() => {
      videoList.loading = false
    })
  }
  // 分页跳转
  const onCurrentChange = (v) => {
    videoList.param.pageIndex = v
    list()
  }
  const openeVideoUrl = reactive({
      video_url: '',
      isShowVideo: false
  })
  const drawerVideo = reactive({
    dialog: false,
    video_url: '',
    title: ''
  })
  const openVideo = (row) => {
    let video_url = row.video_url
    // if (video_url.includes('/play/?')) {
    //     video_url = video_url.replace('/play/?', '/playwm/?')
    // }
    drawerVideo.video_url = video_url
    drawerVideo.title = row.title
    drawerVideo.dialog = true
  }
  const closedDrawer = () => {
    drawerVideo.video_url = ""
    drawerVideo.title = ''
  }
</script>
