/**
 * 项目基础数据控制
 **/
const product = {
  state: {
    layout: { // 项目基础信息
      name: '', // 项目名称
      bgcolor: '#FFFFFF', // 项目背景色
      width_adaption: '', // 页面宽度自适应方式
      height_adaption: '', // 页面高度自适应方式
      adaption: { // 页面自适应具体参数
        minWidth: 1000, // 最小宽度
        maxWidth: 1920, // 最大宽度
        fixWidth: 1000, // 固定宽度
        minHeight: 600, // 最小高度
        fixHeight: 800, // 固定高度
      },
    },
    modules: { // 项目模块划分信息
      moduleIndex: -1, // 模块划分类型
      editIndex: -1, // 正在编辑的模块
      input1: 100, // 下面是可能用到的4种参数
      input2: 100,
      input3: 100,
      input4: 100
    },
    components: {} // 项目每个模块中的组件
  },
  mutations: {
    // 设置项目基础数据
    product_set(state, { type, obj }) {
      for (let i in obj) {
        if (state[type].hasOwnProperty(i)) {
          state[type][i] = obj[i]
        }
      }
    },
    // 设置项目正在编辑的模块
    product_set_editIndex(state, index) {
      state.modules.editIndex = index
    },
    // 设置项目模块的组件
    product_set_components(state, { index, value }) {
      state.components[index] = value
    }
  },
  actions: {},
  getters: {
    getAllProductInfo: state => {
      return state
    }
  }
}

export default product