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
  height: <%= formate.input1 %>px;
}
.module-middle {
  position: absolute;
  left: 0;
  right: 0;
  overflow: hidden;
  top: <%= Number(formate.input1) + 1 %>px;
  bottom: <%= Number(formate.input2) + 1 %>px;
}
.module-middle-left {
  height: 100%;
  box-sizing: border-box;
  border-right: 1px solid #000;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  width: <%= formate.input3 %>px;
}
.module-middle-right {
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  overflow: hidden;
  left: <%= formate.input3 %>px;
}
.module-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid #000;
  overflow: hidden;
  height: <%= formate.input2 %>px;
}
</style>
`