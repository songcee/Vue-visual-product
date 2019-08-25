<!-- 页面分为四个模块，上部模块高度固定固定， 下部模块高度铺满剩下部分，左侧、右侧宽度固定，中间宽度铺满剩下部分。 -->
<template>
  <div class="module5-container">
    <div class="module5-top" :style="{height: formate.input1 + 'px'}" @click="chooseModule(0)">
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
    <div class="module5-bottom" :style="{top: (Number(formate.input1) + 1) + 'px'}">
      <div
        class="module5-bottom-left"
        :style="{width: formate.input2 + 'px'}"
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
        class="module5-bottom-middle"
        :style="{left: Number(formate.input2) + 1 + 'px', right: Number(formate.input3) + 1 + 'px'}"
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
      <div
        class="module5-bottom-right"
        :style="{width: formate.input3 + 'px'}"
        @click="chooseModule(3)"
      >
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
  </div>
</template>

<script>
export default {
  name: "Module5",
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
.module5-container {
  width: 100%;
  height: 100%;
}
.module5-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #000;
}
.module5-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  /* height: calc(100%-100px); */
}
.module5-bottom-left {
  border-right: 1px solid #000;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
}
.module5-bottom-middle {
  overflow: hidden;
  position: absolute;
  top: 0;
  height: 100%;
}
.module5-bottom-right {
  border-left: 1px solid #000;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
}
</style>
