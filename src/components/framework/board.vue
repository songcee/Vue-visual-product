<!-- 中间页面展示模块模块 -->
<template>
  <div class="board-container">
    <div class="block-body" @dblclick.stop.prevent="toggleExpand">
      <!-- product-canvas 就是项目的页面 -->
      <div class="product-canvas"
      v-if="productName"
       :style="{background: productBgcolor,
        width: productAdaption.defwidth || productAdaption.fixWidth,
        minWidth: productAdaption.minwidth,
        maxWidth: productAdaption.maxwidth,
        height: productAdaption.defheight || productAdaption.fixHeight,
        minHeight: productAdaption.minheight,
        }"
      >
        <template v-if="productModules.moduleIndex">
          <component
            :is="'Module'+productModules.moduleIndex"
            :formate="productModules"
          ></component>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Board',
  created: function () {
    // 监听事件
    this.$util.bus.$on('board_updateLayout', (data) => { // 更新项目信息以及页面自适应情况
      this.updateLayout(data)
    })
    this.$util.bus.$on('board_updateModule', (data) => { // 更新页面模块划分
      this.updateModule(data)
    })
  },
  data () {
    return {
      allExpend: true, // 收起展开四周所有的面板
      productAdaption: {}, // 项目自适应方式
      productModules: {}, // 页面模块划分
    }
  },
  computed: {
    productName () { return this.$store.state.product.layout.name },
    productBgcolor () { return this.$store.state.product.layout.bgcolor },
  },
  methods: {
    // 更新项目名称、背景色、自适应方式等信息
    updateLayout (data) {
      let obj = {}
      switch (data.width_adaption) {
        case '1':
          obj.defwidth = '100%' // 默认宽度
          obj.minwidth = data.adaption.minWidth + 'px'
          break
        case '2':
          obj.fixWidth = data.adaption.fixWidth + 'px' // 固定宽度
          break
        case '3':
          obj.defwidth = '100%' // 默认宽度
          obj.minwidth = data.adaption.minWidth + 'px'
          obj.maxwidth = data.adaption.maxWidth + 'px'
          break
      }
      switch (data.height_adaption) {
        case '1':
          obj.fixHeight = data.adaption.fixHeight + 'px'
          break
        case '2':
          obj.defheight = '100%'
          obj.minheight = data.adaption.minHeight + 'px'
          break
        case '3':
          obj.defheight = 'auto'
          break
      }
      console.log('将页面布局设置为：', obj)
      this.productAdaption = obj
    },
    // 更新页面模块划分
    updateModule (data) {
      let obj = {}
      switch (Number(data.moduleIndex)) {
        case 1:
          obj.moduleIndex = 1
          break
        case 2:
          obj.moduleIndex = 2
          obj.fixHeight = data.input1
          break
      }
      this.productModules = obj
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
.product-canvas {
  margin: 0 auto;
}
</style>
