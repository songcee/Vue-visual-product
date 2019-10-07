<!-- 页面分为上中下五个模块，上方、下方模块高度固定，中间模块高度自适应，左侧、右侧宽度固定，中间宽度铺满剩下部分。 -->
<template>
  <div class="module9-container">
    <div class="module9-top" :style="{height: formate.input1 + 'px'}" @click="chooseModule(0)">
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
      class="module9-middle"
      :style="{top: Number(formate.input1) + 1 + 'px', bottom: Number(formate.input2) + 1 + 'px'}"
    >
      <div
        class="module9-middle-left"
        :style="{width: formate.input3 + 'px'}"
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
        class="module9-middle-middle"
        :style="{left: Number(formate.input3) + 1 + 'px', right: Number(formate.input4) + 1 + 'px'}"
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
      <div
        class="module9-middle-right"
        :style="{width: formate.input4 + 'px'}"
        @click="chooseModule(3)"
      >
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
    <div
      class="module9-bottom"
      :style="{height: formate.input2 + 'px'}"
      @click="chooseModule(4)"
    >
      <!-- 选中的遮罩效果 -->
      <div class="module-mask" v-show="editIndex == 4"></div>
      <template>
        <component
          v-if="componentData[4]"
          :is="componentData[4].type"
          v-bind="componentData[4].option"
          :ref="componentData[4].type"
        ></component>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Module9",
  props: ["formate"],
  mounted() {
    // 每个模块的公用方法，可以复制到每个模块控制器中去
    console.log("选择第九种模块划分方式")
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
.module9-container {
  width: 100%;
  height: 100%;
}
.module9-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #000;
  overflow: hidden;
}
.module9-middle {
  position: absolute;
  left: 0;
  right: 0;
  overflow: hidden;
}
.module9-middle-left {
  border-right: 1px solid #000;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
}
.module9-middle-middle {
  overflow: hidden;
  position: absolute;
  top: 0;
  height: 100%;
}
.module9-middle-right {
  border-left: 1px solid #000;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
}
.module9-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #000;
  overflow: hidden;
}
</style>
