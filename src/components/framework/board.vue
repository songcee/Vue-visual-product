<template>
  <div class="board-container">
    <div class="block-body" @dblclick.stop.prevent="toggleExpand"></div>
  </div>
</template>

<script>
export default {
  name: 'Board',
  created: function () {
    // 监听事件
    this.$util.bus.$on('board_updateBoard', (data) => { // 更新项目信息以及页面自适应情况
      window.console.log(data)
      this.updateProduct(data)
    })
  },
  data () {
    return {
      allExpend: true
    }
  },
  methods: {
    // 更新项目名称、背景色、自适应方式等信息
    updateProduct (data) {
      
    },
    // 收起/展开所有面板
    toggleExpand () {
      let allExpend = this.$store.state.handler.allExpend
      this.$store.commit('handler_toggle', !allExpend)
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
  z-index: 100;
  overflow: hidden;
}
.block-body {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 100;
  background-image: linear-gradient(45deg,#f5f5f5 25%,transparent 0,transparent 75%,#f5f5f5 0),linear-gradient(45deg,#f5f5f5 25%,transparent 0,transparent 75%,#f5f5f5 0);
  background-position: 0 0,10px 10px;
  background-size: 20px 20px;
  overflow: auto;
}
</style>
