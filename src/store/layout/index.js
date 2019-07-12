/**
 * 项目编辑弹窗
 **/
const layout = {
  state: {
    show: false, // 是否显示布局控制弹窗
  },
  mutations: {
    layout_show (state) {
      state.show = true
    },
    layout_hide (state) {
      state.show = false
    },
  },
  actions: {},
  getters: {}
}

export default layout