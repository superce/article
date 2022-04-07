<template>
    <div class="pagination" style="padding: 10px 0">
        <el-pagination background layout="prev, pager, next" :total="total" @current-change="onCurrentChange"/>
    </div>
</template>
<script setup>
    import { reactive, defineProps, defineEmits } from 'vue'    
    const props = defineProps({
        total: {
            type: Number,
            default: 0
        }
    })
    const emits = defineEmits(['currenChage'])
    function onCurrentChange(v){
        emits('currenChage', v)
    }
</script>