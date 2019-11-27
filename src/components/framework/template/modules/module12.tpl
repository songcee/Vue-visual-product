export default `
<template>
  <div class="module12-container">
    <div class="module12-left"></div>
    <div class="module12-middle"></div>
    <div class="module12-right"></div>
  </div>
</template>
<script>
export default {
  name: "Module",
};
</script>
<style scoped>
.module12-container {
  width: 100%;
  height: 100%;
}
.module12-left {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  border-right: 1px solid #000;
  overflow: hidden;
  box-sizing: border-box;
  width: <%= formate.input1 %>px;
}
.module12-middle {
  position: absolute;
  top: 0;
  bottom: 0;
  overflow: hidden;
  left: <%= formate.input1 %>px;
  right: <%= formate.input2 %>px;
}
.module12-right {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  border-left: 1px solid #000;
  overflow: hidden;
  box-sizing: border-box;
  width: <%= formate.input2 %>px;
}
</style>
`