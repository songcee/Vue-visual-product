<!-- 页面分为上中下四个模块，上方、下方模块高度固定，中间模块高度自适应 -->
<template>
  <div class="module7-container">
    <div class="module7-top" :style="{height: formate.input1 + 'px'}" @click="chooseModule(0)">
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
      class="module7-middle"
      :style="{top: Number(formate.input1) + 1 + 'px', bottom: Number(formate.input2) + 1 + 'px'}"
    >
      <div
        class="module7-middle-left"
        :style="{width: formate.input3 + '%'}"
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
      <div
        class="module7-middle-right"
        :style="{left: formate.input3 + '%'}"
        @click="chooseModule(2)"
      >
        <!-- 选中的遮罩效果 -->
        <div class="module-mask" v-show="editIndex == 2"></div>
        <template>
          <component
            v-if="componentData[2]"
            :is="componentData[2].type"
            v-bind="componentData[2].option"
            :ref="componentData[2].type"
          ></component>
        </template>
      </div>
    </div>
    <div class="module7-bottom" :style="{height: formate.input2 + 'px'}" @click="chooseModule(3)">
      <!-- 选中的遮罩效果 -->
      <div class="module-mask" v-show="editIndex == 3"></div>
      <template>
        <component
          v-if="componentData[3]"
          :is="componentData[3].type"
          v-bind="componentData[3].option"
          :ref="componentData[3].type"
        ></component>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Module7",
  props: ["formate"],
  mounted() {
    // 每个模块的公用方法，可以复制到每个模块控制器中去
    console.log("选择第七种模块划分方式")
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
.module7-container {
  width: 100%;
  height: 100%;
}
.module7-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #000;
  overflow: hidden;
}
.module7-middle {
  position: absolute;
  left: 0;
  right: 0;
  overflow: hidden;
}
.module7-middle-left {
  height: 100%;
  box-sizing: border-box;
  border-right: 1px solid #000;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
}
.module7-middle-right {
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  overflow: hidden;
}
.module7-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #000;
  overflow: hidden;
}
</style>
