import Module1 from './module1.vue'
import Module2 from './module2.vue'

const modules = {}
modules.installed = false
modules.install = function (Vue) {
    if (modules.installed) {
        return
    }
    // 注册模块布局组件
    Vue.component('Module1', Module1)
    Vue.component('Module2', Module2)
    modules.installed = true
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(modules)
}

export default modules
