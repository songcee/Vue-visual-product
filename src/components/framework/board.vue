<template>
  <div class="board-container">
    <div class="block-body" @dblclick.stop.prevent="toggleExpand"></div>
  </div>
</template>

<script>
export default {
  name: 'Board',
  data () {
    return {
      allExpend: true
    }
  },
  methods: {
    // 收起/展开所有面板
    toggleExpand () {
      this.allExpend = !this.allExpend
      this.$util.bus.$emit('expend_toggle_all', this.allExpend)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.board-container {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  overflow: hidden;
}
.block-body {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
  background-image: linear-gradient(45deg,#f5f5f5 25%,transparent 0,transparent 75%,#f5f5f5 0),linear-gradient(45deg,#f5f5f5 25%,transparent 0,transparent 75%,#f5f5f5 0);
  background-position: 0 0,10px 10px;
  background-size: 20px 20px;
  overflow: auto;
}
</style>
