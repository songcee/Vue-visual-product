export default `
<template>
  <div class="module-container">
    <div class="module-top"></div>
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
.module-bottom {
  position: absolute;
  top: <%= Number(modules.input1) + 1 %>px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
`