import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
const layout = () => import('@src/layout/index.vue')
const routes = [
  {
    path: '/login',
    name:"Login",
    component: () => import('@src/views/login/index.vue')
  },
  {
    path: '/',
    component: layout,
    children:[
      {
        path:'',
        name:'Collection',
        meta: {
          title: "采集",
          icon: 'el-icon-files',
          show: true,
          index: 0,
        },
        component: () => import('@src/views/collection/index.vue')
      }
    ]
  },
  {
    path:'/list',
    component: layout,
    children:[
      {
        path:'',
        name:'ArticleList',
        meta: {
          title: "文章列表",
          icon: 'el-icon-files',
          show: true,
          index: 1,
        },
        component:() => import('@src/views/article/index.vue')
      }
    ]
  },
  {
    path: '/author',
    component: layout,
    children: [
      {
        path: '',
        name: 'Author',
        meta: {
          title: "博主",
          icon: 'el-icon-files',
          show: true,
          index: 2,
        },
        component: () => import('@src/views/authors/index.vue')
      },
      {
        path: 'video',
        name: "VideoList",
        meta:{
          show: false,
          title: '视频列表'
        },
        component: () => import('@src/views/authors/video.vue')
      }
    ]
  },
  {
    path: '/meun',
    component: layout,
    children: [
      {
        path: '',
        name: 'Meun',
        meta: {
          title: "菜单管理",
          icon: 'el-icon-files',
          show: true,
          index: 3,
        },
        component: () => import('@src/views/meun/index.vue')
      }
    ]
  }
]
export default createRouter({
  history: createWebHashHistory(),
  routes
})