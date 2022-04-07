<template>
<div class="article-list">
  <el-table :data="tableData" stripe style="width: 100%;overflow-y:scroll" height="calc(100% - 45px)">
    <el-table-column prop="title" label="标题" width="300" />
    <el-table-column prop="thumbnail" label="缩略图" width="100">
      <template #default="{ row }">
        <img :src="href+row.thumbnail" alt="">
      </template>
    </el-table-column>
    <el-table-column prop="categroy_name" label="分类名称">
      <template #default="{row}">
        <el-tag>{{ row.categroy_name }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="categroy_name" label="操作">
      <template #default="{row}">
        <el-button type="primary" @click="editTag(row)" size="small">修改标签</el-button>
        <el-button type="danger" @click="onDelete(row)" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    v-model="edit.dialog" :title="edit.title" width="400px">
    <el-select v-model="edit.categroy_id" placeholder="分类">
      <el-option label="全部" :value="0" />
      <el-option label="美女" :value="1" />
      <el-option label="美腿" :value="2" />
      <el-option label="身材" :value="3" />
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
  import tip from '@src/utils/Tip'
  const tableData = ref([])
  onMounted(() => {
    list()
  })
  const href = computed(() => {
    let baseURL = 'https://www.health-longevity.top'
    if (import.meta.env.DEV){
        baseURL = 'http://localhost:3001'
    }
    return baseURL
  })
  function list(){
    apiGetArticleList().then(res => {
      if(res.code === 200){
        tableData.value = res.data
      }
    })
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
    categroy_name: '',
    categroy_id: 0
  })
  function editTag({id, title, categroy_name, categroy_id = 0}){
    edit.id = id
    edit.title = title
    edit.categroy_name = categroy_name
    edit.categroy_id = categroy_id
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
