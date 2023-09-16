import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
//引入element-plus
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//引入router
import router from '@/router/index.js'
import App from './App.vue'
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn
})
app.use(router)
app.mount('#app')
