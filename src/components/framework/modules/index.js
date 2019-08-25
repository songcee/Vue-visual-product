import Module1 from './module1.vue'
import Module2 from './module2.vue'
import Module3 from './module3.vue'
import Module4 from './module4.vue'
import Module5 from './module5.vue'
import Module6 from './module6.vue'
import Module7 from './module7.vue'
import Module8 from './module8.vue'
import Module9 from './module9.vue'
import Module10 from './module10.vue'
import Module11 from './module11.vue'
import Module12 from './module12.vue'

const modules = {}
modules.installed = false
modules.install = function (Vue) {
    if (modules.installed) {
        return
    }
    // 注册模块布局组件
    Vue.component('Module1', Module1)
    Vue.component('Module2', Module2)
    Vue.component('Module3', Module3)
    Vue.component('Module4', Module4)
    Vue.component('Module5', Module5)
    Vue.component('Module6', Module6)
    Vue.component('Module7', Module7)
    Vue.component('Module8', Module8)
    Vue.component('Module9', Module9)
    Vue.component('Module10', Module10)
    Vue.component('Module11', Module11)
    Vue.component('Module12', Module12)
    modules.installed = true
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(modules)
}

export default modules
