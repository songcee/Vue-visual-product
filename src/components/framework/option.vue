<template>
  <div class="option-container" :class="{expand}">
    <div class="block-body">
      <div v-if="index != -1">
        <p class="item-title">{{listDatas[index].title.text}}</p>
        <div class="item-desc-banner" v-if="showDesc">{{listDatas[index].description}}</div>
        <div class="item-option-banner" v-if="showOption"></div>
      </div>
    </div>
    <div class="handler handler-option" @click="toggleHandler()"></div>
  </div>
</template>

<script>
import listDatas from '@/components/resources'
export default {
  name: 'Option',
  created: function () {
    // 监听事件
    this.$util.bus.$on('expend_toggle_all', (val) => {
      this.toggleHandler(val)
    })
    this.$util.bus.$on('show_module_desc', (index) => {
      this.showModuleDesc(index)
    })
    this.$util.bus.$on('show_module_option', (index) => {
      this.showModuleOption(index)
    })
  },
  data () {
    return {
      expand: true,
      listDatas: listDatas,
      index: -1,
      showDesc: false,
      showOption: false
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
    },
    // 显示模块介绍
    showModuleDesc (index) {
      this.index = index
      this.showDesc = true
      this.showOption = false
    },
    // 显示模块配置项
    showModuleOption (index) {
      this.index = index
      this.showDesc = false
      this.showOption = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.option-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px;
  margin-right: -300px;
  border-left: 1px solid #ddd;
  z-index: 2000;
  background: #fff;
  box-shadow: 0 0 2px 2px rgba(0,0,0,.1);
  transition: all .5s ease-in .1s;
}
.option-container.expand {
  margin-right: 0;
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
.handler-option {
  left: -10px;
  top: 50%;
  margin-top: -10px;
  border-top: none;
  border-radius: 20px 0 0 20px;
  box-shadow: 0 0 2px 2px rgba(0,0,0,.1)
}
.handler-option:hover {
  left: -20px;
}
.item-title {
  height: 39px;
  line-height: 39px;
  border-bottom: 1px solid #ddd;
  padding-left: 10px;
}
.item-desc-banner {
  padding: 5px 10px;
  font-size: 14px;
}
</style>
