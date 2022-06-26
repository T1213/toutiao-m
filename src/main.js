import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.less'
import '@/styles/icon.less'
// 引入vant组件库
import Vant from 'vant'
// 引入vant全局样式
import 'vant/lib/index.css'
// 引入rem适配
import 'amfe-flexible'
// 注册使用vant组件库
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
