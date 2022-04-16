<template>
  <div class="douyin">
    <h2>抖音采集</h2>
    <el-form :model="formInline" :rules="rules" class="demo-form-inline" ref='form' label-width="40px" :inline="true">
      <el-form-item label="url" prop="url">
        <el-input v-model="formInline.url" placeholder="url" @keyup.capture.enter="doCollection"/>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="formInline.categroy_id" placeholder="分类">          
          <el-option v-for="item in list" :key="item.name" :label="item.name" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doCollection" :loading="loading">开始</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
  import { apiGetDouyin } from '@src/api/collection'
  import {reactive, ref, computed } from 'vue'  
  const props = defineProps({
    list:{
      type: Array,
      defalut: []
    }
  })
  const defaultMeunId = computed(() => {
    if(props.list.length > 0){
      return list[0].id
    }else{
      return ""
    }
  })
  const formInline = reactive({
    url: '',
    categroy_id: defaultMeunId.value
  })
  const form = ref(null)
  const rules = reactive({
    url:[
      { required: true, message: 'Please input Activity url', trigger: 'blur' },
    ]
  })
  const loading = ref(false)
  function doCollection(){
    form.value.validate(valid => {
      if(!valid) return
      if(!formInline.url.includes('www.douyin.com')){
        ElMessage.error('地址不对')
        return
      }
      loading.value = true
      apiGetDouyin(formInline).then(res => {
        console.log(res);
        if(res.code === 200){
          formInline.url = ''
          ElMessage.success(res.message)        
        }else{
          ElMessage.error(res.message)
        }
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        loading.value = false
      })
    })
  }
</script>