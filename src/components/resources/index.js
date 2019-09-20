// 注册绑定组件
import Carousel from './carousel/carousel.vue'
import KLine1 from './kLine1/kLine1.vue'
import Leftmenu from './leftmenu/leftmenu.vue'

const modules = {}
modules.installed = false
modules.install = function (Vue) {
    if (modules.installed) {
        return
    }
    // 注册模块布局组件
    Vue.component('carousel', Carousel)
    Vue.component('kLine1', KLine1)
    Vue.component('leftmenu', Leftmenu)
    modules.installed = true
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(modules)
}

export default modules
