export default `
<template>
  <div class="module-container">
    <div class="module-top"></div>
    <div class="module-middle">
      <div class="module-middle-left"></div>
      <div class="module-middle-right"></div>
    </div>
    <div class="module-bottom"></div>
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
  height: <%= modules.input1 %>px;
}
.module-middle {
  position: absolute;
  left: 0;
  right: 0;
  overflow: hidden;
  top: <%= Number(modules.input1) + 1 %>px;
  bottom: <%= Number(modules.input2) + 1 %>px;
}
.module-middle-left {
  border-right: 1px solid #000;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: <%= modules.input3 %>px;
}
.module-middle-right {
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  left: <%= Number(modules.input3) + 1 %>px;
}
.module-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #000;
  overflow: hidden;
  height: <%= modules.input2 %>px;
}
</style>
`