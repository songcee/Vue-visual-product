<!-- 整个页面只有一个模块 -->
<template>
  <div class="module1-container">
    <div class="module1" @click="chooseModule(0)">
      <!-- 选中的遮罩效果 -->
      <div class="module-mask" v-show="editIndex == 0"></div>
      <template>
        <component
          :is="componentData.moduleIndex"
        ></component>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Module1",
  props: ['formate'],
  mounted () {
    // 每个模块的公用方法，可以复制到每个模块控制器中去
    console.log('选择第一种模块划分方式')
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
  watch: {
    componentData () {
      console.log('component data change')
    }
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
.module1-container {
  width: 100%;
  height: 100%;
}
.module1 {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
