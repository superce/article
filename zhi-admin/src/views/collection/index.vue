<template>
  <div class="collection">
    <div class="input">
      <input type="text" v-model="url" placeholder="url地址" @keyup.enter="doCollection">
      <button @click="doCollection">采集</button>
    </div>
      <div class="loading" v-if="loading">
        <span>采集中...</span>
      </div>
  </div>
</template>
<script setup>
  import { apiGetZhihu } from '@src/api/collection'
  import {ref} from 'vue'
  const url = ref('')
  const loading = ref(false)
  function doCollection(){
    if(url.value){
      loading.value = true
      apiGetZhihu({url: url.value}).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err)
      }).finally(() => {
        loading.value = false
      })
    }
  }
</script>