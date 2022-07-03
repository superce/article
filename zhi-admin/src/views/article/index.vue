<template>
<div class="article-list">
  <el-table v-loading="loading" :data="tableData" stripe style="width: 100%;overflow-y:scroll" height="calc(100% - 45px)">
    <el-table-column prop="title" label="标题" width="300" />
    <el-table-column prop="title" label="鏈接" width="300">
      <template #default="{ row }">
        {{'https://any-tool.top/detail/' + row.article_id}}
      </template>
    </el-table-column>
    <el-table-column prop="thumbnail" label="缩略图" width="120">
      <template #default="{ row }">
        <img :src="isHasHttps(row.thumbnail)" alt="">
      </template>
    </el-table-column>
    <el-table-column prop="categroy_name" label="分类名称" width="100">
      <template #default="{row}">
        <el-tag>{{ onGetMeunName(row.meun_id) }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="date" label="時間" width="180" />
    <el-table-column prop="categroy_name" label="操作">
      <template #default="{row}">
        <el-button type="primary" @click="editTag(row)" size="small">修改标签</el-button>
        <el-button type="danger" @click="onDelete(row)" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <!-- <pagi-nation :total="" :page-size="" @currenChage="onCurrentChange"></pagi-nation> -->
  <el-dialog
    v-model="edit.dialog" :title="edit.title" width="400px">
        <el-select v-model="edit.meun_id" placeholder="分类">          
          <el-option v-for="item in meunList" :key="item.name" :label="item.name" :value="item.id" />
        </el-select>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">Cancel</el-button>
        <el-button type="primary" @click="onCommit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</div>
</template>
<script setup>
  import { reactive, ref, onMounted, computed } from 'vue'
  import { apiGetArticleList, apiEditArticleTag, apiDeleteItem } from '@src/api/list'
  // import pagiNation from '@src/components/pagination.vue'
  import { getMeunList } from '@src/utils/meun'
  import { apiMeunList } from '@src/api/meun'
  import tip from '@src/utils/Tip'
  const tableData = ref([])
  const loading = ref(false)
  onMounted(() => {
    list()
    onGetMeunList()
  })
  const href = computed(() => {
    let baseURL = 'https://www.health-longevity.top'
    if (import.meta.env.DEV){
        baseURL = 'http://localhost:3001'
    }
    return baseURL
  })
  const isHasHttps = (htps) =>{
    return htps.includes('http') ? htps : href.value + htps
  }
  const meunList = ref([])
  const onGetMeunList = async () => {
    const list = await getMeunList()
    meunList.value = list
    edit.categroy_id = list[0].id
  }
  function onGetMeunName(id){
    const m = meunList.value.find(item => id === item.id)    
    console.log(m);
    if(m){
      return m.name
    }
    // return m.name
  }
  function list(){
    loading.value = true
    apiGetArticleList().then(res => {
      if(res.code === 200){
        tableData.value = res.data
      }
    }).catch(err => {}).finally(() => {loading.value = false})
  }
  const onDelete = (row) => {
    apiDeleteItem(row.id).then(res => {
      if(res.code === 200){
        ElMessage.success('删除成功')
        list()
      }else{
        ElMessage.error(res.message)
      }
    })
  }
  const edit = reactive({
    dialog: false,
    title: '',
    id: 0,
    meun_id: 0
  })
  function editTag({id, title, meun_id = 0}){
    edit.id = id
    edit.title = title
    edit.meun_id = meun_id
    edit.dialog = true
  }
  function onCommit(){
    apiEditArticleTag(edit).then(res => {
      if(res.code === 200){
        list()
        onCancel()
        tip.success('修改成功')
      }
    })
  }
  const onCancel = () => {
    edit.dialog = false
  }
</script>
