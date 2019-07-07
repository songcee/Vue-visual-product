<template>
  <div class="list-container" :class="{expand}">
    <div class="block-body">
      <p class="block-head">资源列表</p>
      <div class="list-banner">
        <div class="list-item"
          v-for="(item, index) in listDatas"
          :key="item.title.text"
          :title="item.title.text"
          @mouseenter="toggleItemHandler(index, true)"
          @mouseleave="toggleItemHandler(index, false)"
        >
          <p class="list-item-text">{{item.title.text}}</p>
          <div class="list-item-handle" :class="{show: item.handler, hide: !item.handler}">
            <span class="list-item-desc" @click="descItem(index)">查看</span>
            <span class="list-item-add" @click="addItem(index)">添加</span>
          </div>
        </div>
      </div>
    </div>
    <div class="handler handler-list" @click="toggleHandler()"></div>
  </div>
</template>

<script>
import listDatas from '@/components/resources'
export default {
  name: 'List',
  created () {
    // 监听事件
    this.$util.bus.$on('expend_toggle_all', (val) => {
      this.toggleHandler(val)
    })
  },
  data () {
    return {
      expand: true,
      listDatas: listDatas
    }
  },
  mounted () {
    console.log(this.listDatas)
  },
  methods: {
    // 控制面板的收起和展开
    toggleHandler (type) {
      if (type === undefined) {
        this.expand = !this.expand
      } else {
        this.expand = !!type
      }
    },
    // 组件控制按钮的收起和展开
    toggleItemHandler (index, type) {
      this.$set(this.listDatas[index], 'handler', type)
    },
    // 查看组件介绍
    descItem (index) {
      this.$util.bus.$emit('show_module_desc', index)
    },
    // 添加组件
    addItem (index) {
      this.$util.bus.$emit('show_module_option', index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 300px;
  margin-left: -300px;
  border-right: 1px solid #ddd;
  z-index: 2000;
  background: #fff;
  box-shadow: 2px 0 2px 0 rgba(0,0,0,.1);
  transition: all .5s ease-in .1s;
  font-size: 16px;
}
.list-container.expand {
  margin-left: 0;
}
.block-body{
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  padding-top: 50px;
  z-index: 100;
  background: #fff;
}
.handler-list {
  right: -10px;
  top: 50%;
  margin-top: -10px;
  border-left: none;
  border-radius: 0 20px 20px 0;
  box-shadow: 2px 0 2px 0 rgba(0,0,0,.1);
}
.handler-list:hover {
  right: -20px;
}
.block-head {
  height: 39px;
  line-height: 39px;
  border-bottom: 1px solid #ddd;
  padding-left: 10px;
}
.list-item {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  padding: 14px 24px 14px 34px;
  transition: all 0.2s ease-in-out 0s;
  height: 22px;
  line-height: 22px;
}
.list-item:hover {
  background: #f3f3f3;
}
.list-item-text {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.list-item-handle {
  position: absolute;
  left: 300px;
  top: 0;
  width: 88px;
  transition: all 0.2s ease-in-out 0s;
}
.list-item-handle.show {
  margin-left: -88px;
}
.list-item-handle.hide {
  margin-left: 0;
}
.list-item-add {
  display: inline-block;
  padding: 14px 6px;
  background: #fb4242;
  color: #fff;
}
.list-item-add:hover {
  background: #ff6767;
}
.list-item-desc {
  display: inline-block;
  padding: 14px 6px;
  background: #dddee1;
  color: #000;
}
.list-item-desc:hover {
  background: #ceced0;
}
</style>
