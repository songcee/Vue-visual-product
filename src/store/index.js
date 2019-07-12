import Vue from 'vue';
import Vuex from 'vuex';
import layout from '@/store/layout' // 项目编辑弹窗
import handler from '@/store/handler' // 四周的控制面板
import popup from '@/store/popup' // 弹窗控制
import product from '@/store/product' // 弹窗控制

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    layout,
    handler,
    popup,
    product
  },
  // strict: true // 严格模式
})