<template>
  <div class="collection">
    <el-form :model="formInline" :rules="rules" class="demo-form-inline" ref='form' label-width="40px">
      <el-form-item label="url" prop="url">
        <el-input v-model="formInline.url" placeholder="url" @keyup.capture.enter="doCollection"/>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="formInline.categroy_id" placeholder="分类">
          <el-option label="百搭" :value="0" />
          <el-option label="y" :value="1" />
          <el-option label="t" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doCollection" :loading="loading">开始</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
  import { apiGetZhihu } from '@src/api/collection'
  import {reactive, ref} from 'vue'
  const formInline = reactive({
    url: '',
    categroy_id: 0
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
      if(!formInline.url.includes('https://www.zhihu.com/question/')){
        ElMessage.error('地址不对')
        return
      }
      loading.value = true
      apiGetZhihu(formInline).then(res => {
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