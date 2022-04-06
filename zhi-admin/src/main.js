import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import 'default-passive-events'
import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import './assets/css/index.scss'
import './router/beforEach'
let app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus, { locale })
app.mount('#app')
