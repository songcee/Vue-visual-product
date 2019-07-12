/**
 * 四周的控制面板
 **/
const handler = {
  state: {
    allExpend: true // 是否展开所有编辑面板
  },
  mutations: {
    handler_toggle (state, type) {
      state.allExpend = !!type
    }
  },
  actions: {},
  getters: {}
  }
  
  export default handler