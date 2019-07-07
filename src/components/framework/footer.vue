<template>
  <div class="footer-container" :class="{expand}">
    <div class="block-body">
      <button type="button" class="vp-btn vp-btn-blue">保存</button>
    </div>
    <div class="handler handler-footer" @click="toggleHandler()" ></div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
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
.footer-container {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 49px;
  line-height: 49px;
  margin-bottom: -49px;
  border-top: 1px solid #ddd;
  z-index: 2500;
  background: #fff;
  box-shadow: 0 -2px 2px 0 rgba(0,0,0,.1);
  transition: all .5s ease-in .1s;
}
.footer-container.expand {
  margin-bottom: 0;
}
.block-body{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 100;
  background: #fff;
  text-align: center;
}
.handler-footer {
  left: 50%;
  top: -10px;
  margin-left: -10px;
  border-bottom: none;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -2px 2px 0 rgba(0,0,0,.1)
}
.handler-footer:hover {
  top: -20px;
}
</style>
