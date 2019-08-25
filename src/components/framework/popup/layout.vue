<!-- 设置页面布局的弹窗 -->
<template>
  <div class="popup-container" v-show="show">
    <div class="header">
      <span class="header-title">编辑项目信息</span>
      <span class="header-close" @click="cancelWin()">╳</span>
    </div>
    <div class="body">
      <!-- <p class="module-title">项目基础信息</p> -->
      <div class="module">
        <div class="item">
          <label class="item-label requierd">项目名称：</label>
          <div class="item-content">
            <input v-model="product.name" :class="{'warning-border': error.name}" @blur="check('name', product.name)" />
          </div>
        </div>
        <div class="item">
          <label class="item-label requierd">背景颜色：</label>
          <div class="item-content">
            <input v-model="product.bgcolor" :class="{'warning-border': error.bgcolor}" @blur="check('bgcolor', product.bgcolor)" style="width: 80px" />
            <span v-if="error.bgcolor" class="warning">请输入正确的颜色，例如：#FFFFFF</span>
          </div>
        </div>
        <div class="item">
          <label class="item-label requierd">页面宽度自适应：</label>
          <div class="item-content">
            <select v-model="product.width_adaption" :class="{'warning-border': error.width_adaption}" @blur="check('width_adaption', product.width_adaption)">
              <option value="1">宽度铺满全屏，仅设置最小宽度</option>
              <option value="2">中间固定宽度，两边背景色自适应宽度填充</option>
              <option value="3">中间固定最大、最小宽度，两边背景色自适应宽度填充</option>
            </select>
          </div>
        </div>
        <div class="item">
          <div class="item-adaption-desc" v-if="product.width_adaption == 1">宽度自适应详细说明：<br/>中间主体内容部分铺满全屏，且设置最小宽度为<input v-model="product.adaption.minWidth" :class="{'warning-border': error.minWidth}" @blur="check('minWidth', product.adaption.minWidth)" />px</div>
          <div class="item-adaption-desc" v-if="product.width_adaption == 2">宽度自适应详细说明：<br/>中间主体内容部分固定宽度<input v-model="product.adaption.fixWidth" :class="{'warning-border': error.fixWidth}" @blur="check('fixWidth', product.adaption.fixWidth)" />px，两边用背景色填充；</div>
          <div class="item-adaption-desc" v-if="product.width_adaption == 3">宽度自适应详细说明：<br/>中间主体内容部分最小宽度<input v-model="product.adaption.minWidth" :class="{'warning-border': error.minWidth}" @blur="check('minWidth', product.adaption.minWidth)" />px，最大宽度<input v-model="product.adaption.maxWidth" :class="{'warning-border': error.maxWidth}" @blur="check('maxWidth', product.adaption.maxWidth)" />px，剩余部分用背景色填充；</div>
        </div>
        <div class="item">
          <label class="item-label requierd">页面高度自适应：</label>
          <div class="item-content">
            <select v-model="product.height_adaption" :class="{'warning-border': error.height_adaption}" @blur="check('height_adaption', product.height_adaption)">
              <option value="1">固定高度</option>
              <option value="2">浏览器100%高度，且设置最小高度</option>
              <option value="3">不设置页面高度，由内部元素撑开</option>
            </select>
          </div>
        </div>
        <div class="item">
          <div class="item-adaption-desc" v-if="product.height_adaption == 1">高度自适应详细说明：<br/>页面高度固定为<input v-model="product.adaption.fixHeight" :class="{'warning-border': error.fixHeight}" @blur="check('fixHeight', product.adaption.fixHeight)" />px；</div>
          <div class="item-adaption-desc" v-if="product.height_adaption == 2">高度自适应详细说明：<br/>页面最小高度为<input v-model="product.adaption.minHeight" :class="{'warning-border': error.minHeight}" @blur="check('minHeight', product.adaption.minHeight)" />px，大于这个值时为浏览器100%高度；</div>
          <div class="item-adaption-desc" v-if="product.height_adaption == 3">高度自适应详细说明：<br/>不设置页面的高度，由内部元素撑开</div>
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
  name: 'Layout',
  props: ['show'],
  data () {
    return {
      // 项目基础信息（只是临时储存，最终会存入store）
      product: {
        name: '', // 项目名称
        bgcolor: '#FFFFFF', // 项目背景色
        width_adaption: '', // 页面宽度自适应方式
        height_adaption: '', // 页面高度自适应方式
        adaption: { // 页面自适应具体参数
          minWidth: 1000, // 最小宽度
          maxWidth: 1920, // 最大宽度
          fixWidth: 1000, // 固定宽度
          minHeight: 600, // 最小高度
          fixHeight: 800, // 固定高度
        },
      },
      error: { // 输入错误提醒
        name: false,
        bgcolor: false,
        width_adaption: false,
        height_adaption: false,
        minWidth: false,
        maxWidth: false,
        fixWidth: false,
        minHeight: false,
        fixHeight: false
      },
      require: { // 必填项
        name: true,
        bgcolor: true,
        width_adaption: true,
        height_adaption: true
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
    // 每次显示编辑项目弹窗前，先从store中获取最新数据
    fixProduct () {
      const info = this.$store.getters.getAllProductInfo
      this.$util.objAssign(this.product, info.layout)
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
        case 'bgcolor':
          validReg = /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/
          break
        case 'name':
        case 'width_adaption':
        case 'height_adaption':
          validReg = /\S/
          break
        case 'minWidth':
        case 'maxWidth':
        case 'fixWidth':
        case 'minHeight':
        case 'fixHeight':
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
        if (this.product[i] == '') { // 说明有必填项未填写
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
      this.$store.commit('product_set', {type: 'layout', obj: this.product}) // 将布局的参数存入store
      this.updateLayout() // 更新画板上的页面布局
      this.$store.commit('layout_hide') // 隐藏页面布局设置窗口
      this.$store.commit('popup_topmask_handler', false) // 隐藏遮罩层
    },
    cancelWin () {
      this.$store.commit('layout_hide') // 隐藏页面布局设置窗口
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
    // 修改画板
    updateLayout () {
      this.$util.bus.$emit('board_updateLayout', this.product)
    },
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
}
.item {
  margin-bottom: 15px;
  vertical-align: top;
  zoom: 1;
}
.item-label {
  width: 120px;
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 12px;
  color: #495060;
  line-height: 1;
  padding: 10px 12px 10px 0;
  box-sizing: border-box;
}
.item-label.requierd::before {
  content: "*";
  display: inline-block;
  margin-right: 4px;
  line-height: 1;
  font-family: SimSun;
  font-size: 12px;
  color: #ed3f14;
}
.item-content {
  position: relative;
  line-height: 32px;
  font-size: 12px;
  margin-left: 120px;
}
.item-content input, select {
  display: inline-block;
  width: 300px;
  box-sizing: border-box;
  height: 32px;
  line-height: 1.5;
  padding: 4px 7px;
  font-size: 12px;
  border: 1px solid #dddee1;
  border-radius: 4px;
  color: #495060;
  background-color: #fff;
  background-image: none;
  position: relative;
  cursor: text;
  transition: border .2s ease-in-out,background .2s ease-in-out,box-shadow .2s ease-in-out;
}
.item input:hover,
.item select:hover {
  border-color: #57a3f3;
}
.warning {
  color: #F00;
  margin-left: 10px;
}
.warning-border {
  border-color: #F00 !important;
}
.item-adaption-desc {
  font-size: 12px;
  color: #495060;
  line-height: 26px;
  padding-left: 12px;
}
.item-adaption-desc input {
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
