/**
 * 四周的控制面板
 **/
const handler = {
  state: {
    allExpend: true, // 是否展开所有编辑面板
    listChosen: -1 // 组件列表选中的标记
  },
  mutations: {
    handler_toggle (state, type) {
      state.allExpend = !!type
    },
    handler_list_chosen (state, type) {
      state.listChosen = type
    }
  },
  actions: {},
  getters: {}
  }
  
  export default handler