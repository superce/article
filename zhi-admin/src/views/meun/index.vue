<template>
    <div class="meun-admin">
        <el-button type="primary" @click="onAddMeun">新增菜单</el-button>
        <el-table :data="meunList" stripe style="width: 100%">
            <el-table-column prop="id" label="id" width="180" />
            <el-table-column prop="name" label="菜单名称" width="180" />
            <el-table-column prop="date" label="时间" />
        </el-table>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { apiCreateMeun, apiMeunList } from '@src/api/meun'
import tip from '@src/utils/Tip.js'
const meunList = ref([])
onMounted(() => {
    list()
})
const list = () => {
    apiMeunList().then(res => {
        if(res.code === 200){
            meunList.value = res.data
        }else{
            tip.failMsg(res.message)
        }
    })
}
const onAddMeun = () => {
     ElMessageBox.prompt('菜单名', '新增菜单', {
        confirmButtonText: '提交',
        cancelButtonText: '取消',
    }).then(({ value }) => {
        if(!value) return
        onApiCreateMeun(value)
    }).catch(() => {
      
    })
}
const onApiCreateMeun = (name) => {
    apiCreateMeun({name}).then(res => {
        console.log(res);
        if(res.code === 200){
            tip.successMsg(res.message)
            list()
        }else{
            console.log(res.message);
            tip.failMsg(res.message)
        }
    })
}
</script>