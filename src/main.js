import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.less'
// 引入vant组件库
import Vant from 'vant'
// 引入vant全局样式
import 'vant/lib/index.less'
// 引入rem适配
import 'amfe-flexible'
// 引入全局组件
import MyIcon from '@/components/MyIcon.vue'
// 引入全局过滤器
import * as obj from '@/filters'
Object.keys(obj).forEach(key => {
  Vue.filter(key, obj[key])
})
// 注册使用vant组件库
Vue.use(Vant)
Vue.component('MyIcon', MyIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
