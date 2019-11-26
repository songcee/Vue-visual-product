import {_} from 'vue-underscore';
import layoutTpl from './layout.tpl'
import modulesTpl from './modules'

function download ({layout, modules, components}) {
	console.log(layout, modules, components)
	console.log(getLayout(layout, modules))
	console.log(getModule(modules, components))
}

// 拼装页面布局代码
function getLayout (layout, modules) {
	return {
		path: '/layout.vue',
		code: _.template(layoutTpl)({layout, modules})
	}
}

// 拼装页面模块划分代码
function getModule (modules, components) {
	if (modules.moduleIndex == -1) {
		// 没有选择模块
		return false
	}
	return {
		path: '/module.vue',
		code: _.template(modulesTpl(modules.moduleIndex))({modules, components})
	}
}

export default {
	download
}