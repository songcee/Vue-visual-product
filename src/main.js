import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import util from '@/global/util'

Vue.config.productionTip = false
Vue.prototype.$util = util

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
