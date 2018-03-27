import Vue from 'vue'
import App from './App'
import iview from 'iview';
import router from './router'
import 'normalize.css'
import 'iview/dist/styles/iview.css'

Vue.use(iview);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
