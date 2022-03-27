import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@src/views/login/index.vue')
  },
  {
    path: '/',
    name: 'Collection',
    component: () => import('@src/views/collection/index.vue')
  }
]
export default createRouter({
  history: createWebHistory("/zh/"),
  routes
})