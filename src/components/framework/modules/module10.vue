<!-- 页面分为左右两个模块，左侧模块宽度固定，右侧模块宽度自适应 -->
<template>
  <div class="module10-container">
    <div class="module10-left" :style="{width: formate.input1 + 'px'}" @click="chooseModule(0)">
      <!-- 选中的遮罩效果 -->
      <div class="module-mask" v-show="editIndex == 0"></div>
      <template>
        <component
          v-if="componentData[0]"
          :is="componentData[0].type"
          v-bind="componentData[0].option"
          :ref="componentData[0].type"
        ></component>
      </template>
    </div>
    <div
      class="module10-right"
      :style="{left: (Number(formate.input1) + 1) + 'px'}"
      @click="chooseModule(1)"
    >
      <!-- 选中的遮罩效果 -->
      <div class="module-mask" v-show="editIndex == 1"></div>
      <template>
        <component
          v-if="componentData[1]"
          :is="componentData[1].type"
          v-bind="componentData[1].option"
          :ref="componentData[1].type"
        ></component>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Module10",
  props: ["formate"],
  mounted() {
    // 每个模块的公用方法，可以复制到每个模块控制器中去
    console.log("选择第十种模块划分方式")
    this.$util.moduleUpdateComp(this)
    // 每个模块的公用方法结束
  },
  computed: {
    // 每个模块的公用方法，可以复制到每个模块控制器中去
    editIndex () { // 正在编辑的模块
      return this.$store.state.product.modules.editIndex
    },
    // 每个模块的公用方法结束
  },
  data() {
    return {
      // 每个模块的公用属性，可以复制到每个模块控制器中去
      componentData: {} // 存放所有组件的数据
      // 每个模块的公用属性结束
    };
  },
  methods: {
    // 每个模块的公用方法，可以复制到每个模块控制器中去
    // 选中要编辑的模块，颜色变红
    chooseModule (index) {
      if (this.editIndex == index) {
        this.$util.chooseModule(this, -1)
      } else {
        this.$util.chooseModule(this, index)
      }
    }
    // 每个模块的公用方法结束
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.module10-container {
  width: 100%;
  height: 100%;
}
.module10-left {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  border-right: 1px solid #000;
  overflow: hidden;
}
.module10-right {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
}
</style>
