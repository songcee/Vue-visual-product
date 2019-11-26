export default `
<template>
  <div class="module-container">
    <div class="module-top"></div>
    <div class="module-bottom">
      <div class="module-bottom-left"></div>
      <div class="module-bottom-middle"></div>
      <div class="module-bottom-right"></div>
    </div>
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
  height: <%= modules.input1 %>px;
}
.module-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: <%= Number(modules.input1) + 1 %>px;
}
.module-bottom-left {
  border-right: 1px solid #000;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: <%= modules.input2 %>px;
}
.module-bottom-middle {
  overflow: hidden;
  position: absolute;
  top: 0;
  height: 100%;
  left: <%= Number(modules.input2) + 1 %>px;
  right: <%= Number(modules.input3) + 1 %>px;
}
.module-bottom-right {
  border-left: 1px solid #000;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: <%= modules.input3 %>px;
}
</style>
`