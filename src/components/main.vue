<template>
  <div class="edit-container">
      <Header></Header> <!-- z-index: 300 -->
      <List></List> <!-- z-index: 200 -->
      <Board></Board> <!-- z-index: 100 -->
      <Option></Option> <!-- z-index: 200 -->
      <Footer></Footer> <!-- z-index: 300 -->
      <div v-show="showTopmask" class="top-mask"></div> <!-- z-index: 400 -->
      <div v-show="showMidmask" class="mid-mask"></div> <!-- z-index: 200 -->
      <Layout :show="showLayout"></Layout> <!-- z-index: 500 -->
      <Module :show="showModule"></Module> <!-- z-index: 500 -->
  </div>
</template>

<script>
import Header from '@/components/framework/header'
import List from '@/components/framework/list'
import Board from '@/components/framework/board'
import Option from '@/components/framework/option'
import Footer from '@/components/framework/footer'
import Layout from '@/components/framework/popup/layout'
import Module from '@/components/framework/popup/module'
// import WindowBorder from '@/lib/windowBorder'

export default {
  name: 'Main',
  components: {
      Header,
      List,
      Board,
      Option,
      Footer,
      Layout,
      Module,
      // WindowBorder
  },
  computed: {
    showLayout () {
      return this.$store.state.layout.show
    },
    showModule () {
      return this.$store.state.module.show
    },
    showTopmask () {
      return this.$store.state.popup.topmask
    },
    showMidmask () {
      return this.$store.state.popup.midmask
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.edit-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}
.handler{
  position: absolute;
  background: #fff;
  border: 1px solid #ddd;
  overflow: hidden;
  transition: all .5s ease-in .1s;
  width: 20px;
  height: 20px;
  line-height: 20px;
}
.handler:hover {
  background: #dddddd;
}
.top-mask, .mid-mask {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  opacity: .5;
  z-index: 400;
}
.mid-mask {
  z-index: 200;
}
</style>
