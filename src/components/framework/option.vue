<!-- 右侧功能配置项模块 -->
<template>
  <div class="option-container" :class="{expand}">
    <div class="block-body">
      <div v-if="compName != -1" class="block-body-div">
        <p class="item-title" :title="listDatas[compName].title.text">{{listDatas[compName].title.text}}</p>
        <div class="item-desc-banner" v-if="showDesc">{{listDatas[compName].description}}</div>
        <div class="item-option-banner" v-if="showOption && optionItem">
          <div v-for="(item, index) in optionItem.option.data" :key="index">
            <!-- 如果是text类型 -->
            <div v-if="item.type == 'text'" class="item-option-nav">
              <label :title="item.text">{{item.text}}</label><span>：</span>
              <input v-if="item.dataType == 'number'" v-model.number="optionData[item.key]" type="number" />
              <input v-else v-model="optionData[item.key]"/>
            </div>
            <!-- 如果是array-text类型 -->
            <div v-else-if="item.type == 'array-text'" class="item-option-nav">
              <label :title="item.text">{{item.text}}</label><span>：</span>
              <div class="item-option-array" v-for="(v,i) in optionData[item.key]" :key="i">
                <input v-if="item.dataType == 'number'" v-model.number="optionData[item.key][i]" type="number" />
                <input v-else v-model.number="optionData[item.key][i]" />
                <span class="array-set" v-if="((optionData[item.key].length != 1 && i == 0) || i != 0) && i != optionData[item.key].length - 1" @click="delOptionArr(item.key, i)">删除</span>
                <span class="array-set" v-if="optionData[item.key].length == 1 || i == optionData[item.key].length - 1" @click="addOptionArr(item.key, index)">增加</span>
              </div>
            </div>
            <!-- 如果是array-object类型 -->
            <div v-else-if="item.type == 'array-object'" class="item-option-nav">
              <label :title="item.text">{{item.text}}</label><span>：</span>
              <div class="item-option-array" v-for="(v,i) in optionData[item.key]" :key="i">
                <input v-if="item.dataType == 'number'" v-model.number="optionData[item.key][i]" type="number" />
                <input v-else v-model.number="optionData[item.key][i]" />
                <span class="array-set" v-if="((optionData[item.key].length != 1 && i == 0) || i != 0) && i != optionData[item.key].length - 1" @click="delOptionArr(item.key, i)">删除</span>
                <span class="array-set" v-if="optionData[item.key].length == 1 || i == optionData[item.key].length - 1" @click="addOptionArr(item.key, index)">增加</span>
              </div>
            </div>
            <OptionObject v-else-if="item.type == 'object'" :option="item"></OptionObject>
          </div>
        </div>
        <div class="item-option-foot" v-if="showOption">
          <button type="button" class="vp-btn vp-btn-blue" @click="applyOption()">应用</button>
          <button type="button" class="vp-btn" @click="resetOption()">初始化</button>
        </div>
      </div>
    </div>
    <div class="handler handler-option" @click="toggleHandler()"></div>
  </div>
</template>

<script>
import listDatas from "@/components/resources/list";
import OptionObject from '@/components/framework/option/option-object';
import { setTimeout } from 'timers';
export default {
  name: "Option",
  components: {
    OptionObject
  },
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
      compName: -1, // 选中组件的名称
      showDesc: false, // 显示组件描述
      showOption: false, // 显示组件配置项
      optionItem: void 0, // 组件配置项
      simpleOption: ["text", "select"], // 单输入框
      multipleOption: ["array-text", "array-select"], // 连续输入框
      decorateOption: ["separator"], // 修饰符
      optionData: {}
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
    compName(val) {
      console.log('选择', val, '组件')
      if (val == -1) { // 如果未选择组件，则返回
        this.optionItem = void 0;
        this.optionData = {}
        return
      } else { // 选择组件，则将组件中的配置项克隆出来。一是为了不影响初始配置项的设置，二是方便回退配置项
        this.optionItem = this.$util.deepClone(this.listDatas[val]);
      }
      // 初始化数据
      this.initOption()
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
    showModuleDesc(name) {
      this.compName = name;
      this.showDesc = true;
      this.showOption = false;
    },
    // 显示模块配置项
    showModuleOption(name) {
      this.compName = name;
      this.showDesc = false;
      this.showOption = true;
    },
    // 添加模块并用默认数据配置
    addDefaultComp (name) {
      console.log('添加', name, '组件')
      this.compName = name;
      setTimeout(() => {
        this.$util.bus.$emit('board_add_item', {type: name, value: this.optionData})
      })
    },
    // 连续输入框后面的删除按钮
    delOptionArr (key, i) {
      this.optionData[key].splice(i, 1)
    },
    // 连续输入框后面的增加按钮
    addOptionArr (key, index) {
      this.optionData[key].push(this.optionItem.option.data[index].default)
    },
    // 点击应用组件数据
    applyOption () {
      console.log('应用组件数据', this.optionData);
      this.$util.bus.$emit('board_update_item', {type: this.compName, value: this.optionData})
    },
    // 点击初始化组件数据
    resetOption () {
      this.initOption();
    },
    // 初始化数据
    initOption () {
      this.optionItem = this.$util.deepClone(this.listDatas[this.compName]);
      let obj = {}
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
        obj[this.optionItem.option.data[k].key] = val
      }
      this.optionData = obj
      console.log('组件配置项', this.optionItem);
      console.log('组件初始化数据', this.optionData);
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
  margin: 0 10px;
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
