<!-- 页面分为上中下四个模块，上方、下方模块高度固定，中间模块高度自适应，左侧宽度固定，右侧宽度铺满剩下部分 -->
<template>
  <div class="module8-container">
    <div class="module8-top" :style="{height: formate.input1 + 'px'}" @click="chooseModule(0)">
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
      class="module8-middle"
      :style="{top: Number(formate.input1) + 1 + 'px', bottom: Number(formate.input2) + 1 + 'px'}"
    >
      <div
        class="module8-middle-left"
        :style="{width: formate.input3 + 'px'}"
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
        class="module8-middle-right"
        :style="{left: Number(formate.input3) + 1 + 'px'}"
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
    <div class="module8-bottom" :style="{height: formate.input2 + 'px'}" @click="chooseModule(3)">
      <!-- 选中的遮罩效果 -->
      <div class="module-mask" v-show="editIndex == 3"></div>
      <template>
        <component
          v-if="componentData[3]"
          :is="componentData[3].type"
          v-bind="componentData[3].value"
        ></component>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Module8",
  props: ["formate"],
  mounted() {
    // 每个模块的公用方法，可以复制到每个模块控制器中去
    console.log("选择第二种模块划分方式");
    this.$util.bus.$on("module_update_comp", data => {
      // 更新模块中组件的数据
      this.$set(
        this.componentData,
        data.index,
        this.$util.deepClone(data.value)
      );
    });
    // 每个模块的公用方法结束
  },
  computed: {
    // 每个模块的公用方法，可以复制到每个模块控制器中去
    editIndex() {
      // 正在编辑的模块
      return this.$store.state.product.modules.editIndex;
    }
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
    chooseModule(index) {
      if (this.editIndex == index) {
        this.$store.commit("product_set_editIndex", -1);
      } else {
        this.$store.commit("product_set_editIndex", index);
      }
    }
    // 每个模块的公用方法结束
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.module8-container {
  width: 100%;
  height: 100%;
}
.module8-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #000;
  overflow: hidden;
}
.module8-middle {
  position: absolute;
  left: 0;
  right: 0;
  overflow: hidden;
}
.module8-middle-left {
  border-right: 1px solid #000;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
}
.module8-middle-right {
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
}
.module8-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #000;
  overflow: hidden;
}
</style>
