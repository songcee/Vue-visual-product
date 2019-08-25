<!-- 页面分为左中右三个模块，左侧、右侧模块宽度固定，中间模块宽度自适应 -->
<template>
  <div class="module12-container">
    <div class="module12-left" :style="{width: formate.input1 + 'px'}" @click="chooseModule(0)">
      <!-- 选中的遮罩效果 -->
      <div class="module-mask" v-show="editIndex == 0"></div>
      <template>
        <component
          v-if="componentData[0]"
          :is="componentData[0].type"
          v-bind="componentData[0].value"
        ></component>
      </template>
    </div>
    <div
      class="module12-middle"
      :style="{left: formate.input1 + 'px', right: formate.input2 + 'px'}"
      @click="chooseModule(1)"
    >
      <!-- 选中的遮罩效果 -->
      <div class="module-mask" v-show="editIndex == 1"></div>
      <template>
        <component
          v-if="componentData[1]"
          :is="componentData[1].type"
          v-bind="componentData[1].value"
        ></component>
      </template>
    </div>
    <div
      class="module12-right"
      :style="{width: formate.input2 + 'px'}"
      @click="chooseModule(2)"
    >
      <!-- 选中的遮罩效果 -->
      <div class="module-mask" v-show="editIndex == 2"></div>
      <template>
        <component
          v-if="componentData[2]"
          :is="componentData[2].type"
          v-bind="componentData[2].value"
        ></component>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Module12",
  props: ["formate"],
  mounted() {
    // 每个模块的公用方法，可以复制到每个模块控制器中去
    console.log("选择第二种模块划分方式");
    this.$util.bus.$on('module_update_comp', (data) => {
      // 更新模块中组件的数据
      this.$set(this.componentData, data.index, this.$util.deepClone(data.value))
    })
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
.module12-container {
  width: 100%;
  height: 100%;
}
.module12-left {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  border-right: 1px solid #000;
  overflow: hidden;
  box-sizing: border-box;
}
.module12-middle {
  position: absolute;
  top: 0;
  bottom: 0;
  overflow: hidden;
}
.module12-right {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  border-left: 1px solid #000;
  overflow: hidden;
  box-sizing: border-box;
}
</style>
