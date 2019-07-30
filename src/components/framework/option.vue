<!-- 右侧功能配置项模块 -->
<template>
  <div class="option-container" :class="{expand}">
    <div class="block-body">
      <div v-if="index != -1" class="block-body-div">
        <p class="item-title" :title="listDatas[index].title.text">{{listDatas[index].title.text}}</p>
        <div class="item-desc-banner" v-if="showDesc">{{listDatas[index].description}}</div>
        <div class="item-option-banner" v-if="showOption && optionItem">
          <div v-for="(item, index) in optionItem.option.data" :key="index">
            <div v-if="item.type == 'text'" class="item-option-nav">
              <label :title="item.text">{{item.text}}</label><span>：</span>
              <input v-model="optionData[index]"/>
            </div>
            <div v-if="item.type == 'array-text'" class="item-option-nav">
              <label :title="item.text">{{item.text}}</label><span>：</span>
              <div class="item-option-array" v-for="(v,i) in optionData[index]" :key="i">
                <input v-model="optionData[index][i]" />
                <span class="array-set" v-if="((optionData[index].length != 1 && i == 0) || i != 0) && i != optionData[index].length - 1" @click="delOptionArr(index, i)">删除</span>
                <span class="array-set" v-if="optionData[index].length == 1 || i == optionData[index].length - 1" @click="addOptionArr(index)">增加</span>
              </div>
            </div>
          </div>
        </div>
        <div class="item-option-foot" v-if="showOption">
          <button type="button" class="vp-btn vp-btn-blue" @click="applyOption()">应用</button>
          <button type="button" class="vp-btn">重置</button>
        </div>
      </div>
    </div>
    <div class="handler handler-option" @click="toggleHandler()"></div>
  </div>
</template>

<script>
import listDatas from "@/components/resources/list";
export default {
  name: "Option",
  created: function() {
    this.$util.bus.$on("option_show_desc", name => {
      this.showModuleDesc(name);
    });
    this.$util.bus.$on("option_show_option", name => {
      this.showModuleOption(name);
    });
    this.$util.bus.$on("option_add_default_comp", name => {
      this.addDefaultComp(name);
    });
  },
  data() {
    return {
      expand: true,
      listDatas: listDatas, // 组件列表数据
      index: -1, // 选中组件的名称
      showDesc: false, // 显示组件描述
      showOption: false, // 显示组件配置项
      optionItem: void 0, // 组件配置项
      simpleOption: ["text", "select"], // 单输入框
      multipleOption: ["array-text", "array-select"], // 连续输入框
      decorateOption: ["separator"], // 修饰符
      optionData: []
    };
  },
  computed: {
    handlerExpend() {
      return this.$store.state.handler.allExpend;
    }
  },
  watch: {
    handlerExpend(val) {
      this.toggleHandler(val);
    },
    index(val) {
      console.log('选择', val, '组件')
      if (val == -1) {
        this.optionItem = void 0;
        this.optionData = []
        return
      } else {
        this.optionItem = this.$util.deepClone(this.listDatas[val]);
      }
      // 初始化数据
      let arr = []
      for(let k = 0; k < this.optionItem.option.data.length; k++ ) {
        let val
        switch(this.optionItem.option.data[k].type) {
          case 'text': 
            val = this.optionItem.option.data[k].default
            break
          case 'array-text':
            val = [this.optionItem.option.data[k].default]
            break
          default:
            val = ''
        }
        arr.push(val)
      }
      this.optionData = arr
      console.log('组件配置项', this.optionItem);
      console.log('组件初始化数据', this.optionData)
      // this.$util.bus.$emit('board_add_item', {type: val, value: this.optionData})
    }
  },
  methods: {
    // 控制面板的收起和展开
    toggleHandler(type) {
      if (type === undefined) {
        this.expand = !this.expand;
      } else {
        this.expand = !!type;
      }
    },
    // 显示模块介绍
    showModuleDesc(index) {
      this.index = index;
      this.showDesc = true;
      this.showOption = false;
    },
    // 显示模块配置项
    showModuleOption(index) {
      this.index = index;
      this.showDesc = false;
      this.showOption = true;
    },
    // 添加模块并用默认数据配置
    addDefaultComp (name) {
      console.log('添加', name, '组件')
      this.$util.bus.$emit('board_add_item', {type: name, value: this.optionData})
    },
    delOptionArr (index, i) {
      this.optionData[index].splice(i, 1)
    },
    addOptionArr (index) {
      this.optionData[index].push(this.optionItem.option.data[index].default)
    },
    // 应用组价数据
    applyOption () {
      console.log('应用组件数据', this.optionData);
      this.$util.bus.$emit('board_update_item', {type: this.index, value: this.optionData})
    }
  }
};
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
  z-index: 200;
  background: #fff;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.5s ease-in 0.1s;
}
.option-container.expand {
  margin-right: 0;
}
.block-body {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  margin-top: 50px;
  z-index: 200;
  background: #fff;
}
.block-body-div {
  position: relative;
  height: 100%;
}
.handler-option {
  left: -10px;
  top: 50%;
  margin-top: -10px;
  border-top: none;
  border-radius: 20px 0 0 20px;
  box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.1);
}
.handler-option:hover {
  left: -20px;
}
.item-title {
  height: 39px;
  line-height: 39px;
  border-bottom: 1px solid #ddd;
  padding-left: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.item-desc-banner {
  padding: 5px 10px;
  font-size: 14px;
}
.item-option-banner {
  position: absolute;
  top: 40px;
  bottom: 90px;
  left: 0;
  right: 0;
  overflow: auto;
}
.item-option-foot {
  position: absolute;
  bottom: 50px;
  height: 39px;
  line-height: 35px;
  border-top: 1px solid #ddd;
  width: 100%;
  text-align: right;
}
.item-option-foot button {
  margin-right: 10px;
}
.item-option-nav {
  font-size: 13px;
  padding: 0 10px;
  line-height: 30px;
  color: #555;
}
.item-option-nav label {
  display: inline-block;
  max-width: 140px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  vertical-align: top;
}
.item-option-nav input {
  width: 100px;
}
.item-option-nav .array-set {
  display: inline-block;
  vertical-align: top;
  text-decoration: underline;
  margin-left: 5px;
  cursor: pointer;
}
.item-option-nav .array-set:hover {
  color: #000
}
.item-option-nav .item-option-array input {
  width: 200px;
}
</style>
