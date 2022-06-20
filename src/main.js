import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './plugins/element'
import axios from 'axios'
import TreeTable from 'vue-table-with-tree-grid'


//导入字体图标
import './assets/iconfont/iconfont.css'
// 导入全局样式表
import './assets/css/global.css';
Vue.component('tree-table', TreeTable)

Vue.config.productionTip = false
//配置请求的根路径
axios.defaults.baseURL = 'http://127.0.0.3:8888/api/private/v1/'
// axios.defaults.baseURL = 'https://www.liulongbin.top:8888/api/private/v1/'
// axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/login'
//axios请求拦截,config请求对象
axios.interceptors.request.use(config => {
  console.log(config);
  config.headers.Authorization = window.sessionStorage.getItem('token')
  //在最后必须要return config
  return config
})

Vue.prototype.$http=axios //挂载到vue原型身上

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
