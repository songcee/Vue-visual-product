<template>
  <div class="header-container" :class="{expand}">
    <div class="block-body">
      <div class="tool-banner">
        <button type="button" class="vp-btn">新建项目</button>
        <button type="button" class="vp-btn">预览</button>
      </div>
    </div>
    <div class="handler handler-header" @click="toggleHandler()"></div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  created: function () {
    // 监听事件
    this.$util.bus.$on('expend_toggle_all', (val) => {
      this.toggleHandler(val)
    })
  },
  data () {
    return {
      expand: true
    }
  },
  methods: {
    // 控制面板的收起和展开
    toggleHandler (type) {
      if (type === undefined) {
        this.expand = !this.expand
      } else {
        this.expand = !!type
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-container {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 49px;
  line-height: 49px;
  margin-top: -49px;
  border-bottom: 1px solid #ddd;
  z-index: 2500;
  background: #fff;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.1);
  transition: all .5s ease-in .1s;
}
.header-container.expand {
  margin-top: 0;
}
.block-body{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 100;
  background: #fff;
}
.handler-header {
  left: 50%;
  bottom: -10px;
  margin-left: -10px;
  border-top: none;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 2px 2px 0 rgba(0,0,0,.1)
}
.handler-header:hover {
  bottom: -20px;
}
.tool-banner {
  position: relative;
  right: 300px;
  text-align: right;
}
.tool-banner .vp-btn {
  margin-right: 10px;
}
</style>
