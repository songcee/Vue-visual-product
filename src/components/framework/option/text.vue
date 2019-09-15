<!-- 组件配置项的配置UI组件 -->
<template>
    <div class="item-option-nav">
        <label v-if="option.type == 'text'" :title="option.text">{{option.text}}：</label>
        <input 
          v-model="inputData"
          :type="option.dataType.indexOf('number') >= 0 ? 'number' : 'text'"
          :class="{'vp-error': !validation, 'arrayWidth':option.type !== 'text'}" />
    </div>
</template>

<script>
import validations from '@/global/validation.js'
export default {
  name: "Option-Text",
  created: function() {
  },
  props: ['option'],
  data() {
    return {
      inputData: '',
      validation: true
    };
  },
  mounted () {
    if (this.option.default) {
      this.inputData = this.option.default
    }
  },
  computed: {
  },
  watch: {
    inputData () {
      if (!this.option.validation) {
        return
      }
      if (typeof this.option.validation == 'function') {
        if (!this.option.validation(this.inputData)) {
          this.validation = false
        } else {
          this.validation = true
        }
      } else if (/^\/\^?.*(\$?[\/|\/g|\/gi|\/i|\/ig])$/.test(this.option.validation)) {
        try {
          let reg = eval(this.option.validation)
          if (!reg.test(this.inputData)) {
            this.validation = false
          } else {
            this.validation = true
          }
        } catch (e) {
          this.validation = false
        }
      } else if (validations[this.option.validation]) {
        if (!validations[this.option.validation](this.inputData)) {
          this.validation = false
        } else {
          this.validation = true
        }
      }
    },
  },
  methods: {
    optData () {
      if (this.validation) {
        return this.inputData
      } else {
        // 数据校验不通过统一返回这个
        return 'validation false'
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 当是数组中连续的input，给输入框加宽度 */
.arrayWidth {
  width: 230px;
}
</style>
