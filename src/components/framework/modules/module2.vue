<!-- 页面分为上下两个模块，上方模块高度固定，下方模块高度自适应 -->
<template>
  <div class="module2-container">
      <div class="module2-top" :style="{height: formate.fixHeight + 'px'}" @click="chooseModule(0)">
        <!-- 选中的遮罩效果 -->
        <div class="module-mask" v-show="editIndex == 0"></div>
        <template></template>
      </div>
      <div class="module2-bottom" :style="{top: (Number(formate.fixHeight) + 1) + 'px'}" @click="chooseModule(1)">
        <!-- 选中的遮罩效果 -->
        <div class="module-mask" v-show="editIndex == 1"></div>
        <template></template>
      </div>
  </div>
</template>

<script>
export default {
  name: "Module2",
  props: ['formate'],
  mounted () {
    // 每个模块的公用方法，可以复制到每个模块控制器中去
    console.log('选择第二种模块划分方式')
    // 每个模块的公用方法结束
  },
  computed: {
    editIndex () { // 正在编辑的模块
      return this.$store.state.product.modules.editIndex
    },
    componentData () { // 正在编辑的模块
      return this.$store.state.product.components
    },
  },
  data() {
    return {
      // 每个模块的公用属性，可以复制到每个模块控制器中去
      // 每个模块的公用属性结束
    };
  },
  methods: {
    // 每个模块的公用方法，可以复制到每个模块控制器中去
    chooseModule (index) {
      if (this.editIndex == index) {
        this.$store.commit('product_set_editIndex', -1)
      } else {
        this.$store.commit('product_set_editIndex', index)
      }
    }
    // 每个模块的公用方法结束
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.module2-container {
  width: 100%;
  height: 100%;
}
.module2-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #000;
}
.module2-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: calc(100%-100px);
}
</style>
