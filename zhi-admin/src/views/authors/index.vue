<template>
  <div>
    <el-table v-loading="loading" :data="tableData" stripe style="width: 100%;overflow-y:scroll" height="calc(100% - 45px)">
      <el-table-column prop="avatar" label="头像" width="180" />
      <el-table-column prop="author" label="博主" width="180" >
        <template #default="{ row }">
          <span style="color:#409eff;cursor:pointer" @click="toCideoList(row)">{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="categroy_id" label="分类" width="180" />
      <el-table-column prop="fans" label="粉丝" width="180" />
      <el-table-column prop="likes" label="点赞量" width="180" />
      <el-table-column prop="create_date" label="采集时间" />
    </el-table>
  </div>
</template>

<script setup>
import { reactive, onMounted, ref } from "vue"
import { apiAuthList } from '@src/api/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
onMounted(() => {
  getAuth()
})
const toCideoList = ({authId}) => {
  console.log(66);
  // window.
  router.push({ name: 'VideoList', query:{authId} })  
}
const tableData = ref([])
const loading = ref(false)
const getAuth = () => {
  loading.value = true
  apiAuthList().then(res => {
    console.log(res);
    if(res.code ===200){
      tableData.value = res.data
    }
  }).catch(err => {}).finally(() =>{loading.value = false})
}
</script>

