<template>
  <div class="weibo">
    <div class="card" v-for="list in lists" :key="list.group_imgs_id">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>{{list.group_imgs_title}}</span>
            <el-button @click="onShowView(list)" type="primary" class="button" size="small">预览</el-button>
          </div>
        </template>
        <div v-for="img in list.children" :key="img.group_imgs_id + 'img'" class="text item">
          <el-image style="width: 100px; height: 100px" :src="img.thumbnail" fit="cover" />
        </div>
        
      </el-card>
    </div>
    <paginations :total="param.total" :page-size="param.pageSize" @currenChage="onCurrentChange"></paginations>
    <el-drawer v-model="show.dialog" :title="show.title">        
      <el-image v-for="img in show.list" :key="img.img_url" style="width: 300px;" :src="img.img_url" fit="cover" />

    </el-drawer>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, reactive, ref } from "vue";
import paginations from '@src/components/pagination.vue'
import { list } from "@src/api/weibo";
onMounted(() => {
  getList();
});
const lists = ref([]);
const param = reactive({
  pageIndex: 1,
  pageSize: 20,
  total: 0
});
async function getList() {
  try {
    const res = await list(param);
    if (res.code === 200) {
      res.data.forEach((item) => {
        const p = lists.value.find(
          (a) => a.group_imgs_id === item.group_imgs_id
        );
        if (p) {
          p.children.push(item);
        } else {
          let obj = {
            group_imgs_id: item.group_imgs_id,
            group_imgs_title: item.group_imgs_title,
            children: [item],
          };
          lists.value.push(obj);
        }
      });
      param.total = res.count
    }
  } catch (err) {}
}

const show = ref({
    dialog: false,
    title: '',
    list: []
})
function onShowView(item){
    show.value = {
        dialog: true,
        title: item.group_imgs_title,
        list: item.children
    }
}
// 分页跳转
  const onCurrentChange = (v) => {
    param.pageIndex = v
    lists.value = []
    getList()
  }
</script>