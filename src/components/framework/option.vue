<!-- 右侧功能配置项模块 -->
<template>
  <div class="option-container" :class="{expand}">
    <div class="block-body">
      <div v-if="compName != -1" class="block-body-div">
        <p class="item-title" :title="listDatas[compName].title.text">{{listDatas[compName].title.text}}</p>
        <div class="item-desc-banner" v-if="showDesc" v-html="listDatas[compName].description"></div>
        <div class="item-container" v-if="showOption && optionItem">
          <div class="item-option-container">
            <p class="item-option-container-title">组件配置项</p>
            <div v-for="(item, index) in optionItem.option.data" :key="'option'+index">
              <OptionText v-if="item.type == 'text'" :option="item" :ref="item.type + index"></OptionText>
              <OptionSelect v-else-if="item.type == 'select'" :option="item" :ref="item.type + index"></OptionSelect>
              <OptionArray v-else-if="item.type.indexOf('array-') >= 0" :option="item" :ref="item.type + index"></OptionArray>
              <OptionObject v-else-if="item.type == 'object'" :option="item" :ref="item.type + index"></OptionObject>
              <hr v-else-if="item.type == 'separator'" />
            </div>
          </div>
          <div class="item-option-container" v-if="optionItem.outFunc && optionItem.outFunc.length > 0">
            <p class="item-option-container-title">触发外部组件的逻辑</p>
            <div class="item-option-outfun-banner" v-for="(item, index) in optionItem.outFunc" :key="'outfun'+index">
              <p>{{index + 1}}、{{item.description}}</p>
              <div class="outfun-option">
                <p>选择调用的组件：</p>
                <select v-model="outFunData.components">
                  <option value="null">--请选择--</option>
                  <option
                    v-for="(v, i) in $store.state.product.components"
                    :key="'comp'+i"
                    :value="v.type"
                    v-show="v.type !== compName">
                    {{v.name}}
                  </option>
                </select>
                <p v-if="outFunData.components != 'null'">选择组件的方法：</p>
                <select v-model="outFunData.funcName" v-if="outFunData.components != 'null'">
                  <option value="null">--请选择--</option>
                  <option
                    v-for="(v, i) in listDatas[outFunData.components].inFunc"
                    :key="'func'+i"
                    :value="v.name">
                    {{v.description}}--{{v.name}}
                  </option>
                </select>
                <p v-if="outFunData.components != 'null' && outFunData.funcName != 'null'">选择方法需要的参数：</p>
                <div v-if="outFunData.components != 'null' && outFunData.funcName != 'null'">
                  <div v-for="(v, i) in listDatas[outFunData.components].inFunc[outFunData.funcName].params" :key="'params'+i">
                    <p>{{i + 1}}、{{v.description}}</p>
                  </div>
                </div>
              </div>
            </div>
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
import OptionText from '@/components/framework/option/text';
import OptionSelect from '@/components/framework/option/select';
import OptionArray from '@/components/framework/option/array';
import OptionObject from '@/components/framework/option/object';
import { setTimeout } from 'timers';
export default {
  name: "Option",
  components: {
    OptionText,
    OptionSelect,
    OptionArray,
    OptionObject
  },
  created: function() {
    this.$util.bus.$on("option_show_desc", name => {
      this.showModuleDesc(name);
    });
    this.$util.bus.$on("option_show_option", name => {
      console.log(this.$store.state.product.components)
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
      optionData: {}, // 组件配置项
      outFunData: { // 触发外部组件的数据
        components: 'null', // 组件名称
        funcName: 'null', // 方法名称
        parameter: [], // 参数
      }
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
      if (val == -1) { // 如果未选择组件，则返回
        this.optionItem = void 0;
        this.optionData = {}
        return
      } else { // 选择组件，组件中的配置项
        console.log('选择', val, '组件')
        this.optionItem = this.listDatas[val];
      }
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
      this.compName = -1;
      this.$nextTick(() => {
        this.compName = name;
        this.showDesc = false;
        this.showOption = true;
      })
    },
    // 添加模块并用默认数据配置（无用）
    addDefaultComp (name) {
      console.log('添加', name, '组件')
      this.compName = name;
      setTimeout(() => {
        this.$util.bus.$emit('board_add_item', {type: name, value: this.optionData})
      })
    },
    // 点击应用组件数据
    applyOption () {
      let index = -1, obj = {}, err = false
      for (let i in this.optionItem.option.data) {
        index++
        let option = this.optionItem.option.data[i]
        if (option.type == 'separator') {
          // 修饰符不是一个输入数据，跳过
          continue
        }
        let optionData = this.$refs[option.type + index][0].optData()
        if (optionData === 'validation false') {
          // 说明输入有报错
          alert(option.text + ' 配置输入有误！')
          err = true
          break
        }
        obj[option.key] = optionData
      }
      if (err) {return}
      this.optionData = obj
      console.log('应用组件数据', this.optionData);
      this.$util.bus.$emit('board_update_item', {type: this.compName, name: this.listDatas[this.compName].title.text, value: this.optionData})
    },
    // 点击初始化组件数据
    resetOption () {
      console.log('重置', this.compName, '组件')
      this.optionItem = void 0
      this.$nextTick(() => {
        this.optionItem = this.listDatas[this.compName]
      })
    },
    // 重置所有数据
    resetAllData () {
      // 重置组件配置项
      this.optionItem = this.listDatas[this.compName]
      // 重置触发外部组件的逻辑
      this.outFunData = {
        components: 'null',
        funcName: 'null',
        parameter: [],
      }
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
.item-container {
  position: absolute;
  top: 40px;
  bottom: 90px;
  left: 0;
  right: 0;
  overflow: auto;
  font-size: 14px;
}
.item-option-container {
  margin: 15px 5px 10px;
  padding: 10px;
  border: 1px solid #999;
  border-radius: 5px;
  position: relative;
}
.item-option-container-title {
  position: absolute;
  left: 10px;
  top: -10px;
  background: #fff;
  padding: 0 5px;
  font-size: 14px;
  color: #666;
}
.item-option-outfun-banner>p {
  line-height: 30px;
}
.outfun-option {
  padding-left: 20px;
}
.outfun-option select {
  width: 100%;
  height: 21px;
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
hr {
  margin: 0 10px;
  background: #ddd;
  border: none;
  height: 1px;
}
</style>
