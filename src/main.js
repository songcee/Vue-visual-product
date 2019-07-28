import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import util from '@/global/util'
import Toast from 'vue-easy-toast'
import Modules from '@/components/framework/modules'
import Resources from '@/components/resources'

Vue.config.productionTip = false
Vue.prototype.$util = util
Vue.use(Toast)
Vue.use(Modules)
Vue.use(Resources)

window.alert = (text) => {
  Vue.toast(text, {
    className: 'et-alert',
    horizontalPosition: 'left',
    transition: 'slide-right',
    duration: 3000
  })
}
window.warn = (text) => {
  Vue.toast(text, {
    className: 'et-warn',
    horizontalPosition: 'left',
    transition: 'slide-right',
    duration: 3000
  })
}

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
