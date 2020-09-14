import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.prototype.$api = Axios.create({
  // baseURL:'https://www.easy-mock.com/mock/5c7f921288e28e3357e28d94/asd'
  // baseURL:'http://10.31.98.97:8084/h5'
  // timeout: 1000 * 12,
  // withCredentials: false, // 允许携带cookie
  baseURL: 'https://hc.gztv.com/h5'
})
Vue.config.productionTip = false
Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
