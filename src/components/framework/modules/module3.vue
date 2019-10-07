<!-- 页面分为三个模块，上部模块高度固定固定， 下部模块高度铺满剩下部分，左侧宽度为百分比，右侧宽度铺满剩下部分。 -->
<template>
  <div class="module3-container">
    <div class="module3-top" :style="{height: formate.input1 + 'px'}" @click="chooseModule(0)">
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
    <div class="module3-bottom" :style="{top: (Number(formate.input1) + 1) + 'px'}">
      <div
        class="module3-bottom-left"
        :style="{width: formate.input2 + '%'}"
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
        class="module3-bottom-right"
        :style="{left: formate.input2 + '%'}"
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
  </div>
</template>

<script>
export default {
  name: "Module3",
  props: ["formate"],
  mounted() {
    // 每个模块的公用方法，可以复制到每个模块控制器中去
    console.log("选择第三种模块划分方式")
    this.$util.moduleUpdateComp(this)
    // 每个模块的公用方法结束
  },
  computed: {
    // 每个模块的公用方法，可以复制到每个模块控制器中去
    editIndex() {
      // 正在编辑的模块
      return this.$store.state.product.modules.editIndex
    }
    // 每个模块的公用方法结束
  },
  watch: {
    formate: function() {
      console.log(this.formate);
    }
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
    chooseModule(index) {
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
.module3-container {
  width: 100%;
  height: 100%;
}
.module3-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #000;
}
.module3-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  /* height: calc(100%-100px); */
}
.module3-bottom-left {
  height: 100%;
  box-sizing: border-box;
  border-right: 1px solid #000;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
}
.module3-bottom-right {
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  overflow: hidden;
}
</style>
