/**
 * 项目模块划分弹窗
 **/
const module = {
    state: {
      show: false, // 是否显示布局控制弹窗
    },
    mutations: {
      module_show (state) {
        state.show = true
      },
      module_hide (state) {
        state.show = false
      },
    },
    actions: {},
    getters: {}
  }
  
  export default module