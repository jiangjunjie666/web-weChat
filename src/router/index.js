//vue路由文件
import { createRouter, createWebHistory } from 'vue-router'
import { constantRoute } from './route.js'
let router = createRouter({
  history: createWebHistory(),
  routes: constantRoute,
  //滚动行为
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})

export default router
