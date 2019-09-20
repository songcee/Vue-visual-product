<!-- 组件配置项的配置UI组件 -->
<template>
    <div class="item-option-nav">
        <p class="item-option-object-title">{{option.text}}</p>
        <div v-for="(item, index) in option.objectOptions" :key="index">
            <OptionText v-if="item.type == 'text'" :option="item" :ref="item.type + index" class="item-option-object-nav"></OptionText>
            <OptionSelect v-else-if="item.type == 'select'" :option="item" :ref="item.type + index" class="item-option-object-nav"></OptionSelect>
        </div>
    </div>
</template>

<script>
import OptionText from '@/components/framework/option/text';
import OptionSelect from '@/components/framework/option/select';
export default {
  name: "Option-Object",
  components: {
      OptionText,
      OptionSelect
  },
  props: ['option'],
  data() {
    return {
      validation: true
    };
  },
  computed: {
  },
  watch: {
  },
  methods: {
    optData () {
      let index = 0
      let obj = {}
      for (let i in this.option.objectOptions) {
        let d = this.$refs[this.option.objectOptions[i].type + index][0].optData()
        if (d === 'validation false') {
          // 说明输入有报错
          alert(this.option.objectOptions[i].text + ' 配置输入有误！')
          this.validation = false
        }
        obj[this.option.objectOptions[i].key] = d
        index++
      }
      return obj
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-option-object-title {
  font-weight: bold;
  color: #111;
}
.item-option-object-nav {
  padding-left: 20px;
}
</style>
