// 注册绑定组件
import Carousel from './carousel/carousel.vue'

const modules = {}
modules.installed = false
modules.install = function (Vue) {
    if (modules.installed) {
        return
    }
    // 注册模块布局组件
    Vue.component('Carousel', Carousel)
    modules.installed = true
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(modules)
}

export default modules
