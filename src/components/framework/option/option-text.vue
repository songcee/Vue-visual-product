<!-- 组件配置项的配置UI组件 -->
<template>
    <div class="item-option-nav">
        <label :title="item.text">{{item.text}}</label><span>：</span>
        <input v-if="item.dataType == 'number'" v-model.number="optionData[item.key]" type="number" />
        <input v-else v-model="optionData[item.key]"/>
    </div>
</template>

<script>
export default {
  name: "Option",
  created: function() {
  },
  props: [],
  data() {
    return {
    };
  },
  computed: {
  },
  watch: {
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
