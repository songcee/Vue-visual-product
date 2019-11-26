export default `
<template>
  <div class="module-container">
    <div class="module"></div>
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
.module {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>
`