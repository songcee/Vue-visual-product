<template>
  <div class="edit-container">
      <Header></Header>
      <List></List>
      <Board></Board>
      <Option></Option>
      <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/framework/header'
import List from '@/components/framework/list'
import Board from '@/components/framework/board'
import Option from '@/components/framework/option'
import Footer from '@/components/framework/footer'
export default {
  name: 'Main',
  components: {
      Header,
      List,
      Board,
      Option,
      Footer
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
</style>
