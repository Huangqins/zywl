import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import iview from 'iview';
import router from './router'
import 'normalize.css'
import 'iview/dist/styles/iview.css'
import '@/assets/css/custom.css'
import '@/permission' // 路由权限 control,预留
import echarts from 'echarts'
import store from '@/store'
import $ from 'jquery'
Vue.prototype.$echarts = echarts;
Vue.use(iview);
Vue.config.productionTip = false
/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

