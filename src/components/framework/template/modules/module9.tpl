export default `
<template>
  <div class="module-container">
    <div class="module-top" :style="{height: formate.input1 + 'px'}"></div>
    <div class="module-middle" :style="{top: Number(formate.input1) + 1 + 'px', bottom: Number(formate.input2) + 1 + 'px'}">
      <div class="module-middle-left" :style="{width: formate.input3 + 'px'}"></div>
      <div class="module-middle-middle" :style="{left: Number(formate.input3) + 1 + 'px', right: Number(formate.input4) + 1 + 'px'}"></div>
      <div class="module-middle-right" :style="{width: formate.input4 + 'px'}"></div>
    </div>
    <div class="module-bottom" :style="{height: formate.input2 + 'px'}"></div>
  </div>
</template>
<script>
export default {
  name: "Module",
};
</script>
<style scoped>
.module-container {
  width: 100%;
  height: 100%;
}
.module-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid #000;
  overflow: hidden;
}
.module-middle {
  position: absolute;
  left: 0;
  right: 0;
  overflow: hidden;
}
.module-middle-left {
  border-right: 1px solid #000;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
}
.module-middle-middle {
  overflow: hidden;
  position: absolute;
  top: 0;
  height: 100%;
}
.module-middle-right {
  border-left: 1px solid #000;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
}
.module-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #000;
  overflow: hidden;
}
</style>
`