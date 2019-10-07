<!-- 组件配置项的配置UI组件 -->
<template>
    <div class="item-option-nav">
        <p class="item-option-object-title">{{option.text}}</p>
        <div v-for="(item, index) in option.objectOptions" :key="index">
            <OptionText v-if="item.type == 'text'" :option="item" :ref="item.type + index" class="vp-ml20"></OptionText>
            <OptionSelect v-else-if="item.type == 'select'" :option="item" :ref="item.type + index" class="vp-ml20"></OptionSelect>
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
        if (d && d.err === 'validation false') {
          // 说明输入有报错
          this.validation = false
          return d
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
</style>
