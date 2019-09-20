<!-- 组件配置项的配置UI组件 -->
<template>
    <div class="item-option-nav">
        <label :title="option.text">{{option.text}}（批量输入）：</label>
        <span class="array-add vp-btn vp-btn-blue" @click="addOptionArr()">增加</span>
        <template v-if="arrayData.length">
          <div class="item-option-array" v-for="(v,index) in arrayData" :key="index">
            <OptionText v-if="option.type == 'array-text'" :option="option" :ref="'array-text' + index"></OptionText>
            <OptionSelect v-else-if="option.type == 'array-select'" :option="option" :ref="option.type + index" class="item-option-object-nav"></OptionSelect>
            <span class="array-del vp-btn" v-if="((arrayData.length != 1 && index == 0) || index != 0) && index != arrayData.length - 1" @click="delOptionArr(index)">删除</span>
          </div>
        </template>
    </div>
</template>

<script>
// import validations from '@/global/validation.js'
import OptionText from '@/components/framework/option/text';
import OptionSelect from '@/components/framework/option/select';
export default {
  name: "Option-Array",
  components: {
    OptionText,
    OptionSelect
  },
  created: function() {
  },
  props: ['option'],
  data() {
    return {
      arrayData: [],
      validation: true
    };
  },
  mounted () {
    console.log(this.option)
    if (this.option.default) {
      this.arrayData.push(this.option.default)
    } else {
      this.arrayData.push('')
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
    // 连续输入框后面的删除按钮
    delOptionArr (index) {
      this.arrayData.splice(index, 1)
    },
    // 连续输入框后面的增加按钮
    addOptionArr () {
      this.arrayData.push(this.option.default)
    },
    optData () {
      let ret = []
      for (let i in this.arrayData) {
        let d = this.$refs[this.option.type + i][0].optData()
        if (d === 'validation false') {
          // 说明输入有报错
          alert(this.option.text + ' 配置输入有误！')
          this.validation = false
        }
        ret.push(d)
      }
      return ret
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-option-nav,
.item-option-array {
  position: relative;
}
.array-del {
  position: absolute;
  right: 0;
  top: 3px;
  padding: 2px 6px;
}
.array-add {
  padding: 2px 6px;
}
</style>
