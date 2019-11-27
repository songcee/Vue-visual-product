export default `
<template>
  <div class="module-container">
    <div class="module-left"></div>
    <div class="module-right"></div>
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
.module-left {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  border-right: 1px solid #000;
  overflow: hidden;
  width: <%= modules.input1 %>px;
}
.module-right {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  left: <%= Number(modules.input1) + 1 %>px;
}
</style>
`