<!-- 整个页面只有一个模块 -->
<template>
  <div class="module1-container"></div>
</template>

<script>
export default {
  name: "Module1",
  props: ['formate'],
  mounted () {
    console.log(1)
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.module1-container {
  width: 100%;
  height: 100%;
}
</style>
