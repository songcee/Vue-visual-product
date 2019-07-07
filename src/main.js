import Vue from 'vue'
import App from './App.vue'
import util from '@/global/util'

Vue.config.productionTip = false
Vue.prototype.$util = util

new Vue({
  render: h => h(App),
}).$mount('#app')
