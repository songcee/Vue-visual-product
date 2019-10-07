<!-- 组件配置项的配置UI组件 -->
<template>
  <p>
    <label>可选参数：</label>
    <select v-model="selectData">
      <option value="undefined">--请选择--</option>
      <option
        v-for="(param, ind) in item.params"
        :key="'params'+ind"
        :value="param.name">
        {{param.description}}--{{param.name}}
      </option>
    </select>
  </p>
</template>

<script>
export default {
  name: "outfunc-paramList",
  created: function() {
    // 当传入的参数要求返回一个对象时，需要改造下原有数据结构
    if (this.type == 'object' && typeof this.params[this.i] != 'object') {
      this.params[this.i] = {}
    }
  },
  props: ['item', 'params', 'i', 'objKey', 'type'],
  data() {
    return {
      selectData: 'undefined'
    };
  },
  mounted () {
  },
  computed: {
  },
  watch: {
    selectData () {
      if (this.type == 'object') {
        this.params[this.i][this.objKey] = this.selectData == 'undefined' ? undefined : this.selectData
      } else {
        this.params[this.i] = this.selectData == 'undefined' ? undefined : this.selectData
      }
    }
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
select {
  width: calc(100% - 80px);
}
</style>
