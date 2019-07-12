/**
 * 弹窗控制
 **/
const popup = {
  state: {
    topmask: false, // 显示最顶部的遮罩层
    midmask: false // 显示中部的遮罩层
  },
  mutations: {
    popup_topmask_handler (state, val) {
      state.topmask = !!val
    },
    popup_midmask_handler (state, val) {
      state.midmask = !!val
    },
  },
  actions: {},
  getters: {}
}

export default popup