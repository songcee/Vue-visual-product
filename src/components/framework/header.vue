<!-- 顶部模块 -->
<template>
  <div class="header-container" :class="{expand}">
    <div class="block-body">
      <div class="tool-banner">
        <button type="button" class="vp-btn vp-btn-red" v-if="isNewProduct" @click="productEdit()">新建项目</button>
        <button type="button" class="vp-btn" v-else @click="productEdit()">编辑项目</button>
        <button type="button" class="vp-btn" @click="moduleEdit()">模块划分</button>
        <button type="button" class="vp-btn" @click="download()">下载代码</button>
        <button type="button" class="vp-btn">预览页面</button>
        <button type="button" class="vp-btn">版本管理</button>
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
    // this.$util.bus.$on('expend_toggle_all', (val) => {
    //   this.toggleHandler(val)
    // })
  },
  data () {
    return {
      expand: true,
      isNewProduct: true
    }
  },
  computed: {
    handlerExpend () { // 模块收缩、展开控制
      return this.$store.state.handler.allExpend;
    },
    productName () {
      return this.$store.state.product.layout.name;
    }
  },
  watch: {
    handlerExpend (val) {
      this.toggleHandler(val)
    },
    productName (val) {
      if (val !== '') { // 如果有项目名，则说明不是新建的项目了
        this.isNewProduct = false
      }
    }
  },
  methods: {
    // 新建、编辑项目
    productEdit () {
      this.$store.commit('layout_show')
      this.$store.commit('popup_topmask_handler', true)
    },
    // 编辑模块划分
    moduleEdit () {
      if (!this.productName) {
        alert('请先创建项目！')
        return
      }
      this.$store.commit('module_show')
      this.$store.commit('popup_topmask_handler', true)
    },
    // 下载代码
    download () {
      
    },
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
  z-index: 300;
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
  z-index: 300;
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
