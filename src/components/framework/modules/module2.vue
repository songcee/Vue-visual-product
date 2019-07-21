<!-- 页面分为上下两个模块，上方模块高度固定，下方模块高度自适应 -->
<template>
  <div class="module2-container">
      <div class="module2-top" :style="{height: formate.fixHeight + 'px'}">
        <!-- 选中的遮罩效果 -->
        <div class="module-mask"></div>
        <template></template>
      </div>
      <div class="module2-bottom" :style="{top: (Number(formate.fixHeight) + 1) + 'px'}">
        <!-- 选中的遮罩效果 -->
        <div class="module-mask"></div>
        <template></template>
      </div>
  </div>
</template>

<script>
export default {
  name: "Module2",
  props: ['formate'],
  mounted () {
    console.log(2)
  },
  data() {
    return {};
  },
  methods: {}
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
