<!-- 组件配置项的配置UI组件 -->
<template>
  <div class="item-option-nav">
    <label 
      v-if="option.type == 'select'"
      :title="option.text"
      :class="{'mustRequired': option.mustRequired}">{{option.text}}：</label>
    <select v-model="selectData" :class="{'arrayWidth':option.type !== 'select'}">
      <option v-for="(v, index) in option.selectData" :key="index" :value="v.value">{{v.text}}</option>
    </select>
  </div>
</template>

<script>
import validations from '@/global/validation.js'
export default {
  name: "Option-Select",
  created: function() {
  },
  props: ['option'],
  data() {
    return {
      selectData: '',
      validation: true
    };
  },
  mounted () {
    if (this.option.default) {
      this.selectData = this.option.default
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    optData () {
      if (this.validation) {
        if (this.option.dataType.indexOf('number') >= 0) {
          return parseFloat(this.selectData)
        } else {
          return this.selectData
        }
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
/* 当是数组中连续的select，给输入框加宽度 */
.arrayWidth {
  width: 230px;
}
</style>
