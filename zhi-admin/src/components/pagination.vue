<template>
    <div class="pagination" style="padding: 10px 0">
        <el-pagination background layout="total, prev, pager, next" :total="total" :page-size="pageSize" @current-change="onCurrentChange"/>
    </div>
</template>
<script setup>
    import { reactive, defineProps, defineEmits } from 'vue'    
    const props = defineProps({
        total: {
            type: Number,
            default: 0
        },
        pageSize: {
            type: Number,
            default: 20
        }
    })
    const emits = defineEmits(['currenChage'])
    function onCurrentChange(v){
        emits('currenChage', v)
    }
</script>