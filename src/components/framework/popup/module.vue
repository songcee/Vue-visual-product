<!-- 设置页面模块划分的弹窗 -->
<template>
  <div class="popup-container" v-show="show">
    <div class="header">
      <span class="header-title">编辑页面模块划分</span>
      <span class="header-close" @click="cancelWin()">╳</span>
    </div>
    <div class="body">
      <p class="module-title">页面模块选项</p>
      <div class="module">
        <div class="module-item icon-module" 
         v-for="index in 15" 
         :key="index" 
         :class="['icon-module-'+index, modules.moduleIndex == index?'choose':'']"
         @click="chooseModule(index)"
        ></div>
      </div>
      <p class="module-title" v-show="modules.moduleIndex != -1">模块布局编辑</p>
      <div class="module" v-show="modules.moduleIndex != -1" style="margin-bottom: 15px;">
        <div class="module-item-desc" v-if="modules.moduleIndex == 1">
          页面仅一个模块，模块宽高均为页面100%。
        </div>
        <div class="module-item-desc" v-if="modules.moduleIndex == 2">
          页面分为两个模块，上部模块高度固定为<input v-model="modules.input1" :class="{'warning-border': error.input1}" @blur="check('input1', modules.input1)" />px，
          下部模块高度铺满剩下部分。
        </div>
        <div class="module-item-desc" v-if="modules.moduleIndex == 3">
          页面分为三个模块，上部模块高度固定为<input v-model="modules.input1" :class="{'warning-border': error.input1}" @blur="check('input1', modules.input1)" />px，
          下部模块高度铺满剩下部分，宽度各占一半。
        </div>
        <div class="module-item-desc" v-if="modules.moduleIndex == 4">
          页面分为三个模块，上部模块高度固定为<input v-model="modules.input1" :class="{'warning-border': error.input1}" @blur="check('input1', modules.input1)" />px，
          下部模块高度铺满剩下部分，左侧宽度固定为<input v-model="modules.input2" :class="{'warning-border': error.input2}" @blur="check('input2', modules.input2)" />px，右侧宽度铺满剩下部分。
        </div>
        <div class="module-item-desc" v-if="modules.moduleIndex == 5">
          页面分为四个模块，上部模块高度固定为<input v-model="modules.input1" :class="{'warning-border': error.input1}" @blur="check('input1', modules.input1)" />px，
          下部模块高度铺满剩下部分，左侧宽度固定为<input v-model="modules.input2" :class="{'warning-border': error.input2}" @blur="check('input2', modules.input2)" />px，
          右侧宽度固定为<input v-model="modules.input3" :class="{'warning-border': error.input3}" @blur="check('input3', modules.input3)" />px，中间宽度铺满剩下部分。
        </div>
        <div class="module-item-desc" v-if="modules.moduleIndex == 6">
          页面分为三个模块，上部模块高度固定为<input v-model="modules.input1" :class="{'warning-border': error.input1}" @blur="check('input1', modules.input1)" />px，
          下部模块高度固定为<input v-model="modules.input2" :class="{'warning-border': error.input2}" @blur="check('input2', modules.input2)" />px，中间高度自适应。
        </div>
        <div class="module-item-desc" v-if="modules.moduleIndex == 7">
          页面分为四个模块，上部模块高度固定为<input v-model="modules.input1" :class="{'warning-border': error.input1}" @blur="check('input1', modules.input1)" />px，
          下部模块高度固定为<input v-model="modules.input2" :class="{'warning-border': error.input2}" @blur="check('input2', modules.input2)" />px，
          中间高度自适应，左右宽度各占一半。
        </div>
        <div class="module-item-desc" v-if="modules.moduleIndex == 8">
          页面分为四个模块，上部模块高度固定为<input v-model="modules.input1" :class="{'warning-border': error.input1}" @blur="check('input1', modules.input1)" />px，
          下部模块高度固定为<input v-model="modules.input2" :class="{'warning-border': error.input2}" @blur="check('input2', modules.input2)" />px，
          中间高度自适应，左侧宽度固定为<input v-model="modules.input3" :class="{'warning-border': error.input3}" @blur="check('input3', modules.input3)" />px，右侧宽度铺满剩下部分。
        </div>
        <div class="module-item-desc" v-if="modules.moduleIndex == 9">
          页面分为五个模块，上部模块高度固定为<input v-model="modules.input1" :class="{'warning-border': error.input1}" @blur="check('input1', modules.input1)" />px，
          下部模块高度固定为<input v-model="modules.input2" :class="{'warning-border': error.input2}" @blur="check('input2', modules.input2)" />px，
          中间高度自适应，左侧宽度固定为<input v-model="modules.input3" :class="{'warning-border': error.input3}" @blur="check('input3', modules.input3)" />px，
          右侧宽度固定为<input v-model="modules.input4" :class="{'warning-border': error.input4}" @blur="check('input4', modules.input4)" />px，中间宽度铺满剩下部分。
        </div>
        <div class="module-item-desc" v-if="modules.moduleIndex == 10">
          页面分为两个模块，左侧宽度固定为<input v-model="modules.input1" :class="{'warning-border': error.input1}" @blur="check('input1', modules.input1)" />px，右侧宽度铺满剩下部分，高度为页面100%。
        </div>
        <div class="module-item-desc" v-if="modules.moduleIndex == 11">
          页面分为两个模块，左右宽度各占一半，高度为页面100%。
        </div>
        <div class="module-item-desc" v-if="modules.moduleIndex == 12">
          页面分为三个模块，左侧宽度固定为<input v-model="modules.input1" :class="{'warning-border': error.input1}" @blur="check('input1', modules.input1)" />px，
          右侧宽度固定为<input v-model="modules.input2" :class="{'warning-border': error.input2}" @blur="check('input2', modules.input2)" />px，中间宽度铺满剩下部分，高度为页面100%。
        </div>
        <div class="module-item-desc" v-if="modules.moduleIndex == 13">
          页面分为四个模块，有点乱，这个就先不支持了吧，不要选择这个了，不然会有一万个bug等着你。
        </div>
        <div class="module-item-desc" v-if="modules.moduleIndex == 14">
          页面分为四个模块，左侧宽度固定为<input v-model="modules.input1" :class="{'warning-border': error.input1}" @blur="check('input1', modules.input1)" />px，右侧宽度铺满剩下部分，
          上部模块高度为<input v-model="modules.input2" :class="{'warning-border': error.input2}" @blur="check('input2', modules.input2)" />px，
          下部模块高度为<input v-model="modules.input3" :class="{'warning-border': error.input3}" @blur="check('input3', modules.input3)" />px。
        </div>
        <div class="module-item-desc" v-if="modules.moduleIndex == 15">
          页面分为五个模块，上部模块高度固定为<input v-model="modules.input1" :class="{'warning-border': error.input1}" @blur="check('input1', modules.input1)" />px，
          下面的左侧宽度固定为<input v-model="modules.input2" :class="{'warning-border': error.input2}" @blur="check('input2', modules.input2)" />px，下面的右侧宽度铺满剩下部分，
          下面的上部模块高度为<input v-model="modules.input3" :class="{'warning-border': error.input3}" @blur="check('input3', modules.input3)" />px，
          下面的下部模块高度为<input v-model="modules.input4" :class="{'warning-border': error.input4}" @blur="check('input4', modules.input4)" />px。
        </div>
      </div>
      <div class="module-footer">
        <button class="vp-btn" @click="cancelWin()">取消</button>
        <button class="vp-btn vp-btn-blue" @click="submitWin()">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modules',
  props: ['show'],
  data () {
    return {
      modules: {
        moduleIndex: -1,
        input1: 100,
        input2: 100,
        input3: 100,
        input4: 100
      },
      error: {
        input1: false,
        input2: false,
        input3: false,
        input4: false,
      }
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.fixProduct()
      }
    },
  },
  mounted () {
  },
  methods: {
    // 每次显示模块划分弹窗前，先从store中获取最新数据
    fixProduct () {
      const info = this.$store.getters.getAllProductInfo
      this.$util.objAssign(this.modules, info.modules)
    },
    // 选中某个模块划分方式，会在下面显示该方式具体的配置项
    chooseModule (index) {
      this.modules.moduleIndex = index
    },
    // 校验数据格式是否正确
    check (type, data, valid) { // type-数据名 data-数据的值 valid-校验规则
      if (valid) {
        try {
          if (!valid.test(data)) {
            this.error[type] = true
          } else {
            this.error[type] = false
          }
        } catch (e) {
          window.console.log('valid error ', e)
        }
        return
      }
      if (data == '') {
        this.error[type] = true
        return
      }
      let validReg
      switch (type) {
        case 'input1':
        case 'input2':
        case 'input3':
        case 'input4':
          validReg = /^[0-9]*$/
          break
      }
      if (!validReg.test(data)) {
        this.error[type] = true // 提示报错
      } else {
        this.error[type] = false
      }
    },
    submitWin () {
      // 校验所有输入内容是否正确
      let err = false
      for (let i in this.error) {
        if (this.error[i] == true) { // 说明有错误
          err = 1
          break
        }
      }
      for (let i in this.require) {
        if (this.input1[i] == '') { // 说明有必填项未填写
          err = 2
          break
        }
      }
      if (err == 1) {
        alert('输入内容有误！')
        return
      } else if (err == 2) {
        alert('请输入所有必填内容！')
        return
      }
      // 校验所有输入内容是否正确结束
      let modules_clone = this.modules
      this.$store.commit('product_set', {type: 'modules', obj: {...modules_clone, editIndex: -1}}) // 将布局的参数存入store
      this.updateModule() // 更新画板上的页面模块划分
      this.$store.commit('module_hide') // 隐藏页面模块划分窗口
      this.$store.commit('popup_topmask_handler', false) // 隐藏遮罩层
    },
    cancelWin () {
      this.$store.commit('module_hide') // 隐藏页面模块划分窗口
      this.$store.commit('popup_topmask_handler', false) // 隐藏遮罩层
      // 这里关闭窗口时不需要恢复数据，因为每次打开窗口都会从store中自动读取一遍数据
      this.resetError()
    },
    // 将所有输入框的错误提示内容恢复初始化
    resetError () {
      for (let i in this.error) {
        this.error[i] = false
      }
    },
    updateModule () {
      this.$util.bus.$emit('board_updateModule', this.modules)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.popup-container {
  position: absolute;
  background: #fff;
  z-index: 500;
  border-radius: 10px;
  border: 1px solid #ddd;
  box-shadow: 0 0 4px 4px rgba(0,0,0,.1);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.header {
  height: 39px;
  line-height: 39px;
  border-bottom: 1px solid #ddd;
  cursor: default;
}
.header-title {
  padding-left: 15px;
  font-size: 14px;
  font-weight: 700;
}
.header-close {
  padding: 0 5px;
  margin-right: 10px;
  cursor: pointer;
  float: right;
  color: #a5a5a5;
}
.header-close:hover {
  color: #000;
}
.body {
  padding: 10px 15px;
}
.module-title {
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 15px;
  font-size: 14px;
}
.module {
  width: 520px;
  overflow: hidden;
}
.module-item {
  width: 99px;
  height: 58px;
  float: left;
  border: 1px solid #e8e8e8;
  margin-right: 30px;
  margin-bottom: 15px;
  cursor: pointer;
  box-sizing: border-box;
}
.module-item.choose {
  border: 1px solid #333333;
}
.icon-module-1 {
  background-position: 0 0;
}
.icon-module-2 {
  background-position: -99px 0;
}
.icon-module-3 {
  background-position: -198px 0;
}
.icon-module-4 {
  background-position: 0 -60px;
}
.icon-module-5 {
  background-position: -99px -60px;
}
.icon-module-6 {
  background-position: -198px -60px;
}
.icon-module-7 {
  background-position: 0 -119px;
}
.icon-module-8 {
  background-position: -99px -119px;
}
.icon-module-9 {
  background-position: -198px -119px;
}
.icon-module-10 {
  background-position: 0 -178px;
}
.icon-module-11 {
  background-position: -99px -178px;
}
.icon-module-12 {
  background-position: -198px -178px;
}
.icon-module-13 {
  background-position: 0 -237px;
}
.icon-module-14 {
  background-position: -99px -237px;
}
.icon-module-15 {
  background-position: -198px -237px;
}
.module-item-desc {
  font-size: 12px;
  color: #495060;
  line-height: 26px;
  padding-left: 12px;
}
.module-item-desc input {
  height: 18px;
  line-height: 18px;
  padding: 2px 7px;
  font-size: 12px;
  border: 1px solid #dddee1;
  border-radius: 4px;
  color: #495060;
  background-color: #fff;
  background-image: none;
  margin: 0 5px;
  width: 40px;
}
.warning {
  color: #F00;
  margin-left: 10px;
}
.warning-border {
  border-color: #F00 !important;
}
.module-footer {
  border-top: 1px solid #ddd;
  padding: 12px 18px 0;
  text-align: right;
  box-sizing: border-box;
}
.module-footer button {
  margin-left: 10px;
}
</style>
