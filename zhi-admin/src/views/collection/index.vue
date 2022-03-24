<template>
  <div class="collection">
      <input type="text" v-model="url" placeholder="url地址" @keyup="doCollection">
      <button @click="doCollection">采集</button>
  </div>
</template>
<script setup>
  import {ref} from 'vue'
  const url = ref('')
  function doCollection(){
    url
  }
</script>